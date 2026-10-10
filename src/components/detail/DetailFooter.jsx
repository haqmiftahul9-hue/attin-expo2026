import { Link } from 'react-router-dom'
import BrandLogo from '../BrandLogo.jsx'
import { competitions } from '../../data/competition.js'
import { placeholders } from '../../data/site.js'

const NAV_LINKS = [
  { label: 'Beranda', to: '/' },
  { label: 'Kompetisi', to: '/#kompetisi-resmi' },
  { label: 'Jadwal', to: '/#jadwal' },
  { label: 'Panduan', to: '/#panduan-juknis' },
  { label: 'FAQ', to: '/#faq' },
]

export default function DetailFooter() {
  return (
    <footer id="kontak-footer" className="bg-white/95 backdrop-blur-sm border-t border-white/20 text-outline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo className="h-10 w-auto" />
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              Ajang kompetisi SD/MI tingkat Sumatera Barat dalam bidang Al-Qur&apos;an, akademik, dan olahraga.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface">NAVIGASI</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link className="hover:text-primary-container transition-colors" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface">KOMPETISI</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {competitions.map((competition) => (
                <li key={competition.id}>
                  <Link
                    className="hover:text-primary-container transition-colors"
                    to={competition.available ? competition.href : '/#kompetisi-resmi'}
                  >
                    {competition.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface">HUBUNGI KAMI</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                WhatsApp: <span className="font-medium text-on-surface">{placeholders.whatsapp}</span>
              </li>
              <li>
                Instagram: <span className="font-medium text-on-surface">{placeholders.instagram}</span>
              </li>
              <li>
                Email: <span className="font-medium text-on-surface">{placeholders.email}</span>
              </li>
              <li>
                Lokasi: <span className="font-medium text-on-surface">{placeholders.venue}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-ui text-center text-xs text-outline">
          <p>© 2026 ATTIN EXPO XII. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
