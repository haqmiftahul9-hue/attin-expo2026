import Icon from '../Icon.jsx'
import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import { sumbarRegions } from '../../data/branchDetail.js'
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

/** Tahap 3 — Identitas Sekolah. */
export default function SchoolSection({ form }: { form: RegistrationFormApi }) {
  const { valueFor, setValue, errorFor, inputClassFor, selectClassFor, textareaClassFor } = form

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

        <div>
          <label className={labelClassName} htmlFor={fieldId('kabupaten_kota')}>
            Kabupaten / Kota Asal (Ranah Minang) <span className={requiredClassName}>*</span>
          </label>
          <div className="relative">
            <select
              className={selectClassFor('kabupaten_kota')}
              id={fieldId('kabupaten_kota')}
              name="kabupaten_kota"
              onChange={(event) => setValue('kabupaten_kota', event.target.value)}
              value={valueFor('kabupaten_kota')}
            >
              <option value="">Pilih dari 19 Kota/Kabupaten</option>
              {sumbarRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-space-md pointer-events-none text-outline">
              <Icon className="text-[20px]" name="expand_more" />
            </div>
          </div>
          {errorFor('kabupaten_kota') ? <p className={errorTextClassName}>{errorFor('kabupaten_kota')}</p> : null}
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