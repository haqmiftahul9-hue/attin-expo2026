import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { contactCards } from '../data/home.js'

export default function ContactSection() {
  return (
    <section id="kontak" className="w-full py-12 lg:py-16 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <SectionHeading
            badge="PUSAT BANTUAN"
            title="Butuh Bantuan?"
            description="Pilih jalur komunikasi di bawah ini. Tim kami siap membantu menyelesaikan kendala pendaftaran Anda."
          />

        <Reveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[20px] border border-slate-900/10 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-slate-900/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${card.iconClassName.replace('bg-primary/10 text-primary', 'bg-blue-50 text-[#002B49]').replace('bg-secondary/10 text-secondary', 'bg-rose-50 text-[#8B1E3F]').replace('bg-tertiary/10 text-tertiary', 'bg-amber-50 text-[#C98316]').replace('bg-accent-mint/10 text-accent-mint', 'bg-teal-50 text-[#0F766E]')}`}
                  >
                    <MaterialIcon name={card.icon} className="text-[28px]" />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight mb-2">{card.title}</h3>
                  <p className="text-[15px] text-slate-600 mb-4">{card.caption}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-[14px] font-bold text-[#002B49] mb-4 truncate">{card.value}</p>
                  <a 
                    href={card.href} 
                    className="w-full inline-flex items-center justify-center gap-2 bg-white border border-slate-300 text-[#002B49] font-bold text-[14px] px-4 py-2.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
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
      </div>
    </section>
  )
}


