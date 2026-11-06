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

/** Pemilih tingkat kelas untuk satu peserta (disimpan ke `kelas_peserta` per baris). */
function GradeSelect({
  form,
  index,
  rowLabel,
  studentName,
}: {
  form: RegistrationFormApi
  index: number
  rowLabel: string
  studentName?: string
}) {
  const { config, valueFor, setValue, errorFor, selectClassFor } = form
  const grades = (valueFor('kelas_peserta') || '').split('\n')

  return (
    <div className="flex gap-2 items-center">
      <span className="w-24 text-slate-500 text-sm font-medium truncate">{studentName || rowLabel}</span>
      <div className="flex-1">
        <label className="sr-only" htmlFor={fieldId(`kelas_peserta_${index}`)}>
          Kelas Peserta ke-{index + 1}
        </label>
        <select
          className={selectClassFor(`kelas_peserta_${index}`)}
          id={fieldId(`kelas_peserta_${index}`)}
          name={`kelas_peserta_${index}`}
          onChange={(e) => {
            const nextGrades = [...grades]
            nextGrades[index] = e.target.value
            setValue('kelas_peserta', nextGrades.join('\n'))
          }}
          value={grades[index] || ''}
        >
          <option value="">Pilih kelas{studentName ? ` - ${studentName}` : ''}</option>
          {config.gradeOptions.map((grade) => (
            <option key={grade.value} value={grade.value}>
              {grade.label}{studentName ? ` (${studentName})` : ''}
            </option>
          ))}
        </select>
        {errorFor(`kelas_peserta_${index}`) ? (
          <p className={errorTextClassName}>{errorFor(`kelas_peserta_${index}`)}</p>
        ) : null}
      </div>
    </div>
  )
}

