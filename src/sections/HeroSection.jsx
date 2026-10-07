import CountdownTimer from '../components/CountdownTimer.jsx'
import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'

export default function HeroSection() {
  return (
    <section id="beranda" className="relative w-full overflow-hidden bg-transparent border-b border-outline py-20 lg:py-28">
      {/* VibeUI Signature Orb */}
      <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 60%)' }}></span>
      <span aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)' }}></span>

      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Side: Typography and CTAs */}
          <div className="flex flex-col items-start text-left gap-8">
            <Reveal className="inline-flex">
              <p className="inline-flex items-center rounded-lg border border-outline/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 shadow-sm">
                {site.editionBadge}
              </p>
            </Reveal>

            <Reveal delay={60} className="w-full">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-black tracking-tight text-on-background leading-[1.1]">
                  {site.name}{' '}
                  <span className="relative inline-block text-on-background">
                    2026
                    <span aria-hidden="true" className="absolute left-0 right-0 -bottom-1 h-[6px] md:h-[10px] -z-10 rounded-full bg-secondary"></span>
                  </span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl font-bold text-on-surface-variant max-w-lg leading-snug">
                  {site.tagline}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="w-full">
              <p className="text-sm md:text-base font-medium text-on-surface-variant leading-relaxed max-w-xl">
                {site.description}
              </p>
            </Reveal>

            <Reveal delay={180} className="w-full">
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-base px-8 py-3.5 rounded-lg shadow-md hover:opacity-90 transition-all"
                  href="#kompetisi-resmi"
                >
                  <span>Daftar Sekarang</span>
                  <MaterialIcon name="arrow_forward" className="text-[20px]" />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary font-semibold text-base px-8 py-3.5 rounded-lg shadow-sm hover:bg-primary/5 transition-colors"
                  href="#panduan-juknis"
                >
                  <MaterialIcon name="download" className="text-[20px]" />
                  <span>Unduh Juknis Lengkap</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Visual Mockup / Floating Cards */}
          <Reveal delay={300} className="w-full relative h-[500px] flex items-center justify-center lg:justify-end perspective-1000 mt-12 lg:mt-0">
            <div className="relative w-full max-w-md">
              
              {/* Decorative Card Back Left (Tahfizh) */}
              <div className="hidden md:block absolute -left-12 -top-10 w-[300px] -rotate-6 scale-90 opacity-70 blur-[1px] hover:blur-none hover:opacity-100 hover:scale-95 hover:z-30 transition-all duration-500 z-0 rounded-2xl border-2 border-outline/80 bg-surface p-6 shadow-lg select-none">
                <div className="flex items-center justify-between border-b border-outline/50 pb-3 mb-4">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">Tingkat SD/MI</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase">Tahfizh</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <MaterialIcon name="menu_book" className="text-[24px]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-extrabold text-on-background">Musabaqah Tahfizh</h3>
                    <p className="text-xs font-medium text-muted-foreground">Juz 30 & Pilihan</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-outline-variant rounded w-full"></div>
                  <div className="h-2 bg-outline-variant rounded w-5/6"></div>
                  <div className="h-2 bg-outline-variant rounded w-4/6"></div>
                </div>
              </div>

              {/* Decorative Card Back Right (Panahan) */}
              <div className="hidden md:block absolute -right-8 bottom-12 w-[300px] rotate-3 scale-90 opacity-70 blur-[1px] hover:blur-none hover:opacity-100 hover:scale-95 hover:z-30 transition-all duration-500 z-10 rounded-2xl border-2 border-outline/80 bg-surface p-6 shadow-lg select-none">
                <div className="flex items-center justify-between border-b border-outline/50 pb-3 mb-4">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-secondary">Tingkat SD/MI</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase">Panahan</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                    <MaterialIcon name="sports_score" className="text-[24px]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-extrabold text-on-background">Panahan Eksekutif</h3>
                    <p className="text-xs font-medium text-muted-foreground">Putra & Putri</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-outline-variant rounded w-full"></div>
                  <div className="h-2 bg-outline-variant rounded w-5/6"></div>
                  <div className="h-2 bg-outline-variant rounded w-4/6"></div>
                </div>
              </div>

              {/* Main Center Card (Registration) */}
              <div className="relative z-20 w-full transform hover:-translate-y-2 transition-transform duration-500 shadow-2xl">
                <div className="rounded-2xl border-2 border-outline/80 bg-surface p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-outline/50 mb-4">
                    <div className="flex items-center gap-2">
                      <MaterialIcon name="verified" className="text-primary text-[24px]" />
                      <span className="text-base font-extrabold text-primary tracking-tight">Pusat Registrasi</span>
                    </div>
                    <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md uppercase tracking-[0.1em]">
                      Online Aktif
                    </span>
                  </div>

                  <CountdownTimer />



                  <div className="mt-2">
                    <a
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-colors shadow-sm"
                      href="#kompetisi-resmi"
                    >
                      <span>Pilih Cabang Lomba</span>
                      <MaterialIcon name="app_registration" className="text-[18px]" />
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
