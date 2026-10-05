import MaterialIcon from '../MaterialIcon.jsx'
import { site } from '../../data/site.js'

export default function HelpCallout({ title }) {
  return (
    <section className="w-full bg-surface-container-lowest py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-primary-container rounded-3xl p-8 sm:p-12 text-on-primary shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full bg-on-primary/10 text-on-primary-container text-label-badge font-label-badge uppercase tracking-wider inline-block">
              LAYANAN PANITIA {title.toUpperCase()}
            </span>
            <h2 className="text-headline-lg font-headline-lg font-bold">Butuh Bantuan Terkait {title}?</h2>
            <p className="text-body-md font-body-md text-on-primary-container leading-relaxed">
              Tim panitia bidang musabaqah siap membantu menjawab kendala pendaftaran online, petunjuk teknis
              juknis, hingga verifikasi bukti transfer.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-surface-container-lowest hover:bg-surface text-primary font-body-md-semibold text-body-md-semibold shrink-0 shadow-md transition-all transform hover:-translate-y-0.5"
            href={site.contact.whatsappHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MaterialIcon name="support_agent" className="text-[22px]" />
            <span>Hubungi Panitia: {site.contact.whatsapp}</span>
          </a>
        </div>
      </div>
    </section>
  )
}