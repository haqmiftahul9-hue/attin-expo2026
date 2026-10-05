import { useState } from 'react'
import MaterialIcon from '../MaterialIcon.jsx'
import { classOptions, formSteps, sumbarRegions } from '../../data/branchDetail.js'
import { placeholders, site } from '../../data/site.js'

const LABEL = 'block text-label-md font-label-md text-on-surface mb-2'
const FIELD =
  'w-full h-12 px-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none focus:bg-primary-fixed/20'
const HELPER = 'text-caption font-caption text-on-surface-variant mt-1.5'
const CARD = 'bg-surface-container-low rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm'

const DEFAULT_FILES = {
  identitas: 'Pilih Berkas',
  tambahan: 'Pilih Berkas (Opsional)',
  bayar: 'Pilih Bukti Transfer',
}

function CardHeading({ number, tone = 'primary', children }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-label-md ${
          tone === 'secondary' ? 'bg-secondary text-on-secondary' : 'bg-primary-container text-on-primary'
        }`}
      >
        {number}
      </span>
      <h3 className="text-title-md font-title-md text-on-surface font-semibold">{children}</h3>
    </div>
  )
}

function FilePicker({ id, label, fileName, onChange, required = false }) {
  return (
    <div className="p-6 rounded-2xl bg-surface-container-lowest text-center space-y-3 shadow-inner">
      <div className="w-12 h-12 mx-auto rounded-full bg-primary-fixed text-primary-container flex items-center justify-center">
        <MaterialIcon name="upload_file" className="text-[28px]" />
      </div>
      <div>
        <p className="text-body-md-semibold font-body-md-semibold text-on-surface">
          {label} {required ? <span className="text-secondary">*</span> : null}
        </p>
        <p className="text-caption font-caption text-on-surface-variant mt-1">Kartu Pelajar / Surat Ket. Sekolah / KIA</p>
      </div>
      <input
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        id={id}
        onChange={onChange}
        required={required}
        type="file"
      />
      <label
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-body-md-semibold text-body-md cursor-pointer transition-colors"
        htmlFor={id}
      >
        <MaterialIcon name="attach_file" className="text-[18px]" />
        <span>{fileName}</span>
      </label>
      <p className="text-caption font-caption text-outline">PDF, JPG, JPEG, PNG (Maks 10MB)</p>
    </div>
  )
}

export default function RegistrationForm({ form, categories }) {
  const [status, setStatus] = useState('idle')
  const [files, setFiles] = useState(DEFAULT_FILES)

  const pickFile = (key) => (event) => {
    const file = event.target.files?.[0]
    setFiles((previous) => ({ ...previous, [key]: file ? file.name : DEFAULT_FILES[key] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const element = event.currentTarget

    if (!element.checkValidity()) {
      element.reportValidity()
      return
    }

    setStatus('loading')

    window.setTimeout(() => {
      element.reset()
      setFiles(DEFAULT_FILES)
      setStatus('success')
    }, 1500)
  }

  return (
    <section id="form-pendaftaran" className="w-full bg-surface-container-lowest py-16 sm:py-24 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-label-badge font-label-badge uppercase tracking-wider text-primary-container">
            {form.badge}
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface">{form.title}</h2>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-xl mx-auto">
            Isi seluruh data peserta dan instansi sekolah dengan cermat. Kolom bertanda bintang (
            <span className="text-secondary font-bold">*</span>) wajib diisi.
          </p>
        </div>

        <ol aria-label="Tahapan pengisian formulir" className="mb-12 overflow-x-auto pb-4">
          <li className="flex items-center justify-between min-w-[620px] px-2">
            {formSteps.map((step, index) => (
              <div key={step.label} className="flex items-center">
                {index > 0 ? <div className="flex-1 h-0.5 bg-surface-container mx-2" /> : null}
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <div
                    className={`w-8 h-8 rounded-full text-label-badge flex items-center justify-center font-bold ${
                      index === 0
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`text-caption font-caption ${
                      index === 0 ? 'font-medium text-primary-container' : 'text-on-surface-variant'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </li>
        </ol>

        <form className="space-y-8" id="tahfizhRegistrationForm" onSubmit={handleSubmit}>
          <div className={CARD}>
            <CardHeading number="01">{form.categoryLabel}</CardHeading>
            <div>
              <label className={LABEL} htmlFor="kategori-tahfizh">
                Kategori Tahfizh yang Diikuti <span className="text-secondary">*</span>
              </label>
              <select className={FIELD} defaultValue="" id="kategori-tahfizh" required>
                <option disabled value="">
                  {form.categoryPlaceholder}
                </option>
                {categories.map((category, index) => (
                  <option key={category.label} value={`kategori-${index + 1}`}>
                    {category.label} - {category.name}
                  </option>
                ))}
              </select>
              <p className={HELPER}>{form.categoryHelper}</p>
            </div>
          </div>

          <div className={CARD}>
            <CardHeading number="02">Data Diri Peserta</CardHeading>
            <div className="space-y-5">
              <div>
                <label className={LABEL} htmlFor="nama-peserta">
                  Nama Lengkap Peserta <span className="text-secondary">*</span>
                </label>
                <input
                  className={FIELD}
                  id="nama-peserta"
                  name="namaPeserta"
                  placeholder="Sesuai akta kelahiran atau rapor siswa"
                  required
                  type="text"
                />
              </div>

              <fieldset>
                <legend className={`${LABEL} p-0`}>
                  Jenis Kelamin <span className="text-secondary">*</span>
                </legend>
                <div className="flex items-center gap-6">
                  {['Laki-laki', 'Perempuan'].map((label) => (
                    <label key={label} className="flex items-center gap-2 cursor-pointer text-body-md font-body-md text-on-surface">
                      <input
                        className="w-5 h-5 text-primary-container accent-primary-container"
                        name="gender"
                        required
                        type="radio"
                        value={label.toLowerCase()}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL} htmlFor="tempat-lahir">
                    Tempat Lahir
                  </label>
                  <input className={FIELD} id="tempat-lahir" name="tempatLahir" placeholder="Contoh: Bukittinggi" type="text" />
                </div>
                <div>
                  <label className={LABEL} htmlFor="tanggal-lahir">
                    Tanggal Lahir <span className="text-secondary">*</span>
                  </label>
                  <input className={FIELD} id="tanggal-lahir" name="tanggalLahir" required type="date" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL} htmlFor="nisn">
                    NISN (Nomor Induk Siswa Nasional) <span className="text-secondary">*</span>
                  </label>
                  <input
                    className={FIELD}
                    id="nisn"
                    maxLength={10}
                    name="nisn"
                    pattern="[0-9]{10}"
                    placeholder="10 digit angka NISN"
                    required
                    type="text"
                  />
                  <p className={HELPER}>Wajib 10 digit angka valid.</p>
                </div>
                <div>
                  <label className={LABEL} htmlFor="kelas">
                    Kelas Saat Ini <span className="text-secondary">*</span>
                  </label>
                  <select className={FIELD} defaultValue="" id="kelas" name="kelas" required>
                    <option disabled value="">
                      Pilih kelas
                    </option>
                    {classOptions.map((option, index) => (
                      <option key={option} value={index + 1}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={CARD}>
            <CardHeading number="03">Data Sekolah &amp; Guru Pendamping</CardHeading>
            <div className="space-y-5">
              <div>
                <label className={LABEL} htmlFor="nama-sekolah">
                  Nama Sekolah/Madrasah Asal <span className="text-secondary">*</span>
                </label>
                <input
                  className={FIELD}
                  id="nama-sekolah"
                  name="namaSekolah"
                  placeholder="Contoh: SD IT / MIN ..."
                  required
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL} htmlFor="alamat-sekolah">
                    Alamat Sekolah
                  </label>
                  <input
                    className={FIELD}
                    id="alamat-sekolah"
                    name="alamatSekolah"
                    placeholder="Jalan / Kelurahan"
                    type="text"
                  />
                </div>
                <div>
                  <label className={LABEL} htmlFor="kabupaten-kota">
                    Kabupaten/Kota (Sumatera Barat) <span className="text-secondary">*</span>
                  </label>
                  <select className={FIELD} defaultValue="" id="kabupaten-kota" name="kabupatenKota" required>
                    <option disabled value="">
                      Pilih Kabupaten / Kota
                    </option>
                    {sumbarRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={LABEL} htmlFor="nama-pendamping">
                    Nama Guru/Pendamping <span className="text-secondary">*</span>
                  </label>
                  <input
                    className={FIELD}
                    id="nama-pendamping"
                    name="namaPendamping"
                    placeholder="Nama lengkap & gelar"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label className={LABEL} htmlFor="wa-pendamping">
                    Nomor WhatsApp Aktif <span className="text-secondary">*</span>
                  </label>
                  <input
                    className={FIELD}
                    id="wa-pendamping"
                    name="waPendamping"
                    placeholder="08xxxxxxxxxx"
                    required
                    type="tel"
                  />
                  <p className="text-caption font-caption text-on-surface-variant mt-1">
                    Format: 08xxx (untuk grup info lomba)
                  </p>
                </div>
                <div>
                  <label className={LABEL} htmlFor="email-pendamping">
                    Email Pendamping <span className="text-secondary">*</span>
                  </label>
                  <input
                    className={FIELD}
                    id="email-pendamping"
                    name="emailPendamping"
                    placeholder="guru@sekolah.sch.id"
                    required
                    type="email"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={CARD}>
            <CardHeading number="04">Data Orang Tua / Wali</CardHeading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={LABEL} htmlFor="nama-ortu">
                  Nama Orang Tua/Wali <span className="text-secondary">*</span>
                </label>
                <input className={FIELD} id="nama-ortu" name="namaOrtu" placeholder="Ayah / Ibu / Wali" required type="text" />
              </div>
              <div>
                <label className={LABEL} htmlFor="wa-ortu">
                  No. WhatsApp Orang Tua <span className="text-secondary">*</span>
                </label>
                <input className={FIELD} id="wa-ortu" name="waOrtu" placeholder="08xxxxxxxxxx" required type="tel" />
              </div>
              <div>
                <label className={LABEL} htmlFor="email-ortu">
                  Email Orang Tua
                </label>
                <input className={FIELD} id="email-ortu" name="emailOrtu" placeholder="ortu@email.com" type="email" />
              </div>
            </div>
          </div>

          <div className={CARD}>
            <CardHeading number="05">Unggah Dokumen Persyaratan</CardHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FilePicker
                id="dokumen-identitas"
                label="Identitas / Surat Keterangan Siswa"
                fileName={files.identitas}
                onChange={pickFile('identitas')}
                required
              />

              <div className="p-6 rounded-2xl bg-surface-container-lowest text-center space-y-3 shadow-inner">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-fixed text-primary-container flex items-center justify-center">
                  <MaterialIcon name="folder_zip" className="text-[28px]" />
                </div>
                <div>
                  <p className="text-body-md-semibold font-body-md-semibold text-on-surface">
                    {placeholders.extraDocument}
                  </p>
                  <p className="text-caption font-caption text-on-surface-variant mt-1">
                    Sesuai petunjuk teknis juknis resmi panitia
                  </p>
                </div>
                <input
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="sr-only"
                  id="dokumen-tambahan"
                  onChange={pickFile('tambahan')}
                  type="file"
                />
                <label
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-body-md-semibold text-body-md cursor-pointer transition-colors"
                  htmlFor="dokumen-tambahan"
                >
                  <MaterialIcon name="attach_file" className="text-[18px]" />
                  <span>{files.tambahan}</span>
                </label>
                <p className="text-caption font-caption text-outline">PDF, JPG, JPEG, PNG (Maks 10MB)</p>
              </div>
            </div>
          </div>

          <div className={CARD}>
            <CardHeading number="06" tone="secondary">
              Informasi &amp; Bukti Pembayaran
            </CardHeading>

            <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-caption font-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                  Instruksi Transfer Biaya Pendaftaran
                </span>
                <span className="text-body-md-semibold font-body-md-semibold text-secondary">
                  {placeholders.fee} / peserta
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-surface-container-low rounded-lg p-3">
                  <span className="text-caption font-caption text-on-surface-variant block">Bank Tujuan</span>
                  <span className="text-body-md-semibold font-body-md-semibold text-on-surface">
                    {site.bank.bank}
                  </span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3">
                  <span className="text-caption font-caption text-on-surface-variant block">Nomor Rekening</span>
                  <span className="text-body-md-semibold font-body-md-semibold text-primary-container font-mono">
                    {site.bank.accountNumber}
                  </span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3">
                  <span className="text-caption font-caption text-on-surface-variant block">Atas Nama Rekening</span>
                  <span className="text-body-md-semibold font-body-md-semibold text-on-surface">
                    {site.bank.accountName}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={LABEL} htmlFor="nama-pengirim">
                  Nama Pemilik Rekening Pengirim <span className="text-secondary">*</span>
                </label>
                <input
                  className={FIELD}
                  id="nama-pengirim"
                  name="namaPengirim"
                  placeholder="Contoh: Fulan bin Fulan"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className={LABEL} htmlFor="bank-pengirim">
                  Bank Pengirim <span className="text-secondary">*</span>
                </label>
                <input
                  className={FIELD}
                  id="bank-pengirim"
                  name="bankPengirim"
                  placeholder="Contoh: BRI / Nagari / BSI / Mandiri"
                  required
                  type="text"
                />
              </div>
            </div>

            <div>
              <label className={LABEL}>
                Unggah Bukti Transfer / Struk Pembayaran <span className="text-secondary">*</span>
              </label>
              <div className="p-6 rounded-2xl bg-surface-container-lowest text-center space-y-2 shadow-inner">
                <input
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="sr-only"
                  id="bukti-bayar"
                  onChange={pickFile('bayar')}
                  required
                  type="file"
                />
                <label
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container hover:bg-tertiary text-on-primary font-body-md-semibold text-body-md cursor-pointer transition-colors shadow-sm"
                  htmlFor="bukti-bayar"
                >
                  <MaterialIcon name="receipt_long" className="text-[18px]" />
                  <span>{files.bayar}</span>
                </label>
                <p className="text-caption font-caption text-outline">PDF, JPG, PNG (Maks 10MB)</p>
              </div>
            </div>

            <div className="bg-secondary-fixed/50 rounded-xl p-4 flex items-center gap-3 text-on-secondary-fixed-variant text-body-md font-body-md">
              <MaterialIcon name="warning" className="text-[22px] text-secondary shrink-0" />
              <span>
                Pastikan nominal dan informasi pengirim sudah benar sebelum mengirim formulir pendaftaran.
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
            <CardHeading number="07">Pernyataan &amp; Persetujuan Legal</CardHeading>
            <div className="space-y-4 pt-1">
              {[
                form.consentPrefix,
                'Saya dan peserta bersedia menaati seluruh tata tertib, regulasi dewan juri, serta keputusan panitia pelaksana ATTIN EXPO XII 2026 yang bersifat final.',
                'Pendaftaran ini telah memperoleh persetujuan resmi dari pihak orang tua/wali serta kepala sekolah/madrasah yang bersangkutan.',
              ].map((statement) => (
                <label key={statement} className="flex items-start gap-3 cursor-pointer">
                  <input className="w-5 h-5 rounded text-primary-container accent-primary-container mt-0.5 shrink-0" required type="checkbox" />
                  <span className="text-body-md font-body-md text-on-surface">{statement}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 text-center space-y-4">
            {status === 'success' ? (
              <div
                role="status"
                className="mx-auto max-w-2xl rounded-2xl bg-surface-container-low border border-border-ui p-6 text-center space-y-4"
              >
                <MaterialIcon name="check_circle" className="text-[40px] text-primary-container" />
                <p className="text-body-md font-body-md text-on-surface-variant">{form.successMessage}</p>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md-semibold text-body-md-semibold transition-all"
                  onClick={() => setStatus('idle')}
                  type="button"
                >
                  <MaterialIcon name="edit" className="text-[18px]" />
                  <span>Isi Formulir Lagi</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  className="w-full sm:w-auto min-w-[280px] px-8 py-4 rounded-xl bg-primary-container hover:bg-tertiary text-on-primary font-body-md-semibold text-headline-sm font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed"
                  disabled={status === 'loading'}
                  id="btnSubmitForm"
                  type="submit"
                >
                  {status === 'loading' ? (
                    <>
                      <MaterialIcon name="progress_activity" className="animate-spin text-[20px]" />
                      <span>Sedang Mengirim Pendaftaran...</span>
                    </>
                  ) : (
                    <>
                      <span>{form.submitLabel}</span>
                      <MaterialIcon name="send" className="text-[20px]" />
                    </>
                  )}
                </button>
                <p className="text-body-md font-body-md text-on-surface-variant">{form.submitNote}</p>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}