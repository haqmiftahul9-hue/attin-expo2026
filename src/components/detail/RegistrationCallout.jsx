import { Link } from 'react-router-dom'
import MaterialIcon from '../MaterialIcon.jsx'
import { placeholders } from '../../data/site.js'

/**
 * Panggilan ke halaman pendaftaran resmi cabang. FormulirRegistration yang
 * terkunci berada di route `/pendaftaran/:slug` agar satu-satunya formulir
 * untuk seluruh cabang lomba.
 */
export default function RegistrationCallout({ slug, name }) {
  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 sm:p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md mx-auto">
            <MaterialIcon name="how_to_reg" className="text-[34px]" />
          </div>

          <div className="space-y-2">
            <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
              PENDAFTARAN RESMI
            </span>
            <h2 className="text-headline-md font-headline-md text-on-surface">
              Formulir Pendaftaran {name} ATTIN EXPO XII 2026
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              Pengisian data dilakukan pada halaman pendaftaran khusus {name}. Formulir sudah mencakup kategori
              lomba, data peserta, utusan sekolah, berkas administrasi, bukti transfer, serta pakta integritas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary-container hover:bg-tertiary text-on-primary font-body-md-semibold text-body-md-semibold shadow-md transition-all"
              to={`/pendaftaran/${slug}`}
            >
              <MaterialIcon name="app_registration" className="text-[18px]" />
              <span>Isi Formulir Pendaftaran</span>
            </Link>
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-white/30 text-on-surface hover:bg-white/70 font-body-md-semibold text-body-md-semibold transition-all"
              href="https://wa.me/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MaterialIcon name="chat" className="text-[18px]" />
              <span>Tanya Panitia: {placeholders.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
