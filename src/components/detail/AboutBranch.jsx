import MaterialIcon from '../MaterialIcon.jsx'

export default function AboutBranch({ about }) {
  return (
    <section id="tentang" className="w-full py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
              {about.badge}
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">{about.title}</h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">{about.body}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
            {about.values.map((value) => (
              <div key={value.title} className="bg-white border border-white/30 rounded-[20px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-white/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex flex-col items-start gap-4">
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
      </div>
    </section>
  )
}
