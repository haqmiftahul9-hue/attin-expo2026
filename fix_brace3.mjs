import fs from 'fs';
let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');
content = content.replace(/    \}\n    \}\n\n  \n  useEffect\(\(\) => \{/g, "    }\n\n  \n  useEffect(() => {");
fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
