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

export interface DocumentField {
  name: 'dokumen_peserta' | 'dokumen_pendukung' | 'bukti_transfer'
  label: string
  hint: string
  required: boolean
  variant: 'dropzone' | 'compact' | 'receipt'
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
  documents: DocumentField[]
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
  gender: Gender | ''
  birth_date: string | null
  nisn: string
  grade: string
  school_name: string
  city: string
  companion_name: string
  companion_phone: string
  parent_name: string
  parent_phone: string
  specific_data: Record<string, string>
  identity_document_url: string | null
  supporting_document_url: string | null
  payment_proof_url: string | null
  payment_status: 'pending' | 'verified' | 'rejected'
  registration_status: 'pending' | 'verified' | 'rejected'
  created_at?: string
}

export interface SaveRegistrationResult {
  ok: boolean
  registrationCode: string
  mode: 'supabase' | 'local'
  message?: string
}