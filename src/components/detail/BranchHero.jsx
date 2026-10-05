import { Link } from 'react-router-dom'
import MaterialIcon from '../MaterialIcon.jsx'

const BADGE_TONES = {
  primary: 'bg-primary-fixed text-primary-container',
  secondary: 'bg-secondary-fixed text-secondary',
}

export default function BranchHero({ branch }) {
  return (
    <section className="relative w-full bg-surface py-12 lg:py-20 overflow-hidden">
      <div className="absolute -right-24 -top-24 w-96 h-96 opacity-5 pointer-events-none text-primary-container">
        <svg className="w-full h-full stroke-current stroke-2" fill="none" viewBox="0 0 200 200" aria-hidden="true">
          <rect height="140" rx="16" transform="rotate(0 100 100)" width="140" x="30" y="30" />
          <rect height="140" rx="16" transform="rotate(45 100 100)" width="140" x="30" y="30" />
          <circle cx="100" cy="100" r="48" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary-container hover:bg-tertiary text-on-primary font-body-md-semibold text-body-md-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                to={`/pendaftaran/${branch.slug}`}
              >
                <span>Daftar {branch.tagline} Sekarang</span>
                <MaterialIcon name="arrow_downward" className="text-[18px]" />
              </Link>
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest hover:bg-primary-fixed text-primary font-body-md-semibold text-body-md-semibold shadow-sm transition-all"
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-primary-container/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-on-primary">
                <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-fixed block mb-1">
                  {branch.quoteLabel}
                </span>
                <p className="font-title-md text-title-md font-semibold leading-snug">{branch.quote}</p>
                <span className="text-caption font-caption text-primary-fixed block mt-1">{branch.quoteSource}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}