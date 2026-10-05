import { placeholders, site } from './site.js'

export const heroMetrics = [
  { label: 'Tingkat Peserta', value: 'SD/MI Se-Sumbar', valueClassName: 'text-primary' },
  { label: 'Total Cabang', value: '3 Perlombaan', valueClassName: 'text-primary' },
  { label: 'Kuota Lomba', value: site.registration.quota, valueClassName: 'text-secondary' },
  { label: 'Pelaksanaan', value: placeholders.date, valueClassName: 'text-primary' },
]

export const eventStats = [
  {
    icon: 'menu_book',
    iconClassName: 'bg-primary-container text-on-primary',
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
  body: 'ATTIN EXPO XII 2026 merupakan kelanjutan dari komitmen dakwah dan pendidikan Islam yang telah berjalan selama lebih dari satu dekade di Sumatera Barat. Kami mendedikasikan panggung ini bagi santri dan siswa jenjang SD/MI untuk mengekspresikan bakat keagamaan, menguji hafalan Al-Qur’an, serta melatih konsentrasi dan sportivitas fisik melalui panahan.',
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
    'Pilih cabang lomba sesuai minat bakat ananda. Pelajari juknis teknis, persyaratan peserta, dan pastikan mendaftar sebelum kuota tercapai.',
}

export const benefits = {
  badge: 'KEUNGGULAN ACARA',
  title: 'Mengapa Mengikuti ATTIN EXPO XII?',
  description:
    'Kami menyajikan ekosistem perlombaan bermutu tinggi, berorientasi pendidikan karakter serta transparansi penuh.',
  items: [
    {
      icon: 'workspace_premium',
      iconClassName: 'text-primary',
      title: 'Dewan Juri Netral',
      description:
        'Juri berlisensi resmi, berpengalaman di ajang MTQ dan asosiasi panahan resmi dengan sistem penilaian tertutup dan transparan.',
    },
    {
      icon: 'psychology',
      iconClassName: 'text-secondary',
      title: 'Pengalaman Mental',
      description:
        'Melatih keberanian tampil di panggung tingkat provinsi dan menumbuhkan mental juara yang rendah hati dan berkarakter.',
    },
    {
      icon: 'badge',
      iconClassName: 'text-primary',
      title: 'Sertifikat Resmi',
      description:
        'Seluruh peserta dan pembimbing memperoleh sertifikat resmi terverifikasi yang berguna bagi portofolio jenjang pendidikan lanjutan.',
    },
    {
      icon: 'family_restroom',
      iconClassName: 'text-secondary',
      title: 'Venue Ramah Anak',
      description:
        'Fasilitas lomba yang higienis, musholla representatif, tim medis siaga, dan zona tunggu nyaman bagi orang tua serta guru pendamping.',
    },
  ],
}

export const timeline = {
  badge: 'ALUR & JADWAL',
  title: 'Tahapan Pelaksanaan ATTIN EXPO XII 2026',
  description: 'Catat tanggal penting agar sekolah dan santri Anda tidak melewatkan momentum berharga ini.',
  steps: [
    {
      number: '01',
      badge: 'Tahap Awal',
      badgeClassName: 'text-secondary',
      title: 'Pendaftaran Daring',
      description: 'Pengisian data peserta dan pengunggahan kelengkapan berkas.',
      date: placeholders.date,
      dateClassName: 'text-primary',
    },
    {
      number: '02',
      badge: 'Verifikasi',
      badgeClassName: 'text-secondary',
      title: 'Batas Penutupan',
      description: 'Batas akhir pembayaran serta konfirmasi kelayakan administratif.',
      date: placeholders.date,
      dateClassName: 'text-secondary',
    },
    {
      number: '03',
      badge: 'Briefing',
      badgeClassName: 'text-primary',
      title: 'Technical Meeting',
      description: 'Penjelasan tata tertib teknis, nomor undian, & sesi tanya jawab.',
      date: placeholders.date,
      dateClassName: 'text-primary',
    },
    {
      number: '04',
      badge: 'Hari H',
      badgeClassName: 'text-secondary',
      title: 'Pelaksanaan Lomba',
      description: 'Musabaqah Tahfizh, Pra-TKA, & Kejuaraan Panahan berlangsung serentak.',
      date: placeholders.date,
      dateClassName: 'text-primary',
    },
    {
      number: '05',
      badge: 'Penutupan',
      badgeClassName: 'text-primary',
      title: 'Pengumuman Juara',
      description: 'Penyerahan piala bergilir, sertifikat, dan dana pembinaan pemenang.',
      date: placeholders.date,
      dateClassName: 'text-secondary',
    },
  ],
}

export const faq = {
  badge: 'TANYA JAWAB',
  title: 'Pertanyaan yang Sering Diajukan',
  description: 'Informasi ringkas mengenai regulasi dan teknis pendaftaran ATTIN EXPO XII.',
  items: [
    {
      question: 'Siapa saja yang berhak mengikuti perlombaan ATTIN EXPO XII 2026?',
      answer:
        'Kompetisi ini terbuka untuk seluruh siswa-siswi aktif jenjang SD/MI negeri maupun swasta di seluruh 19 Kabupaten dan Kota se-Provinsi Sumatera Barat yang dibuktikan dengan surat rekomendasi resmi kepala sekolah atau madrasah.',
    },
    {
      question: 'Bagaimana alur pembayaran dan verifikasi bukti transfer?',
      answer: `Pembayaran dilakukan via transfer bank ke rekening resmi panitia ${placeholders.bankAccount}. Setelah transfer, silakan unggah bukti transfer pada formulir online pendaftaran atau konfirmasi langsung ke nomor WhatsApp panitia pelaksana.`,
    },
    {
      question: 'Apakah satu sekolah diperbolehkan mengirimkan lebih dari satu peserta?',
      answer:
        'Ya, sekolah diizinkan mendelegasikan lebih dari 1 peserta selama kuota cabang lomba yang dituju masih tersedia di sistem registrasi kami.',
    },
    {
      question: 'Di mana lokasi venue pelaksanaan perlombaan?',
      answer: `Pelaksanaan offline berlangsung di ${placeholders.venue}, Kota Padang, Provinsi Sumatera Barat. Rute dan panduan akomodasi dapat diakses pada buku petunjuk teknis.`,
    },
    {
      question: 'Kapan batas akhir pendaftaran dan apakah ada perpanjangan waktu?',
      answer: `Batas akhir pendaftaran ditetapkan sampai ${placeholders.date}. Pendaftaran dapat ditutup sewaktu-waktu lebih cepat apabila kuota maksimal peserta per cabang lomba telah terpenuhi.`,
    },
  ],
}

export const contactCards = [
  {
    icon: 'support_agent',
    iconClassName: 'bg-surface-container text-primary',
    title: 'Sekretariat Panitia',
    caption: 'Layanan Informasi & Pendaftaran',
    value: `WhatsApp: ${placeholders.whatsapp}`,
  },
  {
    icon: 'mail',
    iconClassName: 'bg-surface-container text-secondary',
    title: 'Surel Resmi',
    caption: 'Korespondensi Surat & Undangan',
    value: `Email: ${placeholders.email}`,
  },
  {
    icon: 'pin_drop',
    iconClassName: 'bg-surface-container text-primary',
    title: 'Lokasi Kampus',
    caption: 'Sekretariat Pelaksana Expo',
    value: `${placeholders.venue}, Sumatera Barat`,
  },
]
