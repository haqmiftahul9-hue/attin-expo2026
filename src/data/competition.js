import { placeholders } from './site.js'

/**
 * Empat cabang lomba resmi ATTIN EXPO XII 2026.
 * `details` selalu berisi tiga baris: nilai warna diturunkan dari indeks
 * (on-surface → primary → secondary) sesuai desain asli.
 * `available: true` berarti halaman detail cabang sudah tersedia di router.
 */
export const competitions = [
  {
    id: 'cabang-tahfizh',
    slug: 'tahfizh',
    path: 'detail-tahfizh',
    href: '/lomba/tahfizh',
    registrationHref: '/pendaftaran/tahfizh',
    available: true,
    tag: 'Kategori Qur’an',
    tagClassName: 'bg-surface-container text-primary',
    quota: placeholders.quota,
    icon: 'menu_book',
    iconClassName: 'bg-primary-container text-on-primary',
    title: 'Lomba Tahfizh',
    shortTitle: 'Lomba Tahfizh',
    description:
      'Lomba hafalan Al-Qur’an menguji kefasihan makhraj, ketepatan hukum tajwid, kelancaran adab tilawah, dan irama tartil.',
    details: ['Rp. 35.000 per orang'],
  },
  {
    id: 'cabang-olimpiade',
    slug: 'olimpiade',
    path: 'detail-olimpiade',
    href: '/lomba/olimpiade',
    registrationHref: '/pendaftaran/olimpiade',
    available: false,
    tag: 'Olimpiade Akademik',
    tagClassName: 'bg-secondary-fixed text-on-secondary-fixed',
    quota: placeholders.quota,
    icon: 'school',
    iconClassName: 'bg-tertiary text-on-tertiary',
    title: 'Olimpiade Matematika, IPA, dan IPS',
    shortTitle: 'Olimpiade SD',
    description:
      'Olimpiade Matematika, IPA, dan IPS untuk siswa kelas 3, 4, dan 5 SD/MI sederajat mengasah penalaran logika, pemahaman konsep, dan ketrampilan proses sains.',
    details: ['Rp. 35.000 per orang'],
  },
  {
    id: 'cabang-panahan',
    slug: 'panahan',
    path: 'detail-panahan',
    href: '/lomba/panahan',
    registrationHref: '/pendaftaran/panahan',
    available: false,
    tag: 'Olahraga Sunnah',
    tagClassName: 'bg-surface-container text-tertiary',
    quota: placeholders.quota,
    icon: 'track_changes',
    iconClassName: 'bg-tertiary text-on-tertiary',
    title: 'Lomba Panahan',
    shortTitle: 'Lomba Panahan',
    description:
      'Lomba Panahan melatih ketenangan batin, ketepatan bidikan, fokus mental, dan adab sportivitas sunnah nabi.',
    details: ['Rp. 65.000 per orang'],
  },
  {
    id: 'cabang-kolase',
    slug: 'kolase',
    path: 'detail-kolase',
    href: '/lomba/kolase',
    registrationHref: '/pendaftaran/kolase',
    available: false,
    tag: 'Seni Kreatif',
    tagClassName: 'bg-surface-container text-tertiary',
    quota: placeholders.quota,
    icon: 'diversity_3',
    iconClassName: 'bg-amber-50 text-amber-900',
    title: 'Lomba Kolase Anak dan Orang Tua',
    shortTitle: 'Lomba Kolase',
    description:
      'Lomba Kolase Anak dan Orang Tua mengajak anak TK/PAUD bekerja sama dengan orang tuanya menciptakan karya kolase yang menggambarkan nilai-nilai Islam dan estetika seni kreatif secara sportif.',
    details: ['Rp. 20.000 per kolase'],
  },
]

/** Warna nilai baris ringkasan kartu cabang, mengikuti urutan baris. */
export const detailValueClassNames = [
  'font-body-md-semibold text-on-surface',
  'font-body-md-semibold text-primary',
  'font-body-md-semibold text-secondary',
]

export function getCompetition(slug) {
  return competitions.find((competition) => competition.slug === slug) ?? null
}