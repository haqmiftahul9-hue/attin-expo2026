import { placeholders, site } from './site.js'

/**
 * Data lengkap halaman detail cabang (musabaqah + formulir pendaftaran).
 * Saat ini baru Lomba Tahfizh yang memiliki rincian; cabang lain memakai
 * kerangka halaman yang sama tanpa konten turunan.
 */
export const sumbarRegions = [
  'Kota Padang',
  'Kota Bukittinggi',
  'Kota Payakumbuh',
  'Kota Solok',
  'Kota Sawahlunto',
  'Kota Padang Panjang',
  'Kota Pariaman',
  'Kabupaten Agam',
  'Kabupaten Tanah Datar',
  'Kabupaten Padang Pariaman',
  'Kabupaten Solok',
  'Kabupaten Solok Selatan',
  'Kabupaten Pesisir Selatan',
  'Kabupaten Lima Puluh Kota',
  'Kabupaten Pasaman',
  'Kabupaten Pasaman Barat',
  'Kabupaten Sijunjung',
  'Kabupaten Dharmasraya',
  'Kabupaten Kepulauan Mentawai',
]

export const classOptions = [
  'Kelas 1 SD/MI',
  'Kelas 2 SD/MI',
  'Kelas 3 SD/MI',
  'Kelas 4 SD/MI',
  'Kelas 5 SD/MI',
  'Kelas 6 SD/MI',
]

export const formSteps = [
  { number: '1', label: 'Lomba' },
  { number: '2', label: 'Peserta' },
  { number: '3', label: 'Sekolah' },
  { number: '4', label: 'Wali' },
  { number: '5', label: 'Dokumen' },
  { number: '6', label: 'Bayar' },
  { number: '7', label: 'Setuju' },
]

