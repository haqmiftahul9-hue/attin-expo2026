import type { CompetitionSlug, FormValues } from '../types/registration.js'

/**
 * Draf formulir disimpan di `localStorage` per cabang lomba agar peserta dapat
 * melanjutkan pengisian di browser yang sama. Tidak ada data sensitif yang
 * dikirim ke server pada tahap ini.
 */

const PREFIX = 'attin:registration-draft-v2:'

function storageKey(slug: CompetitionSlug): string {
  return `${PREFIX}${slug}`
}

export function saveRegistrationDraft(slug: CompetitionSlug, values: FormValues): void {
  if (typeof localStorage === 'undefined') return

  const serializable: Record<string, string | boolean> = {}
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'string' || typeof value === 'boolean') {
      serializable[key] = value
    }
  }

  try {
    localStorage.setItem(storageKey(slug), JSON.stringify(serializable))
  } catch {
    /* penyimpanan penuh atau ditolak browser — abaikan */
  }
}

export function loadRegistrationDraft(slug: CompetitionSlug): FormValues | null {
  if (typeof localStorage === 'undefined') return null

  try {
    const raw = localStorage.getItem(storageKey(slug))
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed as FormValues
  } catch {
    return null
  }
}

export function clearRegistrationDraft(slug: CompetitionSlug): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(storageKey(slug))
}
