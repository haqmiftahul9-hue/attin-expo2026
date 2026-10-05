/**
 * Utilitas format tanggal berbahasa Indonesia tanpa dependensi eksternal.
 */

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
})

export function isValidDate(value) {
  return typeof value === 'string' && !Number.isNaN(new Date(value).getTime())
}

export function formatDate(value) {
  if (!isValidDate(value)) return value ?? ''
  return dateFormatter.format(new Date(value))
}

export function formatDateTime(value) {
  if (!isValidDate(value)) return value ?? ''
  return dateTimeFormatter.format(new Date(value))
}

export function padTwoDigits(value) {
  return String(value ?? 0).padStart(2, '0')
}
