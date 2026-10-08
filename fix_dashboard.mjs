import fs from 'fs';

let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// Replace the incorrect dynamic one in DummyRows back to static
content = content.replace(
  /\{row\.registration_status === 'verified' \? \([\s\S]*?Menunggu Verifikasi\s*<\/span>\s*\)\s*\}/,
  '<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#C98316]">Menunggu Verifikasi</span>'
);

// Now locate the one in RealRow. The function RealRow has `Menunggu Verifikasi` inside it.
content = content.replace(
  /function RealRow\(\{ row \}: \{ row: RegistrationRow \}\) \{[\s\S]*?<\/button>\s*<\/div>\s*<\/td>\s*<\/tr>\s*\)/,
  (match) => {
    return match.replace(
      /<span className="inline-flex items-center px-2\.5 py-0\.5 rounded-full text-\[11px\] font-bold uppercase tracking-wider bg-\[#FFFBEB\] text-\[#C98316\]">\s*Menunggu Verifikasi\s*<\/span>/,
      `{row.registration_status === 'verified' ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#16825D]">
            Terverifikasi
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#C98316]">
            Menunggu Verifikasi
          </span>
        )}`
    );
  }
);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
