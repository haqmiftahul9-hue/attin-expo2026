import MaterialIcon from '../MaterialIcon.jsx'
import { textTone } from '../../lib/tones.js'

export default function RulesSection({ rules }) {
  return (
    <section id="regulasi" className="w-full py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
              {rules.badge}
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">{rules.title}</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">{rules.body}</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {rules.items.map((rule) => (
              <div key={rule.title} className="bg-white border border-white/30 rounded-[20px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] space-y-3 transition-all duration-300 hover:border-white/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                <div className={`flex items-center gap-3 ${textTone[rule.tone]}`}>
                  <MaterialIcon name={rule.icon} className="text-[26px]" />
                  <h3 className="text-title-md font-title-md font-semibold text-on-surface">{rule.title}</h3>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant">{rule.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
