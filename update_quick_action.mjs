import fs from 'fs';

let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// 1. Update RealRow signature and button
content = content.replace(
  /function RealRow\(\{ row, onVerify, onView \}: \{ row: RegistrationRow, onVerify: \(id: string\) => void, onView: \(row: RegistrationRow\) => void \}\) \{/,
  `function RealRow({ row, onVerifyPrompt, onView }: { row: RegistrationRow, onVerifyPrompt: (row: RegistrationRow) => void, onView: (row: RegistrationRow) => void }) {`
);

// Modify the old onVerify button
content = content.replace(
  /<button onClick=\{\(\) => onVerify\(row\.registration_code\)\} className="w-8 h-8 rounded-lg flex items-center justify-center text-\[#16825D\] hover:bg-\[#ECFDF5\] transition-colors" title="Verifikasi Pendaftaran">[\s\S]*?<span className="material-symbols-outlined text-\[18px\]">check_circle<\/span>[\s\S]*?<\/button>/,
  `<button onClick={() => onVerifyPrompt(row)} className="h-8 px-3 rounded-lg flex items-center gap-1 text-[#16825D] bg-[#ECFDF5] hover:bg-[#d1f4e0] transition-colors font-medium text-[12px] shadow-sm" title="Verifikasi Pendaftaran">
              <span className="material-symbols-outlined text-[16px]">fact_check</span>
              <span>Verifikasi</span>
            </button>`
);

// 2. Update AdminDashboard state and handleVerify
// Replace the old handleVerify
content = content.replace(
  /const handleVerify = async \(code: string\) => \{[\s\S]*?\}\n\s*\}/,
  `const [verifyRow, setVerifyRow] = useState<RegistrationRow | null>(null)

    const handleVerifySubmit = async (status: 'verified' | 'rejected') => {
      if (!verifyRow) return;
      const success = await updateRegistrationStatus(verifyRow.registration_code, status);
      if(success) {
        setRegistrations(prev => prev.map(r => r.registration_code === verifyRow.registration_code ? { ...r, registration_status: status, payment_status: status === 'verified' ? 'verified' : r.payment_status } : r));
        setVerifyRow(null);
      } else {
        alert('Gagal memverifikasi pendaftaran.');
      }
    }`
);

// 3. Update the map to pass onVerifyPrompt
content = content.replace(
  /<RealRow row=\{row\} key=\{row\.registration_code\} onVerify=\{handleVerify\} onView=\{setSelectedRow\} \/>/g,
  `<RealRow row={row} key={row.registration_code} onVerifyPrompt={setVerifyRow} onView={setSelectedRow} />`
);

// 4. Add the verification modal
const verifyModalHTML = `
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
`;

content = content.replace(/<\/div>\s*<\/div>\s*\)\s*\}\s*$/, verifyModalHTML + '\n      </div>\n    </div>\n  )\n}');

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
