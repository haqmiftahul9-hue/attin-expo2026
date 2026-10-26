import { supabase } from './supabaseClient.js'
import { generateRegistrationCode } from './registrationCode.js'
import type { RegistrationRow, SaveRegistrationResult } from '../types/registration.js'

/**
 * Penyimpanan data pendaftaran.
 *
 * Satu tabel `registrations` dipakai untuk SEMUA cabang (tidak ada tabel per
 * cabang). Cabang dibedakan lewat kolom `competition_id` + `competition_slug`
 * supaya dashboard admin bisa memfilter dengan mudah.
 *
 * - Supabase terpasang  → data dikirim ke tabel `registrations` dan berkas ke
 *   bucket privat `registrations`.
 * - Supabase belum dikonfigurasi → data disimpan ke `localStorage` agar alur
 *   tetap dapat diuji di lokal (mode `local`).
 */

const LOCAL_KEY = 'attin:registrations'
const LAST_KEY = 'attin:registration:last'
const STORAGE_BUCKET = 'registration-payments'

export interface SaveRegistrationInput {
  row: Omit<RegistrationRow, 'id' | 'created_at' | 'updated_at'>
  files: {
    bukti_transfer?: File | null
  }
}

export function readLocal(): RegistrationRow[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as RegistrationRow[]) : []
  } catch {
    return []
  }
}

function writeLocal(rows: RegistrationRow[]): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(LOCAL_KEY, JSON.stringify(rows))
}

export function saveRegistrationLocally(row: RegistrationRow): void {
  const rows = readLocal()
  writeLocal([...rows, row])
  localStorage.setItem(LAST_KEY, JSON.stringify(row))
}

/** Ringkasan pendaftaran terakhir, dipakai halaman "pendaftaran berhasil". */
export function getLastRegistration(): RegistrationRow | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(LAST_KEY)
    return raw ? (JSON.parse(raw) as RegistrationRow) : null
  } catch {
    return null
  }
}

/**
 * Tingkat kelas peserta per baris. Prioritas kolom `grades`; untuk baris
 * yang tersimpan sebelum kolom tersedia, nilai dibaca dari specific_data.
 */
export function getRegistrationGrades(row: RegistrationRow): string[] {
  const fromColumn = (row.grades || '')
    .split('\n')
    .map((g) => g.trim())
    .filter(Boolean)
  if (fromColumn.length > 0) return fromColumn

  const fallback = row.specific_data?.kelas_peserta
  if (typeof fallback === 'string' && fallback.trim() !== '') {
    return fallback.split('\n').map((g) => g.trim()).filter(Boolean)
  }
  return []
}

function safeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

function getSupabaseClient() {
  return supabase
}

async function uploadFile(
  client: Awaited<ReturnType<typeof getSupabaseClient>>,
  competitionSlug: string,
  registrationCode: string,
  field: string,
  file: File | null | undefined,
): Promise<string | null> {
  if (!client || !file) return null

  const path = `${competitionSlug}/${registrationCode}/${field}-${safeFileName(file.name)}`
  const { error } = await client.storage.from(STORAGE_BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type,
  })

  if (!error) {
    return path
  }

  // Penyimpanan objek (storage bucket) tidak tersedia / ditolak policy:
  // simpan berkas sebagai data URL (base64) langsung di basis data agar bukti
  // pembayaran tetap dapat dilihat oleh admin tanpa bergantung pada bucket.
  console.warn('[registrations] gagal mengunggah berkas ke storage:', error.message, '-> fallback data URL')
  try {
    const base64 = await fileToBase64(file)
    return `data:${file.type || 'application/octet-stream'};base64,${base64}`
  } catch (e) {
    console.warn('[registrations] gagal konversi berkas ke data URL:', e)
    return null
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        const comma = result.indexOf(',')
        resolve(comma >= 0 ? result.slice(comma + 1) : result)
      } else {
        reject(new Error('FileReader result bukan string'))
      }
    }
    reader.onerror = () => reject(reader.error ?? new Error('FileReader error'))
    reader.readAsDataURL(file)
  })
}

/**
 * Klasifikasi berkas bukti pembayaran berdasarkan ekstensi pada path.
 * Formulir pendaftaran menerima JPG/JPEG/PNG/PDF (lihat registrationValidation).
 */
