import { placeholders } from '../data/site.js'
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
  olimpiade: 35000,
  panahan: 65000,
  kolase: 20000,
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
    person: 'Ustadzah Bella',
    whatsapp: '0852-7419-7702',
    whatsappHref: 'https://wa.me/6285274197702',
    email: placeholders.email,
  },
}

export const olimpiade: RegistrationConfig = {
  slug: 'olimpiade',
  competitionId: 'comp-olimpiade',
  name: 'Olimpiade SD/MI',
  fullName: 'Olimpiade Matematika, IPA, dan IPS',
  tagline: 'Olimpiade Matematika, IPA, dan IPS untuk siswa kelas 3, 4, dan 5 SD/MI sederajat mengasah penalaran logika, pemahaman konsep, dan ketrampilan proses sains.',
  icon: 'school',
  iconClassName: 'bg-tertiary-fixed text-tertiary',
  codePrefix: 'ATXII-OLP',
  level: 'Kelas 3, 4, dan 5 SD/MI Sederajat',
  categoryLabel: 'Mata Pelajaran Olimpiade',
  categoryHelper: 'Peserta memilih satu mata pelajaran: Matematika, IPA, atau IPS.',
  categoryFieldName: 'kategori_olimpiade',
  categoryPlaceholder: '[PILIH MATA PELAJARAN OLIMPIADE]',
  categories: [
    { value: 'matematika', label: 'Matematika' },
    { value: 'ipa', label: 'IPA' },
    { value: 'ips', label: 'IPS' },
  ],
  specificFields: [],
  fee: COMPETITION_FEES.olimpiade,
  feeNote: 'Biaya pendaftaran per orang',
  quota: placeholders.quota,
  bank: {
    name: placeholders.bank,
    accountNumber: placeholders.bankAccountNumber,
    accountHolder: placeholders.bankAccountName,
  },
  contact: {
    person: 'Ustadzah Tazkia',
    whatsapp: '0821-7079-0896',
    whatsappHref: 'https://wa.me/6282170790896',
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
  iconClassName: 'bg-secondary-fixed text-on-secondary',
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
    person: 'Ustadzah Nova',
    whatsapp: '0812-7574-1134',
    whatsappHref: 'https://wa.me/6281275741134',
    email: placeholders.email,
  },
}

export const kolase: RegistrationConfig = {
  slug: 'kolase',
  competitionId: 'comp-kolase',
  name: 'Lomba Kolase Anak dan Orang Tua',
  fullName: 'Lomba Kolase Anak dan Orang Tua',
  tagline:
    'Lomba Kolase Anak dan Orang Tua mengajak anak TK/PAUD bekerja sama dengan orang tuanya menciptakan karya kolase yang menggambarkan nilai-nilai Islam dan estetika seni kreatif secara sportif.',
  icon: 'diversity_3',
  iconClassName: 'bg-amber-50 text-amber-900',
  codePrefix: 'ATXII-KLS',
  level: 'TK/PAUD — Kota Pariaman & Kabupaten Padang Pariaman',
  categoryLabel: 'Partisipasi Kolase',
  categoryHelper: 'Satu kolase dilakukan oleh satu anak didampingi orang tuanya secara bersama.',
  categoryFieldName: 'kategori_kolase',
  categoryPlaceholder: '[KATEGORI KOLASE]',
  categories: [],
  specificFields: [],
  fee: COMPETITION_FEES.kolase,
  feeNote: 'Biaya pendaftaran per kolase (1 anak + 1 orang tua)',
  quota: placeholders.quota,
  bank: {
    name: placeholders.bank,
    accountNumber: placeholders.bankAccountNumber,
    accountHolder: placeholders.bankAccountName,
  },
  contact: {
    person: 'Panitia ATTIN EXPO',
    whatsapp: '08995892898',
    whatsappHref: 'https://wa.me/628995892898',
    email: placeholders.email,
  },
}

export const registrationConfigs: Record<CompetitionSlug, RegistrationConfig> = {
  tahfizh,
  olimpiade,
  panahan,
  kolase,
}

export const defaultConfig = tahfizh

export function getRegistrationConfig(slug: string | undefined): RegistrationConfig {
  if (slug && slug in registrationConfigs) {
    return registrationConfigs[slug as CompetitionSlug]
  }
  return defaultConfig
}