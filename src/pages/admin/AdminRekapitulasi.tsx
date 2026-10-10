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
      'Kabupaten/Kota': row.city || '-',
      'Jumlah Peserta': row.participant_count || 1,
      'Biaya per Peserta': row.unit_fee || 0,
      'Total Biaya': row.total_fee || 0,
      'Guru Pendamping': row.specific_data?.guru_pendamping || '-',
      'No HP Pendamping': row.specific_data?.nohp_pendamping || '-',
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
    const tableColumn = ["No", "Kode", "Waktu Daftar", "Cabang & Kategori", "Nama Peserta", "L/P", "Asal Sekolah", "Pendamping"]
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
        row.specific_data?.guru_pendamping || '-'
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
          <h1 className="text-headline-md font-bold text-white">Rekapitulasi Data</h1>
          <p className="text-body-md text-slate-300">Kelola dan ekspor tabel pendaftaran keseluruhan.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select 
              value={filterSlug} 
              onChange={(e) => setFilterSlug(e.target.value)}
              className="appearance-none bg-white border border-slate-900/10 text-on-surface py-2 pl-4 pr-10 rounded-lg text-[14px] font-medium outline-none focus:border-primary"
            >
              <option value="all">Semua Perlombaan</option>
              <option value="tahfizh">Lomba Tahfizh</option>
              <option value="pra-tka">Pra-TKA</option>
              <option value="panahan">Panahan Standar</option>
            </select>
            <MaterialIcon name="arrow_drop_down" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
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

      <div className="bg-white border border-slate-900/10 rounded-[20px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden transition-all duration-300 hover:border-slate-900/20 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Kode Reg</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Waktu Daftar</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Cabang Lomba</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Kategori/Kelas Lomba</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Nama Peserta</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Nama Panggilan</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Jenis Kelamin</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Tempat Lahir</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Tanggal Lahir</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Kelas Pendidikan</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Asal Sekolah</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Alamat Sekolah</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Guru Pendamping</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">No HP Pendamping</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Bank Pengirim</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Atas Nama Rekening</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Status Daftar</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Status Bayar</th>
                <th className="py-4 px-4 text-[14px] font-bold text-slate-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-[14px]">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={20} className="py-12 text-center text-slate-600">
                    <MaterialIcon name="inbox" className="text-[48px] text-surface-container-high mb-2" />
                    <p>Tidak ada data pendaftaran.</p>
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((row) => (
                  <tr key={row.registration_code} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-[13px] text-primary font-semibold">{row.registration_code}</td>
                    <td className="py-3 px-4 text-caption text-slate-500">
                      {row.created_at ? new Date(row.created_at).toLocaleString('id-ID', {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'}) : '-'}
                    </td>
                    <td className="py-3 px-4 font-medium text-on-surface">
                      {registrationConfigs[row.competition_slug]?.name || row.competition_slug}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[13px] font-semibold bg-primary-fixed text-primary">
                        {(row.specific_data && Object.values(row.specific_data)[0]) || 'Umum'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-on-surface">{row.participant_name}</td>
                    <td className="py-3 px-4 text-slate-600">{row.nickname || '-'}</td>
                    <td className="py-3 px-4 text-slate-600">{row.gender || '-'}</td>
                    <td className="py-3 px-4 text-slate-600">{row.birth_place || '-'}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {row.birth_date ? new Date(row.birth_date).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{row.grade || '-'}</td>
                    <td className="py-3 px-4 font-medium text-on-surface">{row.school_name}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-[200px] truncate" title={row.school_address}>{row.school_address || '-'}</td>
                    <td className="py-3 px-4 font-medium text-on-surface">{row.specific_data?.guru_pendamping || '-'}</td>
                    <td className="py-3 px-4 font-mono text-[13px] text-slate-600">{row.specific_data?.nohp_pendamping || '-'}</td>
                    <td className="py-3 px-4 text-slate-600">{row.payment_sender_bank || '-'}</td>
                    <td className="py-3 px-4 text-slate-600">{row.payment_sender_name || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[13px] font-semibold ${row.registration_status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {row.registration_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[13px] font-semibold ${row.payment_status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {row.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a href={`/admin/pendaftaran/${row.registration_code}`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-fixed text-primary hover:bg-primary hover:text-white transition-colors">
                        <MaterialIcon name="visibility" className="text-[18px]" />
                      </a>
                    </td>
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


