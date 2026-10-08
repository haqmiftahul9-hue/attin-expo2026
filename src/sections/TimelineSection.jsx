import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { timeline } from '../data/home.js'

const NUMBER_CLASS_NAMES = [
  'bg-primary text-on-primary',
  'bg-secondary text-on-secondary',
  'bg-tertiary text-on-tertiary',
  'bg-primary-container text-on-primary',
  'bg-on-primary-fixed text-surface-bright',
]

export default function TimelineSection() {
  return (
    <section id="jadwal" className="w-full bg-transparent-container-low py-8 lg:py-12 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <SectionHeading
          badge={timeline.badge}
          badgeClassName="text-secondary"
          title={timeline.title}
          titleClassName="text-primary"
          description={timeline.description}
        />

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative mt-8">
            {timeline.steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col h-full"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-extrabold mb-4 ${NUMBER_CLASS_NAMES[index]}`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-widest block mb-2 ${step.badgeClassName}`}
                  >
                    {step.badge}
                  </span>
                  <h3 className="text-lg font-bold text-on-background mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-6">{step.description}</p>
                </div>
                <div
                  className={`mt-auto text-sm font-bold pt-4 border-t border-outline/40 ${step.dateClassName}`}
                >
                  {step.date}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
