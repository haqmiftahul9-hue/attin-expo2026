import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { Link } from 'react-router-dom'
import { competitions, detailValueClassNames } from '../data/competition.js'
import { competitionSection } from '../data/home.js'

const DETAIL_LABELS = ['Jenjang', 'Cakupan', 'Kontribusi']

export default function CompetitionSection() {
  return (
    <section id="kompetisi-resmi" className="w-full bg-surface-container-low py-space-xl scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <SectionHeading
          badge={competitionSection.badge}
          badgeClassName="text-secondary"
          title={competitionSection.title}
          titleClassName="text-primary"
          description={competitionSection.description}
        />

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {competitions.map((competition) => (
              <div
                key={competition.id}
                id={competition.id}
                className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group scroll-mt-32"
              >
                <div>
                  <div className="flex items-center justify-between gap-space-xs mb-space-md">
                    <span
                      className={`font-label-badge text-label-badge px-space-sm py-space-xs rounded-full uppercase ${competition.tagClassName}`}
                    >
                      {competition.tag}
                    </span>
                    <span className="font-caption text-caption text-secondary font-medium">
                      Kuota: {competition.quota}
                    </span>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-space-md group-hover:scale-105 transition-transform ${competition.iconClassName}`}
                  >
                    <MaterialIcon name={competition.icon} className="text-[28px]" />
                  </div>

                  <h3 className="font-title-md text-title-md text-on-surface font-bold mb-space-xs">
                    {competition.title}
                  </h3>
                  <p className="font-body-md text-body-md text-outline mb-space-md">{competition.description}</p>

                  <div className="space-y-space-xs py-space-sm bg-surface rounded-xl p-space-sm mb-space-md text-body-md">
                    {competition.details.map((value, index) => (
                      <div key={DETAIL_LABELS[index]} className="flex justify-between gap-space-sm">
                        <span className="text-outline shrink-0">{DETAIL_LABELS[index]}:</span>
                        <span className={`text-right ${detailValueClassNames[index]}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  className="w-full inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-body-md-semibold py-space-sm rounded-xl transition-colors shadow-sm"
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
