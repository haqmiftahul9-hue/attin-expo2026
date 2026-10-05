import { useState } from 'react'

/**
 * Akordeon tanya-jawab. Beberapa item boleh dibuka bersamaan
 * (sesuai perilaku desain awal) dan seluruh item dapat ditutup.
 */
export default function FaqAccordion({ items, id }) {
  const [openItems, setOpenItems] = useState(() => new Set())

  const toggle = (index) => {
    setOpenItems((previous) => {
      const next = new Set(previous)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="space-y-space-sm" id={id}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index)
        const panelId = `faq-panel-${index}`

        return (
          <div key={item.question} className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-space-sm text-left focus:outline-none"
            >
              <span className="font-title-md text-title-md text-on-surface font-semibold">
                {item.question}
              </span>
              <span
                className={`material-symbols-outlined text-primary text-[24px] transform transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              hidden={!isOpen}
              className="mt-space-sm text-body-md text-outline leading-relaxed"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
