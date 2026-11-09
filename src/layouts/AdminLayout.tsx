import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import MaterialIcon from '../components/MaterialIcon.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { useAuth } from '../App.jsx'

export const adminInlineTheme = {
  '--color-secondary-fixed-dim':'#ffb1c0',
  '--color-surface-container':'#eceef1',
  '--color-surface-container-highest':'#e0e3e6',
  '--color-surface-container-high':'#e6e8eb',
  '--color-secondary':'#a03b56',
  '--color-on-error-container':'#93000a',
  '--color-outline':'#737782',
  '--color-on-tertiary-fixed-variant':'#284777',
  '--color-surface':'#f7f9fc',
  '--color-inverse-primary':'#aac7ff',
  '--color-on-primary-fixed':'#001b3e',
  '--color-on-primary-fixed-variant':'#00468d',
  '--color-on-background':'#191c1e',
  '--color-on-surface-variant':'#424751',
  '--color-on-primary-container':'#a0c2ff',
  '--color-on-secondary-container':'#771b37',
  '--color-on-tertiary-container':'#a5c2fa',
  '--color-tertiary-container':'#314f80',
  '--color-outline-variant':'#c2c6d2',
  '--color-error':'#ba1a1a',
  '--color-tertiary':'#173867',
  '--color-primary-fixed':'#d6e3ff',
  '--color-surface-container-lowest':'#ffffff',
  '--color-background':'#f7f9fc',
  '--color-surface-dim':'#d8dadd',
  '--color-inverse-on-surface':'#eff1f4',
  '--color-on-secondary':'#ffffff',
  '--color-surface-bright':'#f7f9fc',
  '--color-on-error':'#ffffff',
  '--color-secondary-container':'#ff86a1',
  '--color-secondary-fixed':'#ffd9df',
  '--color-primary-fixed-dim':'#aac7ff',
  '--color-primary':'#003772',
  '--color-on-secondary-fixed':'#3f0016',
  '--color-on-surface':'#191c1e',
  '--color-primary-container':'#124e96',
  '--color-surface-variant':'#e0e3e6',
  '--color-inverse-surface':'#2d3133',
  '--color-on-tertiary-fixed':'#001b3e',
  '--color-surface-tint':'#2a5ea7',
  '--color-tertiary-fixed':'#d6e3ff',
  '--color-tertiary-fixed-dim':'#aac7ff',
  '--color-error-container':'#ffdad6',
  '--color-on-tertiary':'#ffffff',
  '--color-surface-container-low':'#f2f4f7',
  '--color-on-secondary-fixed-variant':'#81233f',
  '--color-on-primary':'#ffffff',

  '--spacing-gutter-mobile':'1rem',
  '--spacing-space-sm':'0.5rem',
  '--spacing-space-lg':'1.5rem',
  '--spacing-gutter':'1.5rem',
  '--spacing-margin-mobile':'1.25rem',
  '--spacing-space-md':'1rem',
  '--spacing-space-xl':'2rem',
  '--spacing-margin':'2rem',
  '--spacing-margin-desktop':'5rem',
  '--spacing-space-xs':'0.25rem',

  '--text-label-md':'13px',
  '--text-headline-md':'24px',
  '--text-caption':'12px',
  '--text-display-hero':'48px',
  '--text-display-hero-mobile':'32px',
  '--text-headline-lg-mobile':'26px',
  '--text-body-md-semibold':'14px',
  '--text-body-md':'14px',
  '--text-headline-lg':'32px',
  '--text-body-lg':'16px',
  '--text-title-md':'18px',
  '--text-headline-sm':'20px',
  '--text-label-badge':'11px',
  
  '--font-label-md':'Inter',
  '--font-headline-md':'Plus Jakarta Sans',
  '--font-caption':'Inter',
  '--font-display-hero':'Plus Jakarta Sans',
  '--font-display-hero-mobile':'Plus Jakarta Sans',
  '--font-headline-lg-mobile':'Plus Jakarta Sans',
  '--font-body-md-semibold':'Inter',
  '--font-body-md':'Inter',
  '--font-headline-lg':'Plus Jakarta Sans',
  '--font-body-lg':'Inter',
  '--font-title-md':'Plus Jakarta Sans',
  '--font-headline-sm':'Plus Jakarta Sans',
  '--font-label-badge':'Plus Jakarta Sans'
} as React.CSSProperties

const NAV_LINKS = [
  { path: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { path: '/admin/pendaftaran', label: 'Pendaftaran', icon: 'summarize' },
]

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { logout } = useAuth()
  const location = useLocation()
  usePageTitle('Admin Panel - ATTIN EXPO XII 2026')

  return (
    <div style={adminInlineTheme} className="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)] antialiased [font-family:var(--font-body-md),Inter,sans-serif]">
      <div className="flex min-h-screen w-full">
        {isMobileMenuOpen && (
          <button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-[2px] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-transform duration-200 ease-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex h-[72px] items-center gap-3 border-b border-[var(--color-surface-container)] px-5 shrink-0">
            <img src="/assets/logo-attin-expo.png" alt="ATTIN EXPO XII" className="h-10 w-auto object-contain shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold leading-tight text-[var(--color-primary)] [font-family:var(--font-headline-sm),Plus_Jakarta_Sans,sans-serif]">ATTIN EXPO XII</p>
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">Panel Panitia</p>
            </div>
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-[var(--color-surface-container-low)]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Tutup menu navigasi"
            >
              <MaterialIcon name="close" className="text-[20px]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-5 rounded-xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-low)]/60 px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                  <MaterialIcon name="person" className="text-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-[var(--color-on-surface)]">Super Admin Panitia</p>
                  <p className="truncate text-[11px] font-medium text-[var(--color-on-surface-variant)]">Panitia Inti</p>
                </div>
              </div>
            </div>

            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 [font-family:var(--font-label-badge),Plus_Jakarta_Sans,sans-serif]">Navigasi</p>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white shadow-[0_1px_2px_rgba(0,55,114,0.25)]'
                        : 'text-slate-600 hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-primary)]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <MaterialIcon name={link.icon} className={`text-[20px] ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[var(--color-primary)]'}`} />
                      <span className="truncate">{link.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="border-t border-[var(--color-surface-container)] p-3 shrink-0">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium text-[var(--color-error)] transition-colors hover:bg-[var(--color-error-container)]/60"
            >
              <MaterialIcon name="logout" className="text-[20px]" />
              <span>Keluar Sistem</span>
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-3 border-b border-[var(--color-surface-container-high)]/80 bg-[var(--color-surface-container-lowest)]/92 px-4 backdrop-blur-md sm:px-6 lg:px-8 shrink-0">
            <div className="flex min-w-0 items-center gap-3">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-surface-container-high)] bg-white text-slate-600 hover:bg-[var(--color-surface-container-low)] md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Buka menu navigasi admin"
              >
                <MaterialIcon name="menu" className="text-[22px]" />
              </button>
              <div className="hidden min-w-0 sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">ATTIN EXPO XII 2026</p>
                <p className="truncate text-[15px] font-semibold text-[var(--color-on-surface)] [font-family:var(--font-headline-sm),Plus_Jakarta_Sans,sans-serif]">
                  {location.pathname.startsWith('/admin/pendaftaran') ? 'Pendaftaran' : 'Dashboard'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2 rounded-xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-low)]/50 px-3 py-2 text-[12px] text-slate-500">
                <MaterialIcon name="info" className="text-[16px]" />
                <span>Data tersinkronisasi otomatis</span>
              </div>
            </div>
          </header>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}


