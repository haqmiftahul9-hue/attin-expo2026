/**
 * Motif oktagram (bintang delapan) garis tunggal sebagai tekstur aksen Islam
 * sesuai panduan "Serambi Prestasi Modern". Digunakan dengan opasitas rendah
 * di atas banner gelap.
 */
export default function OctagramPattern({ className = '', strokeWidth = 2 }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      viewBox="0 0 200 200"
    >
      <rect x="30" y="30" width="140" height="140" />
      <rect x="70" y="8" width="140" height="140" />
      <rect x="70" y="52" width="140" height="140" />
      <rect x="-10" y="52" width="140" height="140" />
      <rect x="-10" y="8" width="140" height="140" />
      <rect x="12" y="70" width="140" height="140" />
      <rect x="56" y="-32" width="140" height="140" />
      <rect x="56" y="114" width="140" height="140" />
      <rect x="98" y="70" width="140" height="140" />
      <rect x="98" y="114" width="140" height="140" />
    </svg>
  )
}
