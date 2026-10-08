import fs from 'fs';

let html = fs.readFileSync('admin_dashboard_attin_expo_xii_2026/code.html', 'utf-8');

// Find the <main> block precisely
let mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
let mainContent = mainMatch ? mainMatch[1] : '';

// Remove script block from mainContent
mainContent = mainContent.replace(/<script>[\s\S]*?<\/script>/, '');

// Convert class to className
let jsx = mainContent.replace(/class="/g, 'className="');

// Fix styles
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

// Fix self closing
jsx = jsx.replace(/<input([^>]*[^/])>/g, '<input$1 />');
jsx = jsx.replace(/<img([^>]*[^/])>/g, '<img$1 />');

// Remove comments
jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

// Fix svg properties
jsx = jsx.replace(/viewbox/g, 'viewBox');
jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
jsx = jsx.replace(/stroke-dasharray/g, 'strokeDasharray');

// Link replacements
jsx = jsx.replace(/href="#"/g, 'href="/admin"');

// Fix unescaped single quote
jsx = jsx.replace(/Qurrata A'yun/g, 'Qurrata A{"\'"}yun');

// Replace table body
jsx = jsx.replace(/<tbody[^>]*>[\s\S]*?<\/tbody>/, `
                <tbody className="font-body-md text-body-md text-on-surface" id="pendaftarTableBody">
                  {registrations.length === 0 ? (
                    <DummyRows />
                  ) : (
                    filteredRegistrations.map((row) => (
                      <RealRow row={row} key={row.registration_code} />
                    ))
                  )}
                </tbody>
`);

// Wrap with outer div padding
jsx = `
    <div className="w-full pt-6 md:pt-8 px-4 md:px-8 pb-12">
      ${jsx}
    </div>
`;

// Build final component
const finalComponent = `import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site.js'
import { getAllRegistrations } from '../../lib/registrationsRepository.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import type { RegistrationRow } from '../../types/registration.js'
import { registrationConfigs } from '../../config/registrationConfigs.js'
import MaterialIcon from '../../components/MaterialIcon.jsx'

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

  return (
    ${jsx}
  )
}
`

// Fix disabled syntax
const finalSource = finalComponent.replace(/disabled=""/g, 'disabled');

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', finalSource);
