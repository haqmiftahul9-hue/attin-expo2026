/**
 * Pembungkus ikon Material Symbols Outlined.
 * Menghasilkan markup identik dengan desain awal:
 * <span class="material-symbols-outlined ...">nama_ikon</span>
 */
export default function MaterialIcon({ name, className = '', ...rest }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} aria-hidden="true" {...rest}>
      {name}
    </span>
  )
}
