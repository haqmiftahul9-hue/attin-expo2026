import fs from 'fs';

// 1. Types
let types = fs.readFileSync('src/types/registration.ts', 'utf-8');
types = types.replace(/\s*nisn: string/g, '');
fs.writeFileSync('src/types/registration.ts', types);

// 2. Validation
let validation = fs.readFileSync('src/lib/registrationValidation.ts', 'utf-8');
validation = validation.replace(/\s*nisn:\s*'NISN harus 10 digit angka\.',/g, '');
validation = validation.replace(/export function isValidNisn[\s\S]*?\}\n/g, '');
validation = validation.replace(/\s*if\s*\(typeof values\.nisn[\s\S]*?nisn\n\s*\}/g, '');
fs.writeFileSync('src/lib/registrationValidation.ts', validation);

// 3. Form
let form = fs.readFileSync('src/components/registration/RegistrationForm.tsx', 'utf-8');
form = form.replace(/\s*nisn:\s*textValue\(form\.values,\s*'nisn'\),/g, '');
// Change pending to verified
form = form.replace(/registration_status: 'pending',/g, "registration_status: 'verified',");
form = form.replace(/payment_status: 'pending',/g, "payment_status: 'verified',");
fs.writeFileSync('src/components/registration/RegistrationForm.tsx', form);

// 4. Admin Layout Search Bar
let layout = fs.readFileSync('src/layouts/AdminLayout.tsx', 'utf-8');
layout = layout.replace(/Cari data peserta, NISN, atau kode\.\.\./g, "Cari data peserta, asal sekolah, atau kode...");
fs.writeFileSync('src/layouts/AdminLayout.tsx', layout);

// 5. Admin Rekapitulasi (remove NISN column from Excel and from Table if there was any)
let rekap = fs.readFileSync('src/pages/admin/AdminRekapitulasi.tsx', 'utf-8');
rekap = rekap.replace(/\s*'NISN': row\.nisn,/g, '');
fs.writeFileSync('src/pages/admin/AdminRekapitulasi.tsx', rekap);

// 6. Admin Dashboard (remove the string "3 peserta ajukan koreksi NISN" and replace with "3 peserta ajukan koreksi data")
let dash = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');
dash = dash.replace(/koreksi NISN/g, 'koreksi data');

// Fix AdminDashboard status hardcoded logic.
// We need to change the Status Verifikasi column logic in RealRow
dash = dash.replace(/<span className="inline-flex items-center px-2\.5 py-0\.5 rounded-full text-\[11px\] font-bold uppercase tracking-wider bg-\[#FFFBEB\] text-\[#C98316\]">\s*Menunggu Verifikasi\s*<\/span>/, 
`{row.registration_status === 'verified' ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            Terverifikasi
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#C98316]">
            Menunggu Verifikasi
          </span>
        )}`);

// Same for dummy rows status logic just to make them look good. I'll just change the dummy row status to Terverifikasi for all if they want it. Actually dummy rows have various statuses hardcoded (some Terverifikasi, some Menunggu). 
// Wait, the regex above only replaced the FIRST occurrence in RealRow? Yes, there's only one in RealRow because I only put one. The DummyRows have hardcoded ones. Let's make sure it replaced RealRow's status.
fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', dash);

console.log('Cleanup NISN and set pending to verified complete');
