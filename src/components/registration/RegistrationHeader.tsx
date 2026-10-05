import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { site } from '../../data/site.js'
import type { CompetitionSlug } from '../../types/registration.js'

/**
 * Navbar halaman pendaftaran. Mengikuti desain navbar beranda (dua lapis:
 * announcement bar + bar utama) dengan target tautan yang sesuai rute.
 */
export default function RegistrationHeader({ slug }: { slug: CompetitionSlug }) {
  const navItems = [
    { label: 'Beranda', to: '/' },
    { label: 'Kompetisi', to: '/#kompetisi-resmi' },
    { label: 'Jadwal', to: '/#jadwal' },
    { label: 'Panduan', to: '/#panduan-juknis' },
    { label: 'Tentang', to: '/#tentang' },
    { label: 'FAQ', to: '/#faq' },
    { label: 'Kontak', to: '/#kontak' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop py-space-xs flex items-center justify-between font-label-md text-label-md">
          <div className="flex items-center gap-space-xs truncate">
            <Icon className="text-[16px] text-tertiary-fixed" name="campaign" />
            <span className="truncate">{site.announcement}</span>
          </div>
          <Link
            className="hidden sm:inline-flex items-center gap-space-xs font-body-md-semibold text-caption text-tertiary-fixed hover:text-on-primary underline-offset-4 hover:underline transition-colors shrink-0"
            to="/#panduan-juknis"
          >
            Lihat Panduan →
          </Link>
        </div>
      </div>

      <div className="h-20 bg-surface/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop h-full flex items-center justify-between gap-space-md">
          <Link className="flex items-center gap-space-sm shrink-0" to="/">
            <img alt={`${site.title} Logo`} className="h-8 w-auto object-contain" src={site.logo} />
            <span className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-tight">
                {site.name}
              </span>
              <span className="font-label-badge text-label-badge text-secondary tracking-widest uppercase">
                {site.edition}
              </span>
            </span>
          </Link>

          <nav aria-label="Navigasi utama" className="hidden xl:flex items-center gap-space-xs">
            {navItems.map((item) => (
              <Link
                key={item.label}
                className="px-space-sm py-space-xs rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-space-sm shrink-0">
            <Link
              className="hidden md:inline-flex items-center justify-center bg-primary-container hover:bg-primary text-on-primary font-body-md-semibold text-body-md px-space-md py-space-sm rounded-xl shadow-sm transition-all"
              to={`/pendaftaran/${slug}`}
            >
              Isi Formulir
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon className="text-on-primary text-[18px]" name="person" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
