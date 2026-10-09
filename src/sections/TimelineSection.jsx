import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import MaterialIcon from '../components/MaterialIcon.jsx'
import { timeline } from '../data/home.js'

const CARD_STYLES = [
  {
    tagText: 'text-[#002B49]', // Navy
    badgeBg: 'bg-[#002B49] text-white',
  },
  {
    tagText: 'text-[#8B1E3F]', // Maroon
    badgeBg: 'bg-[#8B1E3F] text-white',
  },
  {
    tagText: 'text-[#C98316]', // Amber
    badgeBg: 'bg-[#C98316] text-white',
  },
  {
    tagText: 'text-[#0F766E]', // Teal
    badgeBg: 'bg-[#0F766E] text-white',
  },
  {
    tagText: 'text-[#0057B8]', // Royal Blue
    badgeBg: 'bg-[#0057B8] text-white',
  },
]

export default function TimelineSection() {
  return (
    <section id="jadwal" className="w-full bg-slate-50 py-16 lg:py-24 scroll-mt-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <SectionHeading
          badge={timeline.badge}
          title={timeline.title}
          description={timeline.description}
        />

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
            {timeline.steps.map((step, index) => {
              const style = CARD_STYLES[index] || CARD_STYLES[0]

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#0057B8]/30 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full group"
                >
                  {/* Eyebrow & Number */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0 ${style.badgeBg} shadow-sm group-hover:scale-105 transition-transform`}>
                      <span className="text-[13px] font-bold">{step.number}</span>
                    </div>
                    <span className={`text-[11px] font-bold tracking-[0.08em] uppercase ${style.tagText}`}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-[16px] font-bold text-[#0F172A] leading-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Date Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <MaterialIcon name="event" className={`text-[16px] ${style.tagText}`} />
                    <span className={`text-[13px] font-bold tracking-tight ${style.tagText}`}>
                      {step.date}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

