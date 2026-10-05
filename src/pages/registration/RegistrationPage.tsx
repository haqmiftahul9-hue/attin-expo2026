import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import RegistrationFooter from '../../components/registration/RegistrationFooter.jsx'
import RegistrationForm from '../../components/registration/RegistrationForm.jsx'
import RegistrationHeader from '../../components/registration/RegistrationHeader.jsx'
import RegistrationStepper from '../../components/registration/RegistrationStepper.jsx'
import RegistrationSummary from '../../components/registration/RegistrationSummary.jsx'
import { useRegistrationForm } from '../../hooks/useRegistrationForm.js'
import { loadRegistrationDraft } from '../../lib/registrationDraft.js'
import { placeholders } from '../../data/site.js'
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
    <div className="w-full bg-surface text-on-surface">
      <RegistrationHeader slug={slug} />

      <main className="w-full pt-20">
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
          <div className="absolute top-96 -left-32 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop py-space-lg">
            <section className="flex flex-col gap-space-sm mb-space-lg">
              <nav
                aria-label="Jalur Navigasi"
                className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption flex-wrap"
              >
                <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                  <Icon className="text-[15px]" name="home" />
                  Beranda
                </Link>
                <Icon className="text-[13px] text-outline" name="chevron_right" />
                <Link className="hover:text-primary transition-colors" to="/#kompetisi-resmi">
                  Kompetisi
                </Link>
                <Icon className="text-[13px] text-outline" name="chevron_right" />
                <span className="text-on-surface-variant">Pendaftaran</span>
                <Icon className="text-[13px] text-outline" name="chevron_right" />
                <span className="font-body-md-semibold text-primary">{config.name}</span>
              </nav>

              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                <div className="space-y-space-xs max-w-3xl">
                  <span className="inline-flex items-center gap-space-xs bg-primary-fixed text-primary px-3 py-1 rounded-full font-label-badge text-label-badge uppercase tracking-wider">
                    <Icon className="text-[15px]" name="verified" />
                    Pintu Resmi Delegasi SD/MI Se-Sumatera Barat
                  </span>
                  <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight">
                    Formulir Pendaftaran Delegasi Sekolah ATTIN EXPO XII 2026
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Panduan pengisian data santri, identitas madrasah, dan verifikasi berkas administrasi musabaqah.
                    Mohon isi data sesuai dokumen sah (Akte/NISN/Surat Tugas Madrasah) demi akurasi verifikasi dewan hakim.
                  </p>
                </div>

                <div className="shrink-0 bg-surface-container-low px-space-md py-space-sm rounded-xl flex items-center gap-space-sm">
                  <Icon className="text-secondary text-2xl" name="hourglass_top" />
                  <div className="text-right">
                    <div className="font-label-badge text-label-badge text-secondary uppercase tracking-widest">
                      Batas Akhir Registrasi
                    </div>
                    <div className="font-body-md-semibold text-body-md text-on-surface">
                      {placeholders.closingDate}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <RegistrationStepper />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              <RegistrationForm form={form} />
              <RegistrationSummary form={form} />
            </div>
          </div>
        </div>
      </main>

      <RegistrationFooter />
    </div>
  )
}
