import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import ScrollManager from './components/ScrollManager.jsx'
import PageSkeleton from './components/PageSkeleton.jsx'
import BranchDetailPage from './pages/BranchDetailPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ArcheryRegistration from './pages/registration/ArcheryRegistration.jsx'
import PraTKARegistration from './pages/registration/PraTKARegistration.jsx'
import RegistrationSuccessPage from './pages/registration/RegistrationSuccessPage.jsx'
import TahfizhRegistration from './pages/registration/TahfizhRegistration.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './layouts/AdminLayout.tsx'
import AdminRekapitulasi from './pages/admin/AdminRekapitulasi.tsx'
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
    const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token')
    const storedUser = localStorage.getItem('admin_user') || sessionStorage.getItem('admin_user')
    
    if (token && storedUser) {
      setIsAuthenticated(true)
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  const login = (username, remember) => {
    setIsAuthenticated(true)
    setUser(username)
    if (remember) {
      localStorage.setItem('admin_token', 'authenticated')
      localStorage.setItem('admin_user', username)
    } else {
      sessionStorage.setItem('admin_token', 'authenticated')
      sessionStorage.setItem('admin_user', username)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('admin_user')
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
          <Route element={<PraTKARegistration />} path="/pendaftaran/pra-tka" />
          <Route element={<ArcheryRegistration />} path="/pendaftaran/panahan" />
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