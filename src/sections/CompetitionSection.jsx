import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { Link } from 'react-router-dom'
import { competitions, detailValueClassNames } from '../data/competition.js'
import { competitionSection } from '../data/home.js'

const DETAIL_LABELS = ['Jenjang', 'Cakupan', 'Kontribusi']

export default function CompetitionSection() {
  return (
    <section id="kompetisi-resmi" className="w-full bg-transparent py-8 lg:py-12 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <SectionHeading
          badge={competitionSection.badge}
          badgeClassName="text-secondary"
          title={competitionSection.title}
          titleClassName="text-primary"
          description={competitionSection.description}
        />

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {competitions.map((competition) => (
              <div
                key={competition.id}
                id={competition.id}
                className="rounded-2xl border-2 border-outline/80 bg-surface p-6 shadow-md transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group scroll-mt-32"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 border-b border-outline/50 pb-3">
                    <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
                      {competition.tag}
                    </span>
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">
                      Kuota: {competition.quota}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform ${competition.iconClassName}`}
                    >
                      <MaterialIcon name={competition.icon} className="text-[28px]" />
                    </div>
                    <h3 className="text-lg font-extrabold text-on-background leading-tight tracking-tight">
                      {competition.title}
                    </h3>
                  </div>

                  <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-6">{competition.description}</p>

                  <div className="space-y-2 py-4 mb-4 text-sm font-medium border-t border-outline/50">
                    {competition.details.map((value, index) => (
                      <div key={DETAIL_LABELS[index]} className="flex justify-between gap-2">
                        <span className="text-muted-foreground shrink-0">{DETAIL_LABELS[index]}:</span>
                        <span className={`text-right ${detailValueClassNames[index]}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
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
