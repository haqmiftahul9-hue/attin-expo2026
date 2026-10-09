import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../data/site.js'

export default function CallToActionSection() {
  return (
    <section className="w-full bg-white py-12 lg:py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <div className="relative bg-[#002B49] text-white rounded-2xl p-8 lg:p-14 overflow-hidden shadow-xl border border-[#003B66]">
          {/* Subtle architectural lines / government style bg */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #ffffff 1px, transparent 1px), linear-gradient(-45deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px', backgroundPosition: 'center center' }}></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#0057B8]/40 to-transparent rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <Reveal className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-block bg-[#8B1E3F] text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded tracking-[0.08em] shadow-sm">
              Pendaftaran Resmi Dibuka
            </span>
            <h2 className="text-[28px] lg:text-[36px] font-extrabold text-white leading-tight tracking-tight">
              Siapkan Diri Menjadi Juara di ATTIN EXPO XII 2026
            </h2>
            <p className="text-[15px] lg:text-[16px] text-sky-100/90 leading-relaxed max-w-2xl">
              Daftarkan santri dan murid terbaik sekolah Anda sekarang juga sebelum kuota
              terpenuhi. Wujudkan generasi Qur’ani yang berani, berakhlak, dan berprestasi!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002B49] font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-slate-50 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg"
                href="#kompetisi-resmi"
              >
                <MaterialIcon name="how_to_reg" className="text-[20px]" />
                <span>Daftar Sekarang Secara Online</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold text-[15px] px-8 py-3.5 rounded-lg transition-colors"
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

