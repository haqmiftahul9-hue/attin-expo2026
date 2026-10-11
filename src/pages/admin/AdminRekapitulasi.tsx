import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getAllRegistrations } from '../../lib/registrationsRepository.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { RegistrationRow, CompetitionSlug } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import MaterialIcon from '../../components/MaterialIcon.jsx'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Helper untuk mengambil label kategori lomba secara akurat
function getCategoryDisplay(row: RegistrationRow): string {
  if (row.category && row.category.trim() !== '') {
    return row.category
  }
  if (row.specific_data) {
    if (row.competition_slug === 'pra-tka' && row.specific_data.kategori_pra_tka) {
      return row.specific_data.kategori_pra_tka
    }
    if (row.competition_slug === 'panahan' && row.specific_data.kategori_panahan) {
      return row.specific_data.kategori_panahan
    }
    // Cari field kategori selain guru dan nohp pendamping
    const otherKey = Object.keys(row.specific_data).find(
      (k) => k !== 'guru_pendamping' && k !== 'nohp_pendamping'
    )
    if (otherKey && row.specific_data[otherKey]) {
      return row.specific_data[otherKey]
    }
  }
  return '-'
}

// Helper untuk mengurai nama peserta per baris/gender
function parseParticipants(row: RegistrationRow): { name: string; type?: 'Putra' | 'Putri' | 'Peserta' }[] {
  if (row.competition_slug === 'tahfizh') {
    const parts = (row.participant_name || '').split(' | ')
    const list: { name: string; type?: 'Putra' | 'Putri' | 'Peserta' }[] = []
    parts.forEach((part) => {
      const trimmed = part.trim()
      if (trimmed.startsWith('Putra: ')) {
        list.push({ name: trimmed.replace('Putra: ', '').trim(), type: 'Putra' })
      } else if (trimmed.startsWith('Putri: ')) {
        list.push({ name: trimmed.replace('Putri: ', '').trim(), type: 'Putri' })
      } else if (trimmed) {
        list.push({ name: trimmed, type: 'Peserta' })
      }
    })
    return list.length > 0 ? list : [{ name: row.participant_name || '-', type: 'Peserta' }]
  }

  // Pra-TKA dan Panahan: dipisahkan dengan newline
  const names = (row.participant_name || '')
    .split('\n')
    .map((n) => n.trim())
    .filter(Boolean)

  if (names.length === 0) {
    return [{ name: row.participant_name || '-', type: 'Peserta' }]
  }

  return names.map((name) => ({ name, type: 'Peserta' }))
}

// Helper format rupiah
function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

