import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getAllRegistrations, getRegistrationGrades } from '../../lib/registrationsRepository.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { RegistrationRow, CompetitionSlug } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import MaterialIcon from '../../components/MaterialIcon.jsx'
import PaymentProofModal from '../../components/admin/PaymentProofModal'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Helper untuk mengambil label kategori lomba secara akurat
function getCategoryDisplay(row: RegistrationRow): string {
  if (row.category && row.category.trim() !== '') {
    return row.category
  }
  if (row.specific_data) {
    if (row.competition_slug === 'olimpiade' && row.specific_data.kategori_olimpiade) {
      return row.specific_data.kategori_olimpiade
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

// Helper: tentukan unit (SD/SMP) berdasarkan cabang lomba
function getUnit(slug: string): 'sd' | 'smp' {
  if (slug === 'pra-tka' || slug === 'futsal' || slug === 'baca-puisi') return 'smp'
  return 'sd'
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

  // Olimpiade dan Panahan: dipisahkan dengan newline
  const names = (row.participant_name || '')
    .split('\n')
    .map((n) => n.trim())
    .filter(Boolean)

  if (names.length === 0) {
    return [{ name: row.participant_name || '-', type: 'Peserta' }]
  }

  return names.map((name) => ({ name, type: 'Peserta' }))
}

// Helper mengurai tingkat kelas peserta (indeks selaras dengan parseParticipants)
function parseGrades(row: RegistrationRow): string[] {
  return getRegistrationGrades(row)
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
  const [filterUnit, setFilterUnit] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [proofPreview, setProofPreview] = useState<RegistrationRow | null>(null)

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
      // 1b. Filter Unit (SD/SMP)
      if (filterUnit !== 'all' && getUnit(r.competition_slug) !== filterUnit) {
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
  }, [registrations, filterSlug, filterUnit, filterStatus, searchQuery])

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
        const grades = parseGrades(row)
        participants.forEach((p, pIdx) => {
          expandedRows.push({
            ...row,
            expanded_name: p.name,
            expanded_type: p.type === 'Putra' ? 'Putra' : p.type === 'Putri' ? 'Putri' : '-',
            expanded_grade: grades[pIdx] || '',
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
          'Kelas': row.expanded_grade || '-',
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
        { wch: 12 }, // Kelas
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
       const olimpiade = registrations.filter((r) => r.competition_slug === 'olimpiade')
       const panahan = registrations.filter((r) => r.competition_slug === 'panahan')
       const kolase = registrations.filter((r) => r.competition_slug === 'kolase')
       const praTka = registrations.filter((r) => r.competition_slug === 'pra-tka')
       const futsalRows = registrations.filter((r) => r.competition_slug === 'futsal')
       const bacaPuisi = registrations.filter((r) => r.competition_slug === 'baca-puisi')

       processSheet(tahfizh, 'Tahfizh')
       processSheet(olimpiade, 'Olimpiade')
       processSheet(panahan, 'Panahan')
       processSheet(kolase, 'Kolase')
       processSheet(praTka, 'Pra-TKA')
       processSheet(futsalRows, 'Futsal')
       processSheet(bacaPuisi, 'Baca Puisi')
    } else {
      let sheetName = 'Rekap Pendaftaran'
       if (filterSlug === 'tahfizh') sheetName = 'Tahfizh'
       if (filterSlug === 'olimpiade') sheetName = 'Olimpiade'
       if (filterSlug === 'panahan') sheetName = 'Panahan'
       if (filterSlug === 'kolase') sheetName = 'Kolase'
       if (filterSlug === 'pra-tka') sheetName = 'Pra-TKA'
       if (filterSlug === 'futsal') sheetName = 'Futsal'
       if (filterSlug === 'baca-puisi') sheetName = 'Baca Puisi'
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
      'Kelas',
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
      const gradeText = parseGrades(row).join(', ')
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
        gradeText,
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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#EAF3FF] text-[#003B5C] border border-[#C9DCF2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0057B8] animate-pulse"></span>
              Pusat Manajemen Berkas
            </span>
            <span className="text-xs text-[#475569]">Pembaruan Realtime</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Rekapitulasi Data Pendaftaran
          </h1>
          <p className="text-sm text-[#475569] mt-0.5">
            Kelola, verifikasi, dan ekspor tabel pendaftaran peserta ATTIN EXPO XII secara menyeluruh.
          </p>
        </div>

        {/* Tombol Aksi Ekspor */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 h-10 bg-white hover:bg-[#F1F5F9] active:bg-[#E2E8F0] text-[#003B5C] px-3.5 rounded-xl font-semibold text-sm transition-all border border-[#CBD5E1] shadow-sm disabled:bg-[#F8FAFC] disabled:text-[#64748B] disabled:border-[#CBD5E1] disabled:shadow-none disabled:cursor-not-allowed"
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
            className="flex items-center gap-2 h-10 bg-[#16825D] hover:bg-[#126b4c] active:bg-[#0E5640] text-white px-4 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
          >
            <MaterialIcon name="table_view" className="text-[19px]" />
            <span>Unduh Excel</span>
          </button>

          <button
            onClick={exportPDF}
            className="flex items-center gap-2 h-10 bg-error hover:bg-[#93000a] active:bg-[#7A0008] text-white px-4 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
          >
            <MaterialIcon name="picture_as_pdf" className="text-[19px]" />
            <span>Unduh PDF</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Kartu Metrik KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748B] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Total Formulir
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EAF3FF] flex items-center justify-center text-[#003B5C]">
              <MaterialIcon name="receipt_long" className="text-[16px]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] tracking-tight">{stats.totalReg}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Berkas Masuk</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748B] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Total Peserta
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4338CA]">
              <MaterialIcon name="groups" className="text-[16px]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] tracking-tight">{stats.totalPeserta}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Santri Terdata</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748B] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Terverifikasi
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <MaterialIcon name="verified" className="text-[16px]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700 tracking-tight">{stats.verifiedReg}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Lolos Berkas</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748B] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Menunggu
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
              <MaterialIcon name="pending_actions" className="text-[16px]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-700 tracking-tight">{stats.pendingReg}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Perlu Peninjauan</div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-slate-900/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748B] mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Infaq Terverifikasi
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EAF3FF] flex items-center justify-center text-[#003B5C]">
              <MaterialIcon name="payments" className="text-[16px]" />
            </div>
          </div>
          <div className="text-xl font-bold text-[#003B5C] tracking-tight">
            {formatRupiah(stats.totalInfaq)}
          </div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Dana Masuk Kas</div>
        </div>
      </div>

      {/* Kontainer Utama Tabel & Filter */}
      <div className="bg-white border border-slate-900/10 rounded-[24px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden">
        {/* Toolbar Pencarian & Filter */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#F8FAFC] flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Input Pencarian */}
          <div className="relative flex-1 max-w-md">
            <MaterialIcon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] text-[20px] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kode, santri, sekolah, pendamping..."
              className="w-full bg-white border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#64748B] py-2.5 pl-10 pr-9 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#334155] p-0.5"
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
                  className="appearance-none bg-white border border-[#CBD5E1] text-[#0F172A] py-2 pl-3.5 pr-9 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8] cursor-pointer transition-all shadow-sm"
                >
                  <option value="all">Semua Cabang Lomba</option>
                  <option value="tahfizh">Lomba Tahfizh</option>
                  <option value="olimpiade">Olimpiade SD</option>
                  <option value="panahan">Lomba Panahan</option>
                  <option value="kolase">Lomba Kolase</option>
                  <option value="pra-tka">Lomba Pra-TKA</option>
                  <option value="futsal">Lomba Futsal</option>
                  <option value="baca-puisi">Lomba Baca Puisi</option>
                </select>
                <MaterialIcon
                  name="expand_more"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none text-[18px]"
                />
              </div>

              {/* Filter Kategori Unit */}
              <div className="relative">
                <select
                  value={filterUnit}
                  onChange={(e) => setFilterUnit(e.target.value)}
                  className="appearance-none bg-white border border-[#CBD5E1] text-[#0F172A] py-2 pl-3.5 pr-9 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8] cursor-pointer transition-all shadow-sm"
                >
                  <option value="all">Semua Unit</option>
                  <option value="sd">Unit SD</option>
                  <option value="smp">Unit SMP</option>
                </select>
                <MaterialIcon
                  name="expand_more"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none text-[18px]"
                />
              </div>

            {/* Filter Status Verifikasi */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-[#CBD5E1] text-[#0F172A] py-2 pl-3.5 pr-9 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8] cursor-pointer transition-all shadow-sm"
              >
                <option value="all">Semua Status</option>
                <option value="verified">Terverifikasi</option>
                <option value="pending">Menunggu Verifikasi</option>
                <option value="rejected">Ditolak</option>
              </select>
              <MaterialIcon
                name="expand_more"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none text-[18px]"
              />
            </div>

            {/* Info Hasil Filter */}
            <div className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-xl bg-[#EFF6FF] text-[#003B5C] border border-[#C9DCF2] text-xs font-semibold">
              {filteredRegistrations.length} data ditemukan
            </div>
          </div>
        </div>

        {/* Tabel Data Rekapitulasi */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
<thead>
              <tr className="bg-[#F8FAFC] border-b border-[#CBD5E1] text-[#334155] text-[12px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Kode Reg</th>
                <th className="py-3.5 px-4">Waktu Daftar</th>
                <th className="py-3.5 px-4">Cabang & Kategori</th>
                <th className="py-3.5 px-4">Nama Peserta</th>
                <th className="py-3.5 px-4">Kelas</th>
                <th className="py-3.5 px-4">Asal Sekolah & Alamat</th>
                <th className="py-3.5 px-4">Guru Pendamping & Kontak</th>
                <th className="py-3.5 px-4 text-right">Infaq Total</th>
                <th className="py-3.5 px-4 text-center">Status Berkas</th>
                <th className="py-3.5 px-4 text-center">Status Bayar</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-[#475569]">
                    <MaterialIcon name="sync" className="text-[36px] animate-spin text-[#003B5C] mb-2" />
                    <p className="text-sm font-medium">Memuat data pendaftaran...</p>
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-[#475569]">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center text-[#64748B]">
                      <MaterialIcon name="inbox" className="text-[32px]" />
                    </div>
                    <p className="font-semibold text-[#0F172A] text-base">Tidak ada data pendaftaran.</p>
                    <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
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
                          className="font-mono text-xs font-bold text-[#003B5C] hover:text-[#0057B8] inline-flex items-center gap-1 group-hover:underline"
                        >
                          <MaterialIcon name="tag" className="text-[14px] text-[#003B5C]" />
                          {row.registration_code}
                        </Link>
                      </td>

                      {/* 2. Waktu Pendaftaran */}
                      <td className="py-3.5 px-4 text-xs text-[#475569]">
                        {row.created_at ? (
                          <div className="flex flex-col">
                            <span className="font-medium text-[#0F172A]">
                              {new Date(row.created_at).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="text-[11px] text-[#64748B]">
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
                                 : row.competition_slug === 'olimpiade'
                                 ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                 : row.competition_slug === 'kolase'
                                 ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                 : row.competition_slug === 'pra-tka'
                                 ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                 : row.competition_slug === 'futsal'
                                 ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                 : row.competition_slug === 'baca-puisi'
                                 ? 'bg-violet-50 text-violet-700 border border-violet-200'
                                 : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {branchConfig?.name || row.competition_slug}
                          </span>
                          {categoryName !== '-' && (
                            <span className="text-xs text-[#475569] font-medium flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-[#64748B]"></span>
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
                                className="font-semibold text-[#0F172A] text-xs truncate block max-w-[190px]"
                                title={p.name}
                              >
                                {p.name}
                              </span>
                            </div>
                          ))}
                          {row.participant_count > 1 && row.competition_slug !== 'tahfizh' && (
                            <span className="text-[10px] font-bold text-[#64748B] block mt-0.5">
                              Total: {row.participant_count} Peserta
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 5. Kelas Peserta */}
                      <td className="py-3.5 px-4 max-w-[140px]">
                        <div className="space-y-1">
                          {(() => {
                            const grades = parseGrades(row)
                            if (grades.length === 0) {
                              return <span className="text-[11px] text-[#64748B]">-</span>
                            }
                            return grades.map((grade, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                  {grade}
                                </span>
                              </div>
                            ))
                          })()}
                        </div>
                      </td>

                      {/* 5. Asal Sekolah & Alamat */}
                      <td className="py-3.5 px-4 max-w-[240px]">
                        <div className="flex flex-col">
                          <span
                            className="font-bold text-[#0F172A] text-xs truncate max-w-[220px]"
                            title={row.school_name}
                          >
                            {row.school_name}
                          </span>
                          <span
                            className="text-[11px] text-[#475569] truncate max-w-[220px] mt-0.5"
                            title={row.school_address}
                          >
                            {row.school_address || '-'}
                          </span>
                        </div>
                      </td>

                      {/* 6. Guru Pendamping & Kontak */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#0F172A] text-xs">
                            {row.specific_data?.guru_pendamping || '-'}
                          </span>
                          {row.specific_data?.nohp_pendamping ? (
                            <a
                              href={`https://wa.me/${row.specific_data.nohp_pendamping.replace(/^0/, '62').replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-emerald-700 hover:text-emerald-800 font-mono flex items-center gap-1 mt-0.5 group-hover:underline"
                            >
                              <MaterialIcon name="call" className="text-[12px]" />
                              {row.specific_data.nohp_pendamping}
                            </a>
                          ) : (
                            <span className="text-[11px] text-[#64748B]">-</span>
                          )}
                        </div>
                      </td>

                      {/* 7. Total Biaya & Bank */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-[#0F172A] text-xs">
                            {formatRupiah(row.total_fee || 0)}
                          </span>
                          <span
                            className="text-[11px] text-[#475569] truncate max-w-[130px]"
                            title={`${row.payment_sender_bank || '-'} a.n. ${row.payment_sender_name || '-'}`}
                          >
                            {row.payment_sender_bank || '-'}
                          </span>
                        </div>
                      </td>

                      {/* 8. Status Berkas */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            isVerified
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isRejected
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
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
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            isPaid
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
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
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setProofPreview(row)}
                            disabled={!row.payment_proof_url}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFF7ED] text-[#C2410C] hover:bg-[#FFEDD5] hover:text-[#9A3412] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                            title={
                              row.payment_proof_url
                                ? 'Lihat Pratinjau Bukti Pembayaran'
                                : 'Bukti pembayaran belum diunggah'
                            }
                          >
                            <MaterialIcon name="receipt_long" className="text-[18px]" />
                          </button>
                          <Link
                            to={`/admin/pendaftaran/${row.registration_code}`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#003B5C] hover:bg-[#0057B8] hover:text-white transition-all shadow-sm"
                            title="Lihat Detail & Bukti Pembayaran"
                          >
                            <MaterialIcon name="visibility" className="text-[18px]" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info tabel */}
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-t border-[#CBD5E1] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#475569]">
          <div>
            Menampilkan <span className="font-bold text-[#0F172A]">{filteredRegistrations.length}</span> dari{' '}
            <span className="font-bold text-[#0F172A]">{registrations.length}</span> total pendaftar terdaftar
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Data tersinkronisasi otomatis dengan basis data</span>
          </div>
        </div>

        {/* Modal pratinjau bukti pembayaran */}
        {proofPreview && (
          <PaymentProofModal
            proofPath={proofPreview.payment_proof_url}
            title={proofPreview.registration_code}
            subtitle={`${proofPreview.participant_name || '-'} • ${proofPreview.school_name || '-'}`}
            onClose={() => setProofPreview(null)}
          />
        )}
      </div>
    </div>
  )
}
