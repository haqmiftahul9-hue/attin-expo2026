/**
 * Logo resmi ATTIN EXPO XII dalam bentuk inline SVG (identik dengan desain).
 */
export default function BrandLogo({ className = 'h-11 w-auto' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 280 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ATTIN EXPO XII 2026 - Sumatera Barat">
      <g transform="translate(6, 6)">
        <rect fill="#124E96" height="52" rx="14" width="52" x="0" y="0" />
        <path
          d="M26 10 L30 18 L39 19 L33 26 L35 35 L26 31 L17 35 L19 26 L13 19 L22 18 Z"
          fill="#FFFFFF"
          fillOpacity="0.2"
        />
        <path d="M26 14 C22 20 18 24 16 34 C21 32 24 35 26 38 C28 35 31 32 36 34 C34 24 30 20 26 14 Z" fill="#FFFFFF" />
        <circle cx="26" cy="24" fill="#7B1E3A" r="3.5" />
        <path d="M22 38 Q26 42 30 38" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2.5" />
      </g>
      <text
        fill="#0A2F5E"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="0.5"
        x="70"
        y="30"
      >
        ATTIN EXPO <tspan fill="#7B1E3A">XII</tspan>
      </text>
      <text
        fill="#5B6475"
        fontFamily="'Inter', sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="1.8"
        x="70"
        y="46"
      >
        2026 • SUMATERA BARAT
      </text>
    </svg>
  )
}