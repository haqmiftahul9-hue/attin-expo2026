import { Link } from 'react-router-dom'
import { competitions } from '../../data/competition.js'
import { footerQuickLinks, site } from '../../data/site.js'

/** Footer halaman pendaftaran, sama dengan footer beranda. */
export default function RegistrationFooter() {
  return (
    <footer className="w-full bg-on-primary-fixed text-surface-container-high">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="space-y-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="bg-surface-container-lowest p-space-xs rounded-lg inline-flex">
                <img alt={`${site.title} Logo`} className="h-7 w-auto object-contain" src={site.logo} />
              </div>
              <span className="font-headline-sm text-headline-sm text-surface-bright">{site.name}</span>
            </div>
            <p className="font-body-md text-body-md text-outline-variant leading-relaxed">{site.footerDescription}</p>
          </div>

          <div className="space-y-space-sm">
            <h3 className="font-title-md text-title-md text-surface-bright font-semibold">Cabang Lomba</h3>
            <ul className="space-y-space-xs font-body-md text-body-md text-outline-variant">
              {competitions.map((competition) => (
                <li key={competition.id}>
                  <Link
                    className="hover:text-surface-bright transition-colors"
                    to={competition.registrationHref}
                  >
                    {competition.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-space-sm">
            <h3 className="font-title-md text-title-md text-surface-bright font-semibold">Akses Cepat</h3>
            <ul className="space-y-space-xs font-body-md text-body-md text-outline-variant">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link className="hover:text-surface-bright transition-colors" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-space-sm">
            <h3 className="font-title-md text-title-md text-surface-bright font-semibold">Kontak Panitia</h3>
            <div className="space-y-space-xs font-body-md text-body-md text-outline-variant">
              <p className="text-surface-bright font-body-md-semibold">Sekretariat Panitia Pelaksana</p>
              <p>WhatsApp: {site.contact.whatsapp}</p>
              <p>Email: {site.contact.email}</p>
              <p>Lokasi: {site.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-space-xl pt-space-lg text-center text-outline-variant font-caption text-caption">
          <p>{site.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
