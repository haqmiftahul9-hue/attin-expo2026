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
  inputClassName,
  labelClassName,
  numberBadgeClassName,
  requiredClassName,
} from '../../lib/registrationStyles.js'

/** Tahap 3 — Sekolah & Guru Pendamping. */
export default function SchoolSection({ form }: { form: RegistrationFormApi }) {
  const { valueFor, setValue, errorFor, inputClassFor, selectClassFor, textareaClassFor } = form

  return (
    <section className={cardClassName}>
      <div className={cardHeaderClassName}>
        <span className={numberBadgeClassName}>03</span>
        <div>
          <h2 className={cardTitleClassName}>Utusan Madrasah &amp; Guru Pembimbing</h2>
          <p className={cardCaptionClassName}>
            Lembaga pengutus serta pendamping resmi peserta musabaqah di Sumatera Barat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div className="md:col-span-2">
          <label className={labelClassName} htmlFor={fieldId('nama_sekolah')}>
            Nama Madrasah / SD Islam / Sekolah Dasar Asal <span className={requiredClassName}>*</span>
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
          <label className={labelClassName} htmlFor={fieldId('npsn')}>
            Nomor Pokok Sekolah Nasional (NPSN) <span className="text-outline font-caption">(Opsional)</span>
          </label>
          <input
            className={inputClassName}
            id={fieldId('npsn')}
            inputMode="numeric"
            maxLength={8}
            name="npsn"
            onChange={(event) => setValue('npsn', event.target.value.replace(/\D/g, ''))}
            placeholder="8 digit angka NPSN"
            type="text"
            value={valueFor('npsn')}
          />
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

        <div>
          <label className={labelClassName} htmlFor={fieldId('guru_pembimbing')}>
            Nama Ustadz / Guru Pembimbing <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('guru_pembimbing')}
            id={fieldId('guru_pembimbing')}
            name="guru_pembimbing"
            onChange={(event) => setValue('guru_pembimbing', event.target.value)}
            placeholder="Contoh: Ustadz H. Rahmad Dani, S.Pd.I"
            type="text"
            value={valueFor('guru_pembimbing')}
          />
          {errorFor('guru_pembimbing') ? <p className={errorTextClassName}>{errorFor('guru_pembimbing')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('kontak_wa_guru')}>
            Nomor WhatsApp Pendamping (Aktif) <span className={requiredClassName}>*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-space-md text-outline font-body-md-semibold text-body-md">
              +62
            </div>
            <input
              className={`${inputClassFor('kontak_wa_guru')} pl-14`}
              id={fieldId('kontak_wa_guru')}
              inputMode="tel"
              name="kontak_wa_guru"
              onChange={(event) => setValue('kontak_wa_guru', event.target.value)}
              placeholder="812-3456-7890"
              type="tel"
              value={valueFor('kontak_wa_guru')}
            />
          </div>
          <span className="font-caption text-caption text-outline">
            Untuk verifikasi grup briefing dan jadwal pemanggilan panggung
          </span>
          {errorFor('kontak_wa_guru') ? <p className={errorTextClassName}>{errorFor('kontak_wa_guru')}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className={labelClassName} htmlFor={fieldId('email_sekolah')}>
            Alamat Email Resmi Sekolah / Official Koordinator <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('email_sekolah')}
            id={fieldId('email_sekolah')}
            name="email_sekolah"
            onChange={(event) => setValue('email_sekolah', event.target.value)}
            placeholder="admin@sekolahmadrasah.sch.id"
            type="email"
            value={valueFor('email_sekolah')}
          />
          {errorFor('email_sekolah') ? <p className={errorTextClassName}>{errorFor('email_sekolah')}</p> : null}
        </div>
      </div>
    </section>
  )
}
