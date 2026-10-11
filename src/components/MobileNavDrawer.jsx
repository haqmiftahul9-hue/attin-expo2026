import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MaterialIcon from './MaterialIcon.jsx'

/**
 * Navigasi mobile bersama untuk header publik (Beranda, Pendaftaran, Detail Lomba).
 * Tombol hamburger hanya tampil di bawah breakpoint yang dipilih; drawer
 * berpindah dari kanan dengan overlay, menutup via Escape/overlay/klik item,
 * serta mengunci scroll halaman selama terbuka.
 *
 * Item mendukung dua bentuk:
 *   { label: 'Beranda', href: '#beranda' }  -> anchor dalam halaman
 *   { label: 'Beranda', to: '/' }          -> rute React Router
 * CTA opsional ditampilkan sebagai tombol penuh di dasar drawer.
 *
 * @param {Object} props
 * @param {Array<{ key?: string; label: string; href?: string; to?: string }>} [props.items]
 * @param {string | null} [props.activeKey]
 * @param {'xl' | 'lg'} [props.showBelow]
 * @param {{ label: string; to?: string; href?: string; icon?: string } | null} [props.cta]
 * @param {string} [props.title]
 */
export default function MobileNavDrawer({
  items = [],
  activeKey = null,
  showBelow = 'xl',
  cta = null,
  title = 'Navigasi',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef(null)

  // Tutup otomatis saat viewport melewati breakpoint (mis. perangkat diputar)
  useEffect(() => {
    if (!isOpen) return
    const breakpoint = showBelow === 'lg' ? 1024 : 1280
    const onResize = () => {
      if (window.innerWidth >= breakpoint) setIsOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isOpen, showBelow])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus()
  }, [isOpen])

  const triggerHiddenClass = showBelow === 'lg' ? 'lg:hidden' : 'xl:hidden'
  const drawerHiddenClass = showBelow === 'lg' ? 'lg:hidden' : 'xl:hidden'

  const itemClass = (isActive) =>
    [
      'flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors',
      isActive
        ? 'bg-primary-container text-on-primary-container'
        : 'text-[#0F172A] hover:bg-slate-50 active:bg-slate-100',
    ].join(' ')

  const renderItem = (item) => {
    const isActive = Boolean(activeKey && item.key === activeKey)
    const content = (
      <>
        <span>{item.label}</span>
        {isActive ? (
          <MaterialIcon className="text-[18px] text-primary" name="check_circle" />
        ) : (
          <MaterialIcon className="text-[18px] text-slate-300" name="chevron_right" />
        )}
      </>
    )

    if (item.to) {
      return (
        <Link
          key={item.label}
          className={itemClass(isActive)}
          onClick={() => setIsOpen(false)}
          to={item.to}
        >
          {content}
        </Link>
      )
    }

    return (
      <a
        key={item.label}
        className={itemClass(isActive)}
        href={item.href}
        onClick={() => setIsOpen(false)}
      >
        {content}
      </a>
    )
  }

  return (
    <>
      <button
        aria-controls="mobile-nav-drawer"
        aria-expanded={isOpen}
        aria-label="Buka navigasi"
        className={`${triggerHiddenClass} w-11 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center transition-colors shrink-0`}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <MaterialIcon className="text-[#002B49] text-[24px]" name="menu" />
      </button>

      {isOpen ? (
        <div className={`${drawerHiddenClass} fixed inset-0 z-[60]`} id="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label={title}>
          <div
            className="absolute inset-0 bg-[#061B33]/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-white shadow-[0_8px_40px_rgba(6,27,51,0.25)] flex flex-col pt-safe pb-safe">
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 shrink-0">
              <span className="font-display font-extrabold text-[17px] text-[#061B33] tracking-tight">
                {title}
              </span>
              <button
                aria-label="Tutup navigasi"
                className="w-11 h-11 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                onClick={() => setIsOpen(false)}
                ref={closeButtonRef}
                type="button"
              >
                <MaterialIcon className="text-[24px]" name="close" />
              </button>
            </div>

            <nav aria-label="Navigasi mobile" className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-1">{items.map(renderItem)}</div>
            </nav>

            {cta ? (
              <div className="px-4 pb-6 pt-2 border-t border-slate-100 shrink-0">
                {cta.to ? (
                  <Link
                    className="w-full h-12 inline-flex items-center justify-center gap-2 bg-[#002B49] hover:bg-[#003B66] active:bg-[#061B33] text-white font-bold text-[15px] rounded-xl shadow-sm transition-colors"
                    onClick={() => setIsOpen(false)}
                    to={cta.to}
                  >
                    {cta.icon ? <MaterialIcon className="text-[20px]" name={cta.icon} /> : null}
                    <span>{cta.label}</span>
                  </Link>
                ) : (
                  <a
                    className="w-full h-12 inline-flex items-center justify-center gap-2 bg-[#002B49] hover:bg-[#003B66] active:bg-[#061B33] text-white font-bold text-[15px] rounded-xl shadow-sm transition-colors"
                    href={cta.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {cta.icon ? <MaterialIcon className="text-[20px]" name={cta.icon} /> : null}
                    <span>{cta.label}</span>
                  </a>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
