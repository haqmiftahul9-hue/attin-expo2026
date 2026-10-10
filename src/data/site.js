/**
 * Sumber data tunggal untuk identitas acara, navigasi, serta informasi
 * registrasi (kontak, rekening, jadwal) situs ATTIN EXPO XII 2026.
 *
 * Semua nilai bertanda [ISI ...] masih berupa placeholder dari desain awal
 * dan harus diganti dengan data resmi panitia sebelum luncur.
 */

const PLACEHOLDER = {
  quota: '[ISI KUOTA]',
  date: '[ISI TANGGAL]',
  closingDate: '[ISI TANGGAL PENUTUPAN 2026]',
  fee: '[ISI BIAYA]',
  venue: '[ISI LOKASI]',
  category: '[ISI KATEGORI]',
  juknis: '[ISI JUKNIS]',
  bankAccount: 'Bank Nagari 71040220068602',
  whatsapp: '[ISI NOMOR WHATSAPP]',
  email: '[ISI EMAIL]',
  instagram: '[ISI INSTAGRAM]',
  categoryName: '[ISI NAMA KATEGORI]',
  memorizationScope: '[ISI CAKUPAN HAFALAN]',
  categoryRequirement: '[ISI SYARAT KATEGORI]',
  classRule: '[ISI KETENTUAN KELAS/USIA]',
  adminRequirement: '[ISI PERSYARATAN ADMINISTRASI]',
  extraRule: '[ISI KETENTUAN TAMBAHAN]',
  memorizationRule: '[ISI KETENTUAN MATERI HAFALAN]',
  mechanicsRule: '[ISI TEKNIS PELAKSANAAN]',
  scoringRule: '[ISI KRITERIA PENILAIAN]',
  extraDocument: '[ISI DOKUMEN TAMBAHAN]',
  bank: 'Bank Nagari',
  bankAccountNumber: '71040220068602',
  bankAccountName: 'Panitia ATTIN EXPO XII',
  juknishLink: '[ISI LINK JUKNIS TAHFIZH]',
}

export const placeholders = PLACEHOLDER

export const site = {
  lang: 'id',
  title: 'ATTIN EXPO XII 2026',
  name: 'ATTIN EXPO XII',
  edition: 'Sumatera Barat 2026',
  editionBadge: 'EDISI KE-12 • TAHUN 2026',
  tagline: 'Ajang Prestasi, Dakwah, dan Sportivitas Islami Jenjang SD/MI Se-Sumatera Barat',
  description:
    'Wadah kompetisi bergengsi tingkat provinsi Sumatera Barat yang melahirkan generasi Qur’ani yang berkarakter, tangguh, dan unggul dalam bidang Lomba Tahfizh, Pra-TKA, serta Lomba Panahan.',
  announcement:
    'Pendaftaran ATTIN EXPO XII 2026 Segera Dibuka untuk Jenjang SD/MI Se-Sumatera Barat! Unduh Panduan Teknis & Juknis Lomba Sekarang.',
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1WX7YTrO8CV1UppMiNE1FdhYJW24RvGFXf8GjjYm8SHSmFeY5DfmwQmkKWMfqrs9Fb3i5GuW7pamTFzCO0XxP3N-Tv51z9FhagIHuj8aaQVkwzKV4qTgKxaCsBd2Isy2y6n_b_CkNqa7Lc9sezBW208KSBbt1lOcMNJsiXAwdeOsJlRub7p-BI5rVZttRf6LKcc9juU9sGHrZ9fobAphXdvp0ZcMBhoGZTIbgb-sKPW5mWoDvunvXmuOzE/',
  heroImages: [
    '/assets/gallery/gallery-1.jpg',
    '/assets/gallery/gallery-2.jpg',
    '/assets/gallery/gallery-3.jpg',
    '/assets/gallery/gallery-4.jpg',
    '/assets/gallery/gallery-5.jpg',
  ],
  heroImageAlt:
    'Siswa sekolah dasar mengenakan seragam Islam yang rapi, tersenyum bangga sambil memegang sertifikat dan piala Al-Qur’an dalam kompetisi akademik di Sumatera Barat, pencahayaan alami lembut, foto profesional',
  registration: {
    /**
     * Tanggal resmi penutupan pendaftaran (ISO 8601 dengan zona waktu).
     * Countdown pada kartu "Pusat Registrasi" menghitung mundur dari nilai ini.
     */
    deadline: '2026-11-18T23:59:59+07:00',
    deadlineLabel: '18 November 2026',
    executionDate: 'Jumat-Sabtu, 20-21 November 2026',
    venue: PLACEHOLDER.venue,
    city: 'Padang',
    fee: PLACEHOLDER.fee,
    quota: PLACEHOLDER.quota,
  },
  juknis: {
    fileName: 'Juknis-ATTIN-XII-2026.pdf',
    version: 'Final 2026',
    href: '/assets/Juknis-ATTIN-XII-2026.pdf',
    linkLabel: 'Unduh Juknis Lengkap',
    highlights: [
      'Mekanisme Kriteria Penilaian',
      'Tata Tertib Sesi Lomba',
    ],
  },
  contact: {
    whatsapp: '08995892898',
    whatsappHref: 'https://wa.me/628995892898',
    email: 'attinislamicschool@gmail.com',
    emailHref: 'mailto:attinislamicschool@gmail.com',
    instagram: PLACEHOLDER.instagram,
    location: PLACEHOLDER.venue,
    address: `${PLACEHOLDER.venue}, Padang, Sumatera Barat`,
  },
  bank: {
    bank: PLACEHOLDER.bank,
    accountNumber: PLACEHOLDER.bankAccountNumber,
    accountName: PLACEHOLDER.bankAccountName,
    account: PLACEHOLDER.bankAccount,
  },
  footerDescription:
    'Ajang Prestasi, Dakwah, dan Kreativitas Islami Jenjang SD/MI Tingkat Provinsi Sumatera Barat. Mengukir Generasi Beradab, Cerdas, dan Berjiwa Qur’ani.',
  copyright:
    '© 2026 ATTIN EXPO XII. Hak Cipta Dilindungi.',
}

export const navigation = [
  { label: 'Beranda', path: 'beranda', href: '#beranda', section: 'beranda' },
  { label: 'Kompetisi', path: 'kompetisi', href: '#kompetisi-resmi', section: 'kompetisi-resmi' },
  { label: 'Jadwal', path: 'jadwal', href: '#jadwal', section: 'jadwal' },
  { label: 'Panduan', path: 'panduan', href: '#panduan-juknis', section: 'panduan-juknis' },
  { label: 'Tentang', path: 'tentang', href: '#tentang', section: 'tentang' },
  { label: 'FAQ', path: 'faq', href: '#faq', section: 'faq' },
  { label: 'Kontak', path: 'kontak', href: '#kontak', section: 'kontak' },
]

/** Urutan id seksi sesuai urutan DOM untuk logika scroll-spy. */
export const sectionOrder = [
  'beranda',
  'tentang',
  'kompetisi-resmi',
  'jadwal',
  'panduan-juknis',
  'faq',
  'kontak',
]

export const footerQuickLinks = [
  { label: 'Buku Panduan (Juknis)', path: 'panduan', href: '#panduan-juknis' },
  { label: 'Syarat & Ketentuan', path: 'tentang', href: '#tentang' },
  { label: 'Alur Pendaftaran', path: 'kompetisi', href: '#kompetisi-resmi' },
  { label: 'FAQ', path: 'faq', href: '#faq' },
]
