import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/ski"        element={<Ski />} />
            <Route path="/football"   element={<Football />} />
            <Route path="/athletisme" element={<Athletisme />} />
            <Route path="/equipe"     element={<Equipe />} />
            <Route path="/galerie"    element={<Galerie />} />
            <Route path="/contact"    element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
