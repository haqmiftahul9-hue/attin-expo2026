import MaterialIcon from '../MaterialIcon.jsx'
import { textTone } from '../../lib/tones.js'

export default function QuickFacts({ facts }) {
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-white border border-white/30 rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <dt className="text-caption font-caption text-on-surface-variant flex items-center gap-1 mb-1">
                <MaterialIcon name={fact.icon} className={`text-[16px] ${textTone[fact.iconTone ?? 'primary']}`} />
                {fact.label}
              </dt>
              <dd
                className={`text-body-md-semibold font-body-md-semibold ${textTone[fact.valueTone]} ${
                  fact.valueTone === 'secondary' ? 'font-bold' : ''
                } ${fact.label === 'Lokasi' ? 'truncate' : ''}`}
                title={fact.label === 'Lokasi' ? fact.value : undefined}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
