import Reveal from '../components/Reveal.jsx'

const statsData = [
  {
    number: '03',
    label: 'Cabang Lomba',
    description: 'Tahfizh, Pra-TKA & Panahan'
  },
  {
    number: '19',
    label: 'Kabupaten/Kota',
    description: 'Seluruh Wilayah Sumatera Barat'
  },
  {
    number: '85K',
    label: 'Biaya Daftar',
    description: 'Pendaftaran transparan'
  },
  {
    number: '10+',
    label: 'Hadiah Utama',
    description: 'Piala Bergilir & Tabanas'
  }
]

export default function EventStatsSection() {
  return (
    <section className="w-full bg-transparent pt-8 pb-8 lg:pt-12 lg:pb-12">
      <div className="max-w-6xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="text-5xl lg:text-6xl font-black text-primary tracking-tighter mb-4 leading-none group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                  {stat.label}
                </div>
                <div className="text-[14px] font-medium text-slate-600 leading-relaxed">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