export function proofFileKind(path: string | null | undefined): 'image' | 'pdf' | 'unknown' {
  if (!path) return 'unknown'
  if (path.startsWith('data:')) {
    const mime = path.slice(5).split(';')[0].toLowerCase()
    if (mime.startsWith('image/')) return 'image'
    if (mime === 'application/pdf') return 'pdf'
    return 'unknown'
  }
  const extension = (path ?? '').split('.').pop()?.toLowerCase() ?? ''
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(extension)) return 'image'
  if (extension === 'pdf') return 'pdf'
  return 'unknown'
}

export async function getPaymentProofSignedUrl(path: string | null): Promise<string | null> {
  if (!path) return null
  // Data URL (fallback ketika storage bucket tidak tersedia): langsung kembalikan.
  if (path.startsWith('data:')) return path

  const client = await getSupabaseClient()
  if (!client) return null

  const { data, error } = await client.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, 60 * 60) // 1 hour

  if (error) {
    console.warn('[registrations] gagal membuat signed url:', error.message)
    return null
  }
  return data.signedUrl
}

export async function saveRegistration(input: SaveRegistrationInput): Promise<SaveRegistrationResult> {
  const { files } = input
  let row = input.row
  const client = await getSupabaseClient()

  if (!client) {
    saveRegistrationLocally({ ...row, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    return { ok: true, registrationCode: row.registration_code, mode: 'local' }
  }

  const MAX_ATTEMPTS = 3
  // Cabang baru yang belum ada di tabel `competitions` (FK) disimpan dengan
  // slug induk agar pendaftaran tetap berhasil dan data masuk ke portal admin.
  const DB_SLUG_MAP: Record<string, string> = {
    'tahfizh-kelas-6': 'tahfizh',
  }
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const paymentProofUrl = await uploadFile(client, row.competition_slug, row.registration_code, 'bukti-transfer', files.bukti_transfer)

    const dbSlug = DB_SLUG_MAP[row.competition_slug] || row.competition_slug
    const payloadRow = { ...row, competition_slug: dbSlug as any }
    const payload = { ...payloadRow, payment_proof_url: paymentProofUrl, specific_data: { ...row.specific_data, branch_slug: row.competition_slug } }
    const { data, error } = await client
      .from('registrations')
      .insert(payload)
      .select()
      .single()

    if (!error) {
      const saved = data as RegistrationRow
      localStorage.setItem(LAST_KEY, JSON.stringify(saved))
      return { ok: true, registrationCode: saved.registration_code, mode: 'supabase' }
    }

    // Kolom `grades` belum tersedia di basis data (migrasi belum dijalankan):
    // simpan kelas peserta ke specific_data agar pendaftaran tetap tersimpan online.
    if (/could not find.*grades|grades.*column/i.test(error.message)) {
      const { grades, ...rest } = payload
      const fallback = await client
        .from('registrations')
        .insert({
          ...rest,
          specific_data: { ...rest.specific_data, kelas_peserta: grades },
        })
        .select()
        .single()

      if (!fallback.error) {
        const saved = fallback.data as RegistrationRow
        localStorage.setItem(LAST_KEY, JSON.stringify(saved))
        return { ok: true, registrationCode: saved.registration_code, mode: 'supabase' }
      }

      // Jika fallback juga gagal karena kode duplikat, coba kode baru.
      if (!isUniqueViolation(fallback.error)) {
        console.warn('[registrations] insert fallback gagal:', fallback.error.message)
        break
      }
    } else if (!isUniqueViolation(error)) {
      console.warn('[registrations] insert gagal:', error.message)
      break
    }

    // Kode registrasi duplikat (race condition / benturan waktu): buat kode baru lalu ulangi.
    if (attempt < MAX_ATTEMPTS - 1) {
      const prefix = row.registration_code.split('-').slice(0, 2).join('-')
      row = { ...row, registration_code: generateRegistrationCode(prefix) }
      continue
    }
  }

  // Semua percobaan gagal: simpan lokal agar data tidak hilang.
  saveRegistrationLocally({ ...row, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
  return {
    ok: true,
    registrationCode: row.registration_code,
    mode: 'local',
    message: 'Data disimpan di perangkat karena penyimpanan online belum berhasil.',
  }
}

function isUniqueViolation(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false
  if (error.code === '23505') return true
  const msg = (error.message || '').toLowerCase()
  return msg.includes('duplicate key') || msg.includes('unique constraint') || msg.includes('unique violation')
}

export async function getAllRegistrations(): Promise<RegistrationRow[]> {
  const client = await getSupabaseClient()
  if (!client) {
    return readLocal()
  }
  
  const { data, error } = await client.from('registrations').select('*').order('created_at', { ascending: false })
  
  if (error) {
    console.warn('[registrations] fetch failed:', error.message)
    return readLocal()
  }
  
  return data as RegistrationRow[]
}


export async function updateRegistrationStatus(registrationCode: string, status: 'pending' | 'verified' | 'rejected'): Promise<boolean> {
  const client = await getSupabaseClient()
  if (!client) {
    const local = readLocal()
    const index = local.findIndex(r => r.registration_code === registrationCode)
    if (index !== -1) {
      local[index].registration_status = status
      if (status === 'verified') {
        local[index].payment_status = 'verified'
      }
      writeLocal(local)
      return true
    }
    return false
  }

  const { error } = await client
    .from('registrations')
    .update({ 
      registration_status: status,
      payment_status: status === 'verified' ? 'verified' : undefined 
    })
    .eq('registration_code', registrationCode)
    
  return !error
}

export async function getVerifiedSchools(): Promise<{school_name: string, competitions: string[]}[]> {
  const client = getSupabaseClient()
  let rawData: { school: string; lomba: string }[] = []

  if (!client) {
    const local = readLocal()
    rawData = local.filter(r => r.registration_status !== 'rejected').map(r => ({
      school: r.school_name,
      lomba: r.competition_slug
    }))
  } else {
    // 1. Coba baca dari secure view public_registered_schools (melindungi PII peserta)
    const { data: viewData, error: viewError } = await client
      .from('public_registered_schools')
      .select('school_name, competition_slug')
    
    if (!viewError && viewData) {
      rawData = (viewData as any[]).map(r => ({
        school: r.school_name,
        lomba: r.competition_slug
      }))
    } else {
      // 2. Fallback ke tabel registrations jika view belum dibuat
      const { data, error } = await client
        .from('registrations')
        .select('school_name, competition_slug')
        .neq('registration_status', 'rejected')
      
      if (error || !data) {
        const local = readLocal()
        rawData = local.filter(r => r.registration_status !== 'rejected').map(r => ({
          school: r.school_name,
          lomba: r.competition_slug
        }))
      } else {
        rawData = (data as any[]).map(r => ({
          school: r.school_name,
          lomba: r.competition_slug
        }))
      }
    }
  }

  const grouped: Record<string, Set<string>> = {}
  rawData.forEach(item => {
    if (!grouped[item.school]) grouped[item.school] = new Set()
    grouped[item.school].add(item.lomba)
  })

  return Object.keys(grouped).map(school => ({
    school_name: school,
    competitions: Array.from(grouped[school])
  }))
}

/**
 * Langganan realtime sekolah terdaftar.
 *
 * Idempoten: satu langganan cukup untuk seluruh halaman. Client Supabase
 * adalah singleton, dan `client.channel(topic)` memakai ulang channel dengan
 * topik sama — memanggil `.on()` setelah channel joined melempar error
 * ("cannot add postgres_changes callbacks ... after subscribe()"). Guard
 * modul mencegah double-subscribe (StrictMode, HMR, atau remount).
 */
let activeSubscription: (() => void) | null = null

export async function subscribeToVerifiedSchools(callback: (schools: {school_name: string, competitions: string[]}[]) => void): Promise<() => void> {
  const client = await getSupabaseClient()
  if (!client) return () => {}

  if (activeSubscription) return activeSubscription

  const channel = client
    .channel('public:registrations')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, async () => {
       const schools = await getVerifiedSchools()
       callback(schools)
    })
    .subscribe()

  activeSubscription = () => {
    client.removeChannel(channel)
    activeSubscription = null
  }

  return activeSubscription
}
