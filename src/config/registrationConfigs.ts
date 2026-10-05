import { placeholders, site } from '../data/site.js'
import type { CompetitionSlug, RegistrationConfig } from '../types/registration.js'

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
  level: 'SD / MI Sederajat',
  categoryLabel: 'Kategori Musabaqah Tahfizh',
  categoryHelper: 'Rujuk Buku Juknis Bab IV untuk rincian materi maqra’ dan kriteria penilaian per kategori.',
  categoryFieldName: 'kategori_tahfizh',
  categoryPlaceholder: '[PILIH TINGKATAN HAFALAN]',
  categories: [
    { value: 'tahfizh-1-juz-tilawah', label: 'Tahfizh 1 Juz Tilawah (Juz 30) — Kelas 1-3' },
    { value: 'tahfizh-2-juz-non-tilawah', label: 'Tahfizh 2 Juz Non-Tilawah (Juz 29 & 30) — Kelas 4-6' },
    { value: 'tahfizh-3-juz-terbuka', label: 'Tahfizh 3 Juz Terbuka (Juz 1, 2, 30)' },
  ],
  specificFields: [
    {
      name: 'kategori_tahfizh',
      label: 'Tingkatan Kategori Musabaqah Tahfizh',
      placeholder: '[PILIH TINGKATAN HAFALAN]',
      helper: 'Kategori menentukan jumlah dan jenis hafalan yang diuji dewan hakim.',
      options: [
        { value: 'tahfizh-1-juz-tilawah', label: 'Tahfizh 1 Juz Tilawah (Juz 30) — Kelas 1-3' },
        { value: 'tahfizh-2-juz-non-tilawah', label: 'Tahfizh 2 Juz Non-Tilawah (Juz 29 & 30) — Kelas 4-6' },
        { value: 'tahfizh-3-juz-terbuka', label: 'Tahfizh 3 Juz Terbuka (Juz 1, 2, 30)' },
      ],
    },
  ],
  fee: placeholders.fee,
  feeNote: 'Termasuk kit peserta, sertifikat, & konsumsi resmi',
  quota: placeholders.quota,
  documents: [
    {
      name: 'dokumen_peserta',
      label: 'Surat Rekomendasi Kepala Madrasah / Kartu Pelajar',
      hint: 'Format resmi bertanda tangan dan cap basah sekolah',
      required: true,
      variant: 'dropzone',
    },
    {
      name: 'dokumen_pendukung',
      label: 'Sertifikat Syahadah Tahfizh / Prestasi Sebelumnya',
      hint: 'Sebagai pertimbangan penempatan grup maqra’ atau riwayat kejuaraan',
      required: false,
      variant: 'compact',
    },
  ],
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
  level: 'Kelas 3 - 6 SD',
  categoryLabel: 'Format Kategori Musabaqah Pra-TKA',
  categoryHelper: 'Rujuk Buku Juknis Bab IV untuk rincian materi Penalaran & Keislaman Anak per format.',
  categoryFieldName: 'kategori_pra_tka',
  categoryPlaceholder: '[PILIH FORMAT PRA-TKA]',
  categories: [
    { value: 'pra-tka-beregu', label: 'Pra-TKA Cerdas Cermat Beregu (3 Santri / Regu)' },
    { value: 'pra-tka-perseorangan', label: 'Pra-TKA Ujian Tertulis Perseorangan' },
  ],
  specificFields: [
    {
      name: 'kategori_pra_tka',
      label: 'Format Kategori Musabaqah Pra-TKA',
      placeholder: '[PILIH FORMAT PRA-TKA]',
      helper: 'Pilih format beregu atau perseorangan sesuai kelompok delegasi sekolah.',
      options: [
        { value: 'pra-tka-beregu', label: 'Pra-TKA Cerdas Cermat Beregu (3 Santri / Regu)' },
        { value: 'pra-tka-perseorangan', label: 'Pra-TKA Ujian Tertulis Perseorangan' },
      ],
    },
    {
      name: 'jumlah_anggota_regu',
      label: 'Jumlah Anggota Regu (hanya untuk format beregu)',
      placeholder: 'Contoh: 3',
      helper: 'Kosongkan bila memilih format perseorangan.',
      options: [
        { value: '3', label: '3 Santri' },
        { value: '4', label: '4 Santri' },
        { value: '5', label: '5 Santri' },
      ],
    },
  ],
  fee: placeholders.fee,
  feeNote: 'Dihitung per peserta / per regu sesuai format pilihan',
  quota: placeholders.quota,
  documents: [
    {
      name: 'dokumen_peserta',
      label: 'Surat Rekomendasi Kepala Madrasah / Kartu Pelajar',
      hint: 'Format resmi bertanda tangan dan cap basah sekolah',
      required: true,
      variant: 'dropzone',
    },
    {
      name: 'dokumen_pendukung',
      label: 'Rapor / Sertifikat Prestasi Akademik',
      hint: 'Dapat dilampirkan sebagai pertimbangan jenjang peserta',
      required: false,
      variant: 'compact',
    },
  ],
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
  fullName: 'Lomba Panahan Tradisional',
  tagline: 'Ketangkasan memanah sunnah kategori barebow/standar jarak kompetisi pemula.',
  icon: 'sports_martial_arts',
  iconClassName: 'bg-secondary-fixed text-secondary',
  codePrefix: 'ATXII-PNH',
  level: 'Putra & Putri',
  categoryLabel: 'Kategori Usia & Jarak Panahan',
  categoryHelper: 'Rujuk Buku Juknis Bab IV untuk rincian jarak dan alat panahan.',
  categoryFieldName: 'kategori_panahan',
  categoryPlaceholder: '[PILIH KATEGORI PANAHAN]',
  categories: [
    { value: 'panahan-u-10-10m', label: 'Panahan Barebow U-10 — Jarak 10 Meter (Putra/Putri)' },
    { value: 'panahan-u-12-15m', label: 'Panahan Horsebow U-12 — Jarak 15 Meter (Putra/Putri)' },
  ],
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
    {
      name: 'jenis_busur',
      label: 'Jenis Busur yang Digunakan',
      placeholder: '[PILIH JENIS BUSUR]',
      helper: 'Pilih jenis busur yang dibawa peserta.',
      options: [
        { value: 'barebow', label: 'Barebow (Tanpa Target Permanen)' },
        { value: 'horsebow', label: 'Horsebow (Busur Kuda)' },
      ],
    },
    {
      name: 'jarak_tembak',
      label: 'Jarak Tembak (meter)',
      placeholder: 'Contoh: 10',
      helper: 'Sesuai ketentuan jarak tembak yang ditetapkan panitia.',
      options: [
        { value: '10', label: '10 Meter' },
        { value: '15', label: '15 Meter' },
        { value: '18', label: '18 Meter' },
      ],
    },
  ],
  fee: placeholders.fee,
  feeNote: 'Termasuk kit peserta, sertifikat, dan konsumsi resmi',
  quota: placeholders.quota,
  documents: [
    {
      name: 'dokumen_peserta',
      label: 'Surat Rekomendasi Kepala Madrasah / Kartu Pelajar',
      hint: 'Format resmi bertanda tangan dan cap basah sekolah',
      required: true,
      variant: 'dropzone',
    },
    {
      name: 'dokumen_pendukung',
      label: 'Sertifikat Klub Panahan / Prestasi Sebelumnya',
      hint: 'Dapat dilampirkan sebagai pertimbangan penempatan kelompok',
      required: false,
      variant: 'compact',
    },
  ],
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