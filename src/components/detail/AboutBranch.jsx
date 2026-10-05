import MaterialIcon from '../MaterialIcon.jsx'

export default function AboutBranch({ about }) {
  return (
    <section id="tentang" className="w-full bg-surface-container-lowest py-16 sm:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
            {about.badge}
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface">{about.title}</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">{about.body}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {about.values.map((value) => (
            <div key={value.title} className="bg-surface-container-low rounded-2xl p-6 shadow-sm flex flex-col items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${value.iconClassName}`}>
                <MaterialIcon name={value.icon} className="text-[24px]" />
              </div>
              <div>
                <h3 className="text-title-md font-title-md text-on-surface mb-2">{value.title}</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">{value.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}