import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { Link } from 'react-router-dom'
import { competitions, detailValueClassNames } from '../data/competition.js'
import { competitionSection } from '../data/home.js'

const DETAIL_LABELS = ['Jenjang', 'Cakupan', 'Kontribusi']

export default function CompetitionSection() {
  return (
    <section id="kompetisi-resmi" className="w-full bg-slate-50 py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <SectionHeading
          badge={competitionSection.badge}
          badgeClassName="text-[#8B1E3F] bg-[#8B1E3F]/5 border-[#8B1E3F]/10"
          title={competitionSection.title}
          titleClassName="text-[#002B49]"
          description={competitionSection.description}
        />

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitions.map((competition) => (
              <div
                key={competition.id}
                id={competition.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#0057B8]/30 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group scroll-mt-32"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-bold text-[#002B49] tracking-[0.1em] uppercase">
                      {competition.tag}
                    </span>
                    <span className="text-[11px] font-bold text-[#8B1E3F] uppercase tracking-[0.1em]">
                      Kuota: {competition.quota}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform ${competition.iconClassName.replace('bg-primary-container text-on-primary', 'bg-blue-50 text-[#002B49]').replace('bg-secondary text-on-secondary', 'bg-rose-50 text-[#8B1E3F]').replace('bg-tertiary text-on-tertiary', 'bg-teal-50 text-[#0F766E]')}`}
                    >
                      <MaterialIcon name={competition.icon} className="text-[24px]" />
                    </div>
                    <h3 className="text-[16px] font-bold text-[#0F172A] leading-tight tracking-tight">
                      {competition.title}
                    </h3>
                  </div>

                  <p className="text-[14px] text-slate-500 leading-relaxed mb-6">{competition.description}</p>

                  <div className="space-y-2 py-4 mb-4 text-[13px] font-medium border-t border-slate-100">
                    {competition.details.map((value, index) => (
                      <div key={DETAIL_LABELS[index]} className="flex justify-between gap-2">
                        <span className="text-slate-500 shrink-0">{DETAIL_LABELS[index]}:</span>
                        <span className={`text-right font-bold text-[#0F172A]`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#002B49] text-white font-semibold text-[14px] py-3 rounded-lg hover:bg-[#003B66] transition-colors shadow-sm"
                  data-path="kompetisi"
                  to={competition.registrationHref}
                >
                  <span>Daftar Sekarang</span>
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

