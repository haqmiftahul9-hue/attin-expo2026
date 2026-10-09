import fs from 'fs';

let form = fs.readFileSync('src/components/registration/RegistrationForm.tsx', 'utf-8');
form = form.replace(/city: null,/, "city: '',");
fs.writeFileSync('src/components/registration/RegistrationForm.tsx', form);

let school = fs.readFileSync('src/components/registration/SchoolSection.tsx', 'utf-8');
school = school.replace(/import Icon from '\.\.\/Icon\.jsx'\n/, '');
fs.writeFileSync('src/components/registration/SchoolSection.tsx', school);
