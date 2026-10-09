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
    number: '85K',
    label: 'Biaya Daftar',
    description: 'Investasi transparan',
    badge: 'KONTRIBUSI',
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
    <section className="w-full bg-white py-12 lg:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-20">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#0057B8]/30 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group h-full"
              >
                {/* Top Tag Section */}
                <div className="flex items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-3">
                  <span className="text-[11px] font-bold text-[#002B49] tracking-[0.1em] uppercase">
                    {stat.badge}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                    INFO
                  </span>
                </div>

                <div className="flex flex-col items-center text-center py-2">
                  <div className="text-[48px] lg:text-[56px] font-extrabold text-[#002B49] tracking-tighter mb-4 leading-none group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] leading-tight tracking-tight mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

