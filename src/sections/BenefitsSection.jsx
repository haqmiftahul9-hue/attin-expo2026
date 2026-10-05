import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { benefits } from '../data/home.js'

export default function BenefitsSection() {
  return (
    <section className="w-full bg-surface py-space-xl">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <SectionHeading
          badge={benefits.badge}
          title={benefits.title}
          description={benefits.description}
        />

        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {benefits.items.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center mb-space-sm ${item.iconClassName}`}
                >
                  <MaterialIcon name={item.icon} className="text-[26px]" />
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">{item.title}</h3>
                <p className="font-body-md text-body-md text-outline">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