/** Pemilih mata pelajaran olimpiade untuk satu peserta. */
function SubjectSelect({
  form,
  index,
  rowLabel,
  studentName,
}: {
  form: RegistrationFormApi
  index: number
  rowLabel: string
  studentName?: string
}) {
  const { config, valueFor, setValue, errorFor, selectClassFor } = form
  const subjects = (valueFor('mata_pelajaran') || '').split('\n')

  return (
    <div className="flex gap-2 items-center">
      <span className="w-24 text-slate-500 text-sm font-medium truncate">{studentName || rowLabel}</span>
      <div className="flex-1">
        <label className="sr-only" htmlFor={fieldId(`mata_pelajaran_${index}`)}>
          Mata Pelajaran Peserta ke-{index + 1}
        </label>
        <select
          className={selectClassFor(`mata_pelajaran_${index}`)}
          id={fieldId(`mata_pelajaran_${index}`)}
          name={`mata_pelajaran_${index}`}
          onChange={(e) => {
            const next = [...subjects]
            next[index] = e.target.value
            setValue('mata_pelajaran', next.join('\n'))
          }}
          value={subjects[index] || ''}
        >
          <option value="">Pilih mata pelajaran{studentName ? ` - ${studentName}` : ''}</option>
          {config.subjectOptions?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}{studentName ? ` (${studentName})` : ''}
            </option>
          ))}
        </select>
        {errorFor(`mata_pelajaran_${index}`) ? (
          <p className={errorTextClassName}>{errorFor(`mata_pelajaran_${index}`)}</p>
        ) : null}
      </div>
    </div>
  )
}
export default function ParticipantSection({ form }: { form: RegistrationFormApi }) {
  const { config, valueFor, setValue, errorFor, inputClassFor } = form
  const isTahfizh = config.slug === 'tahfizh'
  const isKolase = config.slug === 'kolase'
  const hasGrade = config.gradeOptions && config.gradeOptions.length > 0
  const hasSubject = config.subjectOptions && config.subjectOptions.length > 0

  return (
    <section className={cardClassName}>
      <div className={cardHeaderClassName}>
        <span className={numberBadgeClassName}>02</span>
        <div>
          <h2 className={cardTitleClassName}>Identitas Peserta</h2>
          <p className={cardCaptionClassName}>
            {isTahfizh
              ? 'Masukkan nama utusan (boleh 1 Putra saja, 1 Putri saja, atau keduanya).'
              : 'Tambahkan nama utusan ke bawah jika lebih dari satu.'}
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
            <div className="flex flex-col gap-3 mt-2">
              {(valueFor('nama_lengkap') || '').split('\n').map((name, index, arr) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="flex-1">
                    <input
                      className={inputClassFor('nama_lengkap')}
                      type="text"
                      placeholder={`Nama Peserta ke-${index + 1}`}
                      value={name}
                      onChange={(e) => {
                        const newArr = [...arr]
                        newArr[index] = e.target.value
                        setValue('nama_lengkap', newArr.join('\n'))
                      }}
                    />
                  </div>
                  {arr.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newArr = arr.filter((_, i) => i !== index)
                        setValue('nama_lengkap', newArr.join('\n'))
                      }}
                      className="p-3 rounded-lg bg-error-container text-error hover:bg-error hover:text-on-error transition-colors flex-shrink-0"
                      title="Hapus Nama"
                    >
                      <Icon className="text-[20px]" name="delete" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const arr = (valueFor('nama_lengkap') || '').split('\n')
                  arr.push('')
                  setValue('nama_lengkap', arr.join('\n'))
                }}
                className="mt-2 py-3 px-4 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors font-label-md font-semibold flex items-center justify-center gap-2 border border-primary-container"
              >
                <Icon className="text-[20px]" name="add" />
                Tambah Nama Peserta
              </button>
            </div>
            <p className={`${helperClassName} mt-3`}>
              Sistem otomatis menghitung total biaya berdasarkan jumlah nama yang dimasukkan.
            </p>
            {errorFor('nama_lengkap') ? <p className={errorTextClassName}>{errorFor('nama_lengkap')}</p> : null}
          </div>
        )}

        {/* Subject Selection per Participant (Olimpiade) */}
        {hasSubject && (
          <div className="md:col-span-2">
            <label className={labelClassName} htmlFor={fieldId('mata_pelajaran')}>
              Mata Pelajaran Olimpiade <span className={requiredClassName}>*</span>
            </label>
            <div className="flex flex-col gap-3 mt-2">
              {(valueFor('nama_lengkap') || '')
                .split('\n')
                .map((name, index) => (
                  <SubjectSelect key={index} form={form} index={index} rowLabel={`${index + 1}.`} studentName={name.trim() || `Peserta ${index + 1}`} />
                ))}
            </div>
            <p className={`${helperClassName} mt-3`}>
              Pilih mata pelajaran olimpiade untuk setiap peserta.
            </p>
          </div>
        )}

        {/* Grade/Class Selection per Participant */}
        {hasGrade && !isKolase && (
          <div className="md:col-span-2">
            <label className={labelClassName} htmlFor={fieldId('kelas_peserta')}>
              Tingkat Kelas Peserta <span className={requiredClassName}>*</span>
            </label>
            <div className="flex flex-col gap-3 mt-2">
              {isTahfizh ? (
                <>
                   {valueFor('nama_pa').trim() !== '' && (
                     <GradeSelect form={form} index={0} rowLabel="Pa" studentName={valueFor('nama_pa').trim() || 'Putra'} />
                   )}
                   {valueFor('nama_pi').trim() !== '' && (
                     <GradeSelect form={form} index={1} rowLabel="Pi" studentName={valueFor('nama_pi').trim() || 'Putri'} />
                   )}
                </>
              ) : (
                 (valueFor('nama_lengkap') || '')
                   .split('\n')
                   .map((name, index) => (
                     <GradeSelect key={index} form={form} index={index} rowLabel={`${index + 1}.`} studentName={name.trim() || `Peserta ${index + 1}`} />
                   ))
              )}
            </div>
            <p className={`${helperClassName} mt-3`}>
              Pilih tingkat kelas untuk setiap peserta.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
