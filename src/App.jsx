import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import ScrollManager from './components/ScrollManager.jsx'
import PageSkeleton from './components/PageSkeleton.jsx'
import BranchDetailPage from './pages/BranchDetailPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ArcheryRegistration from './pages/registration/ArcheryRegistration.jsx'
import KolaseRegistration from './pages/registration/KolaseRegistration.jsx'
import PraTkaRegistration from './pages/registration/PraTkaRegistration.jsx'
import FutsalRegistration from './pages/registration/FutsalRegistration.jsx'
import BacaPuisiRegistration from './pages/registration/BacaPuisiRegistration.jsx'
import OlimpiadeRegistration from './pages/registration/OlimpiadeRegistration.jsx'
import RegistrationSuccessPage from './pages/registration/RegistrationSuccessPage.jsx'
import TahfizhRegistration from './pages/registration/TahfizhRegistration.jsx'
import TahfizhKelas6Registration from './pages/registration/TahfizhKelas6Registration.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './layouts/AdminLayout.tsx'
import AdminRekapitulasi from './pages/admin/AdminRekapitulasi.tsx'
import { supabase } from './lib/supabaseClient.js'
import AdminPendaftaranDetail from './pages/admin/AdminPendaftaranDetail.tsx'

const AuthContext = createContext(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // 1. Dapatkan sesi autentikasi Supabase saat awal load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    // 2. Berlangganan event perubahan auth state (login/logout/token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase client belum terkonfigurasi')
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      throw error
    }
    return data
  }

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <PageSkeleton />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <PageSkeleton />
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageSkeleton />
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollManager />

        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<BranchDetailPage />} path="/lomba/:slug" />
          <Route element={<TahfizhRegistration />} path="/pendaftaran/tahfizh" />
          <Route element={<TahfizhKelas6Registration />} path="/pendaftaran/tahfizh-kelas-6" />
          <Route element={<OlimpiadeRegistration />} path="/pendaftaran/olimpiade" />
          <Route element={<ArcheryRegistration />} path="/pendaftaran/panahan" />
           <Route element={<KolaseRegistration />} path="/pendaftaran/kolase" />
           <Route element={<PraTkaRegistration />} path="/pendaftaran/pra-tka" />
           <Route element={<FutsalRegistration />} path="/pendaftaran/futsal" />
           <Route element={<BacaPuisiRegistration />} path="/pendaftaran/baca-puisi" />
          <Route element={<RegistrationSuccessPage />} path="/pendaftaran-berhasil/:registrationCode" />
          
          {/* Admin Login - Public Route */}
          <Route element={<AdminLogin />} path="/admin/login" />
          
          {/* Admin Routes with nested layout - Protected */}
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} path="/admin">
            <Route index element={<AdminDashboard />} />
            <Route element={<AdminRekapitulasi />} path="pendaftaran" />
            <Route element={<AdminPendaftaranDetail />} path="pendaftaran/:id" />
          </Route>

          <Route element={<HomePage />} path="*" />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}