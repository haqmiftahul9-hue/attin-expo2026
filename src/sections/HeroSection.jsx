import CountdownTimer from '../components/CountdownTimer.jsx'
import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'

export default function HeroSection() {
  return (
    <section id="beranda" className="relative w-full overflow-hidden border-b border-[#0B2A4A] py-12 lg:py-16" style={{ backgroundImage: 'linear-gradient(135deg, #061B33, #0B2A4A)' }}>
      {/* Subtle atmospheric glow */}
      <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] opacity-100" style={{ background: 'radial-gradient(circle at top right, rgba(0,87,184,0.35), transparent 60%)' }}></span>
      <span aria-hidden="true" className="pointer-events-none absolute left-0 bottom-0 h-96 w-96 opacity-100" style={{ background: 'radial-gradient(circle at bottom left, rgba(139,30,63,0.15), transparent 60%)' }}></span>

      <div className="max-w-7xl mx-auto px-5 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Typography and CTAs */}
          <div className="flex flex-col items-start text-left gap-6">
            <Reveal className="inline-flex">
              <p className="inline-flex items-center rounded-md border border-white/20 px-3 py-1.5 text-[14px] font-bold uppercase tracking-[0.1em] text-white bg-white/10 backdrop-blur-sm">
                {site.editionBadge}
              </p>
            </Reveal>

            <Reveal delay={60} className="w-full">
              <div className="space-y-3">
                <h1 className="text-[32px] md:text-[40px] lg:text-[44px] font-extrabold tracking-tight text-white leading-[1.1]">
                  {site.name}{' '}
                  <span className="relative inline-block text-white">
                    2026
                    <span aria-hidden="true" className="absolute left-0 right-0 -bottom-0.5 h-[5px] -z-10 rounded-full bg-[#8B1E3F]"></span>
                  </span>
                </h1>
                <p className="text-[16px] md:text-[18px] font-semibold text-blue-100 max-w-lg leading-relaxed">
                  {site.tagline}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="w-full">
              <p className="text-[15px] text-blue-200/80 leading-relaxed max-w-xl">
                {site.description}
              </p>
            </Reveal>

            <Reveal delay={180} className="w-full">
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#061B33] font-bold text-[15px] px-7 py-3 rounded-lg shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:bg-slate-50 transition-all"
                  href="#kompetisi-resmi"
                >
                  <span>Daftar Sekarang</span>
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-[15px] px-7 py-3 rounded-lg hover:bg-white/20 transition-all"
                  download={site.juknis.fileName}
                  href={site.juknis.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MaterialIcon name="download" className="text-[18px]" />
                  <span>Unduh Juknis Lengkap</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Registration Panel */}
          <Reveal delay={300} className="w-full relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0 py-8 md:py-10">
            <div className="relative w-full max-w-md">
              
              {/* Back Card 1 (Tahfizh) */}
              <div className="hidden md:block absolute -left-8 -top-6 w-[280px] -rotate-[4deg] scale-[0.88] opacity-95 hover:opacity-100 hover:scale-[0.92] hover:z-30 transition-all duration-500 z-0 rounded-[20px] border border-white/30 bg-white/85 backdrop-blur-[12px] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] select-none">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-3">
                  <span className="text-[14px] font-bold tracking-[0.12em] uppercase text-[#061B33]">Tingkat SD/MI</span>
                  <span className="text-[14px] font-bold text-slate-600 uppercase">Tahfizh</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#061B33]/10 text-[#061B33] flex items-center justify-center">
                    <MaterialIcon name="menu_book" className="text-[20px]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[15px] font-bold text-[#0F172A]">Lomba Tahfizh</h3>
                    <p className="text-[14px] text-slate-600">Juz 30 & Pilihan</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-4/6"></div>
                </div>
              </div>

              {/* Back Card 2 (Pra-TKA) */}
              <div className="hidden md:block absolute -right-8 top-2 w-[280px] rotate-[3deg] scale-[0.85] opacity-90 hover:opacity-100 hover:scale-[0.92] hover:z-30 transition-all duration-500 z-0 rounded-[20px] border border-white/30 bg-white/85 backdrop-blur-[12px] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] select-none">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-3">
                  <span className="text-[14px] font-bold tracking-[0.12em] uppercase text-[#0057B8]">Tingkat TK/PAUD</span>
                  <span className="text-[14px] font-bold text-slate-600 uppercase">Pra-TKA</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0057B8]/10 text-[#0057B8] flex items-center justify-center">
                    <MaterialIcon name="child_care" className="text-[20px]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[15px] font-bold text-[#0F172A]">Pra-TKA</h3>
                    <p className="text-[14px] text-slate-600">Tes Kompetensi Awal</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>

              {/* Back Card 3 (Panahan) */}
              <div className="hidden md:block absolute -right-4 -bottom-6 w-[280px] -rotate-[2deg] scale-[0.88] opacity-95 hover:opacity-100 hover:scale-[0.92] hover:z-30 transition-all duration-500 z-10 rounded-[20px] border border-white/30 bg-white/85 backdrop-blur-[12px] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] select-none">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-3">
                  <span className="text-[14px] font-bold tracking-[0.12em] uppercase text-[#8B1E3F]">Tingkat SD/MI</span>
                  <span className="text-[14px] font-bold text-slate-600 uppercase">Panahan</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#8B1E3F]/10 text-[#8B1E3F] flex items-center justify-center">
                    <MaterialIcon name="sports_score" className="text-[20px]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[15px] font-bold text-[#0F172A]">Lomba Panahan</h3>
                    <p className="text-[14px] text-slate-600">Putra & Putri</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-1.5 bg-slate-200 rounded w-4/6"></div>
                </div>
              </div>

              {/* Main Center Card (Registration) */}
              <div className="relative z-20 w-full transform hover:-translate-y-1 transition-transform duration-500">
                <div className="rounded-[20px] border border-white/30 bg-white/85 backdrop-blur-[12px] p-6 relative overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200/60 mb-4">
                    <div className="flex items-center gap-2">
                      <MaterialIcon name="verified" className="text-[#061B33] text-[22px]" />
                      <span className="text-[15px] font-bold text-[#061B33] tracking-tight">Pusat Registrasi</span>
                    </div>
                    <span className="text-[14px] font-bold text-[#8B1E3F] bg-[#8B1E3F]/10 px-2 py-1 rounded uppercase tracking-[0.06em]">
                      Online Aktif
                    </span>
                  </div>

                  <CountdownTimer />

                  <div className="mt-3">
                    <a
                      className="w-full flex items-center justify-center gap-2 bg-[#061B33] text-white font-semibold text-[14px] py-3 rounded-lg hover:bg-[#0057B8] transition-colors shadow-sm"
                      href="#kompetisi-resmi"
                    >
                      <span>Pilih Cabang Lomba</span>
                      <MaterialIcon name="app_registration" className="text-[17px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

