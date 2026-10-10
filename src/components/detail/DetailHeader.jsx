import { Link, useParams } from 'react-router-dom'
import BrandLogo from '../BrandLogo.jsx'
import MaterialIcon from '../MaterialIcon.jsx'

const NAV_ITEMS = [
  { label: 'Beranda', to: '/' },
  { label: 'Kompetisi', to: '/#kompetisi-resmi' },
  { label: 'Jadwal', to: '/#jadwal' },
  { label: 'Panduan', to: '/#panduan-juknis' },
  { label: 'Tentang', to: '/#tentang' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Kontak', to: '/#kontak' },
]

export default function DetailHeader() {
  const { slug = 'tahfizh' } = useParams()

  return (
    <>
      <aside className="w-full bg-primary text-white border-b border-secondary/40 text-xs sm:text-sm py-2 px-4 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-secondary animate-ping" />
            <span className="font-medium truncate">
              Pendaftaran ATTIN EXPO XII 2026 untuk SD/MI Tingkat Sumatera Barat
            </span>
          </div>
          <Link
            className="inline-flex items-center gap-1 font-semibold text-primary-fixed hover:text-white hover:underline transition-colors shrink-0"
            to="/#kompetisi-resmi"
          >
            <span>Lihat Informasi</span>
            <MaterialIcon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
      </aside>

      <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-border-ui shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link className="flex items-center gap-3" to="/">
            <BrandLogo className="h-11 sm:h-12 w-auto" />
          </Link>

          <nav aria-label="Navigasi utama" className="hidden lg:flex items-center gap-7 text-sm font-semibold text-outline">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                className={
                  index === 0
                    ? 'text-primary-container font-bold'
                    : 'hover:text-primary-container transition-colors'
                }
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white bg-primary-container hover:bg-primary shadow-sm transition-all"
              to={`/pendaftaran/${slug}`}
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
