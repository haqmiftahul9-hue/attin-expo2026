import { Link } from 'react-router-dom'
import MaterialIcon from '../MaterialIcon.jsx'

export default function OtherBranches({ branches, currentSlug }) {
  const others = branches.filter((branch) => branch.slug !== currentSlug)

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
              EKSPLORASI
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Lihat Cabang Lainnya</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Pilihan kompetisi akademik dan ketangkasan sunnah lainnya di ATTIN EXPO XII 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {others.map((branch) => (
              <div
                key={branch.slug}
                className="bg-white border border-white/30 rounded-[20px] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-white/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-label-badge font-label-badge uppercase font-bold ${
                        branch.badgeTone === 'secondary'
                          ? 'bg-secondary-fixed text-secondary'
                          : 'bg-primary-fixed text-primary-container'
                      }`}
                    >
                      {branch.badge}
                    </span>
                    <span className="text-caption font-caption text-on-surface-variant">{branch.level}</span>
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface">{branch.title}</h3>
                    <p className="text-body-md font-body-md text-on-surface-variant mt-1.5">{branch.body}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {branch.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white/50 border border-white/30 text-caption font-caption text-on-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-body-md-semibold font-body-md-semibold text-secondary">{branch.fee}</span>
                  <Link
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white border border-white/30 hover:bg-primary-container hover:text-on-primary text-primary font-body-md-semibold text-body-md transition-colors"
                    to={`/lomba/${branch.slug}`}
                  >
                    <span>Lihat Detail</span>
                    <MaterialIcon name="arrow_forward" className="text-[16px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
