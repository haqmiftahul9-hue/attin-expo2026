import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { benefits } from '../data/home.js'

export default function BenefitsSection() {
  return (
    <section className="w-full bg-transparent py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <SectionHeading
          badge={benefits.badge}
          title={benefits.title}
          description={benefits.description}
        />

        <Reveal delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-12">
            {benefits.items.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-4 md:p-5 rounded-2xl border-2 border-outline/80 bg-surface shadow-md hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all cursor-default"
              >
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-container-low border border-outline flex items-center justify-center shrink-0 shadow-sm ${item.iconClassName}`}
                >
                  <MaterialIcon name={item.icon} className="text-[20px] md:text-[24px]" />
                </div>
                <div className="flex flex-col justify-center h-full">
                  <h3 className="text-sm md:text-sm font-bold text-on-background leading-tight">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
