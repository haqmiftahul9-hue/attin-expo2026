import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollManager from './components/ScrollManager.jsx'
import PageSkeleton from './components/PageSkeleton.jsx'
import BranchDetailPage from './pages/BranchDetailPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ArcheryRegistration from './pages/registration/ArcheryRegistration.jsx'
import PraTKARegistration from './pages/registration/PraTKARegistration.jsx'
import RegistrationSuccessPage from './pages/registration/RegistrationSuccessPage.jsx'
import TahfizhRegistration from './pages/registration/TahfizhRegistration.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'

import AdminLayout from './layouts/AdminLayout.tsx'







import AdminRekapitulasi from './pages/admin/AdminRekapitulasi.tsx'

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
    <BrowserRouter>
      <ScrollManager />

      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<BranchDetailPage />} path="/lomba/:slug" />
        <Route element={<TahfizhRegistration />} path="/pendaftaran/tahfizh" />
        <Route element={<PraTKARegistration />} path="/pendaftaran/pra-tka" />
        <Route element={<ArcheryRegistration />} path="/pendaftaran/panahan" />
        <Route element={<RegistrationSuccessPage />} path="/pendaftaran-berhasil/:registrationCode" />
        
        {/* Admin Routes with nested layout */}
        <Route element={<AdminLayout />} path="/admin">
          <Route index element={<AdminDashboard />} />
          <Route element={<AdminRekapitulasi />} path="rekapitulasi" />
          
          
          
          
          
        </Route>

        <Route element={<HomePage />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}
