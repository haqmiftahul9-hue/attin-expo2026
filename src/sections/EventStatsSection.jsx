import Reveal from '../components/Reveal.jsx'

const statsData = [
  {
    number: '03',
    label: 'Cabang Lomba',
    description: 'Tahfizh, Pra-TKA & Panahan',
    badge: 'KOMPETISI',
  },
  {
    number: '19',
    label: 'Kabupaten / Kota',
    description: 'Wilayah Sumatera Barat',
    badge: 'CAKUPAN',
  },
  {
    number: '10+',
    label: 'Hadiah Utama',
    description: 'Piala Bergilir & Tabanas',
    badge: 'APRESIASI',
  }
]

export default function EventStatsSection() {
  return (
    <section className="w-full py-12 lg:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="rounded-[20px] border border-slate-900/10 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-slate-900/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] flex flex-col justify-between group h-full"
              >
                {/* Top Tag Section */}
                <div className="flex justify-center mb-6 border-b border-slate-100 pb-3">
                  <span className="text-[14px] font-bold text-[#002B49] tracking-[0.1em] uppercase text-center">
                    {stat.badge}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center py-2">
                  <div className="text-[48px] lg:text-[56px] font-extrabold text-[#002B49] tracking-tighter mb-4 leading-none group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] leading-tight tracking-tight mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {stat.description}
                  </p>
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


