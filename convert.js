const fs = require('fs');

let html = fs.readFileSync('admin_dashboard_attin_expo_xii_2026/code.html', 'utf-8');

// Extract the <body> content
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// Remove <script> inside body
bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/, '');

// Convert class= to className=
let jsx = bodyContent.replace(/class="/g, 'className="');

// Fix inline styles
jsx = jsx.replace(/style="width: 88%"/g, 'style={{ width: "88%" }}');
jsx = jsx.replace(/style="width: 72%"/g, 'style={{ width: "72%" }}');
jsx = jsx.replace(/style="width: 90%"/g, 'style={{ width: "90%" }}');
jsx = jsx.replace(/style="width: 48%"/g, 'style={{ width: "48%" }}');
jsx = jsx.replace(/style="width: 32%"/g, 'style={{ width: "32%" }}');
jsx = jsx.replace(/style="width: 20%"/g, 'style={{ width: "20%" }}');
jsx = jsx.replace(/style="width: 40%"/g, 'style={{ width: "40%" }}');
jsx = jsx.replace(/style="width: 38%"/g, 'style={{ width: "38%" }}');
jsx = jsx.replace(/style="width: 22%"/g, 'style={{ width: "22%" }}');
jsx = jsx.replace(/style="width: 45%"/g, 'style={{ width: "45%" }}');
jsx = jsx.replace(/style="width: 30%"/g, 'style={{ width: "30%" }}');
jsx = jsx.replace(/style="width: 25%"/g, 'style={{ width: "25%" }}');
jsx = jsx.replace(/style="width: 24%"/g, 'style={{ width: "24%" }}');
jsx = jsx.replace(/style="width: 35%"/g, 'style={{ width: "35%" }}');
jsx = jsx.replace(/style="width: 28%"/g, 'style={{ width: "28%" }}');
jsx = jsx.replace(/style="width: 21%"/g, 'style={{ width: "21%" }}');
jsx = jsx.replace(/style="width: 51%"/g, 'style={{ width: "51%" }}');

// Fix input self closing
jsx = jsx.replace(/<input([^>]*[^/])>/g, '<input$1 />');

// Fix img self closing
jsx = jsx.replace(/<img([^>]*[^/])>/g, '<img$1 />');

// Remove HTML comments
jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

// Fix SVG props
jsx = jsx.replace(/viewbox/g, 'viewBox');
jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
jsx = jsx.replace(/stroke-dasharray/g, 'strokeDasharray');

// Link replacements
jsx = jsx.replace(/href="#"/g, 'href="/admin"');

// Replace table body with dynamic code but keep dummy if empty
jsx = jsx.replace(/<tbody[^>]*>[\s\S]*?<\/tbody>/, `
                <tbody className="font-body-md text-body-md text-on-surface" id="pendaftarTableBody">
                  {registrations.length === 0 ? (
                    // DUMMY ROWS FOR VISUAL MATCH
                    <DummyRows />
                  ) : (
                    filteredRegistrations.map((row) => (
                      <RealRow row={row} key={row.registration_code} />
                    ))
                  )}
                </tbody>
`);

// Wrap text with unescaped apostrophes
jsx = jsx.replace(/Qurrata A'yun/g, 'Qurrata A{"\'"}yun');

const finalComponent = `import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site.js'
import { getAllRegistrations } from '../../lib/registrationsRepository.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { RegistrationRow } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'

function DummyRows() {
  return (
    <>
      <tr className="hover:bg-surface-container-low transition-colors group">
        <td className="py-3.5 px-4 font-body-md-semibold text-primary font-mono text-[13px]">ATXII-TFZ-0184</td>
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-caption">FA</span>
            <span className="font-medium text-on-surface">Fadhil Ahmad Al-Ghifari</span>
          </div>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">SDIT Adzkia 1 Padang</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-caption font-semibold bg-primary-fixed text-primary">Tahfizh 2 Juz</span>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">Kota Padang</td>
        <td className="py-3.5 px-4 text-caption text-outline">15 Feb, 10:24</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16825D]"></span>
            Lunas
          </span>
        </td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#C98316]">
            Menunggu Verifikasi
          </span>
        </td>
        <td className="py-3.5 px-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Berkas">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#16825D] hover:bg-[#ECFDF5] transition-colors" title="Verifikasi Lolos">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </button>
          </div>
        </td>
      </tr>
      <tr className="hover:bg-surface-container-low transition-colors group">
        <td className="py-3.5 px-4 font-body-md-semibold text-primary font-mono text-[13px]">ATXII-TKA-0112</td>
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-caption">AZ</span>
            <span className="font-medium text-on-surface">Aisyah Zahira Putri</span>
          </div>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">MIN 1 Kota Bukittinggi</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-caption font-semibold bg-secondary-fixed text-secondary">Pra-TKA Kel. A</span>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">Kota Bukittinggi</td>
        <td className="py-3.5 px-4 text-caption text-outline">15 Feb, 09:40</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16825D]"></span>
            Lunas
          </span>
        </td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            Terverifikasi
          </span>
        </td>
        <td className="py-3.5 px-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Berkas">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Cetak ID Card">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </button>
          </div>
        </td>
      </tr>
      <tr className="hover:bg-surface-container-low transition-colors group">
        <td className="py-3.5 px-4 font-body-md-semibold text-primary font-mono text-[13px]">ATXII-ARC-0089</td>
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary-fixed-dim text-tertiary flex items-center justify-center font-bold text-caption">RP</span>
            <span className="font-medium text-on-surface">Raihan Pratama</span>
          </div>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">SD IT Qurrata A{"'"}yun Batusangkar</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-caption font-semibold bg-tertiary-fixed text-tertiary">Panahan Standar 15m</span>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">Tanah Datar</td>
        <td className="py-3.5 px-4 text-caption text-outline">15 Feb, 08:15</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#C98316]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C98316]"></span>
            Cek Mutasi
          </span>
        </td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#C98316]">
            Menunggu Verifikasi
          </span>
        </td>
        <td className="py-3.5 px-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Berkas">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#16825D] hover:bg-[#ECFDF5] transition-colors" title="Verifikasi Lolos">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </button>
          </div>
        </td>
      </tr>
      <tr className="hover:bg-surface-container-low transition-colors group">
        <td className="py-3.5 px-4 font-body-md-semibold text-primary font-mono text-[13px]">ATXII-TFZ-0183</td>
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-caption">KS</span>
            <span className="font-medium text-on-surface">Khadijah Syahirah</span>
          </div>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">SD Islam Al-Azhar 32 Padang</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-caption font-semibold bg-primary-fixed text-primary">Tahfizh 1 Juz</span>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">Kota Padang</td>
        <td className="py-3.5 px-4 text-caption text-outline">14 Feb, 21:05</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16825D]"></span>
            Lunas
          </span>
        </td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            Terverifikasi
          </span>
        </td>
        <td className="py-3.5 px-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Berkas">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Cetak ID Card">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </button>
          </div>
        </td>
      </tr>
      <tr className="hover:bg-surface-container-low transition-colors group">
        <td className="py-3.5 px-4 font-body-md-semibold text-primary font-mono text-[13px]">ATXII-TKA-0111</td>
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-caption">MI</span>
            <span className="font-medium text-on-surface">Muhammad Izzan Luqman</span>
          </div>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">SD Islam Raudhatul Jannah Payakumbuh</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-caption font-semibold bg-secondary-fixed text-secondary">Pra-TKA Kel. B</span>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">Payakumbuh</td>
        <td className="py-3.5 px-4 text-caption text-outline">14 Feb, 17:18</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-error-container text-on-error-container">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            Kurang Bayar
          </span>
        </td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-error-container text-on-error-container">
            Perlu Perbaikan
          </span>
        </td>
        <td className="py-3.5 px-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Berkas">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-secondary-fixed transition-colors" title="Kirim Notifikasi WA">
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </button>
          </div>
        </td>
      </tr>
      <tr className="hover:bg-surface-container-low transition-colors group">
        <td className="py-3.5 px-4 font-body-md-semibold text-primary font-mono text-[13px]">ATXII-ARC-0088</td>
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary-fixed-dim text-tertiary flex items-center justify-center font-bold text-caption">SN</span>
            <span className="font-medium text-on-surface">Salma Nabila Hasna</span>
          </div>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">SDIT Luqman Al-Hakim Agam</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-caption font-semibold bg-tertiary-fixed text-tertiary">Panahan Standar 10m</span>
        </td>
        <td className="py-3.5 px-4 text-on-surface-variant">Kab. Agam</td>
        <td className="py-3.5 px-4 text-caption text-outline">14 Feb, 15:02</td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16825D]"></span>
            Lunas
          </span>
        </td>
        <td className="py-3.5 px-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            Terverifikasi
          </span>
        </td>
        <td className="py-3.5 px-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Berkas">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Cetak ID Card">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </button>
          </div>
        </td>
      </tr>
    </>
  )
}

function RealRow({ row }: { row: RegistrationRow }) {
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
          {config.name || row.competition_slug}
        </span>
      </td>
      <td className="py-3.5 px-4 text-on-surface-variant">{row.city || '-'}</td>
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
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#C98316]">
          Menunggu Verifikasi
        </span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <div className="flex items-center justify-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Berkas">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#16825D] hover:bg-[#ECFDF5] transition-colors" title="Verifikasi Lolos">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminDashboard() {
  usePageTitle('Admin Dashboard - ATTIN EXPO XII 2026')
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([])

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

  const inlineTheme = {
    '--color-secondary-fixed-dim':'#ffb1c0',
    '--color-surface-container':'#eceef1',
    '--color-surface-container-highest':'#e0e3e6',
    '--color-surface-container-high':'#e6e8eb',
    '--color-secondary':'#a03b56',
    '--color-on-error-container':'#93000a',
    '--color-outline':'#737782',
    '--color-on-tertiary-fixed-variant':'#284777',
    '--color-surface':'#f7f9fc',
    '--color-inverse-primary':'#aac7ff',
    '--color-on-primary-fixed':'#001b3e',
    '--color-on-primary-fixed-variant':'#00468d',
    '--color-on-background':'#191c1e',
    '--color-on-surface-variant':'#424751',
    '--color-on-primary-container':'#a0c2ff',
    '--color-on-secondary-container':'#771b37',
    '--color-on-tertiary-container':'#a5c2fa',
    '--color-tertiary-container':'#314f80',
    '--color-outline-variant':'#c2c6d2',
    '--color-error':'#ba1a1a',
    '--color-tertiary':'#173867',
    '--color-primary-fixed':'#d6e3ff',
    '--color-surface-container-lowest':'#ffffff',
    '--color-background':'#f7f9fc',
    '--color-surface-dim':'#d8dadd',
    '--color-inverse-on-surface':'#eff1f4',
    '--color-on-secondary':'#ffffff',
    '--color-surface-bright':'#f7f9fc',
    '--color-on-error':'#ffffff',
    '--color-secondary-container':'#ff86a1',
    '--color-secondary-fixed':'#ffd9df',
    '--color-primary-fixed-dim':'#aac7ff',
    '--color-primary':'#003772',
    '--color-on-secondary-fixed':'#3f0016',
    '--color-on-surface':'#191c1e',
    '--color-primary-container':'#124e96',
    '--color-surface-variant':'#e0e3e6',
    '--color-inverse-surface':'#2d3133',
    '--color-on-tertiary-fixed':'#001b3e',
    '--color-surface-tint':'#2a5ea7',
    '--color-tertiary-fixed':'#d6e3ff',
    '--color-tertiary-fixed-dim':'#aac7ff',
    '--color-error-container':'#ffdad6',
    '--color-on-tertiary':'#ffffff',
    '--color-surface-container-low':'#f2f4f7',
    '--color-on-secondary-fixed-variant':'#81233f',
    '--color-on-primary':'#ffffff',

    '--spacing-gutter-mobile':'1rem',
    '--spacing-space-sm':'0.5rem',
    '--spacing-space-lg':'1.5rem',
    '--spacing-gutter':'1.5rem',
    '--spacing-margin-mobile':'1.25rem',
    '--spacing-space-md':'1rem',
    '--spacing-space-xl':'2rem',
    '--spacing-margin':'2rem',
    '--spacing-margin-desktop':'5rem',
    '--spacing-space-xs':'0.25rem',

    '--text-label-md':'13px',
    '--text-headline-md':'24px',
    '--text-caption':'12px',
    '--text-display-hero':'48px',
    '--text-display-hero-mobile':'32px',
    '--text-headline-lg-mobile':'26px',
    '--text-body-md-semibold':'14px',
    '--text-body-md':'14px',
    '--text-headline-lg':'32px',
    '--text-body-lg':'16px',
    '--text-title-md':'18px',
    '--text-headline-sm':'20px',
    '--text-label-badge':'11px',
    
    '--font-label-md':'Inter',
    '--font-headline-md':'Plus Jakarta Sans',
    '--font-caption':'Inter',
    '--font-display-hero':'Plus Jakarta Sans',
    '--font-display-hero-mobile':'Plus Jakarta Sans',
    '--font-headline-lg-mobile':'Plus Jakarta Sans',
    '--font-body-md-semibold':'Inter',
    '--font-body-md':'Inter',
    '--font-headline-lg':'Plus Jakarta Sans',
    '--font-body-lg':'Inter',
    '--font-title-md':'Plus Jakarta Sans',
    '--font-headline-sm':'Plus Jakarta Sans',
    '--font-label-badge':'Plus Jakarta Sans'
  } as React.CSSProperties;

  return (
    <div style={inlineTheme} className="font-body-md text-on-surface antialiased">
      ${jsx}
    </div>
  )
}
\`;

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', finalComponent);
