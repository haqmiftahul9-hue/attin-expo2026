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
  } else {
    // Olimpiade, Panahan, dan Kolase: setiap nama yang terisi = 1 peserta.
    // Kolase juga dihitung per nama (1 nama = 1 kolase: 1 anak + 1 orang tua)
    // agar total biaya menyesuaikan jumlah peserta yang didaftarkan.
    const lines = (typeof values.nama_lengkap === 'string' ? values.nama_lengkap : '')
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    count = lines.length
  }

  const safeCount = Math.max(0, count)
  const totalFee = safeCount * unitFee

  const formatIdr = (num: number) => new Intl.NumberFormat('id-ID').format(num)

  const unitLabel = config.slug === 'kolase' ? 'kolase' : 'orang'
  let label = `${safeCount} Peserta (Rp${formatIdr(unitFee)}/${unitLabel})`

  return {
    amount: `Rp${formatIdr(totalFee)}`,
    label,
    count: safeCount,
    unitFee,
    totalFee,
  }
}

