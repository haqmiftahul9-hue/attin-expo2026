import { useEffect, useState } from 'react'
import MaterialIcon from '../MaterialIcon.jsx'
import { getPaymentProofSignedUrl, proofFileKind } from '../../lib/registrationsRepository.js'

interface PaymentProofModalProps {
  /** Path di bucket privat `registration-payments` (kolom `payment_proof_url`). */
  proofPath: string | null
  /** Judul modal, mis. kode registrasi. */
  title?: string
  /** Subjudul modal, mis. nama peserta & sekolah. */
  subtitle?: string
  onClose: () => void
}

/**
 * Modal pratinjau bukti pembayaran (bukti transfer) untuk portal admin.
 *
 * URL ditandatangani (signed) saat modal dibuka sehingga daftar pendaftar tidak
 * perlu membuat puluhan request sekaligus. Gambar (jpg/png/webp) ditampilkan
 * sebagai <img>, PDF ditampilkan lewat <iframe>.
 */
export default function PaymentProofModal({ proofPath, title, subtitle, onClose }: PaymentProofModalProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadProof() {
      setIsLoading(true)
      setError(null)
      setSignedUrl(null)

      if (!proofPath) {
        setError('Pendaftar ini belum mengunggah bukti pembayaran.')
        setIsLoading(false)
        return
      }

      try {
        const url = await getPaymentProofSignedUrl(proofPath)
        if (cancelled) return
        if (url) {
          setSignedUrl(url)
        } else {
          setError('Gagal memuat bukti pembayaran. Pastikan Anda masuk sebagai admin, lalu coba lagi.')
        }
      } catch {
        if (!cancelled) setError('Terjadi kesalahan saat memuat bukti pembayaran.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadProof()
    return () => {
      cancelled = true
    }
  }, [proofPath])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const kind = proofFileKind(proofPath)
  const rawFileName = proofPath?.split('/').pop() || 'bukti-pembayaran'
  // decodeURIComponent bisa melempar error pada nama berkas tak lazim.
  let fileName = rawFileName
  try {
    fileName = decodeURIComponent(rawFileName)
  } catch {
    fileName = rawFileName
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau bukti pembayaran"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#002B49] text-white flex items-center justify-center shadow-md shrink-0">
              <MaterialIcon name="receipt_long" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold text-[#0F172A] tracking-tight truncate">
                {title || 'Bukti Pembayaran'}
              </h3>
              <p className="text-[12px] text-[#475569] font-medium truncate">
                {subtitle || 'Bukti transfer dari pendaftar'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#334155] hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Tutup"
          >
            <MaterialIcon name="close" className="text-[20px]" />
          </button>
        </div>

        {/* Konten Pratinjau */}
        <div className="px-5 sm:px-6 py-5 overflow-auto flex-1 bg-slate-50/70">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-14 text-[#475569]">
              <MaterialIcon name="sync" className="text-[36px] animate-spin text-[#003B5C] mb-2" />
              <p className="text-sm font-medium">Memuat bukti pembayaran...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <MaterialIcon name="error" className="text-[30px]" />
              </div>
              <p className="text-sm text-rose-700 font-medium max-w-sm">{error}</p>
            </div>
          ) : signedUrl && kind === 'image' ? (
            <img
              src={signedUrl}
              alt={`Bukti pembayaran ${title || ''}`.trim()}
              className="mx-auto block max-h-[60vh] w-auto max-w-full object-contain rounded-xl border border-slate-200 bg-white shadow-sm"
            />
          ) : signedUrl && kind === 'pdf' ? (
            <iframe
              src={signedUrl}
              title={`Bukti pembayaran ${title || ''}`.trim()}
              className="w-full h-[60vh] rounded-xl border border-slate-200 bg-white shadow-sm"
            />
          ) : signedUrl ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] text-[#003B5C] flex items-center justify-center mb-3">
                <MaterialIcon name="attach_file" className="text-[28px]" />
              </div>
              <p className="text-sm text-[#475569] font-medium break-all max-w-sm">{fileName}</p>
              <p className="text-xs text-[#64748B] mt-1">Format pratinjau tidak didukung, gunakan tombol di bawah.</p>
            </div>
          ) : null}
        </div>

        {/* Aksi */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row sm:justify-end gap-2 shrink-0">
          <a
            href={signedUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!signedUrl}
            onClick={(event) => {
              if (!signedUrl) event.preventDefault()
            }}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-bold border transition-colors ${
              signedUrl
                ? 'border-[#CBD5E1] text-[#334155] bg-white hover:bg-slate-100'
                : 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed'
            }`}
          >
            <MaterialIcon name="open_in_new" className="text-[18px]" />
            Buka di Tab Baru
          </a>
          <a
            href={signedUrl || '#'}
            download={fileName}
            aria-disabled={!signedUrl}
            onClick={(event) => {
              if (!signedUrl) event.preventDefault()
            }}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-bold transition-colors ${
              signedUrl ? 'bg-[#002B49] text-white hover:bg-[#003B66] shadow-sm' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <MaterialIcon name="download" className="text-[18px]" />
            Unduh
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-bold text-[#475569] bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
