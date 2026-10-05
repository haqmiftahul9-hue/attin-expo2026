import { useEffect, useState } from 'react'

/**
 * Scroll-spy sederhana: menentukan seksi terakhir yang sudah melewati
 * batas atas viewport (dengan toleransi offset untuk header fixed).
 */
export default function useActiveSection(ids, offset = 150) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)

  useEffect(() => {
    if (typeof window === 'undefined' || ids.length === 0) return undefined

    let frame = null

    const update = () => {
      frame = null
      const position = window.scrollY + offset
      let current = ids[0]

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        const top = element.getBoundingClientRect().top + window.scrollY
        if (top <= position) current = id
      }

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1]

      setActiveId((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [ids, offset])

  return activeId
}
