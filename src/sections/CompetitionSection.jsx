import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { Link } from 'react-router-dom'
import { competitions, detailValueClassNames } from '../data/competition.js'
import { competitionSection } from '../data/home.js'

const DETAIL_LABELS = ['Kontribusi']

export default function CompetitionSection() {
  return (
    <section id="kompetisi-resmi" className="w-full py-12 lg:py-16 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <div>
          <SectionHeading
            badge={competitionSection.badge}
            badgeClassName="text-white bg-[#8B1E3F] border-[#8B1E3F]"
            title={competitionSection.title}
            titleClassName="text-white"
            descriptionClassName="text-[#E2E8F0]"
            description={competitionSection.description}
          />

          <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitions.map((competition) => (
              <div
                key={competition.id}
                id={competition.id}
                className="rounded-[20px] border border-slate-900/10 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-slate-900/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] flex flex-col justify-between group scroll-mt-32"
              >
                <div>


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

                  <p className="text-[14px] text-slate-600 leading-relaxed mb-6">{competition.description}</p>

                  <div className="space-y-2 py-4 mb-4 text-[14px] font-medium border-t border-slate-100">
                    {competition.details.map((value, index) => (
                      <div key={DETAIL_LABELS[index]} className="flex justify-between gap-2">
                        <span className="text-slate-600 shrink-0">{DETAIL_LABELS[index]}:</span>
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
      </div>
    </section>
  )
}



