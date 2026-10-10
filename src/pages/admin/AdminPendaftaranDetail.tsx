import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllRegistrations, getPaymentProofSignedUrl, updateRegistrationStatus } from '../../lib/registrationsRepository.js'
import type { RegistrationRow } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import MaterialIcon from '../../components/MaterialIcon.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'

export default function AdminPendaftaranDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [row, setRow] = useState<RegistrationRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [proofUrl, setProofUrl] = useState<string | null>(null)
  
  usePageTitle(`Detail ${id} - Admin`)

  useEffect(() => {
    async function fetchDetail() {
      try {
        const all = await getAllRegistrations()
        const found = all.find(r => r.registration_code === id)
        if (found) {
          setRow(found)
          if (found.payment_proof_url) {
            const signed = await getPaymentProofSignedUrl(found.payment_proof_url)
            setProofUrl(signed)
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  if (loading) return <div className="p-8">Loading...</div>
  if (!row) return <div className="p-8">Pendaftaran tidak ditemukan.</div>

  const config = registrationConfigs[row.competition_slug] || {}

  const handleUpdateStatus = async (status: 'pending' | 'verified' | 'rejected') => {
    if (confirm(`Anda yakin mengubah status menjadi ${status}?`)) {
      const success = await updateRegistrationStatus(row.registration_code, status)
      if (success) {
        setRow({ ...row, registration_status: status, payment_status: status === 'verified' ? 'verified' : row.payment_status })
      } else {
        alert('Gagal update status.')
      }
    }
  }

  return (
    <div className="w-full pt-6 md:pt-8 px-4 md:px-8 pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-primary mb-6">
        <MaterialIcon name="arrow_back" /> Kembali
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-900/10">
            <h3 className="font-bold text-lg mb-4 text-primary">A. Informasi Registrasi</h3>
            <div className="space-y-2">
              <p><span className="text-slate-500">Kode:</span> {row.registration_code}</p>
              <p><span className="text-slate-500">Cabang:</span> {config.name}</p>
              <p><span className="text-slate-500">Kategori:</span> {row.category || (row.specific_data && Object.values(row.specific_data)[0]) || 'Umum'}</p>
              <p><span className="text-slate-500">Waktu:</span> {row.created_at ? new Date(row.created_at).toLocaleString('id-ID') : '-'}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-900/10">
            <h3 className="font-bold text-lg mb-4 text-primary">B. Data Peserta</h3>
            <div className="space-y-2">
              <p><span className="text-slate-500">Nama Lengkap:</span> <br/>
                <span className="whitespace-pre-wrap">{row.participant_name}</span>
              </p>
              <p><span className="text-slate-500">Nama Panggilan:</span> {row.nickname || '-'}</p>
              <p><span className="text-slate-500">Jenis Kelamin:</span> {row.gender || '-'}</p>
              <p><span className="text-slate-500">TTL:</span> {row.birth_place || '-'}, {row.birth_date || '-'}</p>
              <p><span className="text-slate-500">Kelas:</span> {row.grade || '-'}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-900/10">
            <h3 className="font-bold text-lg mb-4 text-primary">C. Data Sekolah</h3>
            <div className="space-y-2">
              <p><span className="text-slate-500">Sekolah:</span> {row.school_name}</p>
              <p><span className="text-slate-500">Alamat:</span> {row.school_address || '-'}</p>
              <p><span className="text-slate-500">Guru Pendamping:</span> {row.specific_data?.guru_pendamping || '-'}</p>
              <p><span className="text-slate-500">No HP:</span> {row.specific_data?.nohp_pendamping || '-'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-900/10">
            <h3 className="font-bold text-lg mb-4 text-primary">D. Pembayaran</h3>
            <div className="space-y-2 mb-6">
              <p><span className="text-slate-500">Jumlah Peserta:</span> {row.participant_count || 1}</p>
              <p><span className="text-slate-500">Biaya per Peserta:</span> Rp{new Intl.NumberFormat('id-ID').format(row.unit_fee || 0)}</p>
              <p><span className="text-slate-500 font-bold">Total Biaya:</span> <strong className="text-primary text-xl">Rp{new Intl.NumberFormat('id-ID').format(row.total_fee || 0)}</strong></p>
              <p><span className="text-slate-500">Bank Pengirim:</span> {row.payment_sender_bank}</p>
              <p><span className="text-slate-500">Atas Nama:</span> {row.payment_sender_name}</p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-bold text-slate-700 mb-2">Bukti Pembayaran</h4>
              {proofUrl ? (
                <div className="flex flex-col gap-2">
                  <a href={proofUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg justify-center">
                    <MaterialIcon name="visibility" /> Lihat Bukti
                  </a>
                  <a href={proofUrl} download className="inline-flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-lg justify-center">
                    <MaterialIcon name="download" /> Download Bukti
                  </a>
                </div>
              ) : (
                <p className="text-error bg-error-container p-3 rounded-lg text-sm text-center">Belum ada bukti pembayaran</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-900/10">
            <h3 className="font-bold text-lg mb-4 text-primary">E. Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 mb-2">Status Registrasi: <strong>{row.registration_status}</strong></p>
                <div className="flex gap-2">
                  <button onClick={() => handleUpdateStatus('verified')} className="bg-[#16825D] text-white px-3 py-1.5 rounded-lg text-sm">Verifikasi Lolos</button>
                  <button onClick={() => handleUpdateStatus('rejected')} className="bg-error text-white px-3 py-1.5 rounded-lg text-sm">Tolak</button>
                  <button onClick={() => handleUpdateStatus('pending')} className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-sm">Pending</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
