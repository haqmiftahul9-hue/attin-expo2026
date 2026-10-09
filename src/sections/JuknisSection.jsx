import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'

export default function JuknisSection() {
  return (
    <section id="panduan-juknis" className="w-full bg-slate-50 py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-14 shadow-sm relative overflow-hidden">
          {/* Subtle accent glow behind the text */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#002B49]/5 to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            <Reveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#002B49] text-[11px] font-bold uppercase tracking-[0.1em] bg-[#002B49]/5 border border-[#002B49]/10 px-3 py-1.5 rounded-md">
                <MaterialIcon name="description" className="text-[16px]" />
                <span>Dokumen Resmi Panitia</span>
              </div>
              <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
                Buku Petunjuk Teknis (Juknis) Resmi ATTIN EXPO XII 2026
              </h2>
              <p className="text-[16px] text-slate-500 leading-relaxed max-w-2xl">
                Seluruh ketentuan umum, mekanisme penilaian dewan juri, tata tertib busana peserta, format surat
                mandat sekolah, serta nomor rekening pembayaran telah dirangkum dalam satu dokumen digital resmi.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {site.juknis.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-[#0F172A] font-medium text-[14px]">
                    <MaterialIcon name="check_circle" className="text-[#16825D] text-[20px]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[340px] flex flex-col items-center justify-center p-8 border border-slate-200 bg-slate-50 rounded-2xl text-center space-y-6 shadow-sm hover:shadow-md hover:border-[#002B49]/20 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-[#8B1E3F] text-white flex items-center justify-center shadow-md">
                  <MaterialIcon name="picture_as_pdf" className="text-[32px]" />
                </div>
                <div>
                  <span className="text-[15px] text-[#0F172A] font-bold block mb-1.5">
                    {site.juknis.fileName}
                  </span>
                  <span className="text-[12px] text-slate-400 block font-medium">
                    Versi Dokumen: {site.juknis.version}
                  </span>
                </div>
                <a
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#002B49] text-white font-semibold text-[14px] py-4 px-6 rounded-xl hover:bg-[#003B66] hover:-translate-y-0.5 transition-all shadow-md"
                  download={site.juknis.fileName}
                  href={site.juknis.href}
                  target="_blank"
                  rel="noopener noreferrer"
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

