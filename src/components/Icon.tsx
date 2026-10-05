import MaterialIcon from './MaterialIcon.jsx'

/** Pembungkus TypeScript untuk ikon Material Symbols Outlined. */
export default function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <MaterialIcon className={className} name={name} />
}
