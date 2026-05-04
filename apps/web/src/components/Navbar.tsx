import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LOGO } from '../data/images'

const clubs = [
  { to: '/ski',        icon: 'fas fa-skiing',  label: 'Ski & Montagne' },
  { to: '/football',   icon: 'fas fa-futbol',  label: 'Football' },
  { to: '/athletisme', icon: 'fas fa-running', label: 'Athlétisme' },
]

const links = [
  { to: '/',            label: 'Accueil' },
  { to: '/about',       label: 'À Propos' },
  { to: '/equipe',      label: 'Notre Équipe' },
  { to: '/evenements',  label: 'Événements' },
  { to: '/galerie',     label: 'Galerie' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-[76px] bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? 'shadow-blue-sm border-primary-pale' : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-full">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={LOGO}
            alt="Logo ASATA"
            className="w-12 h-12 rounded-full object-contain border-2 border-primary-pale"
          />
          <div className="flex flex-col leading-none">
            <span className="font-heading font-extrabold text-xl tracking-wide text-primary">
              ASATA
            </span>
            <span className="text-[11px] font-medium tracking-wide text-gray-400">
              Atlas Toubkal Asni
            </span>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`font-heading font-semibold text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(to)
                    ? 'text-primary bg-primary-pale'
                    : 'text-gray-700 hover:text-primary hover:bg-primary-ghost'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Clubs dropdown */}
          <li className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="font-heading font-semibold text-sm px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-gray-700 hover:text-primary hover:bg-primary-ghost">
              Nos Clubs <i className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0,  scale: 1 }}
                  exit={{   opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-blue-lg border border-primary-pale py-2 min-w-[210px] origin-top"
                >
                  {clubs.map(({ to, icon, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-heading font-semibold text-gray-700 hover:text-primary hover:bg-primary-ghost transition-colors duration-150"
                      >
                        <i className={`${icon} text-primary-light w-5`} />
                        {label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link
              to="/don"
              className="font-heading font-semibold text-sm px-4 py-2 rounded-full ml-1 bg-primary text-white hover:bg-primary-dark hover:shadow-blue-sm transition-all duration-200"
            >
              <i className="fas fa-hand-holding-heart mr-1.5" />Faire un Don
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="font-heading font-semibold text-sm px-4 py-2 rounded-full ml-1 bg-white text-primary border border-primary-pale hover:bg-primary-pale transition-all duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className={`block h-0.5 w-6 rounded bg-gray-800 transition-all duration-300 ${
                menuOpen
                  ? i === 0 ? 'rotate-45 translate-y-[7px]'
                  : i === 1 ? 'opacity-0'
                  : '-rotate-45 -translate-y-[7px]'
                  : ''
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-primary-pale overflow-hidden shadow-blue-lg"
          >
            <ul className="flex flex-col p-4 gap-1">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`block font-heading font-semibold text-sm px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(to) ? 'text-primary bg-primary-pale' : 'text-gray-800 hover:text-primary hover:bg-primary-ghost'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-1 border-t border-primary-pale mt-1">
                <p className="text-[11px] font-heading font-bold text-gray-400 uppercase tracking-widest px-3 py-2">Nos Clubs</p>
                {clubs.map(({ to, icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 px-3 py-2.5 font-heading font-semibold text-sm text-gray-700 hover:text-primary hover:bg-primary-ghost rounded-lg transition-colors"
                  >
                    <i className={`${icon} text-primary-light w-4`} />
                    {label}
                  </Link>
                ))}
              </li>
              <li>
                <Link
                  to="/don"
                  className="block text-center font-heading font-bold text-sm px-4 py-2.5 bg-primary text-white rounded-full mt-2 hover:bg-primary-dark transition-colors"
                >
                  <i className="fas fa-hand-holding-heart mr-1.5" />Faire un Don
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block text-center font-heading font-bold text-sm px-4 py-2.5 border border-primary text-primary rounded-full mt-2 hover:bg-primary-pale transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
