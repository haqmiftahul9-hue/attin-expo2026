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
 * objek konfigurasi ini. Cabang lomba sendiri TIDAK dapat dipilih pengguna —
 * nilainya dikunci dari route halaman (`competition_id` + `competition_slug`).
 */

export const tahfizh: RegistrationConfig = {
  slug: 'tahfizh',
  competitionId: 'comp-tahfizh',
  name: 'Lomba Tahfizh',
  fullName: 'Lomba Tahfizh Al-Qur’an',
  tagline: 'Hifzhil Qur’an tartil, tajwid murni, serta hafalan juz sesuai tingkatan.',
  icon: 'menu_book',
  iconClassName: 'bg-primary-fixed text-primary',
  codePrefix: 'ATXII-THF',
  level: 'Kelas 1-5 SD/MI Sederajat',
  categoryLabel: 'Kategori Musabaqah Tahfizh',
  categoryHelper: 'Utusan boleh 1 Putra saja, 1 Putri saja, atau kedua-duanya (1 Putra dan 1 Putri).',
  categoryFieldName: 'kategori_tahfizh',
  categoryPlaceholder: '[KATEGORI TERKUNCI]',
  categories: [],
  specificFields: [],
  fee: 'Rp 35.000',
  feeNote: 'Biaya pendaftaran per orang',
  quota: placeholders.quota,
  bank: {
    name: placeholders.bank,
    accountNumber: placeholders.bankAccountNumber,
    accountHolder: placeholders.bankAccountName,
  },
  contact: {
    person: 'Panitia Bidang Musabaqah Tahfizh',
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
  tagline: 'Uji wawasan keislaman komprehensif, penalaran Al-Qur’an, dan sirah nabawiyah.',
  icon: 'psychology',
  iconClassName: 'bg-tertiary-fixed text-tertiary',
  codePrefix: 'ATXII-PTK',
  level: 'Kelas 1-6 SD/MI Sederajat',
  categoryLabel: 'Lomba Pra-TKA',
  categoryHelper: ' Rujuk Buku Juknis Bab IV untuk rincian materi.',
  categoryFieldName: 'kategori_pra_tka',
  categoryPlaceholder: '[PILIH FORMAT PRA-TKA]',
  categories: [],
  specificFields: [
    {
      name: 'kategori_pra_tka',
      label: 'Lomba Pra-TKA',
      placeholder: '[PILIH FORMAT PRA-TKA]',
      helper: 'Pilih format beregu atau perseorangan. ',
      options: [
        { value: 'pra-tka-beregu', label: 'Pra-TKA Cerdas Cermat Beregu (3 Santri / Regu)' },
        { value: 'pra-tka-perseorangan', label: 'Pra-TKA Ujian Tertulis Perseorangan' },
      ],
    },
  ],
  fee: 'Rp 25.000',
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
  tagline: 'Ketangkasan memanah sunnah kategori barebow/standar jarak kompetisi pemula.',
  icon: 'sports_martial_arts',
  iconClassName: 'bg-secondary-fixed text-secondary',
  codePrefix: 'ATXII-PNH',
  level: 'Siswa Kelas 1-6 SD/MI Sederajat se-SUMBAR',
  categoryLabel: 'Kategori Usia & Jarak Panahan',
  categoryHelper: 'Peserta merupakan siswa kelas 1-6 SD/MI sederajat negeri atau swasta se-SUMBAR.',
  categoryFieldName: 'kategori_panahan',
  categoryPlaceholder: '[PILIH KATEGORI PANAHAN]',
  categories: [],
  specificFields: [
    {
      name: 'kategori_panahan',
      label: 'Kategori Usia & Jarak Panahan',
      placeholder: '[PILIH KATEGORI PANAHAN]',
      helper: 'Kategori usia menentukan alat dan jarak tembak.',
      options: [
        { value: 'panahan-u-10-10m', label: 'Panahan Barebow U-10 — Jarak 10 Meter (Putra/Putri)' },
        { value: 'panahan-u-12-15m', label: 'Panahan Horsebow U-12 — Jarak 15 Meter (Putra/Putri)' },
      ],
    },
  ],
  fee: 'Rp 65.000',
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