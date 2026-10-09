import MaterialIcon from './MaterialIcon.jsx'
import useActiveSection from '../hooks/useActiveSection.js'
import { navigation, sectionOrder, site } from '../data/site.js'

const ACTIVE_CLASS =
  'bg-primary/8 text-primary font-semibold text-[14px] rounded-lg px-3 py-1.5'
const IDLE_CLASS =
  'px-3 py-1.5 rounded-lg text-[14px] font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors'

export default function Header() {
  const activeSection = useActiveSection(sectionOrder)

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50">
      {/* Top Bar — Navy */}
      <div className="bg-[#002B49] text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-20 py-2 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2 truncate">
            <MaterialIcon name="campaign" className="text-[15px] text-amber-300" />
            <span className="truncate font-medium">{site.announcement}</span>
          </div>
          <a
            className="hidden sm:inline-flex items-center gap-1 font-semibold text-[12px] text-sky-200 hover:text-white underline-offset-4 hover:underline transition-colors shrink-0"
            data-path="panduan"
            href="#panduan-juknis"
          >
            Lihat Panduan →
          </a>
        </div>
      </div>

      {/* Main Nav Bar — White */}
      <div className="h-[72px] bg-white/98 backdrop-blur-lg border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-20 h-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <img alt={`${site.title} Logo`} className="h-10 md:h-11 w-auto object-contain" src="/assets/logo-attin-expo.png" />
            <div className="flex flex-col">
              <span className="font-bold text-[18px] text-[#002B49] tracking-tight leading-tight font-display">
                {site.name}
              </span>
              <span className="text-[10px] font-bold text-[#8B1E3F] tracking-[0.08em] uppercase">
                {site.edition}
              </span>
            </div>
          </div>

          <nav
            aria-label="Navigasi utama"
            className="hidden xl:flex items-center gap-1"
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

          <div className="flex items-center gap-3 shrink-0">
            <a
              className="hidden md:inline-flex items-center justify-center bg-[#002B49] hover:bg-[#003B66] text-white font-semibold text-[14px] px-5 py-2.5 rounded-lg shadow-sm transition-all"
              data-path="kompetisi"
              href="#kompetisi-resmi"
            >
              Daftar Sekarang
            </a>
            <button
              type="button"
              aria-label="Masuk ke akun peserta"
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <MaterialIcon name="person" className="text-[#002B49] text-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
