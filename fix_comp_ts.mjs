import fs from 'fs';
let comp = fs.readFileSync('src/components/registration/CompetitionSection.tsx', 'utf-8');
comp = comp.replace(/requiredBadgeClassName,\n/, '');
fs.writeFileSync('src/components/registration/CompetitionSection.tsx', comp);
