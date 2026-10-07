import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { contactCards } from '../data/home.js'

export default function ContactSection() {
  return (
    <section id="kontak" className="w-full bg-transparent py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <Reveal>
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-background mb-3">Butuh Bantuan?</h2>
            <p className="text-muted-foreground text-lg">Pilih jalur komunikasi di bawah ini. Tim kami siap membantu menyelesaikan kendala pendaftaran Anda.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border-2 border-outline/80 bg-surface p-6 shadow-md transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${card.iconClassName}`}
                  >
                    <MaterialIcon name={card.icon} className="text-[28px]" />
                  </div>
                  <h3 className="text-lg font-bold text-on-background tracking-tight mb-1">{card.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-4">{card.caption}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-outline/50">
                  <p className="text-sm font-bold text-primary mb-4 truncate">{card.value}</p>
                  <a 
                    href={card.href} 
                    className="w-full inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm hover:bg-primary/5 transition-colors"
                  >
                    <span>{card.cta}</span>
                    <MaterialIcon name="arrow_forward" className="text-[18px]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
