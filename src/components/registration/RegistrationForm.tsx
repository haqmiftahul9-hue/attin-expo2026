import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CompetitionSection from './CompetitionSection.jsx'
import DeclarationSection from './DeclarationSection.jsx'
import DocumentSection from './DocumentSection.jsx'
import ParentSection from './ParentSection.jsx'
import ParticipantSection from './ParticipantSection.jsx'
import PaymentSection from './PaymentSection.jsx'
import SchoolSection from './SchoolSection.jsx'
import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import { clearRegistrationDraft, saveRegistrationDraft } from '../../lib/registrationDraft.js'
import { generateRegistrationCode } from '../../lib/registrationCode.js'
import { saveRegistration } from '../../lib/registrationsRepository.js'
import { buildSpecificData, getGender, textValue, validateFileValue } from '../../lib/registrationValidation.js'
import { fieldId } from '../../lib/registrationStyles.js'
import type { RegistrationRow } from '../../types/registration.js'

interface RegistrationFormProps {
  form: RegistrationFormApi
}

/** Fokus + gulir ke field yang bermasalah. */
function focusField(name: string): void {
  const element = document.getElementById(fieldId(name))
  if (!element) return

  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  if (element instanceof HTMLElement) {
    element.focus({ preventScroll: true })
  }
}

/**
 * Formulir pendaftaran (kolom kiri, 8 dari 12 kolom).
 * Tahap 1 sampai 7 disusun dari komponen terpisah; seluruh state, validasi,
 * dan pengiriman ditangani di sini.
 */
export default function RegistrationForm({ form }: RegistrationFormProps) {
  const navigate = useNavigate()
  const { config } = form
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const errors = form.validateNow()
    const invalidFields = [...config.documents.map((document) => document.name), 'bukti_transfer']

    let hasError = Object.keys(errors).length > 0
    let firstInvalidField = hasError ? Object.keys(errors)[0] : null

    for (const name of invalidFields) {
      const fileError = validateFileValue(form.values[name])
      if (!fileError) continue

      form.setFieldError(name, fileError)
      hasError = true
      firstInvalidField = firstInvalidField ?? name
    }

    if (hasError) {
      setNotice('Formulir belum lengkap. Periksa kembali field yang ditandai.')
      if (firstInvalidField) {
        window.setTimeout(() => focusField(firstInvalidField as string), 60)
      }
      return
    }

    setIsSubmitting(true)
    setNotice(null)

    try {
      const registrationCode = generateRegistrationCode(config.codePrefix)
      const row: Omit<RegistrationRow, 'id' | 'created_at'> = {
        registration_code: registrationCode,
        competition_id: config.competitionId,
        competition_slug: config.slug,
        participant_name: textValue(form.values, 'nama_lengkap'),
        gender: getGender(form.values.gender),
        birth_date: textValue(form.values, 'tanggal_lahir') || null,
        nisn: textValue(form.values, 'nisn'),
        grade: textValue(form.values, 'kelas'),
        school_name: textValue(form.values, 'nama_sekolah'),
        city: textValue(form.values, 'kabupaten_kota'),
        companion_name: textValue(form.values, 'guru_pembimbing'),
        companion_phone: textValue(form.values, 'kontak_wa_guru'),
        parent_name: textValue(form.values, 'nama_wali'),
        parent_phone: textValue(form.values, 'kontak_wali'),
        specific_data: buildSpecificData(form.values, config),
        identity_document_url: null,
        supporting_document_url: null,
        payment_proof_url: null,
        payment_status: 'pending',
        registration_status: 'pending',
      }

      const result = await saveRegistration({
        row,
        files: {
          dokumen_peserta: form.fileFor('dokumen_peserta'),
          dokumen_pendukung: form.fileFor('dokumen_pendukung'),
          bukti_transfer: form.fileFor('bukti_transfer'),
        },
      })

      clearRegistrationDraft(config.slug)

      if (!result.ok) {
        setIsSubmitting(false)
        setNotice('Pendaftaran gagal dikirim. Silakan coba beberapa saat lagi.')
        return
      }

      navigate(`/pendaftaran-berhasil/${result.registrationCode}`)
    } catch (error) {
      console.error('[registration] submit gagal:', error)
      setIsSubmitting(false)
      setNotice('Pendaftaran gagal dikirim. Silakan coba beberapa saat lagi.')
    }
  }

  const handleSaveDraft = () => {
    saveRegistrationDraft(config.slug, form.values)
    setNotice('Draf pendaftaran berhasil disimpan sementara pada peramban ini.')
  }

  return (
    <form
      className="lg:col-span-8 space-y-space-xl"
      id="formPendaftaranAttin"
      noValidate
      onSubmit={handleSubmit}
    >
      <CompetitionSection form={form} />
      <ParticipantSection form={form} />
      <SchoolSection form={form} />
      <ParentSection form={form} />
      <DocumentSection form={form} />
      <PaymentSection form={form} />
      <DeclarationSection
        form={form}
        isSubmitting={isSubmitting}
        notice={notice}
        onSubmitDraft={handleSaveDraft}
      />
    </form>
  )
}
