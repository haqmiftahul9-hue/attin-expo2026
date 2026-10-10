
const STAGES = [
  { number: 1, label: "Tahap 1", title: "Bidang Lomba" },
  { number: 2, label: "Tahap 2", title: "Biodata Peserta" },
  { number: 3, label: "Tahap 3", title: "Identitas Sekolah" },
  { number: 4, label: "Tahap 4", title: "Pembayaran" },
  { number: 5, label: "Tahap 5", title: "Pengesahan" },
] as const

const CIRCLE_CLASSES = {
  done: "bg-[#8B1E3F] text-white shadow-sm",
  active: "bg-[#061B33] text-white shadow-md",
  pending: "bg-slate-100 text-slate-500 border border-slate-200",
} as const

const LABEL_CLASSES = {
  done: "text-[#8B1E3F] font-bold",
  active: "text-[#061B33] font-bold",
  pending: "text-slate-500 font-semibold",
} as const

const TITLE_CLASSES = {
  done: "text-slate-700 font-semibold",
  active: "text-slate-900 font-bold",
  pending: "text-slate-500 font-semibold",
} as const

const LINE_CLASSES = {
  done: "bg-[#8B1E3F]",
  active: "bg-[#061B33]/20",
  pending: "bg-slate-200",
} as const

/** Pita proses 5 tahap (identik dengan desain referensi). */
export default function RegistrationStepper({ currentStep = 2 }: { currentStep?: number }) {
  return (
    <section className="mb-space-xl overflow-x-auto pb-space-xs" aria-label="Tahapan formulir">
      <ol className="bg-white border border-slate-900/10 rounded-[20px] p-space-md shadow-[0_10px_30px_rgba(15,23,42,0.05)] min-w-[620px] flex items-center justify-between">
        {STAGES.map((stage, index) => {
          const state = stage.number < currentStep ? "done" : stage.number === currentStep ? "active" : "pending"

          return (
            <li key={stage.number} className="flex flex-1 items-center justify-center relative">
              {index > 0 ? (
                <span aria-hidden="true" className={`absolute -left-6 top-1/2 -translate-y-1/2 h-0.5 w-8 ${LINE_CLASSES[state]}`} />
              ) : null}
              <div className="flex items-center gap-space-xs relative z-10 bg-white pr-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-body-md-semibold text-caption transition-colors ${CIRCLE_CLASSES[state]}`}
                >
                  {state === "done" ? <span className="material-symbols-outlined text-[16px]">check</span> : stage.number}
                </div>
                <div className="flex flex-col">
                  <span className={`font-label-badge text-label-badge uppercase transition-colors ${LABEL_CLASSES[state]}`}>
                    {stage.label}
                  </span>
                  <span className={`font-caption text-caption transition-colors ${TITLE_CLASSES[state]}`}>{stage.title}</span>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

