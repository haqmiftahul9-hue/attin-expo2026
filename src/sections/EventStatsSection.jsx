import MaterialIcon from '../components/MaterialIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { eventStats } from '../data/home.js'

export default function EventStatsSection() {
  return (
    <section className="w-full bg-surface-container-lowest py-space-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-margin-desktop">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {eventStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface-container-low shadow-sm"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.iconClassName}`}
                >
                  <MaterialIcon name={stat.icon} className="text-[26px]" />
                </div>
                <div>
                  <div className={`font-headline-md text-headline-md font-bold ${stat.valueClassName}`}>
                    {stat.value}
                  </div>
                  <div className="font-caption text-caption text-outline">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
