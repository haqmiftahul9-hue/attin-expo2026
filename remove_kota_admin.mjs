import fs from 'fs';

let dash = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// Remove header
dash = dash.replace(/<th className="py-3 px-4 font-bold">Kab \/ Kota<\/th>\s*/, '');

// Remove row mapping
dash = dash.replace(/<td className="py-3\.5 px-4 text-on-surface-variant">\{row\.city \|\| '-'}<\/td>\s*/, '');

// Remove from popup
dash = dash.replace(/<p><strong>Utusan:<\/strong> \{selectedRow\.city \|\| '-'\}<\/p>\s*/, '');

// In DummyRows if it exists
dash = dash.replace(/<td className="py-3\.5 px-4 text-on-surface-variant">Kota Padang<\/td>\s*/g, '');
dash = dash.replace(/<td className="py-3\.5 px-4 text-on-surface-variant">Kota Bukittinggi<\/td>\s*/g, '');

// Update the colSpan of the empty state if there is any
dash = dash.replace(/<td colSpan=\{9\}/, '<td colSpan={8}');

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', dash);


// Rekapitulasi
let rekap = fs.readFileSync('src/pages/admin/AdminRekapitulasi.tsx', 'utf-8');

// Remove from table UI
rekap = rekap.replace(/<th className="py-4 px-4 text-\[12px\] font-bold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Utusan<\/th>\s*/, '');
rekap = rekap.replace(/<td className="py-4 px-4 text-body-md text-on-surface-variant">\{row\.city \|\| '-'}<\/td>\s*/, '');

// Remove from excel
rekap = rekap.replace(/'Utusan \/ Kabupaten': row\.city \|\| '-',\s*/g, '');
rekap = rekap.replace(/'Utusan \/ Kota': row\.city \|\| '-',\s*/g, '');

// Remove from pdf
rekap = rekap.replace(/"Utusan\/Kota"/, '');
rekap = rekap.replace(/, row\.city \|\| '-'/g, '');
rekap = rekap.replace(/, row\.city/g, ''); // just in case

// Fix empty state colspan
rekap = rekap.replace(/<td colSpan=\{8\}/, '<td colSpan={7}');

fs.writeFileSync('src/pages/admin/AdminRekapitulasi.tsx', rekap);
