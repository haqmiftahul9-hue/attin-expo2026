import fs from 'fs';
let content = fs.readFileSync('src/components/registration/RegistrationForm.tsx', 'utf-8');

content = content.replace(
  /finalParticipantName = `Putra: \$\{pa\} \| Putri: \$\{pi\}`/,
  `const parts = []
        if (pa) parts.push(\`Putra: \$\{pa\}\`)
        if (pi) parts.push(\`Putri: \$\{pi\}\`)
        finalParticipantName = parts.join(' | ')`
);

fs.writeFileSync('src/components/registration/RegistrationForm.tsx', content);
