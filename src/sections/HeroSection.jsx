import CountdownTimer from '../components/CountdownTimer.jsx'
import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { heroMetrics } from '../data/home.js'
import { site } from '../data/site.js'

export default function HeroSection() {
  return (
    <section id="beranda" className="relative w-full overflow-hidden bg-surface py-space-xl lg:py-space-xl">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
            <Reveal className="inline-flex">
              <div className="inline-flex items-center gap-space-xs bg-secondary text-on-secondary px-space-md py-space-xs rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                <span className="font-label-badge text-label-badge tracking-wider uppercase">
                  {site.editionBadge}
                </span>
              </div>
            </Reveal>

            <Reveal delay={60} className="w-full">
              <div className="space-y-space-xs">
                <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-primary tracking-tight">
                  {site.name} <span className="text-secondary">2026</span>
                </h1>
                <p className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">
                  {site.tagline}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="w-full">
              <p className="font-body-lg text-body-lg text-outline leading-relaxed max-w-2xl">
                {site.description}
              </p>
            </Reveal>

            <Reveal delay={180} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs w-full pt-space-xs">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="bg-surface-container-low p-space-sm rounded-xl">
                    <span className="font-caption text-caption text-outline block">{metric.label}</span>
                    <span
                      className={`font-body-md-semibold text-body-md-semibold truncate block ${metric.valueClassName}`}
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={240} className="w-full sm:w-auto">
              <div className="flex flex-wrap items-center gap-space-md pt-space-sm w-full sm:w-auto">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-primary-container text-on-primary font-body-md-semibold text-body-lg px-space-lg py-space-sm rounded-xl shadow-md hover:bg-primary transition-all"
                  href="#kompetisi-resmi"
                >
                  <span>Daftar Sekarang</span>
                  <MaterialIcon name="arrow_forward" className="text-[20px]" />
                </a>
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest text-primary-container font-body-md-semibold text-body-lg px-space-lg py-space-sm rounded-xl shadow-sm hover:bg-surface-container-low transition-all"
                  href="#panduan-juknis"
                >
                  <MaterialIcon name="download" className="text-[20px]" />
                  <span>Unduh Juknis Lengkap</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 w-full">
            <Reveal delay={120} className="w-full">
              <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-space-lg relative overflow-hidden">
                <div className="flex items-center justify-between gap-space-sm pb-space-md">
                  <div className="flex items-center gap-space-xs">
                    <MaterialIcon name="verified" className="text-primary text-[24px]" />
                    <span className="font-headline-sm text-headline-sm text-primary">Pusat Registrasi</span>
                  </div>
                  <span className="bg-surface-container-low text-secondary font-label-badge text-label-badge px-space-sm py-space-xs rounded-full uppercase tracking-wider">
                    Online Aktif
                  </span>
                </div>

                <CountdownTimer />

                <div className="space-y-space-sm">
                  <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl">
                    <MaterialIcon name="info" className="text-secondary text-[22px] shrink-0 mt-0.5" />
                    <p className="font-body-md text-body-md text-on-surface">
                      Pendaftaran dibuka secara daring via portal ini. Pastikan berkas rekomendasi sekolah dan
                      bukti pembayaran disiapkan.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs font-body-md text-body-md">
                    <span className="text-outline">Lokasi Pelaksanaan:</span>
                    <span className="font-body-md-semibold text-primary text-right">
                      {site.registration.venue}, {site.registration.city}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-body-md text-body-md">
                    <span className="text-outline">Biaya per Cabang:</span>
                    <span className="font-body-md-semibold text-secondary text-right">
                      {site.registration.fee}
                    </span>
                  </div>
                </div>

                <div className="pt-space-md">
                  <a
                    className="w-full flex items-center justify-center gap-space-xs bg-secondary text-on-secondary font-body-md-semibold py-space-sm rounded-xl hover:bg-on-secondary-fixed-variant transition-colors shadow-sm"
                    href="#kompetisi-resmi"
                  >
                    <span>Pilih Cabang &amp; Isi Formulir</span>
                    <MaterialIcon name="app_registration" className="text-[18px]" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
