import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PaymentProofModal from '../../components/admin/PaymentProofModal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { ChevronDownIcon } from '../../components/ui/ChevronDownIcon'


import { getAllRegistrations, updateRegistrationStatus } from '../../lib/registrationsRepository.js'

import type { CompetitionSlug, RegistrationRow } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import { getRegistrationConfigByCompetitionId } from '../../config/registrationConfigs.js'
import { isRealName } from '../../lib/registrationValidation.js'


function DummyRows() {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={8} className="py-14 text-center text-slate-500">
        <span className="material-symbols-outlined text-[40px] text-slate-300 mb-2 block">inbox</span>
        <p className="text-sm font-medium">Belum ada data pendaftaran.</p>
      </TableCell>
    </TableRow>
  )
}

function RealRow({ row, onVerifyPrompt, onProofPrompt }: { row: RegistrationRow, onVerifyPrompt: (row: RegistrationRow) => void, onProofPrompt: (row: RegistrationRow) => void }) {
  const config = getRegistrationConfigByCompetitionId(row.competition_id) || registrationConfigs[row.competition_slug] || {}
  
  return (
    <TableRow className="hover:bg-slate-50/80">
      <TableCell className="font-mono text-[12.5px] font-semibold text-[#003B5C] whitespace-nowrap">{row.registration_code}</TableCell>
      <TableCell className="min-w-[180px]">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 shrink-0 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-semibold text-[11px]">
            {row.participant_name.substring(0, 2).toUpperCase()}
          </span>
          <span className="font-medium text-slate-900 text-[13px] leading-5 whitespace-normal break-words">{row.participant_name}</span>
        </div>
      </TableCell>
      <TableCell className="text-slate-600 max-w-[220px]"><span className="block truncate" title={row.school_name}>{row.school_name}</span></TableCell>
      <TableCell className="min-w-[180px]">
        <span className="inline-flex items-center max-w-full px-2 py-1 rounded-md text-[11px] font-semibold leading-4 bg-primary-fixed text-primary whitespace-normal">
          {config.name || row.competition_slug}{row.specific_data ? ' - ' + Object.values(row.specific_data)[0] : ''}
        </span>
      </TableCell>
      <TableCell className="text-[12px] text-slate-500 whitespace-nowrap">
        {row.created_at ? new Date(row.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#16825D] border border-emerald-200/70 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16825D]"></span>
          Lunas
        </span>
      </TableCell>
      <TableCell>
        {row.registration_status === 'verified' ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#16825D] border border-emerald-200/70 whitespace-nowrap">
            Terverifikasi
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#B45309] border border-amber-200/70 whitespace-nowrap">
            Menunggu Verifikasi
          </span>
        )}
      </TableCell>
      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-1">
          <a href={`/admin/pendaftaran/${row.registration_code}`} className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-slate-500 hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Data Pendaftar">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </a>
          <button
            onClick={() => onProofPrompt(row)}
            disabled={!row.payment_proof_url}
            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-slate-500 hover:text-primary hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title={row.payment_proof_url ? 'Lihat Pratinjau Bukti Pembayaran' : 'Bukti pembayaran belum diunggah'}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </button>
          {row.registration_status === 'verified' ? (
            <button onClick={() => alert('Fitur Cetak ID Card Peserta ' + row.participant_name + ' akan segera hadir.')} className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-secondary hover:bg-secondary-fixed transition-colors" title="Cetak ID Card">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </button>
          ) : (
            <button onClick={() => onVerifyPrompt(row)} className="h-8 px-3 rounded-lg inline-flex items-center gap-1 text-[#16825D] bg-[#ECFDF5] hover:bg-[#d1f4e0] border border-emerald-200/70 transition-colors font-medium text-[12px]" title="Verifikasi Pendaftaran">
              <span className="material-symbols-outlined text-[16px]">fact_check</span>
              <span>Verifikasi</span>
            </button>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}

function getUnit(slug: string, competitionId?: string, branchSlug?: string): 'sd' | 'smp' {
  if (competitionId === 'comp-tahfizh-kelas-6' || branchSlug === 'tahfizh-kelas-6') return 'smp'
  if (slug === 'pra-tka' || slug === 'futsal' || slug === 'baca-puisi') return 'smp'
  return 'sd'
}

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState<RegistrationRow[]>([])
    const [filterUnit, setFilterUnit] = useState<'all' | 'sd' | 'smp'>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const [verifyRow, setVerifyRow] = useState<RegistrationRow | null>(null)

    const [proofRow, setProofRow] = useState<RegistrationRow | null>(null)

    const fetchData = useCallback(async () => {
      try {
        const data = await getAllRegistrations()
        setRegistrations(data || [])
      } catch (err) {
        console.error('[AdminDashboard] gagal mengambil data:', err)
      }
    }, [])

    const handleVerifySubmit = async (status: 'verified' | 'rejected') => {
      if (!verifyRow) return;
      const success = await updateRegistrationStatus(verifyRow.registration_code, status);
      if(success) {
        setRegistrations(prev => prev.map(r => r.registration_code === verifyRow.registration_code ? { ...r, registration_status: status, payment_status: status === 'verified' ? 'verified' : r.payment_status } : r));
        setVerifyRow(null);
      } else {
        alert('Gagal memverifikasi pendaftaran.');
      }
    }

    useEffect(() => {
      fetchData()
      const interval = setInterval(fetchData, 30000)
      return () => clearInterval(interval)
    }, [fetchData])

    const filteredRegistrations = filterUnit === 'all'
    ? registrations
    : registrations.filter(r => getUnit(r.competition_slug, r.competition_id, r.specific_data?.branch_slug) === filterUnit)

  const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [filterUnit])

  const totalRegistrations = registrations.length
  const tahfizhCount = registrations.filter(r => r.competition_slug === 'tahfizh' && r.competition_id !== 'comp-tahfizh-kelas-6').length
  const tahfizhKelas6Count = registrations.filter(r => r.competition_id === 'comp-tahfizh-kelas-6' || r.specific_data?.branch_slug === 'tahfizh-kelas-6').length
  const olimpiadeCount = registrations.filter(r => r.competition_slug === 'olimpiade').length
  const panahanCount = registrations.filter(r => r.competition_slug === 'panahan').length
  const kolaseCount = registrations.filter(r => r.competition_slug === 'kolase').length
  const praTkaCount = registrations.filter(r => r.competition_slug === 'pra-tka').length
  const futsalCount = registrations.filter(r => r.competition_slug === 'futsal').length
  const bacaPuisiCount = registrations.filter(r => r.competition_slug === 'baca-puisi').length
  const verifiedCount = registrations.filter(r => r.registration_status === 'verified').length
  const pendingCount = registrations.filter(r => r.registration_status === 'pending').length
  const rejectedCount = registrations.filter(r => r.registration_status === 'rejected').length

  const totalInfaqSd = registrations
    .filter(r => r.registration_status === 'verified' && getUnit(r.competition_slug, r.competition_id, r.specific_data?.branch_slug) === 'sd')
    .reduce((acc, r) => {
      const config = getRegistrationConfigByCompetitionId(r.competition_id) || registrationConfigs[r.competition_slug as CompetitionSlug]
      if (!config) return acc
      let count = 0
      if (r.competition_id === 'comp-tahfizh-kelas-6') {
        count = (r.participant_name || '')
          .split('\n')
          .map((n) => n.trim())
          .filter((n) => n.length > 0 && isRealName(n)).length
      } else if (config.codePrefix === 'ATXII-THF') {
        const parts = (r.participant_name || '').split(' | ')
        for (const part of parts) {
          const trimmed = part.trim()
          if ((trimmed.startsWith('Putra: ') || trimmed.startsWith('Putri: '))) {
            const actualName = trimmed.replace(/^(Putra|Putri): /, '').trim()
            if (isRealName(actualName)) count++
          }
        }
      } else {
        count = r.participant_count || 1
      }
      return acc + (count * config.fee)
    }, 0)
  const totalInfaqSmp = registrations
    .filter(r => r.registration_status === 'verified' && getUnit(r.competition_slug, r.competition_id, r.specific_data?.branch_slug) === 'smp')
    .reduce((acc, r) => {
      const config = getRegistrationConfigByCompetitionId(r.competition_id) || registrationConfigs[r.competition_slug as CompetitionSlug]
      if (!config) return acc
      let count = 0
      if (r.competition_id === 'comp-tahfizh-kelas-6') {
        count = (r.participant_name || '')
          .split('\n')
          .map((n) => n.trim())
          .filter((n) => n.length > 0 && isRealName(n)).length
      } else if (config.codePrefix === 'ATXII-THF') {
        const parts = (r.participant_name || '').split(' | ')
        for (const part of parts) {
          const trimmed = part.trim()
          if ((trimmed.startsWith('Putra: ') || trimmed.startsWith('Putri: '))) {
            const actualName = trimmed.replace(/^(Putra|Putri): /, '').trim()
            if (isRealName(actualName)) count++
          }
        }
      } else {
        count = r.participant_count || 1
      }
      return acc + (count * config.fee)
    }, 0)

  return (
    <div className="w-full px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <section className="rounded-2xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9DCF2] bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#003B5C]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0057B8]"></span>
                  Periode registrasi aktif
                </span>
                <span className="text-[12px] text-slate-500">Pembaruan otomatis setiap 30 detik</span>
              </div>
              <h1 className="mt-3 text-[24px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-on-surface)] [font-family:var(--font-headline-md),Plus_Jakarta_Sans,sans-serif] sm:text-[28px]">Dashboard Utama Panitia</h1>
              <p className="mt-1.5 max-w-3xl text-[14px] leading-6 text-[var(--color-on-surface-variant)]">Ringkasan metrik registrasi, status verifikasi berkas, dan arus pendaftaran peserta ATTIN EXPO XII 2026.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-surface-container-high)] bg-white text-slate-600 transition-colors hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-on-surface)]" id="refreshMetricsBtn" title="Segarkan Data" onClick={fetchData}>
                <span className="material-symbols-outlined text-[20px]">refresh</span>
              </button>
              <Link to="/admin/pendaftaran" className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 text-[13.5px] font-semibold text-white shadow-[0_1px_2px_rgba(0,55,114,0.22)] transition-colors hover:bg-[#124e96]">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Ekspor Excel</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
          {[
            { label: 'Total Pendaftar', value: totalRegistrations, icon: 'group', tone: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary-fixed)]' },
            { label: 'Lomba Tahfizh', value: tahfizhCount, icon: 'menu_book', tone: 'text-[#003B5C]', bg: 'bg-[#EAF3FF]' },
            { label: 'Tahfizh Kelas 6', value: tahfizhKelas6Count, icon: 'menu_book', tone: 'text-[#003B5C]', bg: 'bg-[#EAF3FF]' },
            { label: 'Olimpiade', value: olimpiadeCount, icon: 'school', tone: 'text-amber-800', bg: 'bg-amber-50' },
            { label: 'Lomba Panahan', value: panahanCount, icon: 'adjust', tone: 'text-[#173867]', bg: 'bg-indigo-50' },
            { label: 'Lomba Kolase', value: kolaseCount, icon: 'diversity_3', tone: 'text-amber-800', bg: 'bg-amber-50' },
            { label: 'Lomba Pra-TKA', value: praTkaCount, icon: 'auto_stories', tone: 'text-blue-800', bg: 'bg-blue-50' },
            { label: 'Lomba Futsal', value: futsalCount, icon: 'sports_soccer', tone: 'text-rose-700', bg: 'bg-rose-50' },
            { label: 'Lomba Baca Puisi', value: bacaPuisiCount, icon: 'record_voice_over', tone: 'text-violet-700', bg: 'bg-violet-50' },
            { label: 'Terverifikasi', value: verifiedCount, icon: 'verified', tone: 'text-emerald-700', bg: 'bg-emerald-50', valueClass: 'text-emerald-700' },
            { label: 'Menunggu Aksi', value: pendingCount, icon: 'pending_actions', tone: 'text-amber-700', bg: 'bg-amber-50', valueClass: 'text-amber-700' },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{card.label}</p>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.bg} ${card.tone}`}>
                  <span className="material-symbols-outlined text-[18px]">{card.icon}</span>
                </div>
              </div>
              <p className={`mt-3 text-[30px] font-bold leading-none tracking-[-0.03em] ${card.valueClass || 'text-[var(--color-on-surface)]'} [font-family:var(--font-headline-md),Plus_Jakarta_Sans,sans-serif]`}>{card.value}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:col-span-2 xl:col-span-1 2xl:col-span-1">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Infaq Terverifikasi</p>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 text-[13px]">
              <div className="flex items-center justify-between gap-3 text-slate-600"><span>Unit SD / MI</span><span className="font-semibold text-[var(--color-on-surface)]">Rp{new Intl.NumberFormat('id-ID').format(totalInfaqSd)}</span></div>
              <div className="flex items-center justify-between gap-3 text-slate-600"><span>Unit SMP / MTs</span><span className="font-semibold text-[var(--color-on-surface)]">Rp{new Intl.NumberFormat('id-ID').format(totalInfaqSmp)}</span></div>
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--color-surface-container-high)] pt-2">
                <span className="font-semibold text-[var(--color-on-surface)]">Total</span>
                <span className="text-[16px] font-bold text-[var(--color-primary)]">Rp{new Intl.NumberFormat('id-ID').format(totalInfaqSd + totalInfaqSmp)}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] shadow-[0_1px_2px_rgba(15,23,42,0.04)]" id="table-section">
          <div className="flex flex-col gap-4 border-b border-[var(--color-surface-container)] p-5 sm:p-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[var(--color-on-surface)] [font-family:var(--font-headline-sm),Plus_Jakarta_Sans,sans-serif]">Pendaftaran Terbaru Masuk</h2>
                <p className="mt-1 text-[13px] leading-5 text-[var(--color-on-surface-variant)]">Daftar delegasi peserta yang baru mengirimkan formulir dan dokumen.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <select value={filterUnit} onChange={(e) => setFilterUnit(e.target.value as 'all' | 'sd' | 'smp')} className="h-10 min-w-[150px] appearance-none rounded-xl border border-[var(--color-surface-container-high)] bg-white py-2 pl-3.5 pr-10 text-[13px] font-medium leading-5 text-[var(--color-on-surface)] focus:border-[#0057B8] focus:outline-none focus:ring-2 focus:ring-[#0057B8]/15">
                    <option value="all">Semua Unit</option>
                    <option value="sd">Unit SD</option>
                    <option value="smp">Unit SMP</option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <button className="filter-tab active inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-primary)]/15 bg-[var(--color-primary-fixed)] px-3 py-2 text-[13px] font-semibold text-[var(--color-primary)] whitespace-nowrap" data-filter="all">
                <span>Semua</span>
                <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[11px]">{totalRegistrations}</span>
              </button>
              <button className="filter-tab inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-surface-container-high)] bg-white px-3 py-2 text-[13px] font-medium text-slate-600 whitespace-nowrap hover:bg-[var(--color-surface-container-low)]" data-filter="menunggu">
                <span>Menunggu Verifikasi</span>
                <span className="rounded-full bg-[var(--color-surface-container-low)] px-1.5 py-0.5 text-[11px] text-slate-600">{pendingCount}</span>
              </button>
              <button className="filter-tab inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-surface-container-high)] bg-white px-3 py-2 text-[13px] font-medium text-slate-600 whitespace-nowrap hover:bg-[var(--color-surface-container-low)]" data-filter="terverifikasi">
                <span>Terverifikasi</span>
                <span className="rounded-full bg-[var(--color-surface-container-low)] px-1.5 py-0.5 text-[11px] text-slate-600">{verifiedCount}</span>
              </button>
              <button className="filter-tab inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-surface-container-high)] bg-white px-3 py-2 text-[13px] font-medium text-slate-600 whitespace-nowrap hover:bg-[var(--color-surface-container-low)]" data-filter="perbaikan">
                <span>Perlu Perbaikan</span>
                <span className="rounded-full bg-[var(--color-surface-container-low)] px-1.5 py-0.5 text-[11px] text-slate-600">{rejectedCount}</span>
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <Table className="min-w-[980px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Kode Registrasi</TableHead>
                  <TableHead>Nama Peserta</TableHead>
                  <TableHead>Asal Lembaga / Sekolah</TableHead>
                  <TableHead>Cabang Lomba</TableHead>
                  <TableHead>Waktu Daftar</TableHead>
                  <TableHead>Status Bayar</TableHead>
                  <TableHead>Status Berkas</TableHead>
                  <TableHead className="text-center">Aksi Cepat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody id="pendaftarTableBody">
                {filteredRegistrations.length === 0 ? (
                  <DummyRows />
                ) : (
                  paginatedRegistrations.map((row) => (
                    <RealRow row={row} key={row.registration_code} onVerifyPrompt={setVerifyRow} onProofPrompt={setProofRow} />
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--color-surface-container)] bg-[var(--color-surface-container-low)]/35 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="text-[12.5px] text-slate-600">
              Menampilkan <span className="font-semibold text-[var(--color-on-surface)]">{filteredRegistrations.length === 0 ? 0 : startIndex + 1} - {Math.min(endIndex, filteredRegistrations.length)}</span> dari <span className="font-semibold text-[var(--color-on-surface)]">{filteredRegistrations.length}</span> pendaftar terdaftar
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="inline-flex h-8 items-center gap-1 rounded-lg border border-[var(--color-surface-container-high)] bg-white px-2.5 text-[12px] font-medium text-slate-700 hover:bg-[var(--color-surface-container-low)] disabled:cursor-not-allowed disabled:opacity-50">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                <span>Sebelumnya</span>
              </button>
              <div className="mx-0.5 flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                  .map((page, idx, arr) => (
                    <span key={page} className="contents">
                      {idx > 0 && arr[idx - 1] !== page - 1 && <span className="px-1 text-[12px] text-slate-400">…</span>}
                      <button onClick={() => setCurrentPage(page)} className={`h-8 min-w-8 rounded-lg border px-2 text-[12px] font-semibold ${currentPage === page ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-surface-container-high)] bg-white text-slate-700 hover:bg-[var(--color-surface-container-low)]'}`}>{page}</button>
                    </span>
                  ))}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="inline-flex h-8 items-center gap-1 rounded-lg border border-[var(--color-surface-container-high)] bg-white px-2.5 text-[12px] font-medium text-slate-700 hover:bg-[var(--color-surface-container-low)] disabled:cursor-not-allowed disabled:opacity-50">
                <span>Berikutnya</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>




      {verifyRow && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm" onClick={() => setVerifyRow(null)}>
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-title-md font-bold text-on-surface">Verifikasi Berkas</h3>
              <button onClick={() => setVerifyRow(null)} className="text-outline hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
            </div>
            <p className="text-body-md text-on-surface-variant mb-6">
              Tentukan status pendaftaran untuk <strong>{verifyRow.participant_name}</strong>.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => handleVerifySubmit('rejected')} className="px-4 py-2 bg-error-container hover:bg-error text-on-error-container hover:text-white rounded-lg font-medium text-[14px] transition-colors">Tolak</button>
              <button onClick={() => handleVerifySubmit('verified')} className="px-4 py-2 bg-[#16825D] hover:bg-[#126b4c] text-white rounded-lg font-medium text-[14px] transition-colors">Verifikasi Lolos</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pratinjau bukti pembayaran */}
      {proofRow && (
        <PaymentProofModal
          proofPath={proofRow.payment_proof_url}
          title={proofRow.registration_code}
          subtitle={`${proofRow.participant_name || '-'} • ${proofRow.school_name || '-'}`}
          onClose={() => setProofRow(null)}
        />
      )}

      </div>
    </div>
  )
}
