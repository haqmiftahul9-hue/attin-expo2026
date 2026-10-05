import { Link } from 'react-router-dom'
import MaterialIcon from '../MaterialIcon.jsx'
import { relatedBranches } from '../../data/branchDetail.js'
import { getCompetition } from '../../data/competition.js'

/**
 * Tampilan cadangan untuk cabang yang rincian halamannya belum tersedia.
 * Tetap memakai kerangka header, breadcrumb, dan callout yang sama.
 */
export default function BranchComingSoon({ slug }) {
  const competition = getCompetition(slug)
  const title = competition ? competition.title : 'Cabang Lomba'

  return (
    <section className="w-full bg-surface py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-secondary text-label-badge font-label-badge uppercase tracking-wider">
          <MaterialIcon name="hourglass_top" className="text-[16px]" />
          Informasi sedang disiapkan
        </span>

        <h1 className="text-display-hero-mobile lg:text-display-hero font-display-hero text-on-surface tracking-tight">
          {title}
        </h1>

        <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
          Rincian juknis, struktur kategori, dan formulir pendaftaran {title} sedang disiapkan panitia. Silakan
          kembali ke beranda untuk melihat seluruh cabang yang sudah tersedia, atau hubungi sekretariat panitia
          untuk informasi lebih lanjut.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary-container hover:bg-tertiary text-on-primary font-body-md-semibold text-body-md-semibold shadow-md transition-all"
            to="/#kompetisi-resmi"
          >
            <MaterialIcon name="arrow_back" className="text-[18px]" />
            <span>Kembali ke Daftar Cabang</span>
          </Link>
          <Link
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest hover:bg-primary-fixed text-primary font-body-md-semibold text-body-md-semibold shadow-sm transition-all"
            to="/lomba/tahfizh"
          >
            <span>Lihat Lomba Tahfizh</span>
            <MaterialIcon name="arrow_forward" className="text-[18px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-left">
          {relatedBranches.map((branch) => (
            <div key={branch.slug} className="bg-surface-container-low rounded-2xl p-5 shadow-sm">
              <h2 className="text-title-md font-title-md text-on-surface">{branch.title}</h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">{branch.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}