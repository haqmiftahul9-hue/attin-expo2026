import Icon from '../Icon.jsx'
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

const CLASS_OPTIONS = [
  { value: 'Kelas 1 SD/MI', label: 'Kelas 1 (Fase A)' },
  { value: 'Kelas 2 SD/MI', label: 'Kelas 2 (Fase A)' },
  { value: 'Kelas 3 SD/MI', label: 'Kelas 3 (Fase B)' },
  { value: 'Kelas 4 SD/MI', label: 'Kelas 4 (Fase B)' },
  { value: 'Kelas 5 SD/MI', label: 'Kelas 5 (Fase C)' },
  { value: 'Kelas 6 SD/MI', label: 'Kelas 6 (Fase C)' },
]

const GENDER_OPTIONS = [
  { value: 'Laki-laki', label: 'Putra', icon: 'male' },
  { value: 'Perempuan', label: 'Putri', icon: 'female' },
] as const

/** Tahap 2 — Biodata Peserta. */
export default function ParticipantSection({ form }: { form: RegistrationFormApi }) {
  const { valueFor, setValue, errorFor, inputClassFor, selectClassFor } = form

  return (
    <section className={cardClassName}>
      <div className={cardHeaderClassName}>
        <span className={numberBadgeClassName}>02</span>
        <div>
          <h2 className={cardTitleClassName}>Biodata Peserta</h2>
          <p className={cardCaptionClassName}>
            Lengkapi data pribadi santri atau siswa utusan sekolah dasar/madrasah.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div className="md:col-span-2">
          <label className={labelClassName} htmlFor={fieldId('nama_lengkap')}>
            Nama Lengkap Peserta (Sesuai Akta Kelahiran) <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('nama_lengkap')}
            id={fieldId('nama_lengkap')}
            name="nama_lengkap"
            onChange={(event) => setValue('nama_lengkap', event.target.value)}
            placeholder="Contoh: Muhammad Fatih Al-Ghazali"
            type="text"
            value={valueFor('nama_lengkap')}
          />
          <p className={helperClassName}>Nama ini akan dicetak resmi pada sertifikat dan piagam pemenang.</p>
          {errorFor('nama_lengkap') ? <p className={errorTextClassName}>{errorFor('nama_lengkap')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('nama_panggilan')}>
            Nama Panggilan <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('nama_panggilan')}
            id={fieldId('nama_panggilan')}
            name="nama_panggilan"
            onChange={(event) => setValue('nama_panggilan', event.target.value)}
            placeholder="Contoh: Fatih"
            type="text"
            value={valueFor('nama_panggilan')}
          />
          {errorFor('nama_panggilan') ? <p className={errorTextClassName}>{errorFor('nama_panggilan')}</p> : null}
        </div>

        <div>
          <span className={labelClassName}>
            Jenis Kelamin <span className={requiredClassName}>*</span>
          </span>
          <div className="grid grid-cols-2 gap-space-xs h-12">
            {GENDER_OPTIONS.map((option) => {
              const isActive = valueFor('gender') === option.value

              return (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-space-xs rounded-xl bg-surface-container-low cursor-pointer transition-colors ${
                    isActive ? 'bg-primary-container text-on-primary' : ''
                  }`}
                >
                  <input
                    checked={isActive}
                    className="sr-only"
                    name="gender"
                    onChange={() => setValue('gender', option.value)}
                    type="radio"
                    value={option.value}
                  />
                  <Icon className="text-[18px]" name={option.icon} />
                  <span className="font-body-md-semibold text-body-md">{option.label}</span>
                </label>
              )
            })}
          </div>
          {errorFor('gender') ? <p className={errorTextClassName}>{errorFor('gender')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('nisn')}>
            Nomor Induk Siswa Nasional (NISN) <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('nisn')}
            id={fieldId('nisn')}
            inputMode="numeric"
            maxLength={10}
            name="nisn"
            onChange={(event) => setValue('nisn', event.target.value.replace(/\D/g, ''))}
            placeholder="10 digit resmi Kemendikbud/Kemenag"
            type="text"
            value={valueFor('nisn')}
          />
          <span className="font-caption text-caption text-outline">Periksa melalui portal resmi nisn.data.kemdikbud.go.id</span>
          {errorFor('nisn') ? <p className={errorTextClassName}>{errorFor('nisn')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('kelas')}>
            Tingkat Kelas Berjalan <span className={requiredClassName}>*</span>
          </label>
          <div className="relative">
            <select
              className={selectClassFor('kelas')}
              id={fieldId('kelas')}
              name="kelas"
              onChange={(event) => setValue('kelas', event.target.value)}
              value={valueFor('kelas')}
            >
              <option value="">Pilih Tingkat Kelas</option>
              {CLASS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-space-md pointer-events-none text-outline">
              <Icon className="text-[20px]" name="expand_more" />
            </div>
          </div>
          {errorFor('kelas') ? <p className={errorTextClassName}>{errorFor('kelas')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('tempat_lahir')}>
            Tempat Lahir <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('tempat_lahir')}
            id={fieldId('tempat_lahir')}
            name="tempat_lahir"
            onChange={(event) => setValue('tempat_lahir', event.target.value)}
            placeholder="Contoh: Bukittinggi"
            type="text"
            value={valueFor('tempat_lahir')}
          />
          {errorFor('tempat_lahir') ? <p className={errorTextClassName}>{errorFor('tempat_lahir')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('tanggal_lahir')}>
            Tanggal Lahir <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('tanggal_lahir')}
            id={fieldId('tanggal_lahir')}
            name="tanggal_lahir"
            onChange={(event) => setValue('tanggal_lahir', event.target.value)}
            type="date"
            value={valueFor('tanggal_lahir')}
          />
          {errorFor('tanggal_lahir') ? <p className={errorTextClassName}>{errorFor('tanggal_lahir')}</p> : null}
        </div>
      </div>
    </section>
  )
}
