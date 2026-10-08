import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import MaterialIcon from '../components/MaterialIcon.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

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
  { path: '/admin/rekapitulasi', label: 'Rekapitulasi', icon: 'summarize' },
]

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  usePageTitle('Admin Panel - ATTIN EXPO XII 2026')

  return (
    <div style={adminInlineTheme} className="font-body-md text-on-surface antialiased bg-surface min-h-screen flex flex-col md:flex-row">
      
      {/* Mobile Header Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo Section */}
          <div className="h-20 px-space-md flex items-center gap-space-sm bg-surface-container-lowest border-b border-surface-container shrink-0">
            <img 
              src="/assets/logo-attin-expo.png" 
              alt="ATTIN EXPO XII" 
              className="h-12 w-auto object-contain shrink-0" 
              onError={(e) => {
                // Fallback icon if logo not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
              }}
            />
            <MaterialIcon name="school" className="fallback-icon hidden text-primary text-[32px]" />
            <div className="min-w-0 flex-1">
              <p className="font-headline-sm text-[16px] font-bold text-primary leading-tight truncate">ATTIN EXPO XII</p>
              <p className="font-label-badge text-[10px] text-secondary uppercase tracking-wider font-bold truncate">PANITIA ADMIN</p>
            </div>
            
            {/* Mobile close button */}
            <button 
              className="md:hidden w-8 h-8 flex items-center justify-center text-outline hover:bg-surface-container rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MaterialIcon name="close" />
            </button>
          </div>

          {/* Admin Profile Mini */}
          <div className="px-space-md py-space-md border-b border-surface-container shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
              <MaterialIcon name="person" className="text-on-primary text-[20px]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-on-surface text-[14px]" title="Super Admin Panitia">
                Super Admin Panitia
              </p>
              <p className="text-[11px] text-on-surface-variant font-medium truncate">
                PANITIA INTI
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-space-md py-space-md flex-1">
            <p className="font-label-badge text-[11px] uppercase tracking-wider text-outline px-space-sm mb-space-xs">Menu Utama</p>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-body-md text-[14px] transition-colors ${
                      isActive
                        ? 'bg-primary text-on-primary font-bold shadow-sm'
                        : 'text-on-surface-variant hover:bg-primary/10 hover:text-primary font-medium'
                    }`
                  }
                >
                  <MaterialIcon name={link.icon} className="text-[20px]" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer Sidebar */}
        <div className="p-space-md bg-surface-container-lowest border-t border-surface-container shrink-0">
          <NavLink 
            to="/" 
            className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-body-md text-[14px] font-medium text-error hover:bg-error-container hover:text-on-error-container transition-colors"
          >
            <MaterialIcon name="logout" className="text-[20px]" />
            <span>Keluar Sistem</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header Mobile Toggle & Search */}
        <header className="sticky top-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-30 flex items-center justify-between px-4 md:px-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)] shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MaterialIcon name="menu" />
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" />
              <input 
                className="w-full h-10 pl-10 pr-space-md bg-surface-container-low rounded-lg font-body-md text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors" 
                placeholder="Cari data peserta, asal sekolah, atau kode..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors relative">
              <MaterialIcon name="notifications" className="text-[20px]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface-container-lowest" />
            </button>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

