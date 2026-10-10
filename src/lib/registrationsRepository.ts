import { env, isSupabaseConfigured } from './env.js'
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

function safeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

async function getSupabaseClient() {
  if (!isSupabaseConfigured) return null
  const { createClient } = await import('@supabase/supabase-js')
  return createClient(env.supabaseUrl, env.supabaseAnonKey)
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

  if (error) {
    console.warn('[registrations] gagal mengunggah berkas:', error.message)
    return null
  }

  return path
}

export async function getPaymentProofSignedUrl(path: string | null): Promise<string | null> {
  if (!path) return null
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
  const { row, files } = input
  const client = await getSupabaseClient()

  if (!client) {
    saveRegistrationLocally({ ...row, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    return { ok: true, registrationCode: row.registration_code, mode: 'local' }
  }

  const paymentProofUrl = await uploadFile(client, row.competition_slug, row.registration_code, 'bukti-transfer', files.bukti_transfer)

  const { data, error } = await client
    .from('registrations')
    .insert({
      ...row,
      payment_proof_url: paymentProofUrl,
    })
    .select()
    .single()

  if (error) {
    console.warn('[registrations] insert gagal:', error.message)
    saveRegistrationLocally({ ...row, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    return {
      ok: true,
      registrationCode: row.registration_code,
      mode: 'local',
      message: 'Data disimpan di perangkat karena penyimpanan online belum berhasil.',
    }
  }

  const saved = data as RegistrationRow
  localStorage.setItem(LAST_KEY, JSON.stringify(saved))

  return { ok: true, registrationCode: saved.registration_code, mode: 'supabase' }
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
  const client = await getSupabaseClient()
  let rawData = []

  if (!client) {
    const local = readLocal()
    rawData = local.filter(r => r.registration_status === 'verified').map(r => ({
      school: r.school_name,
      lomba: r.competition_slug
    }))
  } else {
    const { data, error } = await client
      .from('registrations')
      .select('school_name, competition_slug')
      .eq('registration_status', 'verified')
    
    if (error || !data) {
      const local = readLocal()
      rawData = local.filter(r => r.registration_status === 'verified').map(r => ({
        school: r.school_name,
        lomba: r.competition_slug
      }))
    } else {
      rawData = data.map(r => ({
        school: r.school_name,
        lomba: r.competition_slug
      }))
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

export async function subscribeToVerifiedSchools(callback: (schools: {school_name: string, competitions: string[]}[]) => void): Promise<() => void> {
  const client = await getSupabaseClient()
  if (!client) return () => {}

  const channel = client
    .channel('public:registrations')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, async () => {
       const schools = await getVerifiedSchools()
       callback(schools)
    })
    .subscribe()
    
  return () => {
    client.removeChannel(channel)
  }
}
