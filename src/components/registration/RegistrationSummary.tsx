import Icon from '../Icon.jsx'
import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'

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

  return [
    {
      key: 'bio',
      label: 'Biodata Peserta & Sekolah',
      done: hasText('nama_lengkap') && hasText('nama_sekolah') && hasText('kabupaten_kota'),
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

  const categoryValue = valueFor(config.categoryFieldName)
  const categoryLabel =
    config.categories.find((category) => category.value === categoryValue)?.label ?? '-- Belum Dipilih --'
  const schoolName =
    typeof values.nama_sekolah === 'string' && values.nama_sekolah.trim() !== ''
      ? values.nama_sekolah
      : '-- Belum Diisi --'
  const participantName =
    typeof values.nama_lengkap === 'string' && values.nama_lengkap.trim() !== ''
      ? values.nama_lengkap
      : '-- Belum Diisi --'
  const city = valueFor('kabupaten_kota') || '-- Belum Dipilih --'

  return (
    <aside className="lg:col-span-4 space-y-space-md lg:sticky lg:top-24">
      <div className="bg-surface border border-outline p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
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
          <SummaryRow highlight label="Kategori" value={categoryLabel} />
          <SummaryRow label="Nama Calon Peserta" value={participantName} />
          <SummaryRow label="Asal Sekolah / Madrasah" value={schoolName} />
          <SummaryRow label="Kabupaten / Kota" value={city} />
        </div>

        <div className="bg-surface-container-low border border-outline/50 p-4 rounded-xl mb-6 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
            <span>Infaq Musabaqah</span>
            <span>Standar 1 Peserta</span>
          </div>
          <div className="text-2xl font-extrabold text-primary mt-1.5">{config.fee}</div>
          <div className="text-xs text-secondary mt-2 flex items-start gap-1.5 font-medium">
            <Icon className="text-[16px] shrink-0" name="info" />
            <span className="leading-tight">{config.feeNote}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-outline/50">
          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
            Kelengkapan Form
          </div>
          {checklist.map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-2 text-sm ${
                item.done ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              <Icon
                className={`text-[18px] ${item.done ? 'text-primary' : 'text-outline'}`}
                name={item.done ? 'check_circle' : 'radio_button_unchecked'}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-outline p-5 rounded-xl shadow-sm flex items-start gap-4">
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