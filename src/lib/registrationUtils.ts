import type { RegistrationConfig, FormValues } from '../types/registration.js'

export function calculateDynamicFee(config: RegistrationConfig | undefined, values: FormValues | undefined): { amount: string, label: string } {
  if (!config || !values) {
    return { amount: 'Belum ditentukan', label: 'Standar 1 Peserta' }
  }

  if (config.slug === 'tahfizh') {
    return { amount: 'Rp 70.000', label: '1 Putra & 1 Putri (Rp 35.000/orang)' }
  }
  
  const lines = (typeof values.nama_lengkap === 'string' ? values.nama_lengkap : '')
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0)
  
  const count = Math.max(1, lines.length)
  
  if (config.slug === 'pra-tka') {
    const isBeregu = values[config.categoryFieldName] === 'pra-tka-beregu'
    if (isBeregu) {
      const total = count * 75000
      return { amount: `Rp ${total.toLocaleString('id-ID')}`, label: `${count} Regu (${count * 3} Peserta)` }
    } else {
      const total = count * 25000
      return { amount: `Rp ${total.toLocaleString('id-ID')}`, label: `${count} Peserta (Rp 25.000/orang)` }
    }
  }
  
  if (config.slug === 'panahan') {
    const total = count * 65000
    return { amount: `Rp ${total.toLocaleString('id-ID')}`, label: `${count} Peserta (Rp 65.000/orang)` }
  }
  
  return { amount: config.fee, label: 'Standar 1 Peserta' }
}
