import { placeholders, site } from './site.js'

export const heroMetrics = [
  { label: 'Tingkat Peserta', value: 'SD/MI Se-Sumbar', valueClassName: 'text-primary' },
  { label: 'Total Cabang', value: '3 Perlombaan', valueClassName: 'text-primary' },
  
  { label: 'Pelaksanaan', value: site.registration.executionDate, valueClassName: 'text-primary' },
]

export const eventStats = [
  {
    icon: 'menu_book',
    iconClassName: 'bg-primary-container text-primary',
    value: '3 Cabang',
    valueClassName: 'text-primary',
    label: 'Tahfizh, Pra-TKA & Panahan',
  },
  {
    icon: 'map',
    iconClassName: 'bg-tertiary text-on-tertiary',
    value: '19 Wilayah',
    valueClassName: 'text-primary',
    label: 'Kabupaten & Kota se-Sumbar',
  },
  {
    icon: 'payments',
    iconClassName: 'bg-secondary text-on-secondary',
    value: placeholders.fee,
    valueClassName: 'text-secondary',
    label: 'Registrasi resmi & transparan',
  },
  {
    icon: 'emoji_events',
    iconClassName: 'bg-primary text-on-primary',
    value: 'Piala & Tabanas',
    valueClassName: 'text-primary',
    label: 'Piala Bergilir & Dana Pembinaan',
  },
]

export const about = {
  badge: 'TENTANG KAMI',
  title: 'Membangun Karakter Generasi Emas yang Berakhlak dan Berprestasi',
  body: 'ATTIN EXPO XII 2026 merupakan kelanjutan dari komitmen dakwah dan pendidikan Islam yang telah berjalan selama 12 edisi di Sumatera Barat. Kami mendedikasikan panggung ini bagi siswa jenjang SD/MI untuk mengekspresikan bakat keagamaan, menguji hafalan Al-Qur’an, serta melatih konsentrasi dan sportivitas fisik melalui panahan.',
  points: [
    {
      icon: 'auto_stories',
      title: 'Nilai Qur’ani',
      description: 'Menanamkan kecintaan mendalam pada kalamullah sejak fase usia dini.',
    },
    {
      icon: 'gavel',
      title: 'Penilaian Obyektif',
      description: 'Dinilai langsung oleh dewan juri ahli yang tersertifikasi dan kredibel.',
    },
    {
      icon: 'diversity_3',
      title: 'Ukhuwah Islamiyah',
      description: 'Mempererat tali silaturahmi antar-madrasah dan sekolah Islam se-Sumbar.',
    },
  ],
}

export const competitionSection = {
  badge: 'CABANG PERLOMBAAN',
  title: 'Pilihan Kompetisi Jenjang SD/MI',
  description:
    'Pilih cabang lomba sesuai minat dan bakat ananda. Pelajari buku petunjuk teknis (Juknis), lengkapi persyaratan.',
}

export const benefits = {
  badge: 'KEUNGGULAN ACARA',
  title: 'Mengapa Mengikuti ATTIN EXPO XII?',
  description:
    'Kami menyajikan ekosistem perlombaan bermutu tinggi, berorientasi pada pendidikan karakter, sportivitas, serta transparansi penilaian.',
  items: [
    { icon: 'workspace_premium', iconClassName: 'text-primary', title: 'Juri Bersertifikat' },
    { icon: 'psychology', iconClassName: 'text-secondary', title: 'Uji Mental Juara' },
    { icon: 'badge', iconClassName: 'text-tertiary', title: 'Sertifikat Resmi' },
    { icon: 'family_restroom', iconClassName: 'text-accent-mint', title: 'Venue Ramah Anak' },
    { icon: 'medical_services', iconClassName: 'text-primary', title: 'Tim Medis Siaga' },
    { icon: 'mosque', iconClassName: 'text-secondary', title: 'Musholla Luas' },
    { icon: 'local_parking', iconClassName: 'text-tertiary', title: 'Parkir Memadai' },
    { icon: 'restaurant', iconClassName: 'text-accent-mint', title: 'Kantin Halal' },
    { icon: 'security', iconClassName: 'text-primary', title: 'Keamanan Ketat' },
    { icon: 'photo_camera', iconClassName: 'text-secondary', title: 'Dokumentasi Pro' },
  ],
}

