import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useLayoutEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home        from './pages/Home'
import About       from './pages/About'
import Ski         from './pages/Ski'
import Football    from './pages/Football'
import Athletisme  from './pages/Athletisme'
import Equipe      from './pages/Equipe'
import Galerie     from './pages/Galerie'
import Contact     from './pages/Contact'
import Don         from './pages/Don'
import Evenements  from './pages/Evenements'
import AdminLogin     from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { AdminAuthProvider } from './context/AdminAuthContext'

// ── Public layout wrapper ────────────────────────────────────────────────────

function PublicLayout() {
  const location = useLocation()

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = previous }
  }, [])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

// ── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Routes>
      {/* ── Admin routes (no Navbar/Footer) ──────────────────────────── */}
      <Route
        path="/admin/*"
        element={
          <AdminAuthProvider>
            <Routes>
              <Route path="login" element={<AdminLogin />} />
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AdminAuthProvider>
        }
      />

      {/* ── Public routes (with Navbar/Footer) ───────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/ski"        element={<Ski />} />
        <Route path="/football"   element={<Football />} />
        <Route path="/athletisme" element={<Athletisme />} />
        <Route path="/equipe"     element={<Equipe />} />
        <Route path="/galerie"    element={<Galerie />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/don"        element={<Don />} />
        <Route path="/evenements" element={<Evenements />} />
      </Route>
    </Routes>
  )
}
