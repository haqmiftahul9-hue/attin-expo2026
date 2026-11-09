import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getAllRegistrations, getRegistrationGrades } from '../../lib/registrationsRepository.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { RegistrationRow, CompetitionSlug } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import { getRegistrationConfigByCompetitionId } from '../../config/registrationConfigs.js'
import { isRealName } from '../../lib/registrationValidation.js'
import MaterialIcon from '../../components/MaterialIcon.jsx'
import PaymentProofModal from '../../components/admin/PaymentProofModal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { ChevronDownIcon } from '../../components/ui/ChevronDownIcon'
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
function getUnit(slug: string, competitionId?: string, branchSlug?: string): 'sd' | 'smp' {
  if (competitionId === 'comp-tahfizh-kelas-6' || branchSlug === 'tahfizh-kelas-6') return 'smp'
  if (slug === 'pra-tka' || slug === 'futsal' || slug === 'baca-puisi') return 'smp'
  return 'sd'
}

// Helper untuk mengurai nama peserta per baris/gender
function parseParticipants(row: RegistrationRow): { name: string; type?: 'Putra' | 'Putri' | 'Peserta' }[] {
  if (row.competition_id === 'comp-tahfizh') {
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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
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
      if (filterSlug !== 'all') {
        if (filterSlug === 'tahfizh-kelas-6') {
          const isKelas6 = r.competition_id === 'comp-tahfizh-kelas-6' || r.specific_data?.branch_slug === 'tahfizh-kelas-6'
          if (!isKelas6) return false
        } else if (r.competition_slug !== filterSlug) {
          return false
        }
      }
      // 1b. Filter Unit (SD/SMP)
      if (filterUnit !== 'all' && getUnit(r.competition_slug, r.competition_id, r.specific_data?.branch_slug) !== filterUnit) {
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

  // Pagination: 10 data per halaman
  const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [filterSlug, filterUnit, filterStatus, searchQuery])

  // Metrik Statistik Cepat
  const stats = useMemo(() => {
    const totalReg = registrations.length
    const totalPeserta = registrations.reduce((acc, r) => acc + (r.participant_count || 1), 0)
    const verifiedReg = registrations.filter((r) => r.registration_status === 'verified').length
    const pendingReg = registrations.filter((r) => r.registration_status === 'pending').length
    const totalInfaq = registrations
      .filter((r) => r.payment_status === 'verified')
      .reduce((acc, r) => {
        const isKelas6 = r.competition_id === 'comp-tahfizh-kelas-6' || r.specific_data?.branch_slug === 'tahfizh-kelas-6'
        const isTahfizh15 = !isKelas6 && (r.competition_slug === 'tahfizh' || r.competition_id === 'comp-tahfizh')
        if (isKelas6) {
          const cfg = getRegistrationConfigByCompetitionId(r.competition_id) || registrationConfigs[r.competition_slug as CompetitionSlug]
          const realCount = (r.participant_name || '').split('\n').map((n) => n.trim()).filter((n) => n.length > 0 && isRealName(n)).length
          return acc + realCount * (cfg?.fee || 0)
        }
        if (isTahfizh15) {
          const cfg = registrationConfigs.tahfizh || registrationConfigs[r.competition_slug as CompetitionSlug]
          let realCount = 0
          for (const part of (r.participant_name || '').split(' | ')) {
            const t = part.trim()
            if (t.startsWith('Putra: ') || t.startsWith('Putri: ')) {
              const name = t.replace(/^(Putra|Putri): /, '').trim()
              if (isRealName(name)) realCount++
            }
          }
          if (realCount === 0 && (r.participant_name || '').trim()) {
            realCount = (r.participant_name || '').split(/\n|\s\|\s/).map((n) => n.replace(/^(Putra|Putri):\s*/i, '').trim()).filter((n) => isRealName(n)).length
          }
          return acc + realCount * (cfg?.fee || 0)
        }
        return acc + (r.total_fee || 0)
      }, 0)

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
          const isFirst = pIdx === 0
          let recalculatedTotalFee = row.total_fee || 0
          let realCount = row.participant_count || 1
          let recalculatedUnitFee = row.unit_fee || 0
          const isKelas6Row = row.competition_id === 'comp-tahfizh-kelas-6' || row.specific_data?.branch_slug === 'tahfizh-kelas-6'
          const isTahfizh15Row = !isKelas6Row && (row.competition_slug === 'tahfizh' || row.competition_id === 'comp-tahfizh')
          if (isKelas6Row) {
            const cfg = getRegistrationConfigByCompetitionId(row.competition_id) || registrationConfigs[row.competition_slug as CompetitionSlug]
            realCount = (row.participant_name || '').split('\n').map((n) => n.trim()).filter((n) => n.length > 0 && isRealName(n)).length
            recalculatedUnitFee = cfg?.fee || 0
            recalculatedTotalFee = realCount * recalculatedUnitFee
          } else if (isTahfizh15Row) {
            const cfg = registrationConfigs.tahfizh || registrationConfigs[row.competition_slug as CompetitionSlug]
            const parts = (row.participant_name || '').split(' | ')
            realCount = 0
            for (const part of parts) {
              const trimmed = part.trim()
              if (trimmed.startsWith('Putra: ') || trimmed.startsWith('Putri: ')) {
                const actualName = trimmed.replace(/^(Putra|Putri): /, '').trim()
                if (isRealName(actualName)) realCount++
              }
            }
            // Fallback: jika format nama tak punya label Putra/Putri, hitung nama nyata dari newline/pipe
            if (realCount === 0 && (row.participant_name || '').trim()) {
              realCount = (row.participant_name || '').split(/\n|\s\|\s/).map((n) => n.replace(/^(Putra|Putri):\s*/i, '').trim()).filter((n) => isRealName(n)).length
            }
            recalculatedUnitFee = cfg?.fee || 0
            recalculatedTotalFee = realCount * recalculatedUnitFee
          }
          expandedRows.push({
            ...row,
            expanded_name: p.name,
            expanded_type: p.type === 'Putra' ? 'Putra' : p.type === 'Putri' ? 'Putri' : '-',
            expanded_grade: grades[pIdx] || '',
            // Biaya hanya dihitung sekali per registrasi (baris pertama peserta),
            // agar unduhan Excel tidak menghitung biaya ganda saat satu
            // pendaftaran memiliki lebih dari satu peserta (Tahfizh Pa/Pi atau
            // banyak nama tim Futsal).
            unit_fee: isFirst ? ((isKelas6Row || isTahfizh15Row) ? recalculatedUnitFee : (row.unit_fee || 0)) : 0,
            participant_count: isFirst ? realCount : 0,
            total_fee: isFirst ? recalculatedTotalFee : 0,
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
              (getRegistrationConfigByCompetitionId(row.competition_id)?.name) || (registrationConfigs[row.competition_slug as CompetitionSlug]?.name) || row.competition_slug,
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
        const isSmpUnit = filterUnit === 'smp'
        const isSdUnit = filterUnit === 'sd'
        const matchesUnit = (r: any) => {
          const u = getUnit(r.competition_slug, r.competition_id, r.specific_data?.branch_slug)
          if (isSmpUnit) return u === 'smp'
          if (isSdUnit) return u === 'sd'
          return true
        }
        const bySlug = (slug: string) => registrations.filter((r) => r.competition_slug === slug && matchesUnit(r))
        const kelasa6 = registrations.filter((r) => (r.competition_id === 'comp-tahfizh-kelas-6' || r.specific_data?.branch_slug === 'tahfizh-kelas-6') && matchesUnit(r))
        const tahfizh = bySlug('tahfizh').filter((r) => r.competition_id !== 'comp-tahfizh-kelas-6')
        const olimpiade = bySlug('olimpiade')
        const panahan = bySlug('panahan')
        const kolase = bySlug('kolase')
        const praTka = bySlug('pra-tka')
        const futsalRows = bySlug('futsal')
        const bacaPuisi = bySlug('baca-puisi')

        if (isSdUnit || filterUnit === 'all') {
          processSheet(tahfizh, 'Tahfizh')
          processSheet(olimpiade, 'Olimpiade')
          processSheet(panahan, 'Panahan')
          processSheet(kolase, 'Kolase')
        }
        if (isSmpUnit || filterUnit === 'all') {
          if (kelasa6.length > 0) processSheet(kelasa6, 'Tahfizh Kelas 6')
          processSheet(praTka, 'Pra-TKA')
          processSheet(futsalRows, 'Futsal')
          processSheet(bacaPuisi, 'Baca Puisi')
        }
      } else {
      let sheetName = 'Rekap Pendaftaran'
        if (filterSlug === 'tahfizh') sheetName = 'Tahfizh'
        if (filterSlug === 'tahfizh-kelas-6') sheetName = 'Tahfizh Kelas 6'
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
      const branchName = (getRegistrationConfigByCompetitionId(row.competition_id)?.name) || (registrationConfigs[row.competition_slug]?.name) || row.competition_slug
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
    <div className="w-full px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <section className="rounded-2xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9DCF2] bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#003B5C]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0057B8]"></span>
                  Pusat manajemen berkas
                </span>
                <span className="text-[12px] text-slate-500">Data realtime</span>
              </div>
              <h1 className="mt-3 text-[24px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-on-surface)] [font-family:var(--font-headline-md),Plus_Jakarta_Sans,sans-serif] sm:text-[28px]">
                Rekapitulasi Data Pendaftaran
              </h1>
              <p className="mt-1.5 max-w-3xl text-[14px] leading-6 text-[var(--color-on-surface-variant)]">
                Kelola, verifikasi, dan ekspor tabel pendaftaran peserta ATTIN EXPO XII secara menyeluruh.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={fetchData}
                disabled={isLoading}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--color-surface-container-high)] bg-white px-3.5 text-[13px] font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-container-low)] disabled:cursor-not-allowed disabled:opacity-60"
                title="Segarkan Data"
              >
                <MaterialIcon name="refresh" className={`text-[18px] ${isLoading ? 'animate-spin' : ''}`} />
                <span>Segarkan</span>
              </button>
              <button
                onClick={exportExcel}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#16825D] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#126b4c]"
              >
                <MaterialIcon name="table_view" className="text-[18px]" />
                <span>Unduh Excel</span>
              </button>
              <button
                onClick={exportPDF}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-error px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#93000a]"
              >
                <MaterialIcon name="picture_as_pdf" className="text-[18px]" />
                <span>Unduh PDF</span>
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {[
            { label: 'Total Formulir', value: stats.totalReg, sub: 'Berkas masuk', icon: 'receipt_long', tone: 'text-[#003B5C]', bg: 'bg-[#EAF3FF]' },
            { label: 'Total Peserta', value: stats.totalPeserta, sub: 'Santri terdata', icon: 'groups', tone: 'text-indigo-700', bg: 'bg-indigo-50' },
            { label: 'Terverifikasi', value: stats.verifiedReg, sub: 'Lolos berkas', icon: 'verified', tone: 'text-emerald-700', bg: 'bg-emerald-50', valueClass: 'text-emerald-700' },
            { label: 'Menunggu', value: stats.pendingReg, sub: 'Perlu peninjauan', icon: 'pending_actions', tone: 'text-amber-700', bg: 'bg-amber-50', valueClass: 'text-amber-700' },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{card.label}</p>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.bg} ${card.tone}`}>
                  <MaterialIcon name={card.icon} className="text-[16px]" />
                </div>
              </div>
              <p className={`mt-3 text-[28px] font-bold leading-none tracking-[-0.03em] ${card.valueClass || 'text-[var(--color-on-surface)]'} [font-family:var(--font-headline-md),Plus_Jakarta_Sans,sans-serif]`}>{card.value}</p>
              <p className="mt-1 text-[11px] text-slate-500">{card.sub}</p>
            </div>
          ))}
          <div className="col-span-2 rounded-2xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:col-span-1">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Infaq Terverifikasi</p>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#003B5C]">
                <MaterialIcon name="payments" className="text-[16px]" />
              </div>
            </div>
            <p className="mt-3 text-[22px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-primary)] [font-family:var(--font-headline-md),Plus_Jakarta_Sans,sans-serif]">{formatRupiah(stats.totalInfaq)}</p>
            <p className="mt-1 text-[11px] text-slate-500">Dana masuk kas</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-3 border-b border-[var(--color-surface-container)] bg-[var(--color-surface-container-low)]/25 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            <div className="relative w-full lg:max-w-md lg:flex-1">
              <MaterialIcon name="search" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[19px] text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kode, santri, sekolah, pendamping..."
                className="h-10 w-full rounded-xl border border-[var(--color-surface-container-high)] bg-white py-2 pl-10 pr-9 text-[13px] font-medium text-[var(--color-on-surface)] placeholder:text-slate-400 focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/15"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" title="Hapus Pencarian">
                  <MaterialIcon name="close" className="text-[16px]" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:justify-end">
              <div className="relative">
                <select value={filterSlug} onChange={(e) => setFilterSlug(e.target.value)} className="h-10 w-full appearance-none rounded-xl border border-[var(--color-surface-container-high)] bg-white py-2 pl-3.5 pr-10 text-[13px] font-medium leading-5 text-[var(--color-on-surface)] focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/15 lg:w-auto lg:min-w-[210px]">
                  <option value="all">Semua Cabang Lomba</option>
                  <option value="tahfizh">Lomba Tahfizh</option>
                  <option value="tahfizh-kelas-6">Lomba Tahfizh Kelas 6</option>
                  <option value="olimpiade">Olimpiade SD</option>
                  <option value="panahan">Lomba Panahan</option>
                  <option value="kolase">Lomba Kolase</option>
                  <option value="pra-tka">Lomba Pra-TKA</option>
                  <option value="futsal">Lomba Futsal</option>
                  <option value="baca-puisi">Lomba Baca Puisi</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              <div className="relative">
                <select value={filterUnit} onChange={(e) => setFilterUnit(e.target.value)} className="h-10 w-full appearance-none rounded-xl border border-[var(--color-surface-container-high)] bg-white py-2 pl-3.5 pr-10 text-[13px] font-medium leading-5 text-[var(--color-on-surface)] focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/15 lg:w-auto lg:min-w-[150px]">
                  <option value="all">Semua Unit</option>
                  <option value="sd">Unit SD</option>
                  <option value="smp">Unit SMP</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              <div className="relative">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="h-10 w-full appearance-none rounded-xl border border-[var(--color-surface-container-high)] bg-white py-2 pl-3.5 pr-10 text-[13px] font-medium leading-5 text-[var(--color-on-surface)] focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/15 lg:w-auto lg:min-w-[190px]">
                  <option value="all">Semua Status</option>
                  <option value="verified">Terverifikasi</option>
                  <option value="pending">Menunggu Verifikasi</option>
                  <option value="rejected">Ditolak</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              <div className="inline-flex h-10 items-center justify-center rounded-xl border border-[#C9DCF2] bg-[#EFF6FF] px-3 text-[12px] font-semibold text-[#003B5C] sm:col-span-2 lg:col-span-1">
                {filteredRegistrations.length} data
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
          <Table className="min-w-[1180px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Kode Reg</TableHead>
                <TableHead>Waktu Daftar</TableHead>
                <TableHead>Cabang &amp; Kategori</TableHead>
                <TableHead>Nama Peserta</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Asal Sekolah &amp; Alamat</TableHead>
                <TableHead>Guru Pendamping &amp; Kontak</TableHead>
                <TableHead className="text-right">Infaq Total</TableHead>
                <TableHead className="text-center">Status Berkas</TableHead>
                <TableHead className="text-center">Status Bayar</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-[13px]">
              {isLoading ? (
                <tr>
                  <TableCell colSpan={10} className="py-16 text-center text-[#475569]">
                    <MaterialIcon name="sync" className="text-[36px] animate-spin text-[#003B5C] mb-2" />
                    <p className="text-sm font-medium">Memuat data pendaftaran...</p>
                  </TableCell>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={11} className="py-16 text-center text-[#475569]">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center text-[#64748B]">
                      <MaterialIcon name="inbox" className="text-[32px]" />
                    </div>
                    <p className="font-semibold text-[#0F172A] text-base">Tidak ada data pendaftaran.</p>
                    <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                      {searchQuery
                        ? `Tidak ada hasil pencarian untuk "${searchQuery}". Coba kata kunci lain atau setel ulang filter.`
                        : 'Belum ada data pendaftar yang terdaftar di sistem.'}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRegistrations.map((row) => {
                  const participants = parseParticipants(row)
                  const branchConfig = getRegistrationConfigByCompetitionId(row.competition_id) || registrationConfigs[row.competition_slug]
                  const categoryName = getCategoryDisplay(row)

                  // Recalculate Tahfizh infaq from actual participant names (abaikan 0/-/kosong).
                  // Tahfizh Kelas 6 dan Tahfizh 1-5 ditangani terpisah (slug DB bisa sama karena mapping FK).
                  let recalculatedTotalFee = row.total_fee || 0
                  const isKelas6 = row.competition_id === 'comp-tahfizh-kelas-6' || row.specific_data?.branch_slug === 'tahfizh-kelas-6'
                  const isTahfizh15 = !isKelas6 && (row.competition_slug === 'tahfizh' || row.competition_id === 'comp-tahfizh')
                  if (isKelas6) {
                    const cfg = getRegistrationConfigByCompetitionId(row.competition_id) || registrationConfigs[row.competition_slug as CompetitionSlug]
                    const realCount = (row.participant_name || '').split('\n').map((n) => n.trim()).filter((n) => n.length > 0 && isRealName(n)).length
                    recalculatedTotalFee = realCount * (cfg?.fee || 0)
                  } else if (isTahfizh15) {
                    const parts = (row.participant_name || '').split(' | ')
                    let realCount = 0
                    for (const part of parts) {
                      const trimmed = part.trim()
                      if (trimmed.startsWith('Putra: ') || trimmed.startsWith('Putri: ')) {
                        const actualName = trimmed.replace(/^(Putra|Putri): /, '').trim()
                        if (isRealName(actualName)) realCount++
                      }
                    }
                    if (realCount === 0 && (row.participant_name || '').trim()) {
                      realCount = (row.participant_name || '').split(/\n|\s\|\s/).map((n) => n.replace(/^(Putra|Putri):\s*/i, '').trim()).filter((n) => isRealName(n)).length
                    }
                    const cfg = registrationConfigs.tahfizh || registrationConfigs[row.competition_slug as CompetitionSlug]
                    recalculatedTotalFee = realCount * (cfg?.fee || 0)
                  }

                  // Visual Badge Berkas
                  const isVerified = row.registration_status === 'verified'
                  const isRejected = row.registration_status === 'rejected'

                  // Visual Badge Bayar
                  const isPaid = row.payment_status === 'verified'

                  return (
                    <TableRow
                      key={row.registration_code}
                      className="hover:bg-slate-50/80"
                    >
                      {/* 1. Kode Registrasi */}
                      <TableCell className="py-3.5 px-4">
                        <Link
                          to={`/admin/pendaftaran/${row.registration_code}`}
                          className="font-mono text-xs font-bold text-[#003B5C] hover:text-[#0057B8] inline-flex items-center gap-1 group-hover:underline"
                        >
                          <MaterialIcon name="tag" className="text-[14px] text-[#003B5C]" />
                          {row.registration_code}
                        </Link>
                      </TableCell>

                      {/* 2. Waktu Pendaftaran */}
                      <TableCell className="py-3.5 px-4 text-xs text-[#475569]">
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
                      </TableCell>

                      {/* 3. Cabang & Kategori */}
                      <TableCell className="py-3.5 px-4">
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
                      </TableCell>

                      {/* 4. Nama Peserta */}
                      <TableCell className="py-3.5 px-4 max-w-[260px]">
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
                      </TableCell>

                      {/* 5. Kelas Peserta */}
                      <TableCell className="py-3.5 px-4 max-w-[140px]">
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
                      </TableCell>

                      {/* 5. Asal Sekolah & Alamat */}
                      <TableCell className="py-3.5 px-4 max-w-[240px]">
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
                      </TableCell>

                      {/* 6. Guru Pendamping & Kontak */}
                      <TableCell className="py-3.5 px-4">
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
                      </TableCell>

                      {/* 7. Total Biaya & Bank */}
                      <TableCell className="py-3.5 px-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-[#0F172A] text-xs">
                            {formatRupiah(recalculatedTotalFee)}
                          </span>
                          <span
                            className="text-[11px] text-[#475569] truncate max-w-[130px]"
                            title={`${row.payment_sender_bank || '-'} a.n. ${row.payment_sender_name || '-'}`}
                          >
                            {row.payment_sender_bank || '-'}
                          </span>
                        </div>
                      </TableCell>

                      {/* 8. Status Berkas */}
                      <TableCell className="py-3.5 px-4 text-center">
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
                      </TableCell>

                      {/* 9. Status Bayar */}
                      <TableCell className="py-3.5 px-4 text-center">
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
                      </TableCell>

                      {/* 10. Aksi */}
                      <TableCell className="py-3.5 px-4 text-center">
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
                  </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer info tabel + pagination */}
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-t border-[#CBD5E1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#475569]">
          <div className="flex items-center gap-2">
            Menampilkan{' '}
            <span className="font-bold text-[#0F172A]">
              {filteredRegistrations.length === 0 ? 0 : startIndex + 1}
            </span>{' '}
            -{' '}
            <span className="font-bold text-[#0F172A]">{Math.min(endIndex, filteredRegistrations.length)}</span>{' '}
            dari{' '}
            <span className="font-bold text-[#0F172A]">{filteredRegistrations.length}</span> total pendaftar terdaftar
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 px-2.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const showEllipsis = page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 1
                if (showEllipsis) {
                  return (
                    <span key="ellipsis" className="px-1 py-0.5 text-[#64748B]">
                      …
                    </span>
                  )
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded text-xs font-bold border ${
                      currentPage === page
                        ? 'bg-[#003B5C] text-white border-[#003B5C]'
                        : 'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 px-2.5 rounded bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Berikutnya
            </button>
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
        </section>
      </div>
    </div>
  )
}
