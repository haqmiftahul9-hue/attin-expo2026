import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PaymentProofModal from '../../components/admin/PaymentProofModal'


import { getAllRegistrations, updateRegistrationStatus } from '../../lib/registrationsRepository.js'

import type { RegistrationRow } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'


function DummyRows() {
  return (
    <tr>
      <td colSpan={8} className="py-12 text-center text-on-surface-variant">
        <span className="material-symbols-outlined text-[48px] text-surface-container-high mb-2 block">inbox</span>
        <p>Belum ada data pendaftaran.</p>
      </td>
    </tr>
  )
}

function RealRow({ row, onVerifyPrompt, onProofPrompt }: { row: RegistrationRow, onVerifyPrompt: (row: RegistrationRow) => void, onProofPrompt: (row: RegistrationRow) => void }) {
  const config = registrationConfigs[row.competition_slug] || {}
  
  return (
    <tr className="hover:bg-surface-container-low transition-colors group">
      <td className="py-3.5 px-4 font-body-md-semibold text-primary font-mono text-[13px]">{row.registration_code}</td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-caption">
            {row.participant_name.substring(0, 2).toUpperCase()}
          </span>
          <span className="font-medium text-on-surface">{row.participant_name}</span>
        </div>
      </td>
      <td className="py-3.5 px-4 text-on-surface-variant max-w-[200px] truncate">{row.school_name}</td>
      <td className="py-3.5 px-4">
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-caption font-semibold bg-primary-fixed text-primary">
          {config.name || row.competition_slug} {row.specific_data ? '- ' + Object.values(row.specific_data)[0] : ''}
        </span>
      </td>
      <td className="py-3.5 px-4 text-caption text-outline">
        {row.created_at ? new Date(row.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
      </td>
      <td className="py-3.5 px-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16825D]"></span>
          Lunas
        </span>
      </td>
      <td className="py-3.5 px-4">
        {row.registration_status === 'verified' ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            Terverifikasi
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#C98316]">
            Menunggu Verifikasi
          </span>
        )}
      </td>
      <td className="py-3.5 px-4 text-center">
        <div className="flex items-center justify-center gap-1">
          <a href={`/admin/pendaftaran/${row.registration_code}`} className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Data Pendaftar">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </a>
          <button
            onClick={() => onProofPrompt(row)}
            disabled={!row.payment_proof_url}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title={row.payment_proof_url ? 'Lihat Pratinjau Bukti Pembayaran' : 'Bukti pembayaran belum diunggah'}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </button>
          {row.registration_status === 'verified' ? (
            <button onClick={() => alert('Fitur Cetak ID Card Peserta ' + row.participant_name + ' akan segera hadir.')} className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-secondary-fixed transition-colors" title="Cetak ID Card">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </button>
          ) : (
            <button onClick={() => onVerifyPrompt(row)} className="h-8 px-3 rounded-lg flex items-center gap-1 text-[#16825D] bg-[#ECFDF5] hover:bg-[#d1f4e0] transition-colors font-medium text-[12px] shadow-sm" title="Verifikasi Pendaftaran">
              <span className="material-symbols-outlined text-[16px]">fact_check</span>
              <span>Verifikasi</span>
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

function getUnit(slug: string): 'sd' | 'smp' {
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
    async function fetchData() {
      try {
        const data = await getAllRegistrations()
        setRegistrations(data || [])
      } catch (err) {
      }
    }
    fetchData()
  }, [])

  const filteredRegistrations = filterUnit === 'all'
    ? registrations
    : registrations.filter(r => getUnit(r.competition_slug) === filterUnit)

  const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [filterUnit])

  const totalRegistrations = registrations.length
  const tahfizhCount = registrations.filter(r => r.competition_slug === 'tahfizh').length
  const olimpiadeCount = registrations.filter(r => r.competition_slug === 'olimpiade').length
  const panahanCount = registrations.filter(r => r.competition_slug === 'panahan').length
  const kolaseCount = registrations.filter(r => r.competition_slug === 'kolase').length
  const praTkaCount = registrations.filter(r => r.competition_slug === 'pra-tka').length
  const futsalCount = registrations.filter(r => r.competition_slug === 'futsal').length
  const bacaPuisiCount = registrations.filter(r => r.competition_slug === 'baca-puisi').length
  const verifiedCount = registrations.filter(r => r.registration_status === 'verified').length
  const pendingCount = registrations.filter(r => r.registration_status === 'pending').length
  const rejectedCount = registrations.filter(r => r.registration_status === 'rejected').length

  return (
    
    <div className="w-full pt-6 md:pt-8 px-4 md:px-8 pb-12">
      <div className="flex flex-col w-full gap-space-lg">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex flex-col">
<div className="flex items-center gap-space-sm mb-space-xs">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-badge font-label-badge tracking-wider uppercase bg-primary-fixed text-primary font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          Periode Registrasi Aktif
        </span>
<span className="text-caption font-caption text-outline">Pembaruan sistem: 5 menit lalu</span>
</div>
<h1 className="text-headline-md font-headline-md text-on-surface tracking-tight">Dashboard Utama Panitia</h1>
<p className="text-body-md font-body-md text-on-surface-variant mt-0.5">Ringkasan metrik registrasi, status verifikasi berkas, dan arus pendaftaran peserta ATTIN EXPO XII 2026.</p>
</div>

            <div className="flex flex-wrap items-center gap-space-sm">
              <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" id="refreshMetricsBtn" title="Segarkan Data">
                <span className="material-symbols-outlined text-[20px]">refresh</span>
              </button>
              <Link to="/admin/pendaftaran" className="h-10 px-4 flex items-center gap-2 rounded-lg bg-primary-container text-on-primary font-body-md-semibold text-body-md hover:bg-primary transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Ekspor Excel</span>
              </Link>
            </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md">

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
<div className="flex items-center justify-between text-outline mb-1">
<span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Total Pendaftar</span>
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">group</span>
</div>
</div>
<div className="my-2">
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">{totalRegistrations}</span>
</div>
<div className="flex items-center gap-1 text-caption font-caption text-primary">
<span className="material-symbols-outlined text-[14px]">trending_up</span>
<span className="font-semibold">+18%</span>
<span className="text-outline">dari pekan lalu</span>
</div>
</div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex items-center justify-between text-outline mb-1">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Lomba Tahfizh</span>
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </div>
            </div>
            <div className="my-2">
              <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">{tahfizhCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex items-center justify-between text-outline mb-1">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Olimpiade</span>
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">school</span>
              </div>
            </div>
            <div className="my-2">
              <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">{olimpiadeCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex items-center justify-between text-outline mb-1">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Lomba Panahan</span>
              <div className="w-8 h-8 rounded-lg bg-primary-fixed-dim flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">adjust</span>
              </div>
            </div>
            <div className="my-2">
              <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">{panahanCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex items-center justify-between text-outline mb-1">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Lomba Kolase</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <span className="material-symbols-outlined text-[18px]">diversity_3</span>
              </div>
            </div>
            <div className="my-2">
              <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">{kolaseCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex items-center justify-between text-outline mb-1">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Lomba Pra-TKA</span>
              <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">auto_stories</span>
              </div>
            </div>
            <div className="my-2">
              <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">{praTkaCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex items-center justify-between text-outline mb-1">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Lomba Futsal</span>
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
                <span className="material-symbols-outlined text-[18px]">sports_soccer</span>
              </div>
            </div>
            <div className="my-2">
              <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">{futsalCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex items-center justify-between text-outline mb-1">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Lomba Baca Puisi</span>
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-700">
                <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
              </div>
            </div>
            <div className="my-2">
              <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">{bacaPuisiCount}</span>
            </div>
          </div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
<div className="flex items-center justify-between text-outline mb-1">
<span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Terverifikasi</span>
<div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-[#16825D]">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
</div>
<div className="my-2">
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-[#16825D]">{verifiedCount}</span>
</div>
<div className="inline-flex items-center gap-1.5 py-0.5 px-2 bg-surface-container-low rounded text-caption font-caption text-[#16825D] font-medium">
<span className="w-1.5 h-1.5 rounded-full bg-[#16825D]"></span>
<span>Berkas &amp; Bayar Sah</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
<div className="flex items-center justify-between text-outline mb-1">
<span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Menunggu Aksi</span>
<div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-[#C98316]">
<span className="material-symbols-outlined text-[18px]">pending_actions</span>
</div>
</div>
<div className="my-2">
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-[#C98316]">{pendingCount}</span>
</div>
<div className="inline-flex items-center gap-1.5 py-0.5 px-2 bg-surface-container-low rounded text-caption font-caption text-[#C98316] font-medium">
<span className="w-1.5 h-1.5 rounded-full bg-[#C98316] animate-ping"></span>
<span>Butuh Review Panitia</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col" id="table-section">

<div className="p-space-lg flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Pendaftaran Terbaru Masuk</h2>
<p className="font-caption text-caption text-on-surface-variant">Daftar delegasi peserta yang baru mengirimkan formulir dan dokumen</p>
</div>

<div className="flex items-center gap-space-sm">
<div className="relative w-full sm:w-40">
<select value={filterUnit} onChange={(e) => setFilterUnit(e.target.value as 'all' | 'sd' | 'smp')} className="w-full h-10 pl-3 pr-8 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container cursor-pointer">
<option value="all">Semua Unit</option>
<option value="sd">Unit SD</option>
<option value="smp">Unit SMP</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">expand_more</span>
</div>

<div className="relative w-full sm:w-72">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
<input className="w-full h-10 pl-9 pr-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors" id="searchInput" placeholder="Cari nama, sekolah, kode..." type="text"/>
</div>
</div>
</div>

<div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 border-b border-surface-container">
          <button className="filter-tab active px-3.5 py-2 rounded-lg text-body-md-semibold font-body-md-semibold text-primary bg-primary-fixed flex items-center gap-1.5 transition-colors whitespace-nowrap" data-filter="all">
            <span>Semua</span>
            <span className="px-1.5 py-0.5 rounded-full text-caption bg-surface-container-lowest text-primary text-[11px]">{totalRegistrations}</span>
          </button>
          <button className="filter-tab px-3.5 py-2 rounded-lg text-body-md font-body-md text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1.5 transition-colors whitespace-nowrap" data-filter="menunggu">
            <span>Menunggu Verifikasi</span>
            <span className="px-1.5 py-0.5 rounded-full text-caption bg-surface-container text-on-surface-variant text-[11px]">{pendingCount}</span>
          </button>
          <button className="filter-tab px-3.5 py-2 rounded-lg text-body-md font-body-md text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1.5 transition-colors whitespace-nowrap" data-filter="terverifikasi">
            <span>Terverifikasi</span>
            <span className="px-1.5 py-0.5 rounded-full text-caption bg-surface-container text-on-surface-variant text-[11px]">{verifiedCount}</span>
          </button>
          <button className="filter-tab px-3.5 py-2 rounded-lg text-body-md font-body-md text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1.5 transition-colors whitespace-nowrap" data-filter="perbaikan">
            <span>Perlu Perbaikan</span>
            <span className="px-1.5 py-0.5 rounded-full text-caption bg-surface-container text-on-surface-variant text-[11px]">{rejectedCount}</span>
          </button>
</div>
</div>

<div className="w-full overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant text-caption font-label-badge uppercase tracking-wider">
<th className="py-3 px-4 font-bold">Kode Registrasi</th>
<th className="py-3 px-4 font-bold">Nama Peserta</th>
<th className="py-3 px-4 font-bold">Asal Lembaga / Sekolah</th>
<th className="py-3 px-4 font-bold">Cabang Lomba</th>
<th className="py-3 px-4 font-bold">Waktu Daftar</th>
<th className="py-3 px-4 font-bold">Status Bayar</th>
<th className="py-3 px-4 font-bold">Status Berkas</th>
<th className="py-3 px-4 font-bold text-center">Aksi Cepat</th>
</tr>
</thead>

                <tbody className="font-body-md text-body-md text-on-surface" id="pendaftarTableBody">
                  {filteredRegistrations.length === 0 ? (
                    <DummyRows />
                  ) : (
                    paginatedRegistrations.map((row) => (
                      <RealRow row={row} key={row.registration_code} onVerifyPrompt={setVerifyRow} onProofPrompt={setProofRow} />
                    ))
                  )}
                </tbody>

</table>
</div>

              <div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div className="text-caption font-caption text-on-surface-variant">
                  Menampilkan <span className="font-semibold text-on-surface">{filteredRegistrations.length === 0 ? 0 : startIndex + 1} - {Math.min(endIndex, filteredRegistrations.length)}</span> dari <span className="font-semibold text-on-surface">{filteredRegistrations.length}</span> pendaftar terdaftar
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="h-8 px-2.5 flex items-center gap-1 rounded text-caption font-medium text-on-surface bg-surface-container-lowest hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    <span>Sebelumnya</span>
                  </button>
                  <div className="flex items-center gap-1 mx-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                      .map((page, idx, arr) => (
                        <>
                          {idx > 0 && arr[idx - 1] !== page - 1 && <span className="text-caption text-outline px-1">...</span>}
                          <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded font-caption text-caption ${currentPage === page ? 'bg-primary-container text-on-primary font-bold' : 'bg-surface-container-lowest hover:bg-surface-container-high text-on-surface'} transition-colors`}>{page}</button>
                        </>
                      ))}
                  </div>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="h-8 px-2.5 flex items-center gap-1 rounded text-caption font-medium text-on-surface bg-surface-container-lowest hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <span>Berikutnya</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
</div>



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
