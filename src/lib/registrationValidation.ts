import type { FormErrors, FormValues, Gender, RegistrationConfig } from '../types/registration.js'

/** Aturan berkas: PDF/JPG/JPEG/PNG maksimal 10 MB. */
export const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png']
export const ACCEPTED_FILE_MIME = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
export const MAX_FILE_SIZE_MB = 10
export const FILE_ACCEPT_ATTRIBUTE = '.pdf,.jpg,.jpeg,.png'

export const ERROR_MESSAGES = {
  required: 'Wajib diisi.',
  email: 'Format email tidak valid.',
  phone: 'Nomor WhatsApp tidak valid. Contoh: 081234567890.',
  fileType: 'Format berkas harus PDF, JPG, JPEG, atau PNG.',
  fileSize: 'Ukuran berkas maksimal 10 MB.',
  consent: 'Centang seluruh pernyataan sebelum mengirim.',
} as const

export function isBlank(value: FormValues[string] | undefined): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  return false
}

export function isValidNisn(value: string): boolean {
  return /^\d{10}$/.test(value.trim())
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export function normalizePhone(value: string): string {
  return value.replace(/[\s.-]/g, '')
}

/**
 * Nomor WhatsApp Indonesia. Menerima format 08xx, 62xx, +62xx, maupun angka
 * lokal 8xx karena kolom formulir sudah menampilkan awalan "+62".
 */
export function isValidPhone(value: string): boolean {
  const digits = normalizePhone(value)
  if (!/^\+?\d{9,15}$/.test(digits)) return false

  const local = digits.replace(/^\+/, '').replace(/^62/, '0')
  return /^0\d{8,13}$/.test(local) || /^8\d{8,11}$/.test(digits)
}

export function fileExtension(fileName: string): string {
  const index = fileName.lastIndexOf('.')
  return index === -1 ? '' : fileName.slice(index).toLowerCase()
}

export function validateFile(file: File): string | null {
  if (!ACCEPTED_FILE_MIME.includes(file.type) && !ACCEPTED_FILE_EXTENSIONS.includes(fileExtension(file.name))) {
    return ERROR_MESSAGES.fileType
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return ERROR_MESSAGES.fileSize
  }
  return null
}

export function formatFileSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

const COMMON_REQUIRED_FIELDS: Array<{ name: string; message?: string }> = [
  { name: 'nama_sekolah' },
  
  { name: 'alamat_sekolah' },
  { name: 'guru_pendamping' },
  { name: 'nohp_pendamping' },
  { name: 'bank_pengirim' },
  { name: 'nama_pemilik_rekening' },
]

const CONSENT_FIELDS = ['persetujuan_1', 'persetujuan_2', 'persetujuan_3'] as const

/**
 * Validasi menyeluruh. Mengembalikan peta field → pesan error.
 * Field kosong yang tidak wajib tidak menghasilkan error.
 */
export function validateRegistration(values: FormValues, config: RegistrationConfig): FormErrors {
  const errors: FormErrors = {}
  
  if (config.slug === 'tahfizh') {
      if (isBlank(values.nama_pa) && isBlank(values.nama_pi)) {
        errors.nama_pa = 'Harap isi minimal salah satu utusan (Putra/Putri).'
        errors.nama_pi = 'Harap isi minimal salah satu utusan (Putra/Putri).'
      }
    } else {
    if (isBlank(values.nama_lengkap)) errors.nama_lengkap = ERROR_MESSAGES.required
  }

  for (const field of COMMON_REQUIRED_FIELDS) {
    const value = values[field.name]
    if (isBlank(value) || typeof value !== 'string') {
      errors[field.name] = field.message ?? ERROR_MESSAGES.required
    }
  }


  if (!isBlank(values.nohp_pendamping) && typeof values.nohp_pendamping === 'string' && !isValidPhone(values.nohp_pendamping)) {
    errors.nohp_pendamping = ERROR_MESSAGES.phone
  }

  // Validasi kategori (dari config.categories) - wajib dipilih jika ada opsi
  if (config.categories.length > 0 && config.categoryFieldName) {
    if (isBlank(values[config.categoryFieldName])) {
      errors[config.categoryFieldName] = 'Pilih salah satu opsi yang tersedia.'
    }
  }

  // Validasi kelas untuk setiap peserta (jika ada gradeOptions)
  if (config.gradeOptions && config.gradeOptions.length > 0) {
    const gradesText = typeof values.kelas_peserta === 'string' ? values.kelas_peserta : ''
    const grades = gradesText.split('\n')
    let participantCount = 0

    if (config.slug === 'tahfizh') {
      const pa = typeof values.nama_pa === 'string' ? values.nama_pa.trim() : ''
      const pi = typeof values.nama_pi === 'string' ? values.nama_pi.trim() : ''
      if (pa) participantCount++
      if (pi) participantCount++
    } else {
      const namesText = typeof values.nama_lengkap === 'string' ? values.nama_lengkap : ''
      participantCount = namesText
        .split('\n')
        .map((n) => n.trim())
        .filter((n) => n.length > 0).length
    }

    for (let index = 0; index < participantCount; index++) {
      if (isBlank(grades[index])) {
        errors[`kelas_peserta_${index}`] = 'Pilih tingkat kelas untuk peserta ini.'
      }
    }
  }

  for (const specificField of config.specificFields) {
    if (isBlank(values[specificField.name])) {
      errors[specificField.name] = 'Pilih salah satu opsi yang tersedia.'
    }
  }

  if (isBlank(values.bukti_transfer)) {
    errors.bukti_transfer = ERROR_MESSAGES.required
  }

  for (const consent of CONSENT_FIELDS) {
    if (values[consent] !== true) {
      errors[consent] = ERROR_MESSAGES.consent
    }
  }

  return errors
}

/** Error validasi berkas yang dipilih pengguna, bila ada. */
export function validateFileValue(value: FormValues[string] | undefined): string | null {
  return value instanceof File ? validateFile(value) : null
}

export function getGender(value: FormValues[string] | undefined): Gender | '' {
  return value === 'Laki-laki' || value === 'Perempuan' ? value : ''
}

export function buildSpecificData(values: FormValues, config: RegistrationConfig): Record<string, string> {
  const specificData: Record<string, string> = {}

  for (const field of config.specificFields) {
    const value = values[field.name]
    if (typeof value === 'string' && value.trim() !== '') {
      specificData[field.name] = value.trim()
    }
  }

  

  if (typeof values.guru_pendamping === 'string' && values.guru_pendamping.trim() !== '') specificData.guru_pendamping = values.guru_pendamping.trim()
  if (typeof values.nohp_pendamping === 'string' && values.nohp_pendamping.trim() !== '') specificData.nohp_pendamping = values.nohp_pendamping.trim()

  return specificData
}

export function textValue(values: FormValues, name: string): string {
  const value = values[name]
  return typeof value === 'string' ? value.trim() : ''
}
