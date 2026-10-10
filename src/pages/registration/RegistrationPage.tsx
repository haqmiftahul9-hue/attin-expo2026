import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import Footer from '../../components/Footer.jsx'
import RegistrationForm from '../../components/registration/RegistrationForm.jsx'
import RegistrationHeader from '../../components/registration/RegistrationHeader.jsx'
import RegistrationStepper from '../../components/registration/RegistrationStepper.jsx'
import RegistrationSummary from '../../components/registration/RegistrationSummary.jsx'
import { useRegistrationForm } from '../../hooks/useRegistrationForm.js'
import { loadRegistrationDraft } from '../../lib/registrationDraft.js'
import { eventConfig } from '../../config/registrationConfigs.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { CompetitionSlug, RegistrationConfig } from '../../types/registration.js'

interface RegistrationPageProps {
  config: RegistrationConfig
}

/**
 * Halaman pendaftaran per cabang lomba.
 * Cabang ditentukan oleh route (`/pendaftaran/:slug`) dan tidak bisa diganti.
 */
export default function RegistrationPage({ config }: RegistrationPageProps) {
  const form = useRegistrationForm(config)
  const slug = config.slug as CompetitionSlug

  usePageTitle(`Formulir Pendaftaran ${config.name} — ATTIN EXPO XII 2026`)

  useEffect(() => {
    const draft = loadRegistrationDraft(slug)
    if (draft && Object.keys(draft).length > 0) {
      form.replaceValues({ gender: 'Laki-laki', ...draft })
    }
    // Dipulihkan satu kali saat halaman dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full min-h-screen flex flex-col">
      <RegistrationHeader />

      <main className="w-full pt-[112px] flex-1">
        <div className="relative w-full overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop py-space-lg">
            <section className="flex flex-col gap-space-sm mb-space-lg">
              <nav
                aria-label="Jalur Navigasi"
                className="flex items-center gap-space-xs text-slate-300 font-caption text-caption flex-wrap"
              >
                <Link className="hover:text-primary transition-colors flex items-center gap-1 font-medium" to="/">
                  <Icon className="text-[15px]" name="home" />
                  Beranda
                </Link>
                <Icon className="text-[13px] text-outline" name="chevron_right" />
                <Link className="hover:text-primary transition-colors font-medium" to="/#kompetisi-resmi">
                  Kompetisi
                </Link>
                <Icon className="text-[13px] text-outline" name="chevron_right" />
                <span className="text-slate-300 font-medium">Pendaftaran</span>
                <Icon className="text-[13px] text-outline" name="chevron_right" />
                <span className="font-bold text-primary">{config.name}</span>
              </nav>

              <div className="bg-white text-[#0F172A] border border-slate-900/10 rounded-[24px] p-6 lg:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md transition-all duration-300 hover:border-slate-900/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                <div className="space-y-4 max-w-3xl">
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-md font-bold text-xs uppercase tracking-widest">
                    <Icon className="text-[16px]" name="verified" />
                    Pintu Resmi Delegasi
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight">
                    Formulir Pendaftaran {config.name}
                  </h1>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-2xl">
                    Panduan pengisian data santri, identitas sekolah, dan verifikasi berkas administrasi lomba.
                    Mohon isi data sesuai dokumen sah demi akurasi verifikasi dewan hakim.
                  </p>
                </div>

                <div className="shrink-0 bg-[#F8FAFC] text-[#0F172A] border border-slate-900/10 px-6 py-4 rounded-[16px] flex items-center gap-4 shadow-sm hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all">
                  <Icon className="text-secondary text-[28px]" name="hourglass_top" />
                  <div className="text-right">
                    <div className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-1">
                      Batas Akhir Registrasi
                    </div>
                    <div className="text-lg font-bold text-[#003772]">
                      {eventConfig.registrationDeadline}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <RegistrationStepper />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <RegistrationForm form={form} />
              <RegistrationSummary form={form} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


