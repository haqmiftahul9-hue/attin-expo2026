import Icon from '../Icon.jsx'
import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import { FILE_ACCEPT_ATTRIBUTE, formatFileSize, MAX_FILE_SIZE_MB } from '../../lib/registrationValidation.js'
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

/** Tahap 6 — Infaq Pendaftaran & Rekening Resmi. */
export default function PaymentSection({ form }: { form: RegistrationFormApi }) {
  const { config, valueFor, setValue, fileFor, setFile, errorFor, inputClassFor } = form
  const proof = fileFor('bukti_transfer')

  return (
    <section className={cardClassName}>
      <div className={cardHeaderClassName}>
        <span className={numberBadgeClassName}>06</span>
        <div>
          <h2 className={cardTitleClassName}>Infaq Pendaftaran &amp; Rekening Resmi</h2>
          <p className={cardCaptionClassName}>
            Transfer biaya kontribusi peserta ke rekening resmi panitia pelaksana ATTIN EXPO XII 2026.
          </p>
        </div>
      </div>

      <div className="relative bg-primary text-on-primary rounded-xl p-space-lg mb-space-md shadow-md overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <svg fill="currentColor" height="220" viewBox="0 0 200 200" width="220" aria-hidden="true">
            <polygon points="100,0 125,75 200,100 125,125 100,200 75,125 0,100 75,75" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="space-y-space-xs">
            <span className="inline-flex items-center gap-1 font-label-badge text-label-badge text-tertiary-fixed bg-white/10 px-2.5 py-0.5 rounded-full uppercase">
              <Icon className="text-[14px]" name="account_balance" />
              Rekening Resmi Panitia
            </span>
            <div className="font-headline-md text-headline-md tracking-wider font-mono">{config.bank.accountNumber}</div>
            <div className="font-body-md text-body-md text-tertiary-fixed">
              Bank: <strong className="text-on-primary">{config.bank.name}</strong> • a.n.{' '}
              <strong className="text-on-primary">{config.bank.accountHolder}</strong>
            </div>
          </div>
          <div className="shrink-0 flex flex-col md:items-end">
            <span className="font-caption text-caption text-tertiary-fixed">Biaya Registrasi Resmi:</span>
            <span className="font-headline-lg text-headline-lg font-bold text-on-primary">{config.fee}</span>
            <span className="font-caption text-caption text-tertiary-fixed">Per Peserta / Per Regu</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div>
          <label className={labelClassName} htmlFor={fieldId('bank_pengirim')}>
            Bank / Dompet Digital Asal Pengirim <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('bank_pengirim')}
            id={fieldId('bank_pengirim')}
            name="bank_pengirim"
            onChange={(event) => setValue('bank_pengirim', event.target.value)}
            placeholder="Contoh: BSI / Bank Nagari / Mandiri"
            type="text"
            value={valueFor('bank_pengirim')}
          />
          {errorFor('bank_pengirim') ? <p className={errorTextClassName}>{errorFor('bank_pengirim')}</p> : null}
        </div>

        <div>
          <label className={labelClassName} htmlFor={fieldId('nama_pemilik_rekening')}>
            Nama Pemilik Rekening Pengirim <span className={requiredClassName}>*</span>
          </label>
          <input
            className={inputClassFor('nama_pemilik_rekening')}
            id={fieldId('nama_pemilik_rekening')}
            name="nama_pemilik_rekening"
            onChange={(event) => setValue('nama_pemilik_rekening', event.target.value)}
            placeholder="Sesuai mutasi tabungan"
            type="text"
            value={valueFor('nama_pemilik_rekening')}
          />
          {errorFor('nama_pemilik_rekening') ? (
            <p className={errorTextClassName}>{errorFor('nama_pemilik_rekening')}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <span className={labelClassName}>
            Unggah Resi / Bukti Tangkapan Layar Transfer <span className={requiredClassName}>*</span>
          </span>
          <div className="relative bg-surface-container-low rounded-xl p-space-md flex items-center justify-between gap-space-sm">
            <input
              accept={FILE_ACCEPT_ATTRIBUTE}
              aria-describedby={errorFor('bukti_transfer') ? `${fieldId('bukti_transfer')}-error` : undefined}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id={fieldId('bukti_transfer')}
              name="bukti_transfer"
              onChange={(event) => setFile('bukti_transfer', event.target.files?.[0] ?? null)}
              type="file"
            />
            <div className="flex items-center gap-space-sm pointer-events-none">
              <Icon className="text-[28px] text-primary" name="receipt_long" />
              <div>
                <div
                  className={`font-body-md-semibold text-body-md ${
                    proof ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  {proof ? `${proof.name} (${formatFileSize(proof.size)})` : 'Pilih file tangkapan layar bukti setor'}
                </div>
                <div className="font-caption text-caption text-on-surface-variant">
                  Format JPG, PNG atau PDF maks {MAX_FILE_SIZE_MB}MB
                </div>
              </div>
            </div>
            <span className="font-label-badge text-label-badge text-secondary bg-secondary-fixed/50 px-3 py-1 rounded-full uppercase shrink-0">
              {proof ? 'Sudah Dipilih' : 'Wajib Diunggah'}
            </span>
          </div>
          {errorFor('bukti_transfer') ? (
            <p className={errorTextClassName} id={`${fieldId('bukti_transfer')}-error`}>
              {errorFor('bukti_transfer')}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
