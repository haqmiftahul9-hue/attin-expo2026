import Icon from '../Icon.jsx'
import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import { fieldId, errorTextClassName } from '../../lib/registrationStyles.js'

const STATEMENTS = [
  {
    name: 'persetujuan_1',
    text: 'Saya menyatakan dengan sebenar-benarnya bahwa seluruh biodata santri/siswa serta berkas utusan yang dilampirkan adalah valid, otentik, dan sesuai jenjang pendidikan SD/MI berjalan tahun ajaran 2025/2026.',
  },
  {
    name: 'persetujuan_2',
    text: 'Peserta, pembimbing, dan orang tua santri bersedia mematuhi tata tertib musabaqah, menjunjung tinggi adab Islami, serta menerima secara lapang dada keputusan majelis dewan juri/hakim yang bersifat mutlak.',
  },
  {
    name: 'persetujuan_3',
    text: 'Pendaftaran ini telah diketahui serta disetujui secara resmi oleh Kepala Madrasah/Sekolah dan orang tua/wali santri yang bersangkutan.',
  },
] as const

interface DeclarationSectionProps {
  form: RegistrationFormApi
  isSubmitting: boolean
  notice: string | null
  onSubmitDraft: () => void
}

/** Tahap 7 — Pengesahan & Pakta Integritas. */
export default function DeclarationSection({
  form,
  isSubmitting,
  notice,
  onSubmitDraft,
}: DeclarationSectionProps) {
  return (
    <section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
      <div className="flex items-center gap-space-sm pb-space-sm mb-space-md">
        <span className="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-body-md-semibold text-caption">
          07
        </span>
        <div>
          <h2 className="font-headline-sm text-headline-sm text-primary">Pengesahan &amp; Pakta Integritas</h2>
          <p className="font-caption text-caption text-on-surface-variant">
            Centang seluruh butir persetujuan demi ketertiban adab dan sportivitas kompetisi.
          </p>
        </div>
      </div>

      <div className="space-y-space-md mb-space-lg">
        {STATEMENTS.map((statement) => {
          const checked = form.isChecked(statement.name)

          return (
            <div key={statement.name}>
              <label className="flex items-start gap-space-sm cursor-pointer select-none">
                <input
                  checked={checked}
                  className="mt-1 w-5 h-5 rounded text-primary focus:ring-0 cursor-pointer"
                  id={fieldId(statement.name)}
                  name={statement.name}
                  onChange={(event) => form.setValue(statement.name, event.target.checked)}
                  type="checkbox"
                />
                <span className="font-body-md text-body-md text-on-surface">{statement.text}</span>
              </label>
              {form.errorFor(statement.name) ? (
                <p className={errorTextClassName}>{form.errorFor(statement.name)}</p>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-space-md pt-space-md">
        <button
          className="w-full sm:flex-1 h-12 bg-primary hover:bg-primary-container text-on-primary font-body-md-semibold text-body-md rounded-xl shadow-md transition-all flex items-center justify-center gap-space-xs disabled:opacity-80 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          id="btnKirimPendaftaran"
          type="submit"
        >
          {isSubmitting ? (
            <>
              <Icon className="animate-spin text-[20px]" name="progress_activity" />
              Mengirim Pendaftaran...
            </>
          ) : (
            <>
              <Icon className="text-[20px]" name="how_to_reg" />
              Kirimkan Formulir Pendaftaran
            </>
          )}
        </button>

        <button
          className="w-full sm:w-auto px-space-lg h-12 bg-surface-container-high hover:bg-surface-container text-on-surface font-body-md-semibold text-body-md rounded-xl transition-all flex items-center justify-center gap-space-xs"
          onClick={onSubmitDraft}
          type="button"
        >
          <Icon className="text-[18px]" name="save" />
          Simpan Draf Isian
        </button>
      </div>

      {notice ? (
        <p aria-live="polite" className="font-caption text-caption text-secondary text-center mt-space-sm" role="status">
          {notice}
        </p>
      ) : (
        <p className="font-caption text-caption text-center text-outline mt-space-sm">
          Notifikasi kode registrasi dan kartu panggung akan dikirimkan otomatis via WhatsApp &amp; Email resmi tertera.
        </p>
      )}
    </section>
  )
}
