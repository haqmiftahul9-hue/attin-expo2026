import { useEffect } from 'react'

/** Mengatur judul tab browser sesuai halaman yang sedang dibuka. */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}