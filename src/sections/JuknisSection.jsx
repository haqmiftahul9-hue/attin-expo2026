import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'

export default function JuknisSection() {
  return (
    <section id="panduan-juknis" className="w-full bg-transparent py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-6xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <div className="bg-surface border-2 border-outline/80 rounded-3xl p-8 lg:p-12 shadow-md relative overflow-hidden">
          {/* Subtle accent glow behind the text */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <Reveal className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">
                <MaterialIcon name="description" className="text-[16px]" />
                <span>Dokumen Resmi Panitia</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-background tracking-tight leading-tight">
                Buku Petunjuk Teknis (Juknis) Resmi ATTIN EXPO XII 2026
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                Seluruh ketentuan umum, mekanisme penilaian dewan juri, tata tertib busana peserta, format surat
                mandat sekolah, serta nomor rekening pembayaran telah dirangkum dalam satu dokumen digital resmi.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {site.juknis.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-on-background font-medium text-sm">
                    <MaterialIcon name="check_circle" className="text-primary text-[20px]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-4 flex">
              <div className="w-full flex flex-col items-center justify-center p-8 border-2 border-outline/60 bg-surface-container-low rounded-2xl text-center space-y-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shadow-md">
                  <MaterialIcon name="picture_as_pdf" className="text-[32px]" />
                </div>
                <div>
                  <span className="text-base text-on-background font-bold block mb-1">
                    {site.juknis.fileName}
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    Versi Dokumen: {site.juknis.version}
                  </span>
                </div>
                <a
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm py-4 px-6 rounded-xl hover:opacity-90 transition-all shadow-md"
                  download=""
                  href={site.juknis.href}
                >
                  <MaterialIcon name="download" className="text-[20px]" />
                  <span>Unduh Juknis (PDF)</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
