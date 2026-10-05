import MaterialIcon from '../MaterialIcon.jsx'
import { textTone } from '../../lib/tones.js'

export default function RulesSection({ rules }) {
  return (
    <section id="regulasi" className="w-full bg-surface-container-low py-16 sm:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
            {rules.badge}
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface">{rules.title}</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">{rules.body}</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {rules.items.map((rule) => (
            <div key={rule.title} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-3">
              <div className={`flex items-center gap-3 ${textTone[rule.tone]}`}>
                <MaterialIcon name={rule.icon} className="text-[26px]" />
                <h3 className="text-title-md font-title-md font-semibold text-on-surface">{rule.title}</h3>
              </div>
              <p className="text-body-md font-body-md text-on-surface-variant">{rule.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}