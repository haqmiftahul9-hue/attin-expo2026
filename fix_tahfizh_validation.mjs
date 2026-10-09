import fs from 'fs';
let content = fs.readFileSync('src/lib/registrationValidation.ts', 'utf-8');

// Replace Tahfizh validation
content = content.replace(
  /if \(config\.slug === 'tahfizh'\) \{\s*if \(isBlank\(values\.nama_pa\)\) errors\.nama_pa = ERROR_MESSAGES\.required\s*if \(isBlank\(values\.nama_pi\)\) errors\.nama_pi = ERROR_MESSAGES\.required\s*\}/,
  `if (config.slug === 'tahfizh') {
      if (isBlank(values.nama_pa) && isBlank(values.nama_pi)) {
        errors.nama_pa = 'Harap isi minimal salah satu utusan (Putra/Putri).'
        errors.nama_pi = 'Harap isi minimal salah satu utusan (Putra/Putri).'
      }
    }`
);

fs.writeFileSync('src/lib/registrationValidation.ts', content);
