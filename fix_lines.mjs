import fs from 'fs';
let lines = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8').split('\n');

// Find line 99 which has }
if (lines[98].trim() === '}') {
  lines.splice(98, 1);
}

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', lines.join('\n'));
