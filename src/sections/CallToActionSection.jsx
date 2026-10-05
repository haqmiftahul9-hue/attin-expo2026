import MaterialIcon from '../components/MaterialIcon.jsx'
import OctagramPattern from '../components/OctagramPattern.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'

export default function CallToActionSection() {
  return (
    <section className="w-full bg-surface py-space-md">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <div className="relative bg-primary text-on-primary rounded-3xl p-space-lg lg:p-space-xl overflow-hidden shadow-2xl">
          <OctagramPattern className="absolute -top-10 -right-10 w-96 h-96 text-tertiary-fixed opacity-[0.07] pointer-events-none" />
          <OctagramPattern className="absolute -bottom-16 -left-12 w-80 h-80 text-tertiary-fixed opacity-[0.05] pointer-events-none" />

          <Reveal className="relative z-10 max-w-3xl space-y-space-md">
            <span className="inline-block bg-secondary text-on-secondary font-label-badge text-label-badge uppercase px-space-sm py-space-xs rounded-full tracking-wider">
              PENDAFTARAN RESMI DIBUKA
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-surface-bright">
              Siapkan Diri Menjadi Juara di ATTIN EXPO XII 2026
            </h2>
            <p className="font-body-md text-body-md text-surface-variant leading-relaxed">
              Daftasikan santri dan murid terbaik sekolah Anda sekarang juga sebelum kuota pendaftaran per cabang
              terpenuhi. Wujudkan generasi Qur’ani yang berani, berakhlak, dan berprestasi!
            </p>

            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                className="inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest text-primary-container font-body-md-semibold px-space-lg py-space-sm rounded-xl hover:bg-surface-variant transition-all shadow-md"
                href="#kompetisi-resmi"
              >
                <MaterialIcon name="how_to_reg" className="text-[20px]" />
                <span>Daftar Sekarang Secara Online</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-space-xs bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-body-md-semibold px-space-lg py-space-sm rounded-xl transition-all shadow-md"
                href={site.contact.whatsappHref}
                rel="noopener"
                target="_blank"
              >
                <MaterialIcon name="chat" className="text-[20px]" />
                <span>Konsultasi Panitia via WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
