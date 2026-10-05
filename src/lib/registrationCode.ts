/**
 * Generator kode registrasi unik, contoh: `ATXII-THF-4KD9`.
 * Alfabet menghindari karakter ambigu (I/O/0/1) agar kode mudah dibaca/dicatat.
 */

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const SUFFIX_LENGTH = 4

function randomSuffix(length: number): string {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('')
}

export function generateRegistrationCode(prefix: string): string {
  return `${prefix}-${randomSuffix(SUFFIX_LENGTH)}`
}
