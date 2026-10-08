import fs from 'fs';

let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// Add the import
if (!content.includes('updateRegistrationStatus')) {
  content = content.replace("import { getAllRegistrations }", "import { getAllRegistrations, updateRegistrationStatus }");
}

// Modify RealRow signature
content = content.replace(
  /function RealRow\(\{ row \}: \{ row: RegistrationRow \}\) \{/,
  "function RealRow({ row, onVerify, onView }: { row: RegistrationRow, onVerify: (id: string) => void, onView: (row: RegistrationRow) => void }) {"
);

// Modify RealRow buttons
content = content.replace(
  /<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Berkas">[\s\S]*?<span className="material-symbols-outlined text-\[18px\]">visibility<\/span>[\s\S]*?<\/button>\s*<button className="w-8 h-8 rounded-lg flex items-center justify-center text-\[#16825D\] hover:bg-\[#ECFDF5\] transition-colors" title="Verifikasi Lolos">[\s\S]*?<span className="material-symbols-outlined text-\[18px\]">check_circle<\/span>[\s\S]*?<\/button>/,
  `<button onClick={() => onView(row)} className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container transition-colors" title="Lihat Data Pendaftar">
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
            )}`
);

// Inject modal state and handlers into AdminDashboard
content = content.replace(
  /export default function AdminDashboard\(\) \{[\s\S]*?const \[registrations, setRegistrations\] = useState<RegistrationRow\[\]>\(\[\]\)/,
  `export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState<RegistrationRow[]>([])
    const [selectedRow, setSelectedRow] = useState<RegistrationRow | null>(null)

    const handleVerify = async (code: string) => {
      if(confirm('Apakah Anda yakin ingin memverifikasi pendaftaran ini secara manual?')) {
        const success = await updateRegistrationStatus(code, 'verified');
        if(success) {
          setRegistrations(prev => prev.map(r => r.registration_code === code ? { ...r, registration_status: 'verified', payment_status: 'verified' } : r));
        }
      }
    }
`
);

// Provide handlers to RealRow
content = content.replace(
  /<RealRow row=\{row\} key=\{row\.registration_code\} \/>/g,
  "<RealRow row={row} key={row.registration_code} onVerify={handleVerify} onView={setSelectedRow} />"
);

// Add the modal at the end before final </div>
const modalHTML = `
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
              <p><strong>Utusan:</strong> {selectedRow.city || '-'}</p>
              <p><strong>Kategori Lomba:</strong> {registrationConfigs[selectedRow.competition_slug]?.name || selectedRow.competition_slug} {(selectedRow.specific_data && Object.values(selectedRow.specific_data)[0]) || ''}</p>
              <p><strong>Status:</strong> {selectedRow.registration_status === 'verified' ? 'Terverifikasi' : 'Menunggu'}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedRow(null)} className="px-4 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg font-medium text-on-surface transition-colors">Tutup</button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(/<\/div>\s*<\/div>\s*\)\s*\}/, modalHTML + '\n      </div>\n    </div>\n  )\n}');

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
