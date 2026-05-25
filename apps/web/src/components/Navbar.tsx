import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { LOGO } from '../data/images'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  const links = [
    { to: '/',            label: t('nav.home') },
    { to: '/about',       label: t('nav.about') },
    { to: '/equipe',      label: t('nav.team') },
    { to: '/evenements',  label: t('nav.events') },
    { to: '/galerie',     label: t('nav.gallery') },
  ]

  const clubs = [
    { to: '/ski',        icon: 'fas fa-skiing',  label: t('nav.ski') },
    { to: '/football',   icon: 'fas fa-futbol',  label: t('nav.football') },
    { to: '/athletisme', icon: 'fas fa-running', label: t('nav.athletisme') },
  ]

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

  const clubsActive = clubs.some(c => location.pathname.startsWith(c.to))

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? 'h-[64px] shadow-blue-sm border-primary-pale' : 'h-[76px] border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-full">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src={LOGO}
            alt="Logo ASATA"
            className={`rounded-full object-contain border-2 border-primary-pale transition-all duration-300 group-hover:border-primary-light ${
              scrolled ? 'w-12 h-12' : 'w-14 h-14'
            }`}
          />
          <div className="flex flex-col leading-none">
            <span className="font-heading font-extrabold text-xl tracking-wide text-primary">
              ASATA
            </span>
            <span className={`font-medium tracking-wide text-gray-400 transition-all duration-300 overflow-hidden ${
              scrolled ? 'text-[0px] opacity-0 max-h-0' : 'text-[11px] opacity-100 max-h-4'
            }`}>
              Atlas Toubkal Asni
            </span>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                aria-current={isActive(to) ? 'page' : undefined}
                className={`group relative font-heading font-semibold text-sm px-3 py-2 transition-colors duration-200 ${
                  isActive(to) ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {label}
                {isActive(to) ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-[3px] rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                ) : (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-[3px] rounded-full bg-primary-light/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                )}
              </Link>
            </li>
          ))}

          {/* Clubs dropdown */}
          <li className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className={`group relative font-heading font-semibold text-sm px-3 py-2 transition-colors duration-200 flex items-center gap-1 ${
                clubsActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              {t('nav.clubs')} <i className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              {clubsActive ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-3 right-6 -bottom-0.5 h-[3px] rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              ) : (
                <span className="absolute left-3 right-6 -bottom-0.5 h-[3px] rounded-full bg-primary-light/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              )}
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0,  scale: 1 }}
                  exit={{   opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-blue-lg border border-primary-pale py-2 min-w-[220px] origin-top"
                >
                  {/* caret */}
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-primary-pale rotate-45" />
                  {clubs.map(({ to, icon, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        aria-current={isActive(to) ? 'page' : undefined}
                        className={`relative flex items-center gap-3 px-4 py-2.5 text-sm font-heading font-semibold transition-colors duration-150 ${
                          isActive(to)
                            ? 'text-primary bg-primary-ghost'
                            : 'text-gray-700 hover:text-primary hover:bg-primary-ghost'
                        }`}
                      >
                        {isActive(to) && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-primary" />}
                        <i className={`${icon} text-primary-light w-5`} />
                        {label}
                        {isActive(to) && <i className="fas fa-check text-[10px] text-primary ml-auto" />}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Divider */}
          <li className="mx-2 h-6 w-px bg-primary-pale" aria-hidden="true" />

          <li>
            <Link
              to="/don"
              className="font-heading font-semibold text-sm px-4 py-2 rounded-full bg-primary text-white shadow-blue-sm hover:bg-primary-dark hover:shadow-blue-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <i className="fas fa-hand-holding-heart mr-1.5" />{t('nav.donate')}
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="font-heading font-semibold text-sm px-4 py-2 rounded-full ml-1 bg-white text-primary border border-primary-pale hover:bg-primary-pale hover:border-primary-light transition-all duration-200"
            >
              {t('nav.contact')}
            </Link>
          </li>
          <li className="ml-1">
            <LanguageSwitcher />
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
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
                    aria-current={isActive(to) ? 'page' : undefined}
                    className={`relative block font-heading font-semibold text-sm px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(to) ? 'text-primary bg-primary-pale pl-5' : 'text-gray-800 hover:text-primary hover:bg-primary-ghost'
                    }`}
                  >
                    {isActive(to) && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-primary" />}
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-primary-pale mt-2">
                <p className="text-[11px] font-heading font-bold text-gray-400 uppercase tracking-widest px-3 py-2">{t('nav.clubs')}</p>
                {clubs.map(({ to, icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    aria-current={isActive(to) ? 'page' : undefined}
                    className={`relative flex items-center gap-3 px-3 py-2.5 font-heading font-semibold text-sm rounded-lg transition-colors ${
                      isActive(to) ? 'text-primary bg-primary-pale pl-5' : 'text-gray-700 hover:text-primary hover:bg-primary-ghost'
                    }`}
                  >
                    {isActive(to) && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-primary" />}
                    <i className={`${icon} text-primary-light w-4`} />
                    {label}
                    {isActive(to) && <i className="fas fa-check text-[10px] text-primary ml-auto" />}
                  </Link>
                ))}
              </li>
              <li className="pt-2 border-t border-primary-pale mt-2 px-3 py-2 flex items-center justify-between">
                <span className="text-[11px] font-heading font-bold text-gray-400 uppercase tracking-widest">{t('nav.language')}</span>
                <LanguageSwitcher />
              </li>
              <li className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  to="/don"
                  className="flex items-center justify-center gap-1.5 text-center font-heading font-bold text-sm px-3 py-2.5 bg-primary text-white rounded-full shadow-blue-sm hover:bg-primary-dark transition-colors"
                >
                  <i className="fas fa-hand-holding-heart" />{t('nav.donate')}
                </Link>
                <Link
                  to="/contact"
                  className="text-center font-heading font-bold text-sm px-3 py-2.5 border border-primary text-primary rounded-full hover:bg-primary-pale transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
