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
    title: 'Lomba Tahfizh',
    shortTitle: 'Lomba Tahfizh',
    description:
      'Lomba hafalan Al-Qur’an menguji kefasihan makhraj, ketepatan hukum tajwid, kelancaran adab tilawah, dan irama tartil.',
    details: ['Rp. 35.000 per orang'],
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
      'Ujian kemampuan TKA tingkat SD dengan soal-soal Pra-TKA dengan materi Matematika (Numerasi dan Logika) dan Bahasa Indonesia (Literasi Membaca dan Pemahaman).',
    details: ['Rp. 25.000 per orang'],
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