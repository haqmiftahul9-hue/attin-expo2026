import MaterialIcon from '../MaterialIcon.jsx'
import { textTone } from '../../lib/tones.js'
import { site } from '../../data/site.js'

export default function ScheduleSection({ schedule }) {
  return (
    <section id="jadwal" className="w-full py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
              {schedule.badge}
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">{schedule.title}</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">{schedule.body}</p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {schedule.steps.map((step) => (
              <li
                key={step.label}
                className="bg-white border border-white/30 rounded-[20px] p-5 flex flex-col justify-between relative shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-white/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
              >
                <div>
                  <span
                    className={`text-label-badge font-label-badge uppercase block mb-1 ${textTone[step.badgeTone]}`}
                  >
                    {step.label}
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">{step.title}</h3>
                  <p className="text-caption font-caption text-on-surface-variant">{step.caption}</p>
                </div>
                <div className="mt-4 pt-4 bg-white/50 rounded-xl p-3 border border-white/30">
                  <span className="text-caption font-caption text-on-surface-variant block">Waktu:</span>
                  <span
                    className={`text-body-md-semibold font-body-md-semibold ${textTone[step.dateTone]}`}
                  >
                    {step.date}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <div className="max-w-4xl mx-auto mt-10 bg-white/50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-white/30">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start text-primary-container">
                <MaterialIcon name="notification_important" className="text-[22px]" />
                <h4 className="text-title-md font-title-md font-semibold text-on-surface">{schedule.calloutTitle}</h4>
              </div>
              <p className="text-body-md font-body-md text-on-surface-variant max-w-xl">{schedule.calloutBody}</p>
            </div>
            <a
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-container hover:bg-tertiary text-on-primary font-body-md-semibold text-body-md-semibold shrink-0 shadow-sm transition-all"
              href={site.contact.whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MaterialIcon name="chat" className="text-[18px]" />
              <span>WhatsApp: {site.contact.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
