import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { about } from '../data/home.js'
import { site } from '../data/site.js'

export default function AboutSection() {
  return (
    <section id="tentang" className="w-full bg-surface py-space-xl scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <Reveal className="lg:col-span-5 relative w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-surface-container">
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
            <span className="font-label-badge text-label-badge text-primary-container tracking-widest uppercase">
              {about.badge}
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface">
              {about.title}
            </h2>
            <p className="font-body-md text-body-md text-outline leading-relaxed">{about.body}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm pt-space-sm">
              {about.points.map((point) => (
                <div key={point.title} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low text-primary flex items-center justify-center mb-space-xs">
                    <MaterialIcon name={point.icon} className="text-[22px]" />
                  </div>
                  <h3 className="font-body-md-semibold text-body-md-semibold text-primary mb-1">
                    {point.title}
                  </h3>
                  <p className="font-caption text-caption text-outline">{point.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
