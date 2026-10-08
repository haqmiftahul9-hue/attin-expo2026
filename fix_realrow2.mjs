import fs from 'fs';

let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// Replace RealRow completely
content = content.replace(
  /function RealRow\(\{[\s\S]*?<\/button>\s*<\/div>\s*<\/td>\s*<\/tr>\s*\)/,
  `function RealRow({ row, onVerify, onView }: { row: RegistrationRow, onVerify: (id: string) => void, onView: (row: RegistrationRow) => void }) {
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
            <button onClick={() => onVerify(row.registration_code)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#16825D] hover:bg-[#ECFDF5] transition-colors" title="Verifikasi Pendaftaran">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </button>
          )}
        </div>
      </td>
    </tr>
  )`
);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
