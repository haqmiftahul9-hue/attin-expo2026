import Icon from '../Icon.jsx'
import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import { calculateDynamicFee } from '../../lib/registrationUtils.js'

interface ChecklistItem {
  key: string
  label: string
  done: boolean
}

function getChecklist(form: RegistrationFormApi): ChecklistItem[] {
  const { values, fileFor, isChecked } = form
  const hasText = (name: string) => {
    const value = values[name]
    return typeof value === 'string' && value.trim() !== ''
  }

  const isTahfizh = form.config.slug === 'tahfizh'
  const isBioDone = isTahfizh 
    ? (hasText('nama_pa') || hasText('nama_pi')) && hasText('nama_sekolah')
    : hasText('nama_lengkap') && hasText('nama_sekolah')

  return [
    {
      key: 'bio',
      label: 'Identitas Peserta & Sekolah',
      done: isBioDone,
    },
    { key: 'pay', label: 'Bukti Transfer', done: fileFor('bukti_transfer') !== null },
    {
      key: 'rule',
      label: 'Persetujuan Pakta Integritas (3 butir)',
      done: isChecked('persetujuan_1') && isChecked('persetujuan_2') && isChecked('persetujuan_3'),
    },
  ]
}

function SummaryRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col pb-space-xs">
      <span className="text-on-surface-variant font-caption">{label}</span>
      <span
        className={`font-body-md-semibold text-body-md ${highlight ? 'text-primary' : 'text-on-surface'} break-words`}
      >
        {value}
      </span>
    </div>
  )
}

/** Ringkasan draf secara realtime + kontak bantuan (kolom kanan, sticky). */
export default function RegistrationSummary({ form }: { form: RegistrationFormApi }) {
  const { config, valueFor, values } = form
  const checklist = getChecklist(form)
  const calculatedFee = calculateDynamicFee(config, values)

  const categoryValue = valueFor(config.categoryFieldName)
  const categoryLabel =
    config.categories.find((category) => category.value === categoryValue)?.label ?? '-- Belum Dipilih --'
  const schoolName =
    typeof values.nama_sekolah === 'string' && values.nama_sekolah.trim() !== ''
      ? values.nama_sekolah
      : '-- Belum Diisi --'
  const guruPendamping =
    typeof values.guru_pendamping === 'string' && values.guru_pendamping.trim() !== ''
      ? values.guru_pendamping
      : '-- Belum Diisi --'
      
  let participantName = '-- Belum Diisi --'
  if (config.slug === 'tahfizh') {
    const pa = typeof values.nama_pa === 'string' && values.nama_pa.trim() !== '' ? values.nama_pa : '?'
    const pi = typeof values.nama_pi === 'string' && values.nama_pi.trim() !== '' ? values.nama_pi : '?'
    if (pa !== '?' || pi !== '?') {
      participantName = `Pa: ${pa}, Pi: ${pi}`
    }
  } else if (typeof values.nama_lengkap === 'string' && values.nama_lengkap.trim() !== '') {
    participantName = values.nama_lengkap
  }

  

  return (
    <aside className="lg:col-span-4 space-y-space-md lg:sticky lg:top-24">
      <div className="bg-white border border-slate-900/10 p-6 rounded-[20px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-slate-900/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline/50">
          <div className="flex items-center gap-space-xs">
            <Icon className="text-primary text-[20px]" name="receipt" />
            <h3 className="text-base font-bold text-primary tracking-tight">Draf Registrasi</h3>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-[0.1em]">
            Sumbar 2026
          </span>
        </div>

        <div className="space-y-3 text-sm mb-6">
          <SummaryRow highlight label="Cabang Lomba" value={config.fullName} />
          {config.categories.length > 0 || config.specificFields.some(f => f.name === config.categoryFieldName) ? (
            <SummaryRow highlight label="Kategori" value={categoryLabel} />
          ) : null}
          <SummaryRow label="Jumlah Peserta" value={`${calculatedFee.count} Peserta`} />
          <SummaryRow label="Nama Calon Peserta" value={participantName} />
          <SummaryRow label="Asal Sekolah / Madrasah" value={schoolName} />
          <SummaryRow label="Guru Pendamping" value={guruPendamping} />
          <SummaryRow label="Biaya per Peserta" value={`Rp${new Intl.NumberFormat('id-ID').format(calculatedFee.unitFee)}`} />
        </div>

        <div className="bg-[#F8FAFC] border border-slate-900/10 p-4 rounded-[16px] mb-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between text-[14px] font-bold text-slate-600 uppercase tracking-widest">
            <span>Total Biaya</span>
            <span className="text-xs normal-case font-normal text-slate-500">{calculatedFee.label}</span>
          </div>
          <div className="text-2xl font-extrabold text-primary mt-1.5">
            {calculatedFee.amount}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-outline/50">
          <div className="text-[14px] font-bold text-slate-600 uppercase tracking-widest mb-3">
            Kelengkapan Form
          </div>
          {checklist.map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-2 text-sm ${
                item.done ? 'text-primary font-bold' : 'text-slate-600'
              }`}
            >
              <Icon
                className={`text-[18px] ${item.done ? 'text-primary' : 'text-slate-400'}`}
                name={item.done ? 'check_circle' : 'radio_button_unchecked'}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-900/10 p-5 rounded-[20px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] flex items-start gap-4 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition-shadow">
        <div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
          <Icon className="text-[20px]" name="chat" />
        </div>
        <div className="space-y-space-xs flex-1">
          <h4 className="font-title-md text-body-md-semibold text-primary">Kendala Registrasi?</h4>
          <p className="font-caption text-caption text-on-surface-variant leading-relaxed">
            Hubungi {config.contact.person} via WhatsApp jika membutuhkan bantuan teknis form.
          </p>
          <div className="pt-space-xs">
            <a
              className="inline-flex items-center gap-1 font-body-md-semibold text-caption text-secondary hover:text-on-secondary-container transition-colors break-all"
              href={config.contact.whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Chat Panitia: {config.contact.whatsapp}</span>
              <Icon className="text-[14px] shrink-0" name="arrow_outward" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-xl p-space-md">
        <div className="flex items-center gap-space-xs text-primary mb-1">
          <Icon className="text-[18px]" name="menu_book" />
          <span className="font-label-badge text-label-badge uppercase tracking-wider">Adab Penuntut Ilmu</span>
        </div>
        <p className="font-caption text-caption text-on-surface-variant italic leading-relaxed">
          “Menuntut ilmu dan mengagungkan Al-Qur’an adalah perniagaan yang tidak pernah merugi. Tanamkan niat ikhlas
          lillahi ta’ala di setiap langkah delegasi.”
        </p>
      </div>
    </aside>
  )
}
