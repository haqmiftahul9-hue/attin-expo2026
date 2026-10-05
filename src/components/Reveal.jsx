import { useEffect, useRef, useState } from 'react'

/**
 * Membungkus anak elemen dengan animasi muncul saat elemen masuk viewport.
 * Fallback aman: tanpa IntersectionObserver (atau saat pengguna mengaktifkan
 * reduced motion) konten langsung ditampilkan.
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
