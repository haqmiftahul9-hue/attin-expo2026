import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import {
  cardCaptionClassName,
  cardClassName,
  cardHeaderClassName,
  cardTitleClassName,
  errorTextClassName,
  fieldId,
  helperClassName,
  labelClassName,
  numberBadgeClassName,
  requiredClassName,
} from '../../lib/registrationStyles.js'

/** Tahap 2 — Biodata Peserta. */
export default function ParticipantSection({ form }: { form: RegistrationFormApi }) {
  const { config, valueFor, setValue, errorFor, inputClassFor, textareaClassFor } = form
  const isTahfizh = config.slug === 'tahfizh'

  return (
    <section className={cardClassName}>
      <div className={cardHeaderClassName}>
        <span className={numberBadgeClassName}>02</span>
        <div>
          <h2 className={cardTitleClassName}>Identitas Peserta</h2>
          <p className={cardCaptionClassName}>
            {isTahfizh
              ? 'Masukkan nama utusan (boleh 1 Putra saja, 1 Putri saja, atau keduanya).'
              : 'Tambahkan nama utusan ke bawah (baris baru) jika lebih dari satu.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {isTahfizh ? (
          <>
            <div>
              <label className={labelClassName} htmlFor={fieldId('nama_pa')}>
                Nama Peserta Putra (Pa) <span className={requiredClassName}>*</span>
              </label>
              <input
                className={inputClassFor('nama_pa')}
                id={fieldId('nama_pa')}
                name="nama_pa"
                onChange={(event) => setValue('nama_pa', event.target.value)}
                placeholder="Nama Lengkap Putra"
                type="text"
                value={valueFor('nama_pa')}
              />
              {errorFor('nama_pa') ? <p className={errorTextClassName}>{errorFor('nama_pa')}</p> : null}
            </div>
            <div>
              <label className={labelClassName} htmlFor={fieldId('nama_pi')}>
                Nama Peserta Putri (Pi) <span className={requiredClassName}>*</span>
              </label>
              <input
                className={inputClassFor('nama_pi')}
                id={fieldId('nama_pi')}
                name="nama_pi"
                onChange={(event) => setValue('nama_pi', event.target.value)}
                placeholder="Nama Lengkap Putri"
                type="text"
                value={valueFor('nama_pi')}
              />
              {errorFor('nama_pi') ? <p className={errorTextClassName}>{errorFor('nama_pi')}</p> : null}
            </div>
          </>
        ) : (
          <div className="md:col-span-2">
            <label className={labelClassName} htmlFor={fieldId('nama_lengkap')}>
              Daftar Nama Peserta <span className={requiredClassName}>*</span>
            </label>
            <textarea
              className={textareaClassFor('nama_lengkap')}
              id={fieldId('nama_lengkap')}
              name="nama_lengkap"
              rows={4}
              onChange={(event) => setValue('nama_lengkap', event.target.value)}
              placeholder="1. Nama Peserta Pertama&#10;2. Nama Peserta Kedua (Tekan Enter/Baris Baru untuk menambah utusan)"
              value={valueFor('nama_lengkap')}
            />
            <p className={helperClassName}>
              Masukkan satu nama per baris. Sistem otomatis menghitung total biaya berdasarkan jumlah nama yang dimasukkan.
            </p>
            {errorFor('nama_lengkap') ? <p className={errorTextClassName}>{errorFor('nama_lengkap')}</p> : null}
          </div>
        )}

        
      </div>
    </section>
  )
}
