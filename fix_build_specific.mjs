import fs from 'fs';
let content = fs.readFileSync('src/lib/registrationValidation.ts', 'utf-8');
content = content.replace(/if \(typeof values\.detail_tambahan === 'string' && values\.detail_tambahan\.trim\(\) !== ''\) \{\s*specificData\.detail_tambahan = values\.detail_tambahan\.trim\(\)\s*\}/, '');
fs.writeFileSync('src/lib/registrationValidation.ts', content);
