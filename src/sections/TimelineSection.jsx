import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import MaterialIcon from '../components/MaterialIcon.jsx'
import { timeline } from '../data/home.js'


export default function TimelineSection() {
  return (
    <section 
      id="jadwal" 
      className="w-full py-12 lg:py-16 scroll-mt-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div>
          {/* Custom Heading Header */}
          <Reveal className="text-center max-w-4xl mx-auto mb-14 space-y-5">
          <span className="inline-flex items-center text-[14px] font-bold tracking-[0.15em] text-white uppercase bg-[#8B1E3F] px-4 py-1.5 rounded-sm">
            {timeline.badge}
          </span>
          <h2 className="text-[36px] md:text-[42px] lg:text-[48px] font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
            Tahapan Pelaksanaan <br className="hidden md:block" /> ATTIN EXPO XII <span className="text-[#0057B8]">2026</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-slate-200 leading-relaxed max-w-2xl mx-auto pt-2">
            {timeline.description}
          </p>
        </Reveal>

        <Reveal>
          {/* Timeline Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch max-w-5xl mx-auto">
            {timeline.steps.map((step) => {
              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-[#002B49]/20 hover:-translate-y-1 hover:shadow-[0_12px_30px_-4px_rgba(0,43,73,0.08)] flex flex-col items-center text-center h-full group"
                >
                  {/* Number Badge */}
                  <div className="w-14 h-14 rounded-full bg-[#002B49] text-white flex items-center justify-center mb-6 shadow-md ring-4 ring-[#002B49]/5 group-hover:bg-[#8B1E3F] group-hover:ring-[#8B1E3F]/10 transition-all duration-300">
                    <span className="text-[20px] font-black tracking-tight">{step.number}</span>
                  </div>

                  {/* Content: Title & Description */}
                  <div className="flex flex-col mb-6 flex-grow">
                    <h3 className="text-[18px] font-bold text-[#0F172A] leading-snug mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[#475569] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Footer: Date */}
                  <div className="mt-auto pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-2">
                    <MaterialIcon name="event" className="text-[16px] text-[#002B49] opacity-80 shrink-0" />
                    <span className="text-[12.5px] lg:text-[13px] font-bold tracking-tight text-[#002B49] whitespace-nowrap">
                      {step.date}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  )
}



