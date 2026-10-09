import fs from 'fs';
let content = fs.readFileSync('src/lib/registrationDraft.ts', 'utf-8');
content = content.replace(/const PREFIX = 'attin:registration-draft:'/, "const PREFIX = 'attin:registration-draft-v2:'");
fs.writeFileSync('src/lib/registrationDraft.ts', content);
