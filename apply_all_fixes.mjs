import fs from 'fs';

// Helper function to safely replace content
function replaceInFile(filepath, regex, replacement) {
  let content = fs.readFileSync(filepath, 'utf-8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(filepath, content);
}

// ---------------------------------------------------------
// 1. ParticipantSection.tsx
// - Remove 'detail_tambahan'
// - Change Tahfizh helper text
// ---------------------------------------------------------
let partSec = fs.readFileSync('src/components/registration/ParticipantSection.tsx', 'utf-8');
// Remove detail_tambahan block completely
partSec = partSec.replace(/<div className="md:col-span-2">\s*<label className=\{labelClassName\} htmlFor=\{fieldId\('detail_tambahan'\)\}>[\s\S]*?<\/div>/, '');
// Change Tahfizh helper text
partSec = partSec.replace(/Masukkan utusan sekolah \(1 Putra dan 1 Putri\)\./, 'Masukkan nama utusan (boleh 1 Putra saja, 1 Putri saja, atau keduanya).');
fs.writeFileSync('src/components/registration/ParticipantSection.tsx', partSec);

// ---------------------------------------------------------
// 2. SchoolSection.tsx
// - Remove 'kabupaten_kota'
// ---------------------------------------------------------
let schoolSec = fs.readFileSync('src/components/registration/SchoolSection.tsx', 'utf-8');
schoolSec = schoolSec.replace(/<div>\s*<label className=\{labelClassName\} htmlFor=\{fieldId\('kabupaten_kota'\)\}>[\s\S]*?<\/div>/, '');
fs.writeFileSync('src/components/registration/SchoolSection.tsx', schoolSec);

// ---------------------------------------------------------
// 3. RegistrationForm.tsx
// - Remove 'kabupaten_kota' from form mappings
// ---------------------------------------------------------
replaceInFile('src/components/registration/RegistrationForm.tsx', /city: textValue\(form\.values, 'kabupaten_kota'\),/, 'city: null,');

// ---------------------------------------------------------
// 4. RegistrationValidation.ts
// - Remove kabupaten_kota validation
// ---------------------------------------------------------
replaceInFile('src/lib/registrationValidation.ts', /kabupaten_kota: ERROR_MESSAGES\.required,/, '');
replaceInFile('src/lib/registrationValidation.ts', /kabupaten_kota: \{ name: 'kabupaten_kota' \},/, '');
// Since we don't know exactly how COMMON_REQUIRED_FIELDS is defined, let's find it.
// I'll run a replace just in case:
replaceInFile('src/lib/registrationValidation.ts', /\{ name: 'kabupaten_kota' \},/g, '');

// ---------------------------------------------------------
// 5. registrationConfigs.ts
// - Tahfizh: change categoryHelper
// - Pra-TKA: change names, remove categories
// - Panahan: change names (remove Tradisional), remove categories
// ---------------------------------------------------------
let configs = fs.readFileSync('src/config/registrationConfigs.ts', 'utf-8');

// Tahfizh
configs = configs.replace(
  /categoryHelper: 'Utusan wajib 1 putra dan 1 putri per sekolah\.',/,
  "categoryHelper: 'Utusan boleh 1 Putra saja, 1 Putri saja, atau kedua-duanya (1 Putra dan 1 Putri).',"
);

// Pra TKA
configs = configs.replace(/Format Kategori Musabaqah Pra-TKA/g, 'Lomba Pra-TKA');
configs = configs.replace(/Musabaqah Lomba Pra-TKA/ig, 'Lomba Pra-TKA');
configs = configs.replace(
  /categories: \[\s*\{\s*value: 'pra-tka-beregu'[\s\S]*?\]\,/,
  "categories: [],"
);
configs = configs.replace(
  /specificFields: \[\s*\{\s*name: 'kategori_pra_tka'[\s\S]*?\}\s*\]\,/,
  "specificFields: [],"
);

// Panahan
configs = configs.replace(/Panahan Tradisional/g, 'Panahan');
configs = configs.replace(/Lomba Panahan Tradisional/g, 'Lomba Panahan');
configs = configs.replace(
  /categories: \[\s*\{\s*value: 'panahan-u-10-10m'[\s\S]*?\]\,/,
  "categories: [],"
);
configs = configs.replace(
  /specificFields: \[\s*\{\s*name: 'kategori_panahan'[\s\S]*?\}\s*\]\,/,
  "specificFields: [],"
);
// Also replace in data/branchDetail.js
let branchData = fs.readFileSync('src/data/branchDetail.js', 'utf-8');
branchData = branchData.replace(/Panahan Tradisional/g, 'Panahan');
branchData = branchData.replace(/Lomba Panahan Tradisional/g, 'Lomba Panahan');
fs.writeFileSync('src/data/branchDetail.js', branchData);


fs.writeFileSync('src/config/registrationConfigs.ts', configs);


// ---------------------------------------------------------
// 6. RegistrationPage.tsx
// - Change deadline to "18 November 2026"
// ---------------------------------------------------------
replaceInFile('src/pages/registration/RegistrationPage.tsx', /21 Februari 2026/g, '18 November 2026'); // Replace current deadline if exists
replaceInFile('src/pages/registration/RegistrationPage.tsx', /14 Februari 2026/g, '18 November 2026'); // Just in case


// ---------------------------------------------------------
// 7. Change "Biodata Santri" to "Biodata Peserta"
// ---------------------------------------------------------
replaceInFile('src/components/registration/RegistrationStepper.tsx', /Biodata Santri/g, 'Biodata Peserta');
replaceInFile('src/components/registration/DeclarationSection.tsx', /biodata santri/g, 'biodata peserta');

// ---------------------------------------------------------
// 8. Remove "kuota"
// ---------------------------------------------------------
// In Home Data
replaceInFile('src/data/home.js', /,\s*value:\s*site\.registration\.quota\s*,[^}]*\}/, '}'); // Remove from highlight items if possible. I'll just be safe.
let homeData = fs.readFileSync('src/data/home.js', 'utf-8');
homeData = homeData.replace(/\{\s*label:\s*'Kuota Lomba'[^}]*\},/g, '');
homeData = homeData.replace(/,\s*dan pastikan mendaftar sebelum kuota penuh/g, '');
homeData = homeData.replace(/Namun, pendaftaran akan langsung ditutup LEBIH AWAL apabila total kuota maksimal peserta telah terpenuhi\.\s*Oleh karena itu, kami menyarankan Anda untuk mendaftar secepat mungkin\./g, '');
homeData = homeData.replace(/Tentu\. Pihak sekolah diizinkan mengirimkan lebih dari 1 peserta \(tanpa batasan maksimal per sekolah\) selama sisa kuota cabang lomba yang dituju masih tersedia di sistem pendaftaran kami\./g, 'Tentu. Pihak sekolah diizinkan mengirimkan lebih dari 1 peserta (tanpa batasan maksimal per sekolah).');
fs.writeFileSync('src/data/home.js', homeData);

