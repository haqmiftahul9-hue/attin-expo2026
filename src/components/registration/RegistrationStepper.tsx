const STAGES = [
  { number: 1, label: 'Tahap 1', title: 'Bidang Musabaqah' },
  { number: 2, label: 'Tahap 2', title: 'Biodata Santri' },
  { number: 3, label: 'Tahap 3', title: 'Utusan Sekolah' },
  { number: 4, label: 'Tahap 4', title: 'Data Wali' },
  { number: 5, label: 'Tahap 5', title: 'Dokumen' },
  { number: 6, label: 'Tahap 6', title: 'Administrasi' },
  { number: 7, label: 'Tahap 7', title: 'Pengesahan' },
] as const

const CIRCLE_CLASSES = {
  done: 'bg-primary text-on-primary shadow-sm',
  active: 'bg-primary-container text-on-primary',
  pending: 'bg-surface-container-high text-on-surface-variant',
} as const

const LABEL_CLASSES = {
  done: 'text-primary',
  active: 'text-primary-container',
  pending: 'text-outline',
} as const

const TITLE_CLASSES = {
  done: 'text-on-surface font-body-md-semibold',
  active: 'text-on-surface font-body-md-semibold',
  pending: 'text-on-surface-variant',
} as const

const LINE_CLASSES = {
  done: 'bg-primary-container',
  active: 'bg-primary-container',
  pending: 'bg-surface-container-highest',
} as const

/** Pita proses 7 tahap (identik dengan desain referensi). */
export default function RegistrationStepper() {
  return (
    <section className="mb-space-xl overflow-x-auto pb-space-xs" aria-label="Tahapan formulir">
      <ol className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm min-w-[780px] flex items-center justify-between">
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
