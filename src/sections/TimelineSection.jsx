import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import MaterialIcon from '../components/MaterialIcon.jsx'
import { timeline } from '../data/home.js'

const CARD_STYLES = [
  {
    tagText: 'text-[#1e3a8a] dark:text-blue-300', // Navy
    badgeBg: 'bg-[#1e3a8a] text-white',
  },
  {
    tagText: 'text-[#881337] dark:text-rose-300', // Maroon
    badgeBg: 'bg-[#881337] text-white',
  },
  {
    tagText: 'text-[#b45309] dark:text-amber-400', // Orange
    badgeBg: 'bg-[#b45309] text-white',
  },
  {
    tagText: 'text-[#0f766e] dark:text-teal-300', // Teal
    badgeBg: 'bg-[#0f766e] text-white',
  },
  {
    tagText: 'text-[#1d4ed8] dark:text-blue-400', // Royal Blue
    badgeBg: 'bg-[#1d4ed8] text-white',
  },
]

export default function TimelineSection() {
  return (
    <section id="jadwal" className="w-full bg-transparent-container-low py-16 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <SectionHeading
          badge={timeline.badge}
          badgeClassName="text-primary"
          title={timeline.title}
          titleClassName="text-primary"
          description={timeline.description}
        />

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-5 mt-12">
            {timeline.steps.map((step, index) => {
              const style = CARD_STYLES[index] || CARD_STYLES[0]

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-outline/30 bg-surface p-6 shadow-sm transition-all hover:border-outline/50 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full group"
                >
                  {/* Eyebrow & Number */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0 ${style.badgeBg} group-hover:scale-105 transition-transform`}>
                      <span className="text-[13px] font-bold">{step.number}</span>
                    </div>
                    <span className={`text-[11px] font-bold tracking-widest uppercase ${style.tagText}`}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-[17px] font-extrabold text-on-background leading-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[15px] font-medium text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Date Footer */}
                  <div className="mt-8 pt-4 border-t border-outline/10 flex items-center gap-2">
                    <MaterialIcon name="event" className={`text-[16px] ${style.tagText}`} />
                    <span className={`text-[14px] font-bold tracking-tight ${style.tagText}`}>
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
