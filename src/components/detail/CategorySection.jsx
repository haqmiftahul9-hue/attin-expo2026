import MaterialIcon from '../MaterialIcon.jsx'
import { textTone } from '../../lib/tones.js'

export default function CategorySection({ categories }) {
  return (
    <section id="kategori" className="w-full bg-surface-container-low py-16 sm:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
            {categories.badge}
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface">{categories.title}</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">{categories.body}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.items.map((category) => (
            <div key={category.label} className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-label-badge font-label-badge uppercase ${
                      category.tone === 'secondary'
                        ? 'bg-secondary-fixed text-secondary'
                        : 'bg-primary-fixed text-primary-container'
                    }`}
                  >
                    {category.label}
                  </span>
                  <span className="text-caption font-caption text-on-surface-variant">{category.format}</span>
                </div>

                <h3 className="text-headline-sm font-headline-sm text-on-surface">{category.name}</h3>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <MaterialIcon name="menu_book" className={`text-[20px] shrink-0 mt-0.5 ${textTone[category.tone]}`} />
                    <div>
                      <span className="text-caption font-caption text-on-surface-variant block">Cakupan Hafalan</span>
                      <p className="text-body-md-semibold font-body-md-semibold text-on-surface">{category.scope}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MaterialIcon name="badge" className={`text-[20px] shrink-0 mt-0.5 ${textTone[category.tone]}`} />
                    <div>
                      <span className="text-caption font-caption text-on-surface-variant block">Peserta yang Berhak</span>
                      <p className="text-body-md-semibold font-body-md-semibold text-on-surface">
                        {category.requirement}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 bg-surface-container-low rounded-xl p-4 flex items-center justify-between">
                <span className="text-caption font-caption text-on-surface-variant">{category.quotaLabel}</span>
                <span
                  className={`text-label-badge font-label-badge uppercase font-bold ${textTone[category.tone]}`}
                >
                  {category.quotaValue}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-6 bg-surface-container-lowest rounded-xl p-4 flex items-center gap-3 text-on-surface-variant text-body-md font-body-md">
          <MaterialIcon name="info" className="text-primary-container text-[20px] shrink-0" />
          <span>{categories.note}</span>
        </div>
      </div>
    </section>
  )
}