export const branchDetails = {
  tahfizh: {
    slug: 'tahfizh',
    breadcrumb: 'Tahfizh Al-Qur’an',
    metaTitle: `${site.title} - Temukan Potensi. Ukir Prestasi.`,
    tagline: 'Lomba Tahfizh',
    accentTitle: 'Al-Qur’an',
    level: 'Tingkat SD/MI se-Sumatera Barat',
    intro:
      'Ajang bagi siswa SD/MI tingkat Sumatera Barat untuk menunjukkan kemampuan hafalan Al-Qur’an dengan penuh kesiapan, ketenangan, adab, dan rasa percaya diri.',
    badges: [
      { icon: 'menu_book', label: 'Al-Qur’an • SD/MI', tone: 'primary' },
      { icon: null, label: 'ATTIN EXPO XII 2026', tone: 'secondary' },
    ],
    metadata: [
      { icon: 'school', label: 'Jenjang SD/MI' },
      { icon: 'person', label: 'Format Perorangan' },
      { icon: 'map', label: 'Tingkat Sumatera Barat' },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8pb3xF77bJe8aif3Q73xPKXG81iDKkdgHQRQ5qt7hkaf7iCWmAz4CV-3mKYw80MlIGQXQ9qMjrCPmY9QVeRFs1CwTwX7wGc3xge-WLy1B3ajHz-sAJYLxrJCvl24iYWuoeyJM1eSniRM2hITlOplRD8Bnz8wR2ECC1jCA7njf1KtBimzTtbLxzXYprGeEfa5n2qNg6RBiCVDvZn4DrHDsuqV78pBCs7faYSZcWCXuGU-73W26dFB8Qw',
    imageAlt:
      'An Indonesian elementary school student boy dressed in clean white Islamic school uniform with a black peci cap reciting the Holy Quran placed on an intricately carved wooden rehal stand, warm natural side lighting, peaceful focused expression, high resolution academic Islamic school atmosphere, navy blue and soft tones',
    quoteLabel: 'Musabaqah Tahfizh Qur’an',
    quote: '“Sebaik-baik kalian adalah yang mempelajari Al-Qur\'an dan mengajarkannya.”',
    quoteSource: 'HR. Bukhari',
    facts: [
      { icon: 'school', label: 'Jenjang', value: 'SD / MI', valueTone: 'on-surface' },
      { icon: 'public', label: 'Cakupan', value: 'Sumatera Barat', valueTone: 'on-surface' },
      { icon: 'groups_2', label: 'Format', value: 'Perorangan', valueTone: 'on-surface' },
      { icon: 'category', label: 'Kategori', value: placeholders.category, valueTone: 'on-surface' },
      {
        icon: 'payments',
        label: 'Biaya',
        value: placeholders.fee,
        valueTone: 'secondary',
        iconTone: 'secondary',
      },
      { icon: 'people', label: 'Kuota', value: placeholders.quota, valueTone: 'on-surface' },
      { icon: 'calendar_month', label: 'Tanggal', value: placeholders.date, valueTone: 'on-surface' },
      { icon: 'pin_drop', label: 'Lokasi', value: placeholders.venue, valueTone: 'on-surface' },
    ],
    about: {
      badge: 'TENTANG LOMBA',
      title: 'Tunjukkan Hafalan Terbaikmu',
      body: 'Lomba Tahfizh ATTIN EXPO XII 2026 menjadi ruang bagi siswa SD/MI untuk menunjukkan kemampuan hafalan Al-Qur’an dalam suasana kompetisi yang edukatif, tertib, dan sportif.',
      values: [
        {
          icon: 'verified',
          iconClassName: 'bg-primary-container text-on-primary',
          title: 'Ketepatan Hafalan',
          body: 'Mendorong keakuratan makharijul huruf, ketertiban tajwid, dan kelancaran sambung ayat yang kokoh dan mutqin.',
        },
        {
          icon: 'psychology',
          iconClassName: 'bg-secondary text-on-secondary',
          title: 'Kepercayaan Diri',
          body: 'Melatih mental panggung santri cilik untuk tampil tenang, berwibawa, dan siap menghadapi dewan juri serta hadirin.',
        },
        {
          icon: 'favorite',
          iconClassName: 'bg-tertiary text-on-tertiary',
          title: 'Semangat Qurani',
          body: 'Menumbuhkan rasa cinta yang mendalam terhadap kalam ilahi sejak usia dasar sebagai bekal akhlak mulia.',
        },
      ],
    },
    categories: {
      badge: 'KATEGORI',
      title: 'Kategori Lomba Tahfizh',
      body: 'Struktur kategori modular yang disesuaikan dengan jenjang kelas dan tingkat hafalan peserta.',
      items: [
        {
          label: 'Kategori 01',
          format: 'Perorangan',
          tone: 'primary',
          name: placeholders.categoryName,
          scope: placeholders.memorizationScope,
          requirement: placeholders.categoryRequirement,
          quotaLabel: 'Status Kuota',
          quotaValue: 'Tersedia',
        },
        {
          label: 'Kategori 02',
          format: 'Perorangan',
          tone: 'secondary',
          name: placeholders.categoryName,
          scope: placeholders.memorizationScope,
          requirement: placeholders.categoryRequirement,
          quotaLabel: 'Status Kuota',
          quotaValue: 'Tersedia',
        },
      ],
      note: 'Catatan: Kategori resmi mengikuti ketentuan pedoman teknis ATTIN EXPO XII 2026.',
    },
    requirements: {
      badge: 'PERSYARATAN',
      title: 'Syarat Peserta Lomba',
      body: 'Kriteria kepesertaan yang wajib dipenuhi oleh seluruh calon pendaftar musabaqah tahfizh.',
      items: [
        {
          title: 'Peserta merupakan siswa SD/MI aktif.',
          caption: 'Terdaftar secara resmi pada instansi sekolah/madrasah yang bersangkutan.',
        },
        {
          title: 'Peserta berasal dari sekolah/madrasah di Sumatera Barat.',
          caption: 'Mencakup seluruh 19 Kabupaten/Kota di wilayah provinsi Sumatera Barat.',
        },
        {
          title: placeholders.classRule,
          caption: 'Sesuai klasifikasi tingkatan lomba yang ditetapkan oleh panitia juknis.',
        },
        {
          title: placeholders.adminRequirement,
          caption: 'Melengkapi berkas pendaftaran identitas peserta dan formulir daring resmi.',
        },
        {
          title: placeholders.extraRule,
          caption: 'Kepatuhan pada etika perlombaan dan regulasi ATTIN EXPO XII 2026.',
        },
      ],
    },
    rules: {
      badge: 'KETENTUAN LOMBA',
      title: 'Ketentuan Pelaksanaan',
      body: 'Pedoman teknis penampilan, busana, materi musabaqah, dan tata tertib panggung.',
      items: [
        {
          icon: 'apparel',
          tone: 'primary',
          title: 'Busana & Penampilan',
          body: 'Peserta wajib mengenakan busana muslim/muslimah syar’i, rapi, sopan, dan menutup aurat selama acara berlangsung serta menyematkan nomor peserta resmi di dada kiri.',
        },
        {
          icon: 'menu_book',
          tone: 'primary',
          title: 'Materi Hafalan',
          body: `${placeholders.memorizationRule}. Peserta mengambil maqra/soal hafalan melalui sistem undian sesaat sebelum tampil di hadapan dewan juri.`,
        },
        {
          icon: 'podium',
          tone: 'primary',
          title: 'Mekanisme Musabaqah',
          body: `${placeholders.mechanicsRule}. Peserta yang dipanggil 3 kali berturut-turut tanpa konfirmasi akan ditempatkan pada urutan tampil terakhir sesi bersangkutan.`,
        },
        {
          icon: 'grading',
          tone: 'secondary',
          title: 'Kriteria Penilaian',
          body: `${placeholders.scoringRule}. Penilaian meliputi tahfizh (kelancaran hafalan), tajwid (makhraj dan hukum bacaan), serta fashahah & adab kesantunan musabaqah.`,
        },
        {
          icon: 'emoji_events',
          tone: 'primary',
          title: 'Penentuan Juara',
          body: 'Pemenang ditentukan berdasarkan akumulasi nilai murni dewan juri. Keputusan dewan hakim/juri bersifat mutlak, mengikat, dan tidak dapat diganggu gugat.',
        },
        {
          icon: 'gavel',
          tone: 'secondary',
          title: 'Diskualifikasi',
          body: 'Peserta dapat didiskualifikasi jika memalsukan identitas jenjang sekolah atau melanggar kode etik kesopanan selama gelaran ATTIN EXPO XII 2026 berlangsung.',
        },
      ],
    },
    schedule: {
      badge: 'JADWAL',
      title: 'Jadwal Lomba Tahfizh',
      body: 'Linimasa tahapan pendaftaran hingga penetapan pemenang perlombaan.',
      steps: [
        {
          label: 'Tahap 01',
          badgeTone: 'primary',
          title: 'Pendaftaran',
          caption: 'Registrasi online dibuka',
          dateTone: 'primary',
        },
        {
          label: 'Tahap 02',
          badgeTone: 'secondary',
          title: 'Batas Pendaftaran',
          caption: 'Penutupan berkas & kuota',
          dateTone: 'secondary',
        },
        {
          label: 'Tahap 03',
          badgeTone: 'primary',
          title: 'Technical Meeting',
          caption: 'Pengundian nomor & juknis',
          dateTone: 'primary',
        },
        {
          label: 'Tahap 04',
          badgeTone: 'primary',
          title: 'Pelaksanaan',
          caption: 'Hari-H Musabaqah Tahfizh',
          dateTone: 'primary',
        },
        {
          label: 'Tahap 05',
          badgeTone: 'primary',
          title: 'Pengumuman',
          caption: 'Penyerahan piala & sertifikat',
          dateTone: 'primary',
        },
      ].map((step) => ({ ...step, date: placeholders.date })),
      calloutTitle: 'Informasi Penting Terkait Jadwal',
      calloutBody:
        'Jadwal musabaqah dapat disesuaikan dengan kuota pendaftar resmi. Selalu konfirmasi kehadiran melalui narahubung resmi panitia.',
    },
    guide: {
      badge: 'DOKUMEN RESMI JUKNIS',
      title: 'Panduan Lomba Tahfizh ATTIN EXPO XII 2026',
      body: 'Memuat tata tertib lengkap panggung, ketentuan materi surat/maqra, kriteria penilaian dewan hakim, format sertifikat, dan pedoman seragam resmi musabaqah.',
      sourceLabel: 'File sumber:',
      sourceValue: placeholders.juknishLink,
      href: site.juknis.href,
    },
    form: {
      badge: 'PENDAFTARAN',
      title: 'Form Pendaftaran Lomba Tahfizh',
      body: 'Isi seluruh data peserta dan instansi sekolah dengan cermat. Kolom bertanda bintang akan wajib diisi.',
      categoryLabel: 'Kategori Tahfizh yang Diikuti',
      categoryPlaceholder: '[PILIH KATEGORI]',
      categoryHelper: 'Pastikan kategori sesuai dengan hafalan dan kelas peserta saat ini.',
      consentPrefix:
        'Saya menyatakan bahwa seluruh data yang diisikan dalam formulir pendaftaran Lomba Tahfizh ATTIN EXPO XII 2026 ini adalah benar, sah, dan dapat dipertanggungjawabkan.',
      submitLabel: 'Kirim Pendaftaran Tahfizh',
      submitNote: 'Data Anda akan diverifikasi oleh panitia setelah berkas dikirimkan secara lengkap.',
      successMessage:
        'Terima kasih! Formulir pendaftaran Lomba Tahfizh ATTIN EXPO XII 2026 telah terkirim. Panitia akan memverifikasi berkas dan menghubungi nomor WhatsApp guru pendamping.',
    },
  },

  'pra-tka': {
    slug: 'pra-tka',
    breadcrumb: 'Pra-TKA',
    available: false,
    level: 'Tingkat SD/MI se-Sumatera Barat',
  },

  panahan: {
    slug: 'panahan',
    breadcrumb: 'Panahan',
    available: false,
    level: 'Tingkat SD/MI se-Sumatera Barat',
  },
}

export function getBranchDetail(slug) {
  const detail = branchDetails[slug] ?? null
  if (!detail) return null
  return { ...detail, available: detail.available !== false }
}

/** Kartu "Lihat Cabang Lainnya" pada halaman detail. */
export const relatedBranches = [
  {
    slug: 'pra-tka',
    title: 'Lomba Pra-TKA',
    badge: 'Akademik',
    badgeTone: 'primary',
    level: 'SD / MI',
    body: 'Uji kemampuan literasi, numerasi, dan penalaran logika tingkat dasar se-Sumatera Barat untuk mengukur kesiapan akademik unggul.',
    tags: ['Format Individu', 'Sumatera Barat'],
    fee: placeholders.fee,
  },
  {
    slug: 'panahan',
    title: 'Lomba Panahan (Archery)',
    badge: 'Olahraga Sunnah',
    badgeTone: 'secondary',
    level: 'SD / MI',
    body: 'Kompetisi ketangkasan memanah tradisional dan standar pemula, melatih fokus, ketenangan batin, dan sportivitas santri.',
    tags: ['Barebow / Standard', 'Sumatera Barat'],
    fee: placeholders.fee,
  },
]