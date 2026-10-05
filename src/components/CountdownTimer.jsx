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
      <div className="flex items-center justify-between mb-space-xs">
        <span className="font-label-md text-label-md text-tertiary-fixed">
          {remaining?.isExpired ? 'Pendaftaran Ditutup' : 'Penutupan Pendaftaran Dalam:'}
        </span>
        <span className="font-caption text-caption text-surface-variant" title={hasDeadline ? formatDate(deadline) : undefined}>
          {label}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-space-xs text-center pt-space-xs" aria-live="off">
        {UNITS.map((unit) => (
          <div key={unit.key} className="bg-primary-container/80 rounded-lg p-space-xs">
            <span className="font-headline-md text-headline-md block font-bold">
              {remaining ? padTwoDigits(remaining[unit.key]) : '--'}
            </span>
            <span className="font-caption text-caption text-tertiary-fixed block">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
