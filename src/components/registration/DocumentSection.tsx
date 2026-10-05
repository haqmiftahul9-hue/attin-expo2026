import Icon from '../Icon.jsx'
import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import { formatFileSize } from '../../lib/registrationValidation.js'
import {
  cardCaptionClassName,
  cardClassName,
  cardHeaderClassName,
  cardTitleClassName,
  errorTextClassName,
  fieldId,
  numberBadgeClassName,
  requiredClassName,
} from '../../lib/registrationStyles.js'
import type { DocumentField } from '../../types/registration.js'

const DROPZONE_BASE =
  'relative bg-surface-container-lowest rounded-xl text-center cursor-pointer hover:bg-primary/5 transition-all'

function statusBadgeClassName(isUploaded: boolean, isOptional: boolean): string {
  if (isUploaded) {
    return 'font-label-badge text-label-badge text-tertiary bg-tertiary-fixed px-2.5 py-1 rounded-full uppercase'
  }
  if (isOptional) {
    return 'font-label-badge text-label-badge text-outline bg-surface-container-high px-2.5 py-1 rounded-full uppercase'
  }
  return 'font-label-badge text-label-badge text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-full uppercase'
}

function DocumentUpload({
  form,
  document,
}: {
  form: RegistrationFormApi
  document: DocumentField
}) {
  const { fileFor, setFile, errorFor } = form
  const file = fileFor(document.name)
  const isDropzone = document.variant === 'dropzone'

  return (
    <div className="p-space-md bg-surface-container-low rounded-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm mb-space-sm">
        <div>
          <span className="font-body-md-semibold text-body-md text-on-surface">{document.label}</span>{' '}
          {document.required ? <span className={requiredClassName}>*</span> : null}
          <p className="font-caption text-caption text-on-surface-variant">
            {document.hint} (PDF/JPG/PNG, maksimal 10 MB)
          </p>
        </div>
        <span className={statusBadgeClassName(Boolean(file), !document.required)}>
          {file ? 'Sudah Dipilih' : document.required ? 'Belum Diunggah' : 'Opsional'}
        </span>
      </div>

      <div className={`${DROPZONE_BASE} ${isDropzone ? 'p-space-lg' : 'p-space-md'}`}>
        <input
          accept=".pdf,.jpg,.jpeg,.png"
          aria-describedby={errorFor(document.name) ? `${fieldId(document.name)}-error` : undefined}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id={fieldId(document.name)}
          name={document.name}
          onChange={(event) => setFile(document.name, event.target.files?.[0] ?? null)}
          type="file"
        />

        {isDropzone ? (
          <div className="flex flex-col items-center gap-space-xs pointer-events-none">
            <Icon className="text-[36px] text-primary" name="cloud_upload" />
            <p className="font-body-md-semibold text-body-md text-primary">Pilih Dokumen dari Komputer / Ponsel</p>
            <p
              className={`font-caption text-caption ${
                file ? 'text-primary font-body-md-semibold' : 'text-outline'
              }`}
            >
              {file ? `${file.name} (${formatFileSize(file.size)})` : 'Seret berkas ke sini atau klik untuk menelusuri'}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-space-sm pointer-events-none">
            <Icon className="text-[24px] text-outline" name="attach_file" />
            <span className={`font-body-md text-caption ${file ? 'text-primary font-body-md-semibold' : 'text-outline'}`}>
              {file ? `${file.name} (${formatFileSize(file.size)})` : 'Pilih berkas opsional jika ada (PDF/JPG)'}
            </span>
          </div>
        )}
      </div>

      {errorFor(document.name) ? (
        <p className={errorTextClassName} id={`${fieldId(document.name)}-error`}>
          {errorFor(document.name)}
        </p>
      ) : null}
    </div>
  )
}

/** Tahap 5 — Unggah Dokumen. Daftar berkas diambil dari konfigurasi cabang. */
export default function DocumentSection({ form }: { form: RegistrationFormApi }) {
  return (
    <section className={cardClassName}>
      <div className={cardHeaderClassName}>
        <span className={numberBadgeClassName}>05</span>
        <div>
          <h2 className={cardTitleClassName}>Unggah Berkas Persyaratan</h2>
          <p className={cardCaptionClassName}>
            Pastikan pindaian (scan) jelas dan dapat terbaca oleh tim verifikator berkas.
          </p>
        </div>
      </div>

      <div className="space-y-space-md">
        {form.config.documents.map((document) => (
          <DocumentUpload key={document.name} document={document} form={form} />
        ))}
      </div>
    </section>
  )
}
