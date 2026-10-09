import fs from 'fs';

// ---------------------------------------------------------
// 1. RegistrationSummary.tsx
// ---------------------------------------------------------
let summary = fs.readFileSync('src/components/registration/RegistrationSummary.tsx', 'utf-8');

// Remove kabupaten check
summary = summary.replace(
  /const isBioDone = isTahfizh \n    \? hasText\('nama_pa'\) && hasText\('nama_pi'\) && hasText\('nama_sekolah'\) && hasText\('kabupaten_kota'\)\n    : hasText\('nama_lengkap'\) && hasText\('nama_sekolah'\) && hasText\('kabupaten_kota'\)/,
  `const isBioDone = isTahfizh 
    ? (hasText('nama_pa') || hasText('nama_pi')) && hasText('nama_sekolah')
    : hasText('nama_lengkap') && hasText('nama_sekolah')`
);

// Remove Kabupaten SummaryRow
summary = summary.replace(/<SummaryRow label="Kabupaten \/ Kota" value=\{city\} \/>/, '');
summary = summary.replace(/const city = valueFor\('kabupaten_kota'\) \|\| '-- Belum Dipilih --'/, '');

// Remove red text (feeNote)
summary = summary.replace(/<div className="text-xs text-secondary mt-2 flex items-start gap-1\.5 font-medium">[\s\S]*?<\/div>/, '');

fs.writeFileSync('src/components/registration/RegistrationSummary.tsx', summary);

// ---------------------------------------------------------
// 2. RegistrationStepper.tsx
// ---------------------------------------------------------
let stepper = fs.readFileSync('src/components/registration/RegistrationStepper.tsx', 'utf-8');

stepper = stepper.replace(
  /const CIRCLE_CLASSES = \{\n  done: 'bg-primary text-on-primary shadow-sm',\n  active: 'bg-primary-container text-on-primary',\n  pending: 'bg-surface-container-high text-on-surface-variant',\n\} as const/,
  `const CIRCLE_CLASSES = {
  done: 'bg-[#003772] text-[#ffffff] shadow-sm',
  active: 'bg-[#d6e3ff] text-[#003772] ring-2 ring-[#003772]',
  pending: 'bg-[#e0e3e6] text-[#424751]',
} as const`
);

stepper = stepper.replace(
  /const LABEL_CLASSES = \{\n  done: 'text-primary',\n  active: 'text-primary-container',\n  pending: 'text-outline',\n\} as const/,
  `const LABEL_CLASSES = {
  done: 'text-[#003772] font-bold',
  active: 'text-[#003772] font-bold',
  pending: 'text-[#737782]',
} as const`
);

stepper = stepper.replace(
  /const TITLE_CLASSES = \{\n  done: 'text-on-surface font-body-md-semibold',\n  active: 'text-on-surface font-body-md-semibold',\n  pending: 'text-on-surface-variant',\n\} as const/,
  `const TITLE_CLASSES = {
  done: 'text-[#191c1e] font-bold',
  active: 'text-[#191c1e] font-bold',
  pending: 'text-[#737782]',
} as const`
);

fs.writeFileSync('src/components/registration/RegistrationStepper.tsx', stepper);

// ---------------------------------------------------------
// 3. home.js - deadline
// ---------------------------------------------------------
let homeData = fs.readFileSync('src/data/home.js', 'utf-8');
homeData = homeData.replace(/\$\{placeholders\.date\}/g, '18 November 2026');
fs.writeFileSync('src/data/home.js', homeData);

// ---------------------------------------------------------
// 4. CompetitionSection.tsx - Lomba terkunci
// ---------------------------------------------------------
let comp = fs.readFileSync('src/components/registration/CompetitionSection.tsx', 'utf-8');

// Remove required badge
comp = comp.replace(/<span className=\{requiredBadgeClassName\}>Terkunci<\/span>/, '');

// Change caption
comp = comp.replace(/Cabang lomba sudah ditentukan oleh halaman ini dan tidak dapat diubah\./, 'Silakan lengkapi formulir pendaftaran untuk cabang lomba ini.');

// Remove lock icon and text
comp = comp.replace(/<span className="inline-flex items-center gap-1 font-label-badge text-label-badge text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full uppercase">\s*<Icon className="text-\[14px\]" name="lock" \/>\s*Lomba terkunci\s*<\/span>/, '');

fs.writeFileSync('src/components/registration/CompetitionSection.tsx', comp);
