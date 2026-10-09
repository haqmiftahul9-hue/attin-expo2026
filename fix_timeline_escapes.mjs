import fs from 'fs';
let content = fs.readFileSync('src/sections/TimelineSection.jsx', 'utf-8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');
fs.writeFileSync('src/sections/TimelineSection.jsx', content);
