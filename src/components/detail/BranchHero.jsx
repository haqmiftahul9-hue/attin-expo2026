import { Link } from 'react-router-dom'
import MaterialIcon from '../MaterialIcon.jsx'

const BADGE_TONES = {
  primary: 'bg-primary-fixed text-primary-container',
  secondary: 'bg-secondary-fixed text-secondary',
}

export default function BranchHero({ branch }) {
  return (
    <section className="relative w-full py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              {branch.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-badge font-label-badge tracking-wider uppercase ${BADGE_TONES[badge.tone]}`}
                >
                  {badge.icon ? <MaterialIcon name={badge.icon} className="text-[14px]" /> : null}
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <h1 className="text-display-hero font-display-hero text-on-surface tracking-tight leading-tight">
                {branch.tagline} <span className="text-primary-container font-bold">{branch.accentTitle}</span>
              </h1>
              <p className="text-headline-sm font-headline-sm text-secondary font-semibold">{branch.level}</p>
            </div>

            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {branch.intro}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {branch.metadata.map((item) => (
                <span
                  key={item.label}
                  className="px-3.5 py-1.5 rounded-xl bg-surface-container font-label-md text-label-md text-on-surface flex items-center gap-1.5"
                >
                  <MaterialIcon name={item.icon} className="text-primary-container text-[18px]" />
                  {item.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#002B49] hover:bg-[#061B33] text-white font-body-md-semibold text-body-md-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                to={`/pendaftaran/${branch.slug}`}
              >
                <span>Daftar {branch.tagline} Sekarang</span>
                <MaterialIcon name="arrow_downward" className="text-[18px]" />
              </Link>
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#061B33] border border-slate-200 font-body-md-semibold text-body-md-semibold shadow-sm transition-all"
                href="#ketentuan"
              >
                <MaterialIcon name="rule" className="text-[18px]" />
                <span>Lihat Ketentuan</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xl">
              <img
                className="w-full h-[400px] object-cover object-center"
                data-alt={branch.imageAlt}
                src={branch.image}
                alt={branch.imageAlt}
              />
              <div 
                className="absolute inset-0 flex items-end p-5 md:p-6"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%)'
                }}
              >
                <div className="text-white">
                  <span className="text-[14px] font-bold uppercase tracking-[0.15em] text-sky-200 block mb-1.5 opacity-90">
                    {branch.quoteLabel}
                  </span>
                  <p className="text-[18px] md:text-[20px] font-extrabold leading-tight drop-shadow-sm">{branch.quote}</p>
                  <span className="text-[14px] font-medium text-white block mt-1.5">{branch.quoteSource}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></section>
  )
}
