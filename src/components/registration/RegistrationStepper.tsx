const STAGES = [
  { number: 1, label: 'Tahap 1', title: 'Bidang Musabaqah' },
  { number: 2, label: 'Tahap 2', title: 'Biodata Peserta' },
  { number: 3, label: 'Tahap 3', title: 'Identitas Sekolah' },
  { number: 4, label: 'Tahap 4', title: 'Pembayaran' },
  { number: 5, label: 'Tahap 5', title: 'Pengesahan' },
] as const

const CIRCLE_CLASSES = {
  done: 'bg-[#e8f1ff] text-[#003772]',
  active: 'bg-[#003772] text-[#ffffff] shadow-md',
  pending: 'bg-[#e8f1ff] border border-[#0057b8] text-[#0057b8]',
} as const

const LABEL_CLASSES = {
  done: 'text-[#191c1e] font-bold',
  active: 'text-[#003772] font-bold',
  pending: 'text-[#0057b8] font-semibold',
} as const

const TITLE_CLASSES = {
  done: 'text-[#191c1e] font-semibold',
  active: 'text-[#191c1e] font-bold',
  pending: 'text-[#334155] font-semibold',
} as const

const LINE_CLASSES = {
  done: 'bg-[#b1c5f6]',
  active: 'bg-[#b1c5f6]',
  pending: 'bg-[#b1c5f6]',
} as const

/** Pita proses 5 tahap (identik dengan desain referensi). */
export default function RegistrationStepper() {
  return (
    <section className="mb-space-xl overflow-x-auto pb-space-xs" aria-label="Tahapan formulir">
      <ol className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm min-w-[620px] flex items-center justify-between">
        {STAGES.map((stage, index) => {
          const state = stage.number === 1 ? 'done' : stage.number === 2 ? 'active' : 'pending'

          return (
            <li key={stage.number} className="flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className={`h-0.5 w-6 ${LINE_CLASSES[state]}`} />
              ) : null}
              <div className="flex items-center gap-space-xs">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-body-md-semibold text-caption ${CIRCLE_CLASSES[state]}`}
                >
                  {stage.number}
                </div>
                <div className="flex flex-col">
                  <span className={`font-label-badge text-label-badge uppercase ${LABEL_CLASSES[state]}`}>
                    {stage.label}
                  </span>
                  <span className={`font-caption text-caption ${TITLE_CLASSES[state]}`}>{stage.title}</span>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
