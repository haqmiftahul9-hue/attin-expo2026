import MaterialIcon from './MaterialIcon.jsx'
import useActiveSection from '../hooks/useActiveSection.js'
import { navigation, sectionOrder, site } from '../data/site.js'

const ACTIVE_CLASS =
  'bg-primary-container text-on-primary font-body-md-semibold rounded-xl px-space-sm py-space-xs shadow-sm'
const IDLE_CLASS =
  'px-space-sm py-space-xs rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors'

export default function Header() {
  const activeSection = useActiveSection(sectionOrder)

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop py-space-xs flex items-center justify-between font-label-md text-label-md">
          <div className="flex items-center gap-space-xs truncate">
            <MaterialIcon name="campaign" className="text-[16px] text-tertiary-fixed" />
            <span className="truncate">{site.announcement}</span>
          </div>
          <a
            className="hidden sm:inline-flex items-center gap-space-xs font-body-md-semibold text-caption text-tertiary-fixed hover:text-on-primary underline-offset-4 hover:underline transition-colors shrink-0"
            data-path="panduan"
            href="#panduan-juknis"
          >
            Lihat Panduan →
          </a>
        </div>
      </div>

      <div className="h-20 bg-surface/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop h-full flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm shrink-0">
            <img alt={`${site.title} Logo`} className="h-8 w-auto object-contain" src={site.logo} />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-tight">
                {site.name}
              </span>
              <span className="font-label-badge text-label-badge text-secondary tracking-widest uppercase">
                {site.edition}
              </span>
            </div>
          </div>

          <nav
            aria-label="Navigasi utama"
            className="hidden xl:flex items-center gap-space-xs"
            data-active-classes={ACTIVE_CLASS}
          >
            {navigation.map((item) => {
              const isActive = activeSection === item.section
              return (
                <a
                  key={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={isActive ? ACTIVE_CLASS : IDLE_CLASS}
                  data-path={item.path}
                  href={item.href}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-space-sm shrink-0">
            <a
              className="hidden md:inline-flex items-center justify-center bg-primary-container hover:bg-primary text-on-primary font-body-md-semibold text-body-md px-space-md py-space-sm rounded-xl shadow-sm transition-all"
              data-path="kompetisi"
              href="#kompetisi-resmi"
            >
              Daftar Sekarang
            </a>
            <button
              type="button"
              aria-label="Masuk ke akun peserta"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
            >
              <MaterialIcon name="person" className="text-on-primary text-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
