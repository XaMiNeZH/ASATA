import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { LOGO, HOME_SKI_CARD_IMAGE, FOOTBALL_INTRO_IMAGE, HOME_ATHLETISME_CARD_IMAGE } from '../data/images'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()
  const { scrollYProgress } = useScroll()

  const links = [
    { to: '/',            label: t('nav.home') },
    { to: '/about',       label: t('nav.about') },
    { to: '/equipe',      label: t('nav.team') },
    { to: '/evenements',  label: t('nav.events') },
    { to: '/galerie',     label: t('nav.gallery') },
  ]

  const clubs = [
    { to: '/ski',        icon: 'fas fa-skiing',  label: t('nav.ski'),        fed: 'FRMSSM', img: HOME_SKI_CARD_IMAGE,        tagline: t('nav.skiTag') },
    { to: '/football',   icon: 'fas fa-futbol',  label: t('nav.football'),   fed: 'FRMF',   img: FOOTBALL_INTRO_IMAGE,       tagline: t('nav.footTag') },
    { to: '/athletisme', icon: 'fas fa-running', label: t('nav.athletisme'), fed: 'FRMA',   img: HOME_ATHLETISME_CARD_IMAGE, tagline: t('nav.athTag') },
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
        <ul className="hidden lg:flex items-center gap-0.5">
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
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0,  scale: 1 }}
                  exit={{   opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full right-0 pt-3 origin-top-right"
                >
                  <div className="relative bg-white rounded-2xl shadow-blue-lg border border-primary-pale p-3 w-[600px] max-w-[calc(100vw-2rem)]">
                    {/* caret */}
                    <span className="absolute -top-1.5 right-12 w-3 h-3 bg-white border-l border-t border-primary-pale rotate-45" />
                    <div className="grid grid-cols-3 gap-3">
                      {clubs.map(({ to, icon, label, fed, img, tagline }) => (
                        <Link
                          key={to}
                          to={to}
                          aria-current={isActive(to) ? 'page' : undefined}
                          className="group/card relative rounded-xl overflow-hidden border border-primary-pale hover:border-primary-light hover:shadow-blue-md transition-all duration-200"
                        >
                          <div className="relative h-24 overflow-hidden">
                            <img src={img} alt={label} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/25 to-transparent" />
                            <div className="absolute top-2 right-2 w-7 h-7 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center text-white text-xs">
                              <i className={icon} />
                            </div>
                            {isActive(to) && (
                              <span className="absolute top-2 left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-[10px] shadow-blue-sm">
                                <i className="fas fa-check" />
                              </span>
                            )}
                            <div className="absolute bottom-1.5 left-3 right-3 text-white">
                              <p className="text-[9px] font-heading font-bold uppercase tracking-[1.5px] text-white/85">{fed}</p>
                              <h4 className="font-heading font-bold text-sm leading-tight">{label}</h4>
                            </div>
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-gray-500 leading-snug mb-2 min-h-[2rem]">{tagline}</p>
                            <span className="inline-flex items-center gap-1 text-primary font-heading font-bold text-xs group-hover/card:gap-2 transition-all">
                              {t('home.clubs.discover')} <i className="fas fa-arrow-right text-[10px]" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Divider */}
          <li className="mx-2 h-6 w-px bg-primary-pale" aria-hidden="true" />

          <li>
            <Link
              to="/don"
              className="relative overflow-hidden font-heading font-semibold text-sm px-4 py-2 rounded-full bg-primary text-white shadow-blue-sm hover:bg-primary-dark hover:shadow-blue-md hover:-translate-y-0.5 transition-all duration-200 inline-block"
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 skew-x-[-20deg] animate-[shine_4.5s_ease-in-out_infinite]" />
              <span className="relative"><i className="fas fa-hand-holding-heart mr-1.5" />{t('nav.donate')}</span>
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
          className="lg:hidden flex flex-col gap-[5px] p-1"
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
            className="lg:hidden bg-white border-t border-primary-pale overflow-hidden shadow-blue-lg"
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

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-primary-light via-primary to-primary-dark"
      />
    </nav>
  )
}
