import useCountdown from '../hooks/useCountdown.js'
import { formatDate, isValidDate, padTwoDigits } from '../lib/format.js'
import { site } from '../data/site.js'

const UNITS = [
  { key: 'days', label: 'Hari' },
  { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' },
]

export default function CountdownTimer() {
  const { deadline, deadlineLabel } = site.registration
  const remaining = useCountdown(deadline)
  const hasDeadline = isValidDate(deadline)

  const label = hasDeadline ? formatDate(deadline) : deadlineLabel

  return (
    <div className="bg-primary text-on-primary rounded-xl p-space-md mb-space-md shadow-inner">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-1">
        <span className="text-sm font-bold text-white tracking-wide">
          {remaining?.isExpired ? 'Pendaftaran Ditutup' : 'Penutupan Pendaftaran Dalam:'}
        </span>
        <span className="text-xs font-semibold text-primary-fixed bg-black/20 px-2 py-0.5 rounded-md" title={hasDeadline ? formatDate(deadline) : undefined}>
          {label}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center pt-2" aria-live="off">
        {UNITS.map((unit) => (
          <div key={unit.key} className="bg-white rounded-xl py-3 px-1 shadow-sm border-b-2 border-primary-fixed">
            <span className="text-2xl lg:text-3xl font-extrabold text-primary block leading-none mb-1">
              {remaining ? padTwoDigits(remaining[unit.key]) : '--'}
            </span>
            <span className="text-[10px] lg:text-[11px] font-bold text-muted-foreground uppercase tracking-widest block">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
