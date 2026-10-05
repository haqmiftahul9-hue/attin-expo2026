import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import RegistrationFooter from '../../components/registration/RegistrationFooter.jsx'
import RegistrationHeader from '../../components/registration/RegistrationHeader.jsx'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import { getLastRegistration } from '../../lib/registrationsRepository.js'
import { site } from '../../data/site.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { CompetitionSlug, RegistrationRow } from '../../types/registration.js'

function getBranchFromCode(code: string): { slug: CompetitionSlug; name: string; icon: string } {
  for (const config of Object.values(registrationConfigs)) {
    if (code.startsWith(config.codePrefix)) {
      return { slug: config.slug, name: config.fullName, icon: config.icon }
    }
  }

  return { slug: 'tahfizh', name: registrationConfigs.tahfizh.fullName, icon: registrationConfigs.tahfizh.icon }
}

/** Halaman konfirmasi setelah pendaftaran berhasil. */
export default function RegistrationSuccessPage() {
  const { registrationCode = '' } = useParams()
  usePageTitle(`Pendaftaran Berhasil ${registrationCode} — ATTIN EXPO XII 2026`)

  const lastRegistration = useMemo<RegistrationRow | null>(() => getLastRegistration(), [])
  const branch = getBranchFromCode(registrationCode)
  const config = registrationConfigs[branch.slug]
  const participantName = lastRegistration?.registration_code === registrationCode
    ? lastRegistration.participant_name
    : null

  return (
    <div className="w-full bg-surface text-on-surface">
      <RegistrationHeader slug={branch.slug} />

      <main className="w-full pt-20">
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-gutter-mobile lg:px-margin-desktop py-space-xl space-y-space-md">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg lg:p-space-xl shadow-md text-center space-y-space-md">
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mx-auto">
                <Icon className="text-[34px]" name="check_circle" />
              </div>

              <div className="space-y-space-xs">
                <span className="font-label-badge text-label-badge text-secondary uppercase tracking-widest">
                  Pendaftaran Terkirim
                </span>
                <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight">
                  Alhamdulillah, Formulir Anda Diterima
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {participantName ? `Kepada ${participantName}, ` : ''}pendaftaran {branch.name} sudah masuk ke
                  sekretariat ATTIN EXPO XII 2026 dan menunggu verifikasi berkas.
                </p>
              </div>

              <div className="bg-primary text-on-primary rounded-xl p-space-md space-y-space-xs">
                <span className="font-label-badge text-label-badge text-tertiary-fixed uppercase tracking-widest block">
                  Kode Registrasi
                </span>
                <span className="font-headline-md text-headline-md font-mono block tracking-wider">
                  {registrationCode}
                </span>
                <span className="font-caption text-caption text-tertiary-fixed block">
                  Simpan kode ini untuk pengecekan status berkas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm text-left">
                {[
                  { icon: 'hourglass_top', title: 'Verifikasi Berkas', body: 'Panitia memeriksa berkas 1-2 hari kerja.' },
                  { icon: 'payments', title: 'Konfirmasi Bayar', body: 'Bukti transfer diverifikasi oleh bendahara.' },
                  { icon: 'notifications', title: 'Nomor Panggung', body: 'Kartu panggung dikirim via WhatsApp & email.' },
                ].map((step) => (
                  <div key={step.title} className="bg-surface-container-low rounded-xl p-space-md">
                    <Icon className="text-primary text-[20px]" name={step.icon} />
                    <h2 className="font-body-md-semibold text-body-md text-on-surface mt-1">{step.title}</h2>
                    <p className="font-caption text-caption text-on-surface-variant">{step.body}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md pt-space-xs">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-body-md-semibold text-body-md px-space-lg py-space-sm rounded-xl shadow-sm transition-all"
                  href={config.contact.whatsappHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="text-[18px]" name="chat" />
                  Hubungi Panitia
                </a>
                <Link
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest text-primary font-body-md-semibold text-body-md px-space-lg py-space-sm rounded-xl shadow-sm transition-all"
                  to="/#kompetisi-resmi"
                >
                  <Icon className="text-[18px]" name="arrow_back" />
                  Kembali ke Daftar Cabang
                </Link>
              </div>

              <p className="font-caption text-caption text-outline">
                {site.name} · {site.edition} · Secretariat: {site.contact.whatsapp}
              </p>
            </div>
          </div>
        </div>
      </main>

      <RegistrationFooter />
    </div>
  )
}
