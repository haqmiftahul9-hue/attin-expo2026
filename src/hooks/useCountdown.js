import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function getRemaining(target) {
  const timestamp = new Date(target).getTime()
  if (Number.isNaN(timestamp)) return null

  const diff = timestamp - Date.now()
  const clamped = Math.max(0, diff)

  return {
    total: clamped,
    days: Math.floor(clamped / DAY),
    hours: Math.floor((clamped % DAY) / HOUR),
    minutes: Math.floor((clamped % HOUR) / MINUTE),
    seconds: Math.floor((clamped % MINUTE) / SECOND),
    isExpired: diff <= 0,
  }
}

/**
 * Hitung mundur langsung menuju tanggal target (format ISO 8601).
 * Mengembalikan objek sisa waktu, atau null bila tanggal tidak valid.
 */
export default function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => getRemaining(target))

  useEffect(() => {
    setRemaining(getRemaining(target))
    if (Number.isNaN(new Date(target).getTime())) return undefined

    const id = window.setInterval(() => {
      setRemaining(getRemaining(target))
    }, 1000)

    return () => window.clearInterval(id)
  }, [target])

  return remaining
}
