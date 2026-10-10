const fs = require('fs');

const width = 1440;
const height = 1000;
const stroke = '#002B49'; // dark blue
const strokeOpacity = 0.7; // requested 70% opacity
const strokeWidth = 1; // elegant and thin

let paths = '';
const numLines = 25;
const spacing = 12;

for (let i = 0; i < numLines; i++) {
  const yOffset = 150 + (i * spacing);
  const y1 = yOffset - 180 + (i * 10);
  const y2 = yOffset + 180 - (i * 10);
  const y3 = yOffset - 80 + (i * 5);
  paths += `    <path d="M-100,${yOffset} C300,${y1} 800,${y2} 1600,${y3}" />\n`;
}

for (let i = 0; i < numLines; i++) {
  const yOffset = 650 + (i * spacing);
  const y1 = yOffset + 180 - (i * 10);
  const y2 = yOffset - 180 + (i * 10);
  const y3 = yOffset + 80 - (i * 5);
  paths += `    <path d="M-100,${yOffset} C400,${y1} 1000,${y2} 1600,${y3}" />\n`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
  <!-- Apply a very subtle blur to make it feel more integrated into the background like professional platforms -->
  <defs>
    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" />
    </filter>
  </defs>
  <g fill="none" stroke="${stroke}" stroke-opacity="${strokeOpacity}" stroke-width="${strokeWidth}" filter="url(#soft-glow)">
${paths}
  </g>
</svg>`;

fs.writeFileSync('public/assets/elegant-waves.svg', svg);

