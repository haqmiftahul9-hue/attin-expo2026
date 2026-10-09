import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import {
  cardCaptionClassName,
  cardClassName,
  cardHeaderClassName,
  cardTitleClassName,
  errorTextClassName,
  fieldId,
  labelClassName,
  numberBadgeClassName,
  requiredClassName,
} from '../../lib/registrationStyles.js'

/** Tahap 3 ?" Identitas Sekolah. */
export default function SchoolSection({ form }: { form: RegistrationFormApi }) {
  const { valueFor, setValue, errorFor, inputClassFor, textareaClassFor } = form

  return (
    <section className={cardClassName}>
      <div className={cardHeaderClassName}>
        <span className={numberBadgeClassName}>03</span>
        <div>
          <h2 className={cardTitleClassName}>Identitas Sekolah</h2>
          <p className={cardCaptionClassName}>
            Lembaga pengutus serta pendamping resmi peserta musabaqah di Sumatera Barat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div className="md:col-span-2">
          <label className={labelClassName} htmlFor={fieldId('nama_sekolah')}>
            Nama Sekolah / Madrasah <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('nama_sekolah')}
            id={fieldId('nama_sekolah')}
            name="nama_sekolah"
            onChange={(event) => setValue('nama_sekolah', event.target.value)}
            placeholder="Contoh: SDIT At-Tin Islamic School Padang"
            type="text"
            value={valueFor('nama_sekolah')}
          />
          {errorFor('nama_sekolah') ? <p className={errorTextClassName}>{errorFor('nama_sekolah')}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className={labelClassName} htmlFor={fieldId('alamat_sekolah')}>
            Alamat Lengkap Instansi Pendidikan <span className={requiredClassName}>*</span>
          </label>
          <textarea
            className={textareaClassFor('alamat_sekolah')}
            id={fieldId('alamat_sekolah')}
            name="alamat_sekolah"
            onChange={(event) => setValue('alamat_sekolah', event.target.value)}
            placeholder="Nama Jalan, Kelurahan/Nagari, Kecamatan, Kode Pos"
            rows={2}
            value={valueFor('alamat_sekolah')}
          />
          {errorFor('alamat_sekolah') ? <p className={errorTextClassName}>{errorFor('alamat_sekolah')}</p> : null}
        </div>
      </div>
    </section>
  )
}