import { placeholders, site } from '../data/site.js'
import type { CompetitionSlug, RegistrationConfig } from '../types/registration.js'

export const eventConfig = {
  registrationDeadline: "18 November 2026"
}


/**
 * Konfigurasi pendaftaran per cabang lomba.
 *
 * Satu komponen `RegistrationForm` dipakai untuk tiga cabang; seluruh
 * perbedaan (kategori, field khusus, dokumen, rekening, kontak) berasal dari
 * nilainya dikunci dari route halaman (`competition_id` + `competition_slug`).
 */

export const COMPETITION_FEES = {
  tahfizh: 35000,
  'pra-tka': 25000,
  panahan: 65000,
}


export const tahfizh: RegistrationConfig = {
  slug: 'tahfizh',
  competitionId: 'comp-tahfizh',
  name: 'Lomba Tahfizh',
  fullName: 'Lomba Tahfizh',
  tagline: 'Lomba hafalan Al-Qur’an menguji kefasihan makhraj, ketepatan hukum tajwid, kelancaran adab tilawah, dan irama tartil.',
  icon: 'menu_book',
  iconClassName: 'bg-primary-fixed text-primary',
  codePrefix: 'ATXII-THF',
  level: 'Kelas 1-5 SD/MI Sederajat',
  categoryLabel: 'Kategori Lomba Tahfizh',
  categoryHelper: 'Utusan boleh 1 Putra saja, 1 Putri saja, atau kedua-duanya (1 Putra dan 1 Putri).',
  categoryFieldName: 'kategori_tahfizh',
  categoryPlaceholder: '[KATEGORI TERKUNCI]',
  categories: [],
  specificFields: [],
  fee: COMPETITION_FEES.tahfizh,
  feeNote: 'Biaya pendaftaran per orang',
  quota: placeholders.quota,
  bank: {
    name: placeholders.bank,
    accountNumber: placeholders.bankAccountNumber,
    accountHolder: placeholders.bankAccountName,
  },
  contact: {
    person: 'Panitia Bidang Lomba Tahfizh',
    whatsapp: placeholders.whatsapp,
    whatsappHref: site.contact.whatsappHref,
    email: placeholders.email,
  },
}

export const praTka: RegistrationConfig = {
  slug: 'pra-tka',
  competitionId: 'comp-pra-tka',
  name: 'Lomba Pra-TKA',
  fullName: 'Lomba Pra-TKA',
  tagline: 'Ujian kemampuan TKA tingkat SD dengan soal-soal Pra-TKA dengan materi Matematika (Numerasi dan Logika) dan Bahasa Indonesia (Literasi Membaca dan Pemahaman).',
  icon: 'psychology',
  iconClassName: 'bg-tertiary-fixed text-tertiary',
  codePrefix: 'ATXII-PTK',
  level: 'Kelas 1-6 SD/MI Sederajat',
  categoryLabel: 'Lomba Pra-TKA',
  categoryHelper: ' Rujuk Buku Juknis Bab IV untuk rincian materi.',
  categoryFieldName: 'kategori_pra_tka',
  categoryPlaceholder: '[PILIH FORMAT PRA-TKA]',
  categories: [],
  specificFields: [],
  fee: COMPETITION_FEES['pra-tka'],
  feeNote: 'Biaya pendaftaran per orang (Rp 75.000 untuk format beregu/3 orang)',
  quota: placeholders.quota,
  bank: {
    name: placeholders.bank,
    accountNumber: placeholders.bankAccountNumber,
    accountHolder: placeholders.bankAccountName,
  },
  contact: {
    person: 'Panitia Bidang Akademik Pra-TKA',
    whatsapp: placeholders.whatsapp,
    whatsappHref: site.contact.whatsappHref,
    email: placeholders.email,
  },
}

export const panahan: RegistrationConfig = {
  slug: 'panahan',
  competitionId: 'comp-panahan',
  name: 'Lomba Panahan',
  fullName: 'Lomba Panahan',
  tagline: 'Lomba Panahan melatih ketenangan batin, ketepatan bidikan, fokus mental, dan adab sportivitas sunnah nabi.',
  icon: 'track_changes',
  iconClassName: 'bg-secondary-fixed text-secondary',
  codePrefix: 'ATXII-PNH',
  level: 'Siswa Kelas 1-6 SD/MI Sederajat se-SUMBAR',
  categoryLabel: 'Kategori Usia & Jarak Panahan',
  categoryHelper: 'Peserta merupakan siswa kelas 1-6 SD/MI sederajat negeri atau swasta se-SUMBAR.',
  categoryFieldName: 'kategori_panahan',
  categoryPlaceholder: '[PILIH KATEGORI PANAHAN]',
  categories: [],
  specificFields: [],
  fee: COMPETITION_FEES.panahan,
  feeNote: 'Infak pendaftaran per orang',
  quota: placeholders.quota,
  bank: {
    name: placeholders.bank,
    accountNumber: placeholders.bankAccountNumber,
    accountHolder: placeholders.bankAccountName,
  },
  contact: {
    person: 'Panitia Bidang Panahan Sunnah',
    whatsapp: placeholders.whatsapp,
    whatsappHref: site.contact.whatsappHref,
    email: placeholders.email,
  },
}

export const registrationConfigs: Record<CompetitionSlug, RegistrationConfig> = {
  tahfizh,
  'pra-tka': praTka,
  panahan,
}

export const defaultConfig = tahfizh

export function getRegistrationConfig(slug: string | undefined): RegistrationConfig {
  if (slug && slug in registrationConfigs) {
    return registrationConfigs[slug as CompetitionSlug]
  }
  return defaultConfig
}