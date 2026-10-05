import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Mengembalikan posisi gulir ke atas setiap kali rute berubah, dan
 * menggulir ke elemen target bila URL memuat hash (mis. /#kompetisi-resmi).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}