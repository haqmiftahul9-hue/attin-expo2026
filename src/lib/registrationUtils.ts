import type { RegistrationConfig, FormValues } from '../types/registration.js'

export function calculateDynamicFee(config: RegistrationConfig | undefined, values: FormValues | undefined) {
  if (!config || !values) {
    return { amount: 'Rp0', label: '0 Peserta', count: 0, unitFee: 0, totalFee: 0 }
  }

  let count = 0
  let unitFee = typeof config.fee === 'number' ? config.fee : 0

  if (config.slug === 'tahfizh') {
    const pa = typeof values.nama_pa === 'string' ? values.nama_pa.trim() : ''
    const pi = typeof values.nama_pi === 'string' ? values.nama_pi.trim() : ''
    if (pa) count++
    if (pi) count++
  } else if (config.slug === 'futsal') {
    // Futsal: satu pendaftaran = satu tim, biaya flat per tim.
    const lines = (typeof values.nama_lengkap === 'string' ? values.nama_lengkap : '')
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    count = lines.length > 0 ? 1 : 0
  } else {
    // Olimpiade, Panahan, Kolase, Pra-TKA, Baca Puisi: setiap nama yang terisi = 1 peserta.
    const lines = (typeof values.nama_lengkap === 'string' ? values.nama_lengkap : '')
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    count = lines.length
  }

  const formatIdr = (num: number) => new Intl.NumberFormat('id-ID').format(num)

  const unitLabel = config.slug === 'kolase' ? 'kolase' : config.slug === 'futsal' ? 'tim' : 'orang'
  const safeCount = Math.max(0, count)
  const totalFee = safeCount * unitFee
  const countLabel = config.slug === 'futsal' ? (safeCount > 0 ? '1 Tim' : '0 Tim') : `${safeCount} Peserta`
  let label = `${countLabel} (Rp${formatIdr(unitFee)}/${unitLabel})`

  return {
    amount: `Rp${formatIdr(totalFee)}`,
    label,
    count: safeCount,
    unitFee,
    totalFee,
  }
}

