import { Link } from 'react-router-dom'
import MaterialIcon from '../MaterialIcon.jsx'

export default function Breadcrumb({ current }) {
  return (
    <div className="w-full bg-surface-container-low py-3 px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto flex items-center gap-2 text-label-md font-label-md text-on-surface-variant"
      >
        <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
          <MaterialIcon name="home" className="text-[16px]" />
          <span>Beranda</span>
        </Link>
        <MaterialIcon name="chevron_right" className="text-[14px] text-outline" />
        <Link className="hover:text-primary transition-colors" to="/#kompetisi-resmi">
          Kompetisi
        </Link>
        <MaterialIcon name="chevron_right" className="text-[14px] text-outline" />
        <span aria-current="page" className="text-primary font-body-md-semibold font-semibold">
          {current}
        </span>
      </nav>
    </div>
  )
}