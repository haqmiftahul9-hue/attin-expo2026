/**
 * Tipe bersama untuk alur pendaftaran tiga cabang lomba.
 */

export type CompetitionSlug = 'tahfizh' | 'pra-tka' | 'panahan'

export type Gender = 'Laki-laki' | 'Perempuan'

/** Nilai satu field formulir: teks, boolean (checkbox), atau berkas. */
export type FieldValue = string | boolean | File | null

export type FormValues = Record<string, FieldValue>

export type FormErrors = Record<string, string>

export interface SelectOption {
  value: string
  label: string
}

/** Field khusus cabang lomba (disimpan ke kolom `specific_data`). */
export interface SpecificField {
  name: string
  label: string
  placeholder: string
  helper?: string
  options: SelectOption[]
}

export interface RegistrationConfig {
  slug: CompetitionSlug
  competitionId: string
  name: string
  fullName: string
  tagline: string
  icon: string
  iconClassName: string
  codePrefix: string
  level: string
  categoryLabel: string
  categoryHelper: string
  categoryFieldName: string
  categoryPlaceholder: string
  categories: SelectOption[]
  specificFields: SpecificField[]
  fee: string
  feeNote: string
  quota: string
  bank: {
    name: string
    accountNumber: string
    accountHolder: string
  }
  contact: {
    person: string
    whatsapp: string
    whatsappHref: string
    email: string
  }
}

/** Payload baris tabel `registrations` di Supabase. */
export interface RegistrationRow {
  id?: string
  registration_code: string
  competition_id: string
  competition_slug: CompetitionSlug
  participant_name: string
  nickname: string
  gender: Gender | ''
  birth_date: string | null
  birth_place: string
  grade: string
  school_name: string
  school_address: string
  city: string
  payment_sender_bank: string
  payment_sender_name: string
  payment_proof_url: string | null
  specific_data: Record<string, string>
  registration_status: 'pending' | 'verified' | 'rejected'
  payment_status: 'pending' | 'verified' | 'rejected'
  created_at?: string
  updated_at?: string
}

export interface SaveRegistrationResult {
  ok: boolean
  registrationCode: string
  mode: 'supabase' | 'local'
  message?: string
}
