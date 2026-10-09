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
    <section className="w-full bg-transparent pt-8 pb-8 lg:pt-12 lg:pb-12">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border-2 border-outline/80 bg-surface p-6 shadow-md transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group h-full"
              >
                {/* Top Tag Section matching Timeline/Competition */}
                <div className="flex items-center justify-between gap-2 mb-4 border-b border-outline/50 pb-3">
                  <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
                    {stat.badge}
                  </span>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                    INFO
                  </span>
                </div>

                <div className="flex flex-col items-center text-center py-4">
                  <div className="text-5xl lg:text-6xl font-black text-primary tracking-tighter mb-4 leading-none group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-extrabold text-on-background leading-tight tracking-tight mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
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