export const timeline = {
  badge: 'ALUR & JADWAL',
  title: 'Tahapan Pelaksanaan ATTIN EXPO XII 2026',
  description: 'Catat tanggal-tanggal penting berikut agar sekolah dan peserta tidak melewatkan momentum berharga ini.',
  steps: [
    {
      number: '01',
      badge: 'Tahap Awal',
      badgeClassName: 'text-secondary',
      title: 'Pendaftaran Peserta',
      description: 'Pengisian biodata, pengunggahan berkas, dan penyelesaian administrasi secara online.',
      date: `Hingga ${site.registration.deadlineLabel}`,
      dateClassName: 'text-primary',
    },
    {
      number: '02',
      badge: 'Hari H',
      badgeClassName: 'text-secondary',
      title: 'Pelaksanaan Lomba',
      description: 'Seluruh cabang perlombaan (Tahfizh, Pra-TKA, Panahan) dilaksanakan secara serentak.',
      date: site.registration.executionDate,
      dateClassName: 'text-primary',
    },
    {
      number: '03',
      badge: 'Penutupan',
      badgeClassName: 'text-primary',
      title: 'Pengumuman Juara',
      description: 'Penyerahan piala bergilir dan sertifikat pemenang.',
      date: 'Sabtu, 21 November 2026',
      dateClassName: 'text-secondary',
    },
  ],
}

export const faq = {
  badge: 'TANYA JAWAB',
  title: 'Pertanyaan yang Sering Diajukan (FAQ)',
  description: 'Informasi ringkas mengenai regulasi dan teknis pendaftaran ATTIN EXPO XII.',
  items: [
    {
      question: 'Siapa saja yang berhak mengikuti perlombaan ATTIN EXPO XII 2026?',
      answer:
        'Kompetisi ini terbuka untuk seluruh siswa-siswi aktif jenjang SD/MI negeri maupun swasta di seluruh wilayah Sumatera Barat.',
    },
    {
      question: 'Bagaimana prosedur pembayaran dan verifikasi bukti pendaftaran?',
      answer: `Pembayaran dilakukan melalui transfer bank ke rekening resmi panitia: ${placeholders.bankAccount}. Setelah mentransfer, silakan unggah foto/screenshot bukti transfer ke dalam formulir pendaftaran online.`,
    },
    {
      question: 'Apakah satu sekolah diperbolehkan mengirimkan lebih dari satu peserta per cabang?',
      answer:
        'Tentu. Pihak sekolah diizinkan mengirimkan lebih dari 1 peserta (Sesuai dengan panduan juknis).',
    },
    {
      question: 'Di mana lokasi spesifik pelaksanaan perlombaan?',
      answer: `Semua kegiatan akan diselenggarakan di SDIT Attin Sumbar, Jl. Kayu Belanti No.Desa, Talago Sarik, Kec. Pariaman Tim., Kota Pariaman, Sumatera Barat 25523. Panduan rute dan informasi fasilitas di lokasi lomba dapat dibaca secara lengkap pada Buku Juknis.`,
    },
    {
      question: 'Apakah jadwal pendaftaran bisa diperpanjang?',
      answer: `Batas akhir pendaftaran terjadwal pada 18 November 2026. `,
    },
  ],
}

export const contactCards = [
  {
    icon: 'chat',
    iconClassName: 'bg-primary/10 text-primary',
    title: 'Narahubung Tahfidz',
    caption: 'Ustadzah Bella',
    value: '0852-7419-7702',
    cta: 'Hubungi WA',
    href: 'https://wa.me/6285274197702'
  },
  {
    icon: 'chat',
    iconClassName: 'bg-secondary/10 text-secondary',
    title: 'Narahubung Pra-TKA',
    caption: 'Ustadzah Tazkia',
    value: '0821-7079-0896',
    cta: 'Hubungi WA',
    href: 'https://wa.me/6282170790896'
  },
  {
    icon: 'chat',
    iconClassName: 'bg-tertiary/10 text-tertiary',
    title: 'Narahubung Panahan',
    caption: 'Ustadzah Nova',
    value: '0812-7574-1134',
    cta: 'Hubungi WA',
    href: 'https://wa.me/6281275741134'
  },
  {
    icon: 'mail',
    iconClassName: 'bg-accent-mint/10 text-accent-mint',
    title: 'Email Sekolah',
    caption: 'Surat Menyurat & Umum',
    value: 'attinislamicshool@gmail.com',
    cta: 'Tulis Email',
    href: 'mailto:attinislamicshool@gmail.com'
  },
]
