import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { about } from '../data/home.js'
import { site } from '../data/site.js'

export default function AboutSection() {
  return (
    <section id="tentang" className="w-full bg-transparent py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <Reveal className="lg:col-span-5 relative w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-transparent-container">
              <img
                className="w-full h-full object-cover"
                data-alt={site.heroImageAlt}
                src={site.heroImage}
                alt={site.heroImageAlt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-primary-fixed/80 via-transparent to-transparent flex items-end p-space-md">
                <div className="text-on-primary">
                  <span className="font-label-badge text-label-badge uppercase tracking-wider text-tertiary-fixed">
                    Konsistensi 12 Tahun
                  </span>
                  <p className="font-title-md text-title-md text-surface-bright">
                    Mencetak Generasi Berjiwa Qur’ani Sejak Usia Dasar
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 bg-primary text-on-primary p-space-md rounded-xl shadow-lg hidden sm:flex items-center gap-space-sm max-w-xs">
              <MaterialIcon name="military_tech" className="text-[32px] text-tertiary-fixed" />
              <div className="font-body-md text-caption">
                Tingkat Provinsi dengan standar pengujian berintegritas tinggi.
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7 flex flex-col gap-space-sm">
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-2.5 py-1 rounded-full w-fit">
              {about.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-background tracking-tight leading-tight mt-4">
              {about.title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-2">{about.body}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {about.points.map((point) => (
                <div key={point.title} className="flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <MaterialIcon name={point.icon} className="text-[24px]" />
                  </div>
                  <h3 className="text-base font-bold text-on-background mb-2 tracking-tight">
                    {point.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
