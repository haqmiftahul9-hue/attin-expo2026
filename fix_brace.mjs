import fs from 'fs';
let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');
content = content.replace(/alert\('Gagal memverifikasi pendaftaran\.'\);\n\s*\}\n\s*\}\n\s*\}/g, "alert('Gagal memverifikasi pendaftaran.');\n        }\n      }");
fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
