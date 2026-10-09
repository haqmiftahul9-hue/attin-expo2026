import { useEffect, useState, useMemo } from 'react'
import { getAllRegistrations } from '../../lib/registrationsRepository.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { RegistrationRow } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import MaterialIcon from '../../components/MaterialIcon.jsx'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function AdminRekapitulasi() {
  usePageTitle('Rekapitulasi Pendaftaran - ATTIN EXPO XII')
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([])
  const [filterSlug, setFilterSlug] = useState('all')

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllRegistrations()
        setRegistrations(data || [])
      } catch (err) {
      }
    }
    fetchData()
  }, [])

  const filteredRegistrations = useMemo(() => {
    if (filterSlug === 'all') return registrations
    return registrations.filter(r => r.competition_slug === filterSlug)
  }, [registrations, filterSlug])

  const exportExcel = () => {
    const data = filteredRegistrations.map((row, index) => ({
      'No': index + 1,
      'Kode Registrasi': row.registration_code,
      'Waktu Pendaftaran': row.created_at ? new Date(row.created_at).toLocaleString('id-ID') : '-',
      'Cabang Lomba': registrationConfigs[row.competition_slug]?.name || row.competition_slug,
      'Kategori/Kelas': (row.specific_data && Object.values(row.specific_data)[0]) || '-',
      'Nama Lengkap': row.participant_name,
      'Nama Panggilan': row.nickname,
      'Jenis Kelamin': row.gender || '-',
      'Tempat Lahir': row.birth_place,
      'Tanggal Lahir': row.birth_date ? new Date(row.birth_date).toLocaleDateString('id-ID') : '-',
      'Kelas': row.grade,
      'Asal Sekolah': row.school_name,
      'Alamat Sekolah': row.school_address,
      'Bank Pengirim': row.payment_sender_bank,
      'Atas Nama Rekening': row.payment_sender_name,
      'Status Pendaftaran': row.registration_status,
      'Status Pembayaran': row.payment_status,
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Rekap Pendaftaran")
    XLSX.writeFile(wb, `Rekap_ATTIN_EXPO_${filterSlug}.xlsx`)
  }

  const exportPDF = () => {
    const doc = new jsPDF('landscape')
    doc.text(`Rekapitulasi Pendaftaran ATTIN EXPO XII - ${filterSlug === 'all' ? 'Semua Lomba' : filterSlug}`, 14, 15)
    
    // Untuk PDF kita batasi kolom utama agar muat
    const tableColumn = ["No", "Kode", "Waktu Daftar", "Cabang & Kategori", "Nama Peserta", "L/P", "Asal Sekolah", ]
    const tableRows: any[][] = []

    filteredRegistrations.forEach((row, index) => {
      const lombaText = `${registrationConfigs[row.competition_slug]?.name || row.competition_slug} - ${(row.specific_data && Object.values(row.specific_data)[0]) || ''}`
      const rowData = [
        index + 1,
        row.registration_code,
        row.created_at ? new Date(row.created_at).toLocaleDateString('id-ID') : '-',
        lombaText,
        row.participant_name,
        row.gender === 'Laki-laki' ? 'L' : (row.gender === 'Perempuan' ? 'P' : '-'),
        row.school_name,
        row.city || '-'
      ]
      tableRows.push(rowData)
    })

    // @ts-ignore
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [0, 55, 114] } // primary color
    })
    
    doc.save(`Rekap_ATTIN_EXPO_${filterSlug}.pdf`)
  }

  return (
    <div className="w-full pt-6 md:pt-8 px-4 md:px-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-headline-md font-bold text-on-surface">Rekapitulasi Data</h1>
          <p className="text-body-md text-on-surface-variant">Kelola dan ekspor tabel pendaftaran keseluruhan.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select 
              value={filterSlug} 
              onChange={(e) => setFilterSlug(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-surface-container text-on-surface py-2 pl-4 pr-10 rounded-lg text-[14px] font-medium outline-none focus:border-primary"
            >
              <option value="all">Semua Perlombaan</option>
              <option value="tahfizh">Tahfizh Al-Qur'an</option>
              <option value="pra-tka">Pra-TKA</option>
              <option value="panahan">Panahan Standar</option>
            </select>
            <MaterialIcon name="arrow_drop_down" className="absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          </div>

          <button 
            onClick={exportExcel}
            className="flex items-center gap-2 bg-[#16825D] hover:bg-[#126b4c] text-white py-2 px-4 rounded-lg font-medium text-[14px] transition-colors shadow-sm"
          >
            <MaterialIcon name="table_view" className="text-[18px]" />
            <span>Unduh Excel</span>
          </button>

          <button 
            onClick={exportPDF}
            className="flex items-center gap-2 bg-error hover:bg-[#93000a] text-white py-2 px-4 rounded-lg font-medium text-[14px] transition-colors shadow-sm"
          >
            <MaterialIcon name="picture_as_pdf" className="text-[18px]" />
            <span>Unduh PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-surface-container rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50 border-b border-surface-container">
              <tr>
                <th className="py-4 px-4 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Kode Reg</th>
                <th className="py-4 px-4 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Waktu Daftar</th>
                <th className="py-4 px-4 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Nama Peserta</th>
                <th className="py-4 px-4 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Asal Sekolah</th>
                <th className="py-4 px-4 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Cabang & Kategori</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-[14px]">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    <MaterialIcon name="inbox" className="text-[48px] text-surface-container-high mb-2" />
                    <p>Tidak ada data pendaftaran.</p>
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((row) => (
                  <tr key={row.registration_code} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-mono text-[13px] text-primary font-semibold">{row.registration_code}</td>
                    <td className="py-3 px-4 text-caption text-outline">
                      {row.created_at ? new Date(row.created_at).toLocaleString('id-ID', {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}) : '-'}
                    </td>
                    <td className="py-3 px-4 font-medium text-on-surface">{row.participant_name}</td>
                    <td className="py-3 px-4 text-on-surface-variant max-w-[200px] truncate">{row.school_name}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-on-surface">{registrationConfigs[row.competition_slug]?.name || row.competition_slug}</span>
                        <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-fixed text-primary">
                          {(row.specific_data && Object.values(row.specific_data)[0]) || 'Umum'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">{row.city || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
