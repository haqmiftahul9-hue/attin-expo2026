import { placeholders } from './site.js'

/**
 * Tiga cabang lomba resmi ATTIN EXPO XII 2026.
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
    title: 'Lomba Tahfizh Al-Qur’an',
    shortTitle: 'Lomba Tahfizh Al-Qur’an',
    description:
      'Musabaqah hafalan Al-Qur’an menguji kefasihan makhraj, ketepatan hukum tajwid, kelancaran adab tilawah, dan irama tartil.',
    details: ['SD/MI Se-Sumatera Barat', placeholders.category, placeholders.fee],
  },
  {
    id: 'cabang-pra-tka',
    slug: 'pra-tka',
    path: 'detail-pra-tka',
    href: '/lomba/pra-tka',
    registrationHref: '/pendaftaran/pra-tka',
    available: false,
    tag: 'Kategori Keislaman',
    tagClassName: 'bg-secondary-fixed text-on-secondary-fixed',
    quota: placeholders.quota,
    icon: 'child_care',
    iconClassName: 'bg-secondary text-on-secondary',
    title: 'Lomba Pra-TKA',
    shortTitle: 'Lomba Pra-TKA',
    description:
      'Uji ketangkasan dasar dan wawasan keislaman anak (Pra Tahfidz & Keislaman Anak) untuk memupuk pondasi moral sedini mungkin.',
    details: ['Kelas 1-3 SD/MI', placeholders.category, placeholders.fee],
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
    icon: 'sports_martial_arts',
    iconClassName: 'bg-tertiary text-on-tertiary',
    title: 'Lomba Panahan Tradisional',
    shortTitle: 'Lomba Panahan',
    description:
      'Kompetisi panahan tradisional melatih ketenangan batin, ketepatan bidikan, fokus mental, dan adab sportivitas sunnah nabi.',
    details: ['Putra & Putri SD/MI', placeholders.category, placeholders.fee],
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