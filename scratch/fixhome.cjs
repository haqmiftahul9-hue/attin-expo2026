const fs = require('fs');
const p = 'src/data/home.js';
let s = fs.readFileSync(p, 'utf8');
const start = s.indexOf("      description: 'Pelaksanaan Pameran");
const end = s.indexOf("      date: site.registration.executionDate", start);
const newDesc = "      description: `Pelaksanaan Pameran dan seluruh cabang perlombaan dilaksanakan secara serentak: Lomba Tahfizh kelas 1-5 (Jum'at, 20 November 2026), Lomba Tahfizh kelas 6 (Sabtu, 21 November 2026), Lomba Kolase (Jum'at, 20 November 2026), Lomba Olimpiade (Jum'at, 20 November 2026), Lomba Panahan (Sabtu, 21 November 2026), Lomba Puisi (Sabtu, 21 November 2026), dan Lomba Futsal (Minggu, 22 November 2026).`,\n";
s = s.slice(0, start) + newDesc + s.slice(end);
fs.writeFileSync(p, s, 'utf8');
console.log('done');
