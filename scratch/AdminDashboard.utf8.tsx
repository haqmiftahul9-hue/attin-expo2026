import { useEffect, useState } from 'react'


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

function RealRow({ row, onVerifyPrompt, onView }: { row: RegistrationRow, onVerifyPrompt: (row: RegistrationRow) => void, onView: (row: RegistrationRow) => void }) {
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
          <button onClick={() => onView(row)} className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Data Pendaftar">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
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

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState<RegistrationRow[]>([])
    const [selectedRow, setSelectedRow] = useState<RegistrationRow | null>(null)

    const [verifyRow, setVerifyRow] = useState<RegistrationRow | null>(null)

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

  const filteredRegistrations = registrations

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
<div className="relative">
<select className="appearance-none h-10 pl-3 pr-8 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container cursor-pointer font-medium">
<option>Periode: Semua Waktu</option>
<option>7 Hari Terakhir</option>
<option>30 Hari Terakhir</option>
<option>Bulan Ini (Februari 2026)</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">expand_more</span>
</div>
<button className="h-10 w-10 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" id="refreshMetricsBtn" title="Segarkan Data">
<span className="material-symbols-outlined text-[20px]">refresh</span>
</button>
<button className="h-10 px-4 flex items-center gap-2 rounded-lg bg-primary-container text-on-primary font-body-md-semibold text-body-md hover:bg-primary transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px]">file_download</span>
<span>Ekspor Excel</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-space-md">

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
<div className="flex items-center justify-between text-outline mb-1">
<span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Total Pendaftar</span>
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">group</span>
</div>
</div>
<div className="my-2">
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">348</span>
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
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">142</span>
<span className="text-caption font-caption text-outline ml-1">/ 160 Kuota</span>
</div>
<div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div className="bg-primary h-1.5 rounded-full" style={{ width: "88%" }}></div>
</div>
<div className="flex justify-between items-center text-caption font-caption text-outline mt-1.5">
<span>Kapasitas</span>
<span className="font-semibold text-primary">88% Terisi</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
<div className="flex items-center justify-between text-outline mb-1">
<span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">Lomba Pra-TKA</span>
<div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">school</span>
</div>
</div>
<div className="my-2">
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">116</span>
<span className="text-caption font-caption text-outline ml-1">/ 160 Kuota</span>
</div>
<div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div className="bg-secondary h-1.5 rounded-full" style={{ width: "72%" }}></div>
</div>
<div className="flex justify-between items-center text-caption font-caption text-outline mt-1.5">
<span>Kapasitas</span>
<span className="font-semibold text-secondary">72% Terisi</span>
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
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-surface">90</span>
<span className="text-caption font-caption text-outline ml-1">/ 100 Kuota</span>
</div>
<div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div className="bg-tertiary-container h-1.5 rounded-full" style={{ width: "90%" }}></div>
</div>
<div className="flex justify-between items-center text-caption font-caption text-outline mt-1.5">
<span>Kapasitas</span>
<span className="font-semibold text-tertiary-container">90% Terisi</span>
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
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-[#16825D]">284</span>
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
<span className="font-display-hero-mobile text-display-hero-mobile font-bold text-[#C98316]">52</span>
</div>
<div className="inline-flex items-center gap-1.5 py-0.5 px-2 bg-surface-container-low rounded text-caption font-caption text-[#C98316] font-medium">
<span className="w-1.5 h-1.5 rounded-full bg-[#C98316] animate-ping"></span>
<span>Butuh Review Panitia</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<h2 className="font-title-md text-title-md text-on-surface">Distribusi Wilayah &amp; Cabang Lomba</h2>
<p className="font-caption text-caption text-on-surface-variant">Sebaran pendaftar dari Kabupaten &amp; Kota di Sumatera Barat</p>
</div>

<div className="flex items-center gap-space-md text-caption font-caption">
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-sm bg-primary-container"></span>
<span className="text-on-surface-variant">Tahfizh</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-sm bg-secondary"></span>
<span className="text-on-surface-variant">Pra-TKA</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-sm bg-tertiary-container"></span>
<span className="text-on-surface-variant">Panahan</span>
</div>
</div>
</div>

<div className="space-y-3.5 my-2">

<div className="flex items-center gap-3">
<span className="w-24 text-caption font-body-md text-on-surface font-medium truncate">Kota Padang</span>
<div className="flex-1 flex h-7 bg-surface-container rounded-lg overflow-hidden p-0.5 gap-0.5">
<div className="bg-primary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "48%" }} title="Tahfizh: 46">46</div>
<div className="bg-secondary rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "32%" }} title="Pra-TKA: 31">31</div>
<div className="bg-tertiary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "20%" }} title="Panahan: 19">19</div>
</div>
<span className="w-12 text-right text-caption font-body-md-semibold text-on-surface">96</span>
</div>

<div className="flex items-center gap-3">
<span className="w-24 text-caption font-body-md text-on-surface font-medium truncate">Bukittinggi</span>
<div className="flex-1 flex h-7 bg-surface-container rounded-lg overflow-hidden p-0.5 gap-0.5">
<div className="bg-primary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "40%" }} title="Tahfizh: 28">28</div>
<div className="bg-secondary rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "38%" }} title="Pra-TKA: 26">26</div>
<div className="bg-tertiary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "22%" }} title="Panahan: 15">15</div>
</div>
<span className="w-12 text-right text-caption font-body-md-semibold text-on-surface">69</span>
</div>

<div className="flex items-center gap-3">
<span className="w-24 text-caption font-body-md text-on-surface font-medium truncate">Tanah Datar</span>
<div className="flex-1 flex h-7 bg-surface-container rounded-lg overflow-hidden p-0.5 gap-0.5">
<div className="bg-primary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "45%" }} title="Tahfizh: 24">24</div>
<div className="bg-secondary rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "30%" }} title="Pra-TKA: 16">16</div>
<div className="bg-tertiary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "25%" }} title="Panahan: 13">13</div>
</div>
<span className="w-12 text-right text-caption font-body-md-semibold text-on-surface">53</span>
</div>

<div className="flex items-center gap-3">
<span className="w-24 text-caption font-body-md text-on-surface font-medium truncate">Payakumbuh</span>
<div className="flex-1 flex h-7 bg-surface-container rounded-lg overflow-hidden p-0.5 gap-0.5">
<div className="bg-primary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "38%" }} title="Tahfizh: 18">18</div>
<div className="bg-secondary rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "38%" }} title="Pra-TKA: 18">18</div>
<div className="bg-tertiary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "24%" }} title="Panahan: 11">11</div>
</div>
<span className="w-12 text-right text-caption font-body-md-semibold text-on-surface">47</span>
</div>

<div className="flex items-center gap-3">
<span className="w-24 text-caption font-body-md text-on-surface font-medium truncate">Kab. Agam</span>
<div className="flex-1 flex h-7 bg-surface-container rounded-lg overflow-hidden p-0.5 gap-0.5">
<div className="bg-primary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "35%" }} title="Tahfizh: 14">14</div>
<div className="bg-secondary rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "40%" }} title="Pra-TKA: 16">16</div>
<div className="bg-tertiary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "25%" }} title="Panahan: 10">10</div>
</div>
<span className="w-12 text-right text-caption font-body-md-semibold text-on-surface">40</span>
</div>

<div className="flex items-center gap-3">
<span className="w-24 text-caption font-body-md text-on-surface font-medium truncate">Solok &amp; Lainnya</span>
<div className="flex-1 flex h-7 bg-surface-container rounded-lg overflow-hidden p-0.5 gap-0.5">
<div className="bg-primary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "28%" }} title="Tahfizh: 12">12</div>
<div className="bg-secondary rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "21%" }} title="Pra-TKA: 9">9</div>
<div className="bg-tertiary-container rounded-sm flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "51%" }} title="Panahan: 22">22</div>
</div>
<span className="w-12 text-right text-caption font-body-md-semibold text-on-surface">43</span>
</div>
</div>
<div className="pt-3 border-t border-surface-container flex items-center justify-between text-caption font-caption text-outline">
<span>* Mencakup 19 Kabupaten/Kota di Sumatera Barat &amp; Delegasi Luar Daerah</span>
<button className="text-primary font-body-md-semibold text-caption hover:underline inline-flex items-center gap-1">
          Unduh Laporan Daerah <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<h2 className="font-title-md text-title-md text-on-surface">Target Kuota Keseluruhan</h2>
<span className="text-caption font-caption text-secondary font-bold uppercase tracking-wider">H-8 Ditutup</span>
</div>

<div className="flex items-center gap-space-md p-space-md bg-surface rounded-xl my-space-xs">
<div className="relative w-20 h-20 flex-shrink-0">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
<path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="87, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-title-md font-title-md text-on-surface font-bold">87%</span>
</div>
</div>
<div className="flex flex-col">
<span className="text-body-md-semibold font-body-md-semibold text-on-surface">348 dari 420 Kursi</span>
<span className="text-caption font-caption text-on-surface-variant">Sisa 72 slot delegasi pada 3 cabang perlombaan</span>
</div>
</div>

<div className="mt-space-md">
<p className="text-label-badge font-label-badge uppercase tracking-wider text-outline mb-space-xs">Agenda Tindakan Cepat Panitia</p>
<div className="space-y-space-xs">
<a className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group" href="/admin">
<div className="flex items-center gap-2.5 min-w-0">
<span className="w-2 h-2 rounded-full bg-[#C98316] flex-shrink-0"></span>
<span className="font-body-md text-body-md text-on-surface truncate">52 berkas butuh pemeriksaan tim</span>
</div>
<span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">chevron_right</span>
</a>
<a className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group" href="/admin">
<div className="flex items-center gap-2.5 min-w-0">
<span className="w-2 h-2 rounded-full bg-error flex-shrink-0"></span>
<span className="font-body-md text-body-md text-on-surface truncate">12 bukti transfer nominal selisih</span>
</div>
<span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">chevron_right</span>
</a>
<a className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group" href="/admin">
<div className="flex items-center gap-2.5 min-w-0">
<span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
<span className="font-body-md text-body-md text-on-surface truncate">3 peserta ajukan koreksi data</span>
</div>
<span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">chevron_right</span>
</a>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm border-t border-surface-container">
<a className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-secondary text-on-secondary font-body-md-semibold text-body-md hover:bg-[#81233f] transition-colors shadow-sm" href="#table-section">
<span>Buka Antrean Verifikasi</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
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

<div className="relative w-full sm:w-72">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
<input className="w-full h-10 pl-9 pr-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors" id="searchInput" placeholder="Cari nama, sekolah, kode..." type="text"/>
</div>
</div>

<div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 border-b border-surface-container">
<button className="filter-tab active px-3.5 py-2 rounded-lg text-body-md-semibold font-body-md-semibold text-primary bg-primary-fixed flex items-center gap-1.5 transition-colors whitespace-nowrap" data-filter="all">
<span>Semua</span>
<span className="px-1.5 py-0.5 rounded-full text-caption bg-surface-container-lowest text-primary text-[11px]">348</span>
</button>
<button className="filter-tab px-3.5 py-2 rounded-lg text-body-md font-body-md text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1.5 transition-colors whitespace-nowrap" data-filter="menunggu">
<span>Menunggu Verifikasi</span>
<span className="px-1.5 py-0.5 rounded-full text-caption bg-surface-container text-on-surface-variant text-[11px]">52</span>
</button>
<button className="filter-tab px-3.5 py-2 rounded-lg text-body-md font-body-md text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1.5 transition-colors whitespace-nowrap" data-filter="terverifikasi">
<span>Terverifikasi</span>
<span className="px-1.5 py-0.5 rounded-full text-caption bg-surface-container text-on-surface-variant text-[11px]">284</span>
</button>
<button className="filter-tab px-3.5 py-2 rounded-lg text-body-md font-body-md text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1.5 transition-colors whitespace-nowrap" data-filter="perbaikan">
<span>Perlu Perbaikan</span>
<span className="px-1.5 py-0.5 rounded-full text-caption bg-surface-container text-on-surface-variant text-[11px]">12</span>
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
                  {registrations.length === 0 ? (
                    <DummyRows />
                  ) : (
                    filteredRegistrations.map((row) => (
                      <RealRow row={row} key={row.registration_code} onVerifyPrompt={setVerifyRow} onView={setSelectedRow} />
                    ))
                  )}
                </tbody>

</table>
</div>

<div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="text-caption font-caption text-on-surface-variant">
        Menampilkan <span className="font-semibold text-on-surface">1 - 6</span> dari <span className="font-semibold text-on-surface">348</span> pendaftar terdaftar
      </div>
<div className="flex items-center gap-1">
<button className="h-8 px-2.5 flex items-center gap-1 rounded text-caption font-medium text-outline bg-surface-container-lowest hover:text-on-surface disabled:opacity-50" disabled>
<span className="material-symbols-outlined text-[16px]">chevron_left</span>
<span>Sebelumnya</span>
</button>
<div className="flex items-center gap-1 mx-1">
<button className="w-8 h-8 rounded bg-primary-container text-on-primary font-caption font-bold text-caption">1</button>
<button className="w-8 h-8 rounded bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-caption text-caption transition-colors">2</button>
<button className="w-8 h-8 rounded bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-caption text-caption transition-colors">3</button>
<span className="text-caption text-outline px-1">...</span>
<button className="w-8 h-8 rounded bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-caption text-caption transition-colors">58</button>
</div>
<button className="h-8 px-2.5 flex items-center gap-1 rounded text-caption font-medium text-on-surface bg-surface-container-lowest hover:bg-surface-container-high transition-colors">
<span>Berikutnya</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
</div>
</div>



      {selectedRow && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm" onClick={() => setSelectedRow(null)}>
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-title-md font-bold text-on-surface">Detail Pendaftar</h3>
              <button onClick={() => setSelectedRow(null)} className="text-outline hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="space-y-3 text-body-md text-on-surface">
              <p><strong>Kode:</strong> {selectedRow.registration_code}</p>
              <p><strong>Nama:</strong> {selectedRow.participant_name} ({selectedRow.nickname})</p>
              <p><strong>Asal Sekolah:</strong> {selectedRow.school_name}</p>
              <p><strong>Kategori Lomba:</strong> {registrationConfigs[selectedRow.competition_slug]?.name || selectedRow.competition_slug} {(selectedRow.specific_data && Object.values(selectedRow.specific_data)[0]) || ''}</p>
              <p><strong>Status:</strong> {selectedRow.registration_status === 'verified' ? 'Terverifikasi' : 'Menunggu'}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedRow(null)} className="px-4 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg font-medium text-on-surface transition-colors">Tutup</button>
            </div>
          </div>
        </div>
      )}

      
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

      </div>
    </div>
  )
}