export default function AdminRekapitulasi() {
  usePageTitle('Rekapitulasi Pendaftaran - ATTIN EXPO XII')

  const [registrations, setRegistrations] = useState<RegistrationRow[]>([])
  const [filterSlug, setFilterSlug] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getAllRegistrations()
      setRegistrations(data || [])
    } catch (err) {
      console.error('[AdminRekapitulasi] gagal mengambil data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Filter gabungan: Cabang Lomba, Status Verifikasi, dan Pencarian teks
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      // 1. Filter Cabang
      if (filterSlug !== 'all' && r.competition_slug !== filterSlug) {
        return false
      }
      // 2. Filter Status
      if (filterStatus !== 'all' && r.registration_status !== filterStatus) {
        return false
      }
      // 3. Search Query (Kode Reg, Nama Peserta, Sekolah, Guru Pendamping, No HP)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase()
        const code = (r.registration_code || '').toLowerCase()
        const participant = (r.participant_name || '').toLowerCase()
        const school = (r.school_name || '').toLowerCase()
        const teacher = (r.specific_data?.guru_pendamping || '').toLowerCase()
        const phone = (r.specific_data?.nohp_pendamping || '').toLowerCase()
        const category = getCategoryDisplay(r).toLowerCase()

        return (
          code.includes(query) ||
          participant.includes(query) ||
          school.includes(query) ||
          teacher.includes(query) ||
          phone.includes(query) ||
          category.includes(query)
        )
      }
      return true
    })
  }, [registrations, filterSlug, filterStatus, searchQuery])

  // Metrik Statistik Cepat
  const stats = useMemo(() => {
    const totalReg = registrations.length
    const totalPeserta = registrations.reduce((acc, r) => acc + (r.participant_count || 1), 0)
    const verifiedReg = registrations.filter((r) => r.registration_status === 'verified').length
    const pendingReg = registrations.filter((r) => r.registration_status === 'pending').length
    const totalInfaq = registrations
      .filter((r) => r.payment_status === 'verified')
      .reduce((acc, r) => acc + (r.total_fee || 0), 0)

    return { totalReg, totalPeserta, verifiedReg, pendingReg, totalInfaq }
  }, [registrations])

  // Ekspor Excel yang diaudit sesuai formulir pendaftaran resmi
  const exportExcel = () => {
    const wb = XLSX.utils.book_new()

    const processSheet = (sheetRegistrations: typeof registrations, sheetName: string) => {
      const expandedRows: any[] = []

      sheetRegistrations.forEach((row) => {
        const participants = parseParticipants(row)
        participants.forEach((p) => {
          expandedRows.push({
            ...row,
            expanded_name: p.name,
            expanded_type: p.type === 'Putra' ? 'Putra' : p.type === 'Putri' ? 'Putri' : '-',
          })
        })
      })

      // Kolom Excel Disesuaikan Persis dengan Formulir Pendaftaran Resmi ATTIN EXPO XII
      const data = expandedRows.map((row, index) => {
        const statusVerifikasiLabel =
          row.registration_status === 'verified'
            ? 'Terverifikasi'
            : row.registration_status === 'rejected'
            ? 'Ditolak'
            : 'Menunggu Verifikasi'

        const statusBayarLabel =
          row.payment_status === 'verified'
            ? 'Lunas / Terverifikasi'
            : row.payment_status === 'rejected'
            ? 'Ditolak'
            : 'Menunggu Verifikasi'

        return {
          'No': index + 1,
          'Kode Registrasi': row.registration_code || '-',
          'Waktu Pendaftaran': row.created_at
            ? new Date(row.created_at).toLocaleString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '-',
          'Cabang Lomba':
            registrationConfigs[row.competition_slug as CompetitionSlug]?.name || row.competition_slug,
          'Kategori Lomba': getCategoryDisplay(row),
          'Nama Peserta': row.expanded_name || '-',
          'Kategori Peserta': row.expanded_type || '-',
          'Asal Sekolah / Madrasah': row.school_name || '-',
          'Alamat Sekolah': row.school_address || '-',
          'Guru Pendamping': row.specific_data?.guru_pendamping || '-',
          'No. HP / WA Pendamping': row.specific_data?.nohp_pendamping || '-',
          'Jumlah Peserta (Reg)': row.participant_count || 1,
          'Biaya per Peserta (Rp)': row.unit_fee || 0,
          'Total Biaya (Rp)': row.total_fee || 0,
          'Bank Pengirim': row.payment_sender_bank || '-',
          'Nama Pemilik Rekening': row.payment_sender_name || '-',
          'Status Verifikasi': statusVerifikasiLabel,
          'Status Pembayaran': statusBayarLabel,
        }
      })

      const ws = XLSX.utils.json_to_sheet(data)

      // Lebar kolom otomatis agar rapi dan profesional saat dibuka di Microsoft Excel
      ws['!cols'] = [
        { wch: 6 },  // No
        { wch: 18 }, // Kode Registrasi
        { wch: 22 }, // Waktu Pendaftaran
        { wch: 20 }, // Cabang Lomba
        { wch: 22 }, // Kategori Lomba
        { wch: 28 }, // Nama Peserta
        { wch: 18 }, // Kategori Peserta
        { wch: 32 }, // Asal Sekolah / Madrasah
        { wch: 38 }, // Alamat Sekolah
        { wch: 26 }, // Guru Pendamping
        { wch: 22 }, // No. HP / WA Pendamping
        { wch: 16 }, // Jumlah Peserta (Reg)
        { wch: 20 }, // Biaya per Peserta (Rp)
        { wch: 18 }, // Total Biaya (Rp)
        { wch: 18 }, // Bank Pengirim
        { wch: 26 }, // Nama Pemilik Rekening
        { wch: 22 }, // Status Verifikasi
        { wch: 24 }, // Status Pembayaran
      ]

      XLSX.utils.book_append_sheet(wb, ws, sheetName)
    }

    if (filterSlug === 'all') {
      const tahfizh = registrations.filter((r) => r.competition_slug === 'tahfizh')
      const pratka = registrations.filter((r) => r.competition_slug === 'pra-tka')
      const panahan = registrations.filter((r) => r.competition_slug === 'panahan')

      processSheet(tahfizh, 'Tahfizh')
      processSheet(pratka, 'Pra-TKA')
      processSheet(panahan, 'Panahan')
    } else {
      let sheetName = 'Rekap Pendaftaran'
      if (filterSlug === 'tahfizh') sheetName = 'Tahfizh'
      if (filterSlug === 'pra-tka') sheetName = 'Pra-TKA'
      if (filterSlug === 'panahan') sheetName = 'Panahan'
      processSheet(filteredRegistrations, sheetName)
    }

    const dateStr = new Date().toISOString().slice(0, 10)
    XLSX.writeFile(wb, `Rekap_Pendaftaran_ATTIN_EXPO_XII_${filterSlug}_${dateStr}.xlsx`)
  }

  // Ekspor Dokumen Resmi PDF Rekapitulasi
  const exportPDF = () => {
    const doc = new jsPDF('landscape')
    const branchLabel =
      filterSlug === 'all'
        ? 'Semua Perlombaan'
        : registrationConfigs[filterSlug as CompetitionSlug]?.name || filterSlug

    // Header Dokumen
    doc.setFontSize(14)
    doc.setTextColor(0, 55, 114)
    doc.text('REKAPITULASI PENDAFTARAN RESMI ATTIN EXPO XII 2026', 14, 15)
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Cabang: ${branchLabel} | Total Data: ${filteredRegistrations.length} Pendaftar | Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 21)

    const tableColumn = [
      'No',
      'Kode Reg',
      'Waktu',
      'Cabang & Kategori',
      'Peserta',
      'Asal Sekolah',
      'Pendamping & No HP',
      'Total Biaya',
      'Status Verifikasi',
    ]

    const tableRows: any[][] = []

    filteredRegistrations.forEach((row, index) => {
      const branchName = registrationConfigs[row.competition_slug]?.name || row.competition_slug
      const cat = getCategoryDisplay(row)
      const lombaText = cat !== '-' ? `${branchName} (${cat})` : branchName

      const timeText = row.created_at
        ? new Date(row.created_at).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : '-'

      const teacherInfo = `${row.specific_data?.guru_pendamping || '-'}\n${row.specific_data?.nohp_pendamping || '-'}`
      const feeText = `Rp ${new Intl.NumberFormat('id-ID').format(row.total_fee || 0)}`
      const statusText =
        row.registration_status === 'verified'
          ? 'Terverifikasi'
          : row.registration_status === 'rejected'
          ? 'Ditolak'
          : 'Menunggu'

      tableRows.push([
        index + 1,
        row.registration_code,
        timeText,
        lombaText,
        row.participant_name,
        row.school_name,
        teacherInfo,
        feeText,
        statusText,
      ])
    })

    // @ts-ignore
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 26,
      styles: { fontSize: 8, cellPadding: 2.5, valign: 'middle' },
      headStyles: { fillColor: [0, 55, 114], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    })

    const dateStr = new Date().toISOString().slice(0, 10)
    doc.save(`Rekap_Pendaftaran_ATTIN_EXPO_${filterSlug}_${dateStr}.pdf`)
  }

  return (
    <div className="w-full pt-6 md:pt-8 px-4 md:px-8 pb-16">
      {/* Header Halaman */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary-fixed text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Pusat Manajemen Berkas
            </span>
            <span className="text-xs text-slate-400">Pembaruan Realtime</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Rekapitulasi Data Pendaftaran
          </h1>
          <p className="text-sm text-slate-300 mt-0.5">
            Kelola, verifikasi, dan ekspor tabel pendaftaran peserta ATTIN EXPO XII secara menyeluruh.
          </p>
        </div>

        {/* Tombol Aksi Ekspor */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 px-3.5 rounded-xl font-medium text-sm transition-all border border-white/10 shadow-sm disabled:opacity-50"
            title="Segarkan Data"
          >
            <MaterialIcon
              name="refresh"
              className={`text-[18px] ${isLoading ? 'animate-spin' : ''}`}
            />
            <span>Segarkan</span>
          </button>

          <button
            onClick={exportExcel}
            className="flex items-center gap-2 bg-[#16825D] hover:bg-[#126b4c] text-white py-2 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <MaterialIcon name="table_view" className="text-[19px]" />
            <span>Unduh Excel</span>
          </button>

          <button
            onClick={exportPDF}
            className="flex items-center gap-2 bg-error hover:bg-[#93000a] text-white py-2 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <MaterialIcon name="picture_as_pdf" className="text-[19px]" />
            <span>Unduh PDF</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Kartu Metrik KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Formulir
            </span>
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <MaterialIcon name="receipt_long" className="text-[16px]" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tight">{stats.totalReg}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Berkas Masuk</div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Peserta
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <MaterialIcon name="groups" className="text-[16px]" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tight">{stats.totalPeserta}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Santri Terdata</div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              Terverifikasi
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <MaterialIcon name="verified" className="text-[16px]" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight">{stats.verifiedReg}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Lolos Berkas</div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
              Menunggu
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <MaterialIcon name="pending_actions" className="text-[16px]" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 tracking-tight">{stats.pendingReg}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Perlu Peninjauan</div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Infaq Terverifikasi
            </span>
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <MaterialIcon name="payments" className="text-[16px]" />
            </div>
          </div>
          <div className="text-xl font-black text-primary tracking-tight">
            {formatRupiah(stats.totalInfaq)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Dana Masuk Kas</div>
        </div>
      </div>

      {/* Kontainer Utama Tabel & Filter */}
      <div className="bg-white border border-slate-900/10 rounded-[24px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden">
        {/* Toolbar Pencarian & Filter */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Input Pencarian */}
          <div className="relative flex-1 max-w-md">
            <MaterialIcon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kode, santri, sekolah, pendamping..."
              className="w-full bg-white border border-slate-300 text-slate-800 placeholder-slate-400 py-2.5 pl-10 pr-9 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Hapus Pencarian"
              >
                <MaterialIcon name="close" className="text-[16px]" />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter Cabang Lomba */}
            <div className="relative">
              <select
                value={filterSlug}
                onChange={(e) => setFilterSlug(e.target.value)}
                className="appearance-none bg-white border border-slate-300 text-slate-700 py-2 pl-3.5 pr-9 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all shadow-sm"
              >
                <option value="all">Semua Cabang Lomba</option>
                <option value="tahfizh">Lomba Tahfizh</option>
                <option value="pra-tka">Lomba Pra-TKA</option>
                <option value="panahan">Lomba Panahan</option>
              </select>
              <MaterialIcon
                name="expand_more"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[18px]"
              />
            </div>

            {/* Filter Status Verifikasi */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-slate-300 text-slate-700 py-2 pl-3.5 pr-9 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all shadow-sm"
              >
                <option value="all">Semua Status</option>
                <option value="verified">Terverifikasi</option>
                <option value="pending">Menunggu Verifikasi</option>
                <option value="rejected">Ditolak</option>
              </select>
              <MaterialIcon
                name="expand_more"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[18px]"
              />
            </div>

            {/* Info Hasil Filter */}
            <div className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-200/70 text-slate-700 text-xs font-semibold">
              {filteredRegistrations.length} data ditemukan
            </div>
          </div>
        </div>

        {/* Tabel Data Rekapitulasi */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 text-[12px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Kode Reg</th>
                <th className="py-3.5 px-4">Waktu Daftar</th>
                <th className="py-3.5 px-4">Cabang &amp; Kategori</th>
                <th className="py-3.5 px-4">Nama Peserta</th>
                <th className="py-3.5 px-4">Asal Sekolah &amp; Alamat</th>
                <th className="py-3.5 px-4">Guru Pendamping &amp; Kontak</th>
                <th className="py-3.5 px-4 text-right">Infaq Total</th>
                <th className="py-3.5 px-4 text-center">Status Berkas</th>
                <th className="py-3.5 px-4 text-center">Status Bayar</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-500">
                    <MaterialIcon name="sync" className="text-[36px] animate-spin text-primary mb-2" />
                    <p className="text-sm font-medium">Memuat data pendaftaran...</p>
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-500">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <MaterialIcon name="inbox" className="text-[32px]" />
                    </div>
                    <p className="font-semibold text-slate-700 text-base">Tidak ada data pendaftaran.</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      {searchQuery
                        ? `Tidak ada hasil pencarian untuk "${searchQuery}". Coba kata kunci lain atau setel ulang filter.`
                        : 'Belum ada data pendaftar yang terdaftar di sistem.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((row) => {
                  const participants = parseParticipants(row)
                  const branchConfig = registrationConfigs[row.competition_slug]
                  const categoryName = getCategoryDisplay(row)

                  // Visual Badge Berkas
                  const isVerified = row.registration_status === 'verified'
                  const isRejected = row.registration_status === 'rejected'

                  // Visual Badge Bayar
                  const isPaid = row.payment_status === 'verified'

                  return (
                    <tr
                      key={row.registration_code}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* 1. Kode Registrasi */}
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/admin/pendaftaran/${row.registration_code}`}
                          className="font-mono text-xs font-bold text-primary hover:text-primary-container inline-flex items-center gap-1 group-hover:underline"
                        >
                          <MaterialIcon name="tag" className="text-[14px] text-primary/70" />
                          {row.registration_code}
                        </Link>
                      </td>

                      {/* 2. Waktu Pendaftaran */}
                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {row.created_at ? (
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-700">
                              {new Date(row.created_at).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {new Date(row.created_at).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}{' '}
                              WIB
                            </span>
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>

                      {/* 3. Cabang & Kategori */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                              row.competition_slug === 'tahfizh'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : row.competition_slug === 'pra-tka'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {branchConfig?.name || row.competition_slug}
                          </span>
                          {categoryName !== '-' && (
                            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                              {categoryName}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 4. Nama Peserta */}
                      <td className="py-3.5 px-4 max-w-[260px]">
                        <div className="space-y-1">
                          {participants.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              {p.type === 'Putra' && (
                                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-blue-100 text-blue-700">
                                  Putra
                                </span>
                              )}
                              {p.type === 'Putri' && (
                                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-pink-100 text-pink-700">
                                  Putri
                                </span>
                              )}
                              <span
                                className="font-semibold text-slate-800 text-xs truncate block max-w-[190px]"
                                title={p.name}
                              >
                                {p.name}
                              </span>
                            </div>
                          ))}
                          {row.participant_count > 1 && row.competition_slug !== 'tahfizh' && (
                            <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                              Total: {row.participant_count} Peserta
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 5. Asal Sekolah & Alamat */}
                      <td className="py-3.5 px-4 max-w-[240px]">
                        <div className="flex flex-col">
                          <span
                            className="font-bold text-slate-800 text-xs truncate max-w-[220px]"
                            title={row.school_name}
                          >
                            {row.school_name}
                          </span>
                          <span
                            className="text-[11px] text-slate-500 truncate max-w-[220px] mt-0.5"
                            title={row.school_address}
                          >
                            {row.school_address || '-'}
                          </span>
                        </div>
                      </td>

                      {/* 6. Guru Pendamping & Kontak */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 text-xs">
                            {row.specific_data?.guru_pendamping || '-'}
                          </span>
                          {row.specific_data?.nohp_pendamping ? (
                            <a
                              href={`https://wa.me/${row.specific_data.nohp_pendamping.replace(/^0/, '62').replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-emerald-600 hover:text-emerald-700 font-mono flex items-center gap-1 mt-0.5 group-hover:underline"
                            >
                              <MaterialIcon name="call" className="text-[12px]" />
                              {row.specific_data.nohp_pendamping}
                            </a>
                          ) : (
                            <span className="text-[11px] text-slate-400">-</span>
                          )}
                        </div>
                      </td>

                      {/* 7. Total Biaya & Bank */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-black text-slate-800 text-xs">
                            {formatRupiah(row.total_fee || 0)}
                          </span>
                          <span
                            className="text-[11px] text-slate-500 truncate max-w-[130px]"
                            title={`${row.payment_sender_bank || '-'} a.n. ${row.payment_sender_name || '-'}`}
                          >
                            {row.payment_sender_bank || '-'}
                          </span>
                        </div>
                      </td>

                      {/* 8. Status Berkas */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isVerified
                              ? 'bg-emerald-100 text-emerald-700'
                              : isRejected
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          <MaterialIcon
                            name={isVerified ? 'check_circle' : isRejected ? 'cancel' : 'hourglass_empty'}
                            className="text-[13px]"
                          />
                          {isVerified ? 'Terverifikasi' : isRejected ? 'Ditolak' : 'Menunggu'}
                        </span>
                      </td>

                      {/* 9. Status Bayar */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isPaid
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          <MaterialIcon
                            name={isPaid ? 'paid' : 'schedule'}
                            className="text-[13px]"
                          />
                          {isPaid ? 'Lunas' : 'Menunggu'}
                        </span>
                      </td>

                      {/* 10. Aksi */}
                      <td className="py-3.5 px-4 text-center">
                        <Link
                          to={`/admin/pendaftaran/${row.registration_code}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-700 hover:bg-primary hover:text-white transition-all shadow-sm"
                          title="Lihat Detail & Bukti Pembayaran"
                        >
                          <MaterialIcon name="visibility" className="text-[18px]" />
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info tabel */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-bold text-slate-700">{filteredRegistrations.length}</span> dari{' '}
            <span className="font-bold text-slate-700">{registrations.length}</span> total pendaftar terdaftar
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Data tersinkronisasi otomatis dengan basis data</span>
          </div>
        </div>
      </div>
    </div>
  )
}