// In Registration Configs / Components
replaceInFile('src/components/registration/CompetitionSection.tsx', /<span className="text-secondary font-label-badge">Kuota: \{config\.quota\}<\/span>/, '');
replaceInFile('src/sections/CompetitionSection.jsx', /<span className="text-secondary font-label-badge uppercase tracking-wider bg-secondary-fixed\/50 px-2\.5 py-1 rounded-full border border-secondary\/20">[\s\S]*?Kuota: \{competition\.quota\}[\s\S]*?<\/span>/, '');
replaceInFile('src/config/registrationConfigs.ts', /Jumlah\/kuota peserta dari masing-masing sekolah tidak dibatasi\./g, '');
replaceInFile('src/sections/CallToActionSection.jsx', /sebelum kuota pendaftaran per cabang/g, 'segera');

// ---------------------------------------------------------
// 9. Remove waiting for verification in RegistrationSuccessPage
// ---------------------------------------------------------
let successPage = fs.readFileSync('src/pages/registration/RegistrationSuccessPage.tsx', 'utf-8');
// Remove the yellow tag
successPage = successPage.replace(/<div className="inline-flex items-center gap-2 px-3 py-1\.5 rounded-full bg-\[#FEF3C7\][\s\S]*?Menunggu Verifikasi<\/span>\s*<\/div>/, '');

// Rewrite steps
successPage = successPage.replace(/Langkah verifikasi pasca penyerahan formulir digital/g, 'Konfirmasi pendaftaran via WhatsApp');

successPage = successPage.replace(
  /<div className="flex flex-col bg-surface rounded-2xl border border-outline-variant\/30 p-5 sm:p-6 w-full shadow-sm hover:shadow-md transition-shadow">[\s\S]*?Verifikasi Administratif & Berkas[\s\S]*?<\/div>\s*<\/div>\s*<div className="relative flex items-start gap-5">[\s\S]*?Pemberitahuan Resmi[\s\S]*?<\/div>\s*<\/div>\s*<div className="relative flex items-start gap-5">[\s\S]*?Unduh Bukti Tanda Terima[\s\S]*?<\/div>/,
  `<div className="flex flex-col bg-surface rounded-2xl border border-outline-variant/30 p-5 sm:p-6 w-full shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-title-md text-title-md text-on-surface font-semibold mb-2">Konfirmasi ke WhatsApp Panitia</span>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Pendaftaran Anda berhasil dicatat. Silakan hubungi WhatsApp panitia untuk mengonfirmasi dan mengirimkan bukti pendaftaran agar proses dapat diselesaikan.
                    </p>
                  </div>`
);
fs.writeFileSync('src/pages/registration/RegistrationSuccessPage.tsx', successPage);

// ---------------------------------------------------------
// 10. Home page Competition Card - remove kontribusi/biaya and change to Sumatera Barat
// ---------------------------------------------------------
let compSec = fs.readFileSync('src/sections/CompetitionSection.jsx', 'utf-8');
// Remove: 
/*
<div className="flex flex-col">
  <span className="font-caption text-caption text-outline mb-1">Kontribusi</span>
  <span className="font-title-md text-title-md text-on-surface-variant font-bold">{competition.fee}</span>
</div>
*/
compSec = compSec.replace(/<div className="flex flex-col">\s*<span className="font-caption text-caption text-outline mb-1">Kontribusi<\/span>\s*<span className="font-title-md text-title-md text-on-surface-variant font-bold">\{competition\.fee\}<\/span>\s*<\/div>/g, '');

// Replace "Se-Nusantara" or "Nasional" or whatever coverage is in the cards with "Sumatera Barat"
// First let's check branchDetail.js for levels
branchData = fs.readFileSync('src/data/branchDetail.js', 'utf-8');
branchData = branchData.replace(/Tingkat Nasional/g, 'Sumatera Barat');
branchData = branchData.replace(/Tingkat Provinsi/g, 'Sumatera Barat');
branchData = branchData.replace(/Nasional/g, 'Sumatera Barat');
fs.writeFileSync('src/data/branchDetail.js', branchData);

// Fix configs level
configs = fs.readFileSync('src/config/registrationConfigs.ts', 'utf-8');
configs = configs.replace(/Nasional/g, 'Sumatera Barat');
fs.writeFileSync('src/config/registrationConfigs.ts', configs);

console.log('Update Complete!');
