import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { contactCards } from '../data/home.js'

export default function ContactSection() {
  return (
    <section id="kontak" className="w-full bg-surface py-space-xl scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex items-start gap-space-md"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconClassName}`}
                >
                  <MaterialIcon name={card.icon} className="text-[24px]" />
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-primary font-bold mb-1">{card.title}</h3>
                  <p className="font-caption text-caption text-outline mb-space-xs">{card.caption}</p>
                  <p className="font-body-md-semibold text-body-md-semibold text-on-surface">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
