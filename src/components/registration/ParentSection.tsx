import Icon from '../Icon.jsx'
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

const RELATION_OPTIONS = ['Ayah Kandung', 'Ibu Kandung', 'Wali / Kerabat Sah']

/** Tahap 4 — Orang Tua / Wali. */
export default function ParentSection({ form }: { form: RegistrationFormApi }) {
  const { valueFor, setValue, errorFor, inputClassFor, selectClassFor } = form

  return (
    <section className={cardClassName}>
      <div className={cardHeaderClassName}>
        <span className={numberBadgeClassName}>04</span>
        <div>
          <h2 className={cardTitleClassName}>Keterangan Orang Tua / Wali Santri</h2>
          <p className={cardCaptionClassName}>Kontak darurat dan legalitas keluarga peserta.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div>
          <label className={labelClassName} htmlFor={fieldId('nama_wali')}>
            Nama Ayah / Ibu / Wali <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('nama_wali')}
            id={fieldId('nama_wali')}
            name="nama_wali"
            onChange={(event) => setValue('nama_wali', event.target.value)}
            placeholder="Nama lengkap orang tua"
            type="text"
            value={valueFor('nama_wali')}
          />
          {errorFor('nama_wali') ? <p className={errorTextClassName}>{errorFor('nama_wali')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('relasi_wali')}>
            Hubungan Relasi <span className={requiredClassName}>*</span>
          </label>
          <div className="relative">
            <select
              className={selectClassFor('relasi_wali')}
              id={fieldId('relasi_wali')}
              name="relasi_wali"
              onChange={(event) => setValue('relasi_wali', event.target.value)}
              value={valueFor('relasi_wali')}
            >
              {RELATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-space-md pointer-events-none text-outline">
              <Icon className="text-[20px]" name="expand_more" />
            </div>
          </div>
          {errorFor('relasi_wali') ? <p className={errorTextClassName}>{errorFor('relasi_wali')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('kontak_wali')}>
            Nomor HP / WhatsApp Wali <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('kontak_wali')}
            id={fieldId('kontak_wali')}
            inputMode="tel"
            name="kontak_wali"
            onChange={(event) => setValue('kontak_wali', event.target.value)}
            placeholder="08xxxxxxxxxx"
            type="tel"
            value={valueFor('kontak_wali')}
          />
          {errorFor('kontak_wali') ? <p className={errorTextClassName}>{errorFor('kontak_wali')}</p> : null}
        </div>
      </div>
    </section>
  )
}
