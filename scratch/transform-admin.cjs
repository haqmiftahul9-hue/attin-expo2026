const fs = require('fs');
const path = require('path');

const replacements = {
  'bg-surface-container-lowest': 'bg-white border-border-subtle border',
  'bg-surface-container-low': 'bg-slate-50',
  'bg-surface-container-high': 'bg-slate-100',
  'bg-surface-container': 'bg-slate-100',
  'bg-surface': 'bg-white',
  'text-on-surface-variant': 'text-slate-500',
  'text-on-surface': 'text-foreground',
  'text-outline': 'text-slate-400',
  'bg-primary-fixed-dim': 'bg-primary/20',
  'bg-primary-fixed': 'bg-primary/10',
  'bg-secondary-fixed': 'bg-secondary/10',
  'bg-tertiary-container': 'bg-tertiary text-white',
  'text-tertiary-container': 'text-tertiary',
  'text-on-primary': 'text-white',
  'bg-primary-container': 'bg-primary text-white',
  'font-display-hero-mobile': 'text-3xl',
  'text-display-hero-mobile': 'text-3xl',
  'font-headline-md': 'text-2xl font-bold',
  'text-headline-md': 'text-2xl font-bold',
  'font-headline-sm': 'text-xl font-bold',
  'text-headline-sm': 'text-xl font-bold',
  'font-title-md': 'text-lg font-bold',
  'text-title-md': 'text-lg font-bold',
  'font-body-md-semibold': 'text-sm font-semibold',
  'text-body-md-semibold': 'text-sm font-semibold',
  'font-body-md': 'text-sm font-medium',
  'text-body-md': 'text-sm font-medium',
  'font-label-badge': 'text-[10px] uppercase tracking-widest font-bold',
  'text-label-badge': 'text-[10px] uppercase tracking-widest font-bold',
  'font-caption': 'text-xs',
  'text-caption': 'text-xs',
  'gap-space-lg': 'gap-8',
  'gap-space-md': 'gap-4',
  'gap-space-sm': 'gap-2',
  'gap-space-xs': 'gap-1',
  'p-space-lg': 'p-6', 'px-space-lg': 'px-6', 'py-space-lg': 'py-6',
  'p-space-md': 'p-4', 'px-space-md': 'px-4', 'py-space-md': 'py-4',
  'p-space-sm': 'p-3', 'px-space-sm': 'px-3', 'py-space-sm': 'py-3',
  'mb-space-lg': 'mb-8', 'mb-space-md': 'mb-4', 'mb-space-sm': 'mb-2', 'mb-space-xs': 'mb-1',
  'mt-space-lg': 'mt-8', 'mt-space-md': 'mt-4', 'mt-space-sm': 'mt-2', 'mt-space-xs': 'mt-1',
  'shadow-sm': 'shadow-premium',
};

const files = [
  'src/pages/admin/AdminDashboard.tsx',
  'src/pages/admin/AdminRekapitulasi.tsx',
  'src/pages/admin/AdminLogin.jsx',
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
    // replace as whole word match or replace all
    content = content.split(key).join(value);
  }
  // cleanup duplicate classes
  content = content.replace(/text-3xl text-3xl/g, 'text-3xl');
  content = content.replace(/text-2xl font-bold text-2xl font-bold/g, 'text-2xl font-bold');
  content = content.replace(/text-xl font-bold text-xl font-bold/g, 'text-xl font-bold');
  content = content.replace(/text-lg font-bold text-lg font-bold/g, 'text-lg font-bold');
  content = content.replace(/text-sm font-semibold text-sm font-semibold/g, 'text-sm font-semibold');
  content = content.replace(/text-sm font-medium text-sm font-medium/g, 'text-sm font-medium');
  content = content.replace(/text-\[10px\] uppercase tracking-widest font-bold text-\[10px\] uppercase tracking-widest font-bold/g, 'text-[10px] uppercase tracking-widest font-bold');
  content = content.replace(/text-xs text-xs/g, 'text-xs');
  content = content.replace(/font-bold font-bold/g, 'font-bold');

  fs.writeFileSync(filePath, content);
  console.log('Processed', file);
}

