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
    <section id="jadwal" className="w-full bg-surface-container-low py-space-xl scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <SectionHeading
          badge={timeline.badge}
          badgeClassName="text-secondary"
          title={timeline.title}
          titleClassName="text-primary"
          description={timeline.description}
        />

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm relative">
            {timeline.steps.map((step, index) => (
              <div
                key={step.number}
                className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-space-sm ${NUMBER_CLASS_NAMES[index]}`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`font-label-badge text-label-badge uppercase block mb-1 ${step.badgeClassName}`}
                  >
                    {step.badge}
                  </span>
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold mb-space-xs">
                    {step.title}
                  </h3>
                  <p className="font-caption text-caption text-outline mb-space-sm">{step.description}</p>
                </div>
                <div
                  className={`bg-surface p-space-xs rounded-lg font-caption text-caption font-semibold ${step.dateClassName}`}
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
