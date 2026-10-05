import MaterialIcon from '../MaterialIcon.jsx'

export default function GuideSection({ guide }) {
  return (
    <section id="panduan" className="w-full bg-surface-container-low py-16 sm:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-3xl p-8 sm:p-10 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl bg-secondary-fixed flex flex-col items-center justify-center text-secondary shrink-0 shadow-inner">
              <MaterialIcon name="picture_as_pdf" className="text-[48px]" />
              <span className="text-label-badge font-label-badge uppercase font-bold tracking-widest mt-1">PDF DOC</span>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <span className="text-label-badge font-label-badge uppercase tracking-wider text-secondary">
                  {guide.badge}
                </span>
                <h3 className="text-headline-md font-headline-md text-on-surface mt-1">{guide.title}</h3>
              </div>
              <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">{guide.body}</p>
              <div className="text-caption font-caption text-outline">
                {guide.sourceLabel}{' '}
                <span className="text-on-surface font-medium">{guide.sourceValue}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <a
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-container hover:bg-tertiary text-on-primary font-body-md-semibold text-body-md-semibold shadow-sm transition-all"
                  href={guide.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MaterialIcon name="visibility" className="text-[18px]" />
                  <span>Buka Panduan</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-body-md-semibold text-body-md-semibold transition-all"
                  download=""
                  href={guide.href}
                >
                  <MaterialIcon name="download" className="text-[18px]" />
                  <span>Unduh PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}