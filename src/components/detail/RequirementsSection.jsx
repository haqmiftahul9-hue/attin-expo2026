import MaterialIcon from '../MaterialIcon.jsx'

export default function RequirementsSection({ requirements }) {
  return (
    <section id="ketentuan" className="w-full py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-label-badge font-label-badge uppercase tracking-wider text-secondary">
              {requirements.badge}
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">{requirements.title}</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">{requirements.body}</p>
          </div>

          <ol className="max-w-3xl mx-auto space-y-4">
            {requirements.items.map((item, index) => (
              <li key={item.title} className="bg-white border border-white/30 rounded-[20px] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-4 transition-all duration-300 hover:border-white/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                <span className="w-10 h-10 rounded-xl bg-primary-container text-on-primary font-body-md-semibold text-body-md-semibold flex items-center justify-center shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <p className="text-body-md-semibold font-body-md-semibold text-on-surface">{item.title}</p>
                  <p className="text-caption font-caption text-on-surface-variant">{item.caption}</p>
                </div>
                <MaterialIcon name="check_circle" className="text-primary-container text-[22px]" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
