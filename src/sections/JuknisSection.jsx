import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'

export default function JuknisSection() {
  return (
    <section id="panduan-juknis" className="w-full bg-surface py-space-xl scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <div className="bg-surface-container-lowest rounded-3xl p-space-lg lg:p-space-xl shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <Reveal className="lg:col-span-8 space-y-space-sm">
              <div className="inline-flex items-center gap-space-xs text-primary font-label-badge text-label-badge uppercase tracking-wider">
                <MaterialIcon name="description" className="text-[18px]" />
                <span>Dokumen Resmi Panitia</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface">
                Buku Petunjuk Teknis (Juknis) Resmi ATTIN EXPO XII 2026
              </h2>
              <p className="font-body-md text-body-md text-outline leading-relaxed">
                Seluruh ketentuan umum, mekanisme penilaian dewan juri, tata tertib busana peserta, format surat
                mandat sekolah, serta nomor rekening pembayaran telah dirangkum dalam satu dokumen digital resmi.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs pt-space-xs">
                {site.juknis.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-space-xs text-on-surface font-body-md text-body-md">
                    <MaterialIcon name="check_circle" className="text-primary text-[18px]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-4 flex">
              <div className="w-full flex flex-col items-center justify-center p-space-lg bg-surface rounded-2xl text-center space-y-space-md">
                <div className="w-16 h-16 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shadow-md">
                  <MaterialIcon name="picture_as_pdf" className="text-[36px]" />
                </div>
                <div>
                  <span className="font-title-md text-title-md text-primary font-bold block">
                    {site.juknis.fileName}
                  </span>
                  <span className="font-caption text-caption text-outline block">
                    Versi Dokumen: {site.juknis.version}
                  </span>
                </div>
                <a
                  className="w-full inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-body-md-semibold py-space-sm px-space-md rounded-xl transition-colors shadow-sm"
                  download=""
                  href={site.juknis.href}
                >
                  <MaterialIcon name="download" className="text-[20px]" />
                  <span>Unduh Juknis Lengkap (PDF)</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
