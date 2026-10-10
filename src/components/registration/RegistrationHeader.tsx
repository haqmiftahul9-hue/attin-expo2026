import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { site } from '../../data/site.js'

/**
 * Navbar halaman pendaftaran. Mengikuti desain navbar beranda (dua lapis:
 * announcement bar + bar utama) dengan target tautan yang sesuai rute.
 */
export default function RegistrationHeader() {
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

      <div className="h-20 bg-white/95 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop h-full flex items-center justify-between gap-space-md">
          <Link className="flex items-center gap-space-sm lg:gap-space-md shrink-0" to="/">
            <img alt={`${site.title} Logo`} className="h-[44px] md:h-[48px] lg:h-[52px] w-auto object-contain scale-110 md:scale-[1.15] origin-left drop-shadow-sm" src="/assets/logo-attin-expo.png" />
            <span className="flex flex-col pl-1">
              <span className="font-extrabold text-[19px] md:text-[22px] lg:text-[24px] text-[#061B33] tracking-tight leading-none font-display mb-1">
                {site.name}
              </span>
              <span className="text-[10.5px] md:text-[11.5px] font-bold text-[#8B1E3F] tracking-[0.15em] uppercase">
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


        </div>
      </div>
    </header>
  )
}

