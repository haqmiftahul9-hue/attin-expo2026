import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { benefits } from '../data/home.js'

export default function BenefitsSection() {
  return (
    <section className="w-full bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <SectionHeading
          badge={benefits.badge}
          title={benefits.title}
          description={benefits.description}
        />

        <Reveal delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mt-10">
            {benefits.items.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-[#0057B8]/30 hover:shadow-md hover:-translate-y-1 transition-all cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-sm ${item.iconClassName.replace('text-primary', 'text-[#002B49]').replace('text-secondary', 'text-[#8B1E3F]').replace('text-tertiary', 'text-[#0057B8]').replace('text-accent-mint', 'text-[#0F766E]')}`}
                >
                  <MaterialIcon name={item.icon} className="text-[24px]" />
                </div>
                <div className="flex flex-col justify-center h-full pt-0.5">
                  <h3 className="text-[14px] font-bold text-[#0F172A] leading-tight">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

