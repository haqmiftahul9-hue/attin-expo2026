import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MaterialIcon from '../../components/MaterialIcon.jsx'
import Footer from '../../components/Footer.jsx'
import RegistrationHeader from '../../components/registration/RegistrationHeader.jsx'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import { getLastRegistration } from '../../lib/registrationsRepository.js'
import { site } from '../../data/site.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { CompetitionSlug, RegistrationRow } from '../../types/registration.js'

function getBranchFromCode(code: string): { slug: CompetitionSlug; name: string; icon: string } {
  for (const config of Object.values(registrationConfigs)) {
    if (code.startsWith(config.codePrefix)) {
      return { slug: config.slug, name: config.fullName, icon: config.icon }
    }
  }
  return { slug: 'tahfizh', name: registrationConfigs.tahfizh.fullName, icon: registrationConfigs.tahfizh.icon }
}

export default function RegistrationSuccessPage() {
  const { registrationCode = '' } = useParams()
  usePageTitle(`Pendaftaran Berhasil ${registrationCode} - ATTIN EXPO XII 2026`)

  const lastRegistration = useMemo<RegistrationRow | null>(() => getLastRegistration(), [])
  const branch = getBranchFromCode(registrationCode)
  const config = registrationConfigs[branch.slug]

  const isMatched = lastRegistration?.registration_code === registrationCode
  const participantName = isMatched ? lastRegistration.participant_name : 'Peserta'
  const schoolName = isMatched ? lastRegistration.school_name : '-'
  
  const categoryValue = isMatched && lastRegistration.specific_data && config.categoryFieldName && lastRegistration.specific_data[config.categoryFieldName] 
    ? lastRegistration.specific_data[config.categoryFieldName]
    : '-'
    
  const createdAt = isMatched && lastRegistration.created_at 
    ? new Date(lastRegistration.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) + ' WIB'
    : new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) + ' WIB'

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const whatsappMessage = `Halo Panitia ATTIN EXPO XII, saya ingin konfirmasi kode registrasi ${registrationCode}`
  const whatsappHref = `https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="w-full min-h-screen flex flex-col">
      <RegistrationHeader />

      {/* pt-[112px] ensures the 112px tall RegistrationHeader doesn't cover the top content */}
      <main className="w-full pt-[112px] pb-16 flex-1 flex flex-col">
        <div className="w-full relative overflow-hidden flex-1">
          <div className="max-w-[780px] mx-auto px-4 sm:px-6 w-full">
            <nav aria-label="Breadcrumb" className="py-4 flex items-center gap-2 font-caption text-caption text-slate-300 mb-4">
              <Link className="hover:text-white transition-colors text-slate-300 flex items-center gap-1 font-medium" to="/">
                <MaterialIcon name="home" className="text-[16px]" />
                <span>Beranda</span>
              </Link>
              <MaterialIcon name="chevron_right" className="text-[14px] text-outline-variant" />
              <span className="font-body-md-semibold text-primary">Pendaftaran Berhasil</span>
            </nav>

            {/* Success Banner */}
            <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 sm:p-10 mb-8 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
              
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-[#ECFDF5] flex items-center justify-center shadow-md relative border border-[#16825D]/20">
                  <span className="absolute inset-0 rounded-full bg-[#16825D]/15 animate-ping" />
                  <div className="w-14 h-14 rounded-full bg-[#16825D] text-surface-container-lowest flex items-center justify-center shadow-sm">
                    <MaterialIcon name="check" className="text-[32px] font-bold" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5 shadow-sm border border-outline-variant/20">
                  <MaterialIcon name="stars" className="text-secondary text-[20px]" />
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#16825D]/20 text-[#16825D] font-label-badge text-label-badge uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16825D]" />
                Sistem Penerimaan Terverifikasi
              </div>
              <h1 className="font-headline-lg text-headline-lg sm:text-display-hero-mobile text-on-surface font-extrabold tracking-tight mb-3">
                Pendaftaran Berhasil!
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Data pendaftaran telah berhasil dikirim dan akan diperiksa oleh panitia verifikasi ATTIN EXPO XII 2026.
              </p>
            </div>

            {/* Registration Code */}
            <div className="bg-gradient-to-br from-primary-container via-primary to-tertiary rounded-3xl shadow-md border border-outline-variant/20 p-8 sm:p-10 text-on-primary mb-8 relative overflow-hidden">
              <svg className="absolute -right-8 -top-8 w-48 h-48 opacity-10 text-on-primary pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100">
                <polygon points="50 0, 85 15, 100 50, 85 85, 50 100, 15 85, 0 50, 15 15" />
                <polygon points="50 15, 75 25, 85 50, 75 75, 50 85, 25 75, 15 50, 25 25" />
                <circle cx="50" cy="50" r="18" />
              </svg>
              
              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="font-label-badge text-label-badge uppercase tracking-widest text-on-primary-container">KODE REGISTRASI RESMI</span>
                  <span className="font-label-badge text-label-badge px-4 py-1 rounded-full bg-secondary border border-secondary-fixed/30 text-on-secondary shadow-sm">Simpan Kode Ini</span>
                </div>
                
                <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-2xl border border-surface-container-lowest/20 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
                  <div className="flex items-center gap-4">
                    <MaterialIcon name="qr_code_2" className="text-on-primary-container text-[28px]" />
                    <span className="font-mono text-[22px] sm:text-[26px] tracking-wider font-bold text-surface-container-lowest select-all">
                      {registrationCode}
                    </span>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={handleCopy}
                    className={`inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-body-md-semibold text-body-md transition-all shadow-md active:scale-95 ${
                      copied ? 'bg-[#16825D] text-surface-container-lowest' : 'bg-surface-container-lowest text-primary hover:bg-surface-container-lowest/90'
                    }`}
                  >
                    <MaterialIcon name={copied ? 'check' : 'content_copy'} className="text-[18px]" />
                    <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
                  </button>
                </div>
                
                <div className="flex items-start gap-3 bg-surface-container-lowest/15 rounded-2xl border border-surface-container-lowest/10 p-4 sm:p-5 text-on-primary-container font-caption text-caption mt-2">
                  <MaterialIcon name="info" className="text-secondary-fixed text-[20px] shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-surface-container-lowest/90">
                    Simpan atau tangkap layar (<span className="font-body-md-semibold text-surface-container-lowest">screenshot</span>) kode registrasi ini sebagai bukti sah untuk keperluan verifikasi berkas, konfirmasi pembayaran, dan daftar ulang di arena expo.
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Summary */}
            <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 sm:p-10 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 gap-4 border-b border-white/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <MaterialIcon name="badge" className="text-[24px]" />
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Ikhtisar Pendaftaran</h2>
                    <p className="font-caption text-caption text-on-surface-variant">Tercatat resmi dalam pangkalan data panitia seleksi</p>
                  </div>
                </div>
                
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/50 rounded-2xl p-6 sm:p-8 border border-white/30">
                <div className="flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1.5">
                    <MaterialIcon name="person" className="text-[16px] text-outline" />
                    Nama Lengkap Peserta
                  </span>
                  <span className="font-title-md text-title-md text-on-surface font-bold">{participantName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1.5">
                    <MaterialIcon name="menu_book" className="text-[16px] text-outline" />
                    Cabang Lomba
                  </span>
                  <span className="font-body-md-semibold text-body-md-semibold text-primary">{branch.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1.5">
                    <MaterialIcon name="school" className="text-[16px] text-outline" />
                    Asal Sekolah / Madrasah
                  </span>
                  <span className="font-body-md text-body-md text-on-surface">{schoolName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1.5">
                    <MaterialIcon name="event" className="text-[16px] text-outline" />
                    Tanggal & Waktu Pendaftaran
                  </span>
                  <span className="font-body-md text-body-md text-on-surface">{createdAt}</span>
                </div>
                
                {categoryValue !== '-' && (
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1.5">
                      <MaterialIcon name="groups" className="text-[16px] text-outline" />
                      Kategori / Detail
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">{categoryValue}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 p-5 rounded-2xl bg-white/50 flex items-center gap-5 border border-white/30 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-white border border-white/30 flex items-center justify-center p-2 shrink-0 shadow-sm">
                  <img className="w-full h-full object-contain" src={site.logo} alt="Logo" />
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md-semibold text-body-md-semibold text-on-surface">Integritas Dokumen Digital</span>
                  <span className="font-caption text-caption text-on-surface-variant">Data terenkripsi dan tercatat otomatis pada ledger panitia pusat.</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 sm:p-10 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <MaterialIcon name="format_list_numbered" className="text-[24px]" />
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Tahapan Selanjutnya</h2>
                  <p className="font-caption text-caption text-on-surface-variant">Konfirmasi pendaftaran via WhatsApp</p>
                </div>
              </div>
              
              <div className="relative pl-8 sm:pl-10 space-y-8 before:content-[''] before:absolute before:left-3.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/30">
                <div className="relative flex items-start gap-5">
                  <span className="absolute -left-8 sm:-left-10 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-primary text-on-primary font-label-badge text-label-badge flex items-center justify-center shadow-md ring-4 ring-white/20">1</span>
                  <div className="flex flex-col bg-white/50 rounded-2xl border border-white/30 p-5 sm:p-6 w-full shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-title-md text-title-md text-on-surface font-semibold mb-2">Konfirmasi ke WhatsApp Panitia</span>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Pendaftaran Anda berhasil dicatat. Silakan hubungi WhatsApp panitia untuk mengonfirmasi dan mengirimkan bukti pendaftaran agar proses dapat diselesaikan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-8 sm:p-10 mb-8 flex flex-col items-center gap-6 text-center">
              <h3 className="font-title-md text-title-md text-on-surface">Apa yang ingin Anda lakukan selanjutnya?</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl">
                <Link 
                  to="/" 
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primary text-on-primary font-body-md-semibold text-body-md-semibold hover:bg-tertiary transition-all shadow-md active:scale-95"
                >
                  <MaterialIcon name="home" className="text-[20px]" />
                  <span>Kembali ke Beranda</span>
                </Link>
                <a 
                  href={whatsappHref} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-surface-container border border-outline-variant/20 text-primary font-body-md-semibold text-body-md-semibold hover:bg-surface-container-high transition-all shadow-sm active:scale-95"
                >
                  <MaterialIcon name="chat" className="text-[#16825D] text-[20px]" />
                  <span>Hubungi Panitia WhatsApp</span>
                </a>
              </div>
              <Link 
                to="/#kompetisi-resmi" 
                className="inline-flex items-center gap-1.5 font-body-md-semibold text-body-md-semibold text-secondary hover:text-on-secondary-container transition-colors mt-2"
              >
                <span>Daftarkan Peserta / Lomba Lainnya</span>
                <MaterialIcon name="arrow_forward" className="text-[18px]" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-center text-slate-400 font-caption text-caption px-4">
              <MaterialIcon name="verified_user" className="text-[18px] text-outline shrink-0" />
              <p>Data peserta dilindungi dan hanya digunakan untuk keperluan lomba ATTIN EXPO XII 2026. Tidak ada data sensitif yang dipublikasikan secara terbuka.</p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


