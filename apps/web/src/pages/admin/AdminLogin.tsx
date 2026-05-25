import { useState, FormEvent } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { LOGO, SKI_HERO_IMAGE } from '../../data/images'

const features = [
  { icon: 'fas fa-calendar-check',     label: 'Gestion des événements' },
  { icon: 'fas fa-images',             label: 'Galerie photos par sport' },
  { icon: 'fas fa-hand-holding-heart', label: 'Suivi des dons reçus' },
  { icon: 'fas fa-chart-line',         label: 'Statistiques en temps réel' },
]

export default function AdminLogin() {
  const { admin, loading, login } = useAdminAuth()
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState('')
  const [busy,     setBusy]     = useState(false)

  if (!loading && admin) return <Navigate to="/admin" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* ── Left branded panel ─────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={SKI_HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary/85 to-primary-dark/95" />
        {/* decorative glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary-light/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full text-white">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <img src={LOGO} alt="Logo ASATA" className="w-14 h-14 rounded-full object-contain border-2 border-white/30" />
            <div className="leading-tight">
              <p className="font-heading font-extrabold text-xl tracking-wide">ASATA</p>
              <p className="text-xs text-white/70 tracking-wide">Atlas Toubkal Asni</p>
            </div>
          </motion.div>

          {/* Headline + features */}
          <div className="max-w-md">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-5"
            >
              Espace réservé
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="font-heading font-black text-4xl xl:text-5xl mb-4 leading-tight"
            >
              Panneau<br />d'administration
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="text-white/75 mb-8 leading-relaxed"
            >
              Gérez le contenu de votre plateforme — événements, galerie et dons — en toute simplicité.
            </motion.p>

            <ul className="flex flex-col gap-3">
              {features.map(({ icon, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.34 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-9 h-9 shrink-0 bg-white/15 border border-white/20 rounded-lg flex items-center justify-center">
                    <i className={`${icon} text-white/90 text-sm`} />
                  </span>
                  <span className="text-white/90 text-sm font-medium">{label}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="text-white/50 text-xs">© 2026 ASATA · Association Sportive Atlas Toubkal Asni</p>
        </div>
      </div>

      {/* ── Right form panel ───────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 bg-primary-ghost lg:bg-white relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm bg-white rounded-3xl shadow-blue-lg lg:shadow-none border border-primary-pale lg:border-none p-8 sm:p-10"
        >
          {/* Mobile logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-pale flex items-center justify-center mb-4 shadow-blue-sm">
              <i className="fas fa-shield-halved text-primary text-2xl" />
            </div>
            <h2 className="font-heading font-black text-2xl text-gray-900">Bon retour 👋</h2>
            <p className="text-sm text-gray-500 mt-1">Connectez-vous à votre espace admin</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2"
              >
                <i className="fas fa-exclamation-circle shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-heading font-bold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-focus:text-primary" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@asata.ma"
                  className="peer w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-heading font-bold text-gray-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                >
                  <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="mt-2 bg-primary text-white font-heading font-bold rounded-xl py-3.5 shadow-blue-sm hover:bg-primary-dark hover:shadow-blue-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {busy ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion…
                </>
              ) : (
                <>
                  <i className="fas fa-arrow-right-to-bracket" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-gray-500 hover:text-primary transition-colors">
              <i className="fas fa-arrow-left text-xs" /> Retour au site
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
