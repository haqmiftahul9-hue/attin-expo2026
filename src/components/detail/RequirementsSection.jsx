import MaterialIcon from '../MaterialIcon.jsx'

export default function RequirementsSection({ requirements }) {
  return (
    <section id="ketentuan" className="w-full bg-surface-container-lowest py-16 sm:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-label-badge font-label-badge uppercase tracking-wider text-secondary">
            {requirements.badge}
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface">{requirements.title}</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">{requirements.body}</p>
        </div>

        <ol className="max-w-3xl mx-auto space-y-4">
          {requirements.items.map((item, index) => (
            <li key={item.title} className="bg-surface-container-low rounded-2xl p-5 shadow-sm flex items-center gap-4">
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
    </section>
  )
}