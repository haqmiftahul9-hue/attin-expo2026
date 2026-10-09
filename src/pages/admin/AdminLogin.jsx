import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaterialIcon from '../../components/MaterialIcon.jsx'
import { useAuth } from '../../App.jsx'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('adminexpo')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' })
  const [showForgotModal, setShowForgotModal] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!username || !password) {
      setError('Username dan password harus diisi')
      return
    }

    setIsLoading(true)
    setFeedback({ show: true, type: 'loading', message: `Memverifikasi hak akses administratif ${username}...` })

    await new Promise(resolve => setTimeout(resolve, 1200))

    if (username === 'adminexpo' && password === 'admin1234!') {
      setFeedback({ show: true, type: 'success', message: 'Kredensial sah. Mengalihkan ke Dashboard ATTIN EXPO XII 2026...' })
      
      setTimeout(() => {
        login(username, rememberMe)
        navigate('/admin', { replace: true })
      }, 1000)
    } else {
      setFeedback({ show: false, type: '', message: '' })
      setError('Username atau password salah')
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const showForgotPasswordModal = () => {
    setShowForgotModal(true)
  }

  const closeForgotPasswordModal = () => {
    setShowForgotModal(false)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-body-md text-slate-800 flex flex-col justify-between selection:bg-[#0057B8]/20 selection:text-[#0057B8] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0057B8]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#0057B8]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTUsIDIzLCA0MiwgMC4wMykiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>

      {/* Header */}
      <header className="w-full relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0057B8] flex items-center justify-center text-white shadow-md">
              <MaterialIcon name="verified" className="text-[22px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-[800] text-slate-900 tracking-tight leading-none mb-1">ATTIN EXPO XII</span>
              <span className="text-[13px] text-slate-500 font-medium leading-none">Portal Administrasi Pusat 2026</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Sistem Terenkripsi SSL 256-Bit</span>
          </div>
        </div>
      </header>

      {/* Main Content (Centered) */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10 w-full">
        <div className="w-full max-w-[400px] bg-white rounded-[24px] shadow-[0_20px_40px_rgba(15,23,42,0.08)] border border-slate-200 p-6 sm:p-8 flex flex-col relative">
          
          {/* Form Header */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-10 h-10 rounded-[10px] bg-[#0057B8] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,87,184,0.25)] mb-4">
              <MaterialIcon name="vpn_key" className="text-[22px]" />
            </div>
            <h1 className="text-[22px] font-[800] text-slate-900 tracking-tight mb-1.5">Masuk Portal</h1>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed px-2">
              Masukkan kredensial akun panitia untuk mengakses sistem pengelolaan.
            </p>
          </div>

          {/* Alert Info */}
          <div className="p-2.5 px-3.5 rounded-xl bg-[#EAF3FF] border border-[#0057B8]/10 flex items-start gap-2.5 mb-5">
            <MaterialIcon name="info" className="text-[#0057B8] text-[18px] shrink-0 mt-0.5" />
            <p className="text-[12px] text-slate-700 font-medium leading-relaxed">
              Akses terbatas khusus panitia dan dewan juri terverifikasi.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Input Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-[600] text-slate-700 flex items-center justify-between" htmlFor="adminUsername">
                <span>Username <span className="text-rose-500">*</span></span>
              </label>
              <div className="relative flex items-center">
                <MaterialIcon name="person" className="absolute left-3.5 text-slate-400 text-[18px] pointer-events-none" />
                <input
                  className="w-full h-[44px] pl-10 pr-4 rounded-xl bg-[#F8FAFC] text-slate-800 text-[14px] placeholder:text-slate-400 border border-slate-300 focus:outline-none focus:border-[#0057B8] focus:ring-[3px] focus:ring-[#EAF3FF] transition-all"
                  id="adminUsername"
                  placeholder="Masukkan username"
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-[600] text-slate-700 flex items-center justify-between" htmlFor="adminPassword">
                <span>Kata Sandi <span className="text-rose-500">*</span></span>
              </label>
              <div className="relative flex items-center">
                <MaterialIcon name="lock" className="absolute left-3.5 text-slate-400 text-[18px] pointer-events-none" />
                <input
                  className="w-full h-[44px] pl-10 pr-10 rounded-xl bg-[#F8FAFC] text-slate-800 text-[14px] placeholder:text-slate-400 border border-slate-300 focus:outline-none focus:border-[#0057B8] focus:ring-[3px] focus:ring-[#EAF3FF] transition-all"
                  id="adminPassword"
                  placeholder="••••••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  aria-label="Tampilkan atau sembunyikan kata sandi"
                  className="absolute right-2 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center p-1.5 rounded-lg"
                  onClick={togglePasswordVisibility}
                  type="button"
                  disabled={isLoading}
                >
                  <MaterialIcon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[18px]" />
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between mt-0.5 mb-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  checked={rememberMe}
                  className="w-4 h-4 rounded border-slate-300 text-[#0057B8] focus:ring-[#0057B8] transition-colors"
                  onChange={(e) => setRememberMe(e.target.checked)}
                  type="checkbox"
                  disabled={isLoading}
                />
                <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Ingat saya</span>
              </label>
              <button
                className="text-[13px] font-[600] text-[#0057B8] hover:text-[#004494] transition-colors"
                onClick={showForgotPasswordModal}
                type="button"
                disabled={isLoading}
              >
                Lupa sandi?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                <MaterialIcon name="error" className="text-[16px] shrink-0" />
                <span className="text-[12px] font-medium leading-tight">{error}</span>
              </div>
            )}

            {/* Feedback Message */}
            {feedback.show && (
              <div className={`p-2.5 rounded-xl flex items-center gap-2 transition-all ${
                feedback.type === 'loading' ? 'bg-[#EAF3FF] border border-[#0057B8]/20 text-[#0057B8]' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              }`}>
                <MaterialIcon name={feedback.type === 'loading' ? 'progress_activity' : 'check_circle'} className={`text-[16px] shrink-0 ${feedback.type === 'loading' ? 'animate-spin' : ''}`} />
                <span className="text-[12px] font-medium leading-tight">{feedback.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              className="w-full h-[44px] mt-1 rounded-xl bg-[#0057B8] hover:bg-[#004494] active:scale-[0.98] text-white font-[700] text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,87,184,0.2)] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              <span>Masuk Sistem</span>
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full relative z-20 pb-6 pt-4">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-1.5">
          <p className="text-[13px] text-slate-500 font-medium">
            © 2026 Panitia Pelaksana ATTIN EXPO XII. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-slate-400">
            <MaterialIcon name="shield" className="text-[14px]" />
            <span>Pusat Layanan Siber & Keamanan Data</span>
          </div>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-5 opacity-100 transition-opacity" onClick={closeForgotPasswordModal}>
          <div className="bg-white rounded-[24px] max-w-[400px] w-full p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col gap-6 transform scale-100 transition-all" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-slate-800 font-[700] text-[16px]">
                <MaterialIcon name="lock_reset" className="text-[20px] text-[#0057B8]" />
                <span>Pemulihan Akun</span>
              </div>
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" onClick={closeForgotPasswordModal}>
                <MaterialIcon name="close" className="text-[18px]" />
              </button>
            </div>
            
            <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
              Demi alasan integritas dan kepatuhan data peserta, reset kata sandi panitia hanya dapat diinisiasi langsung melalui otorisasi Administrator Pusat atau Koordinator IT.
            </p>
            
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">Narahubung IT & Sekretariat</span>
              <span className="text-[15px] font-[700] text-[#0057B8]">+62 812-7566-2026 (Ust. Rahmat)</span>
              <span className="text-[13px] font-medium text-slate-600 mt-1 flex items-center gap-1.5">
                <MaterialIcon name="schedule" className="text-[16px]" /> Jam Kerja: 08.00 - 17.00 WIB
              </span>
            </div>
            
            <button className="w-full h-11 rounded-xl bg-slate-100 text-slate-700 font-[600] text-[14px] hover:bg-slate-200 transition-colors" onClick={closeForgotPasswordModal} type="button">
              Tutup & Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  )
}