import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import { CONTACT_HERO_IMAGE } from '../data/images'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

interface Form { firstName: string; lastName: string; email: string; phone: string; subject: string; message: string }
const init: Form = { firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' }

const contactInfo = [
  { icon: 'fas fa-envelope',       label: 'Email',         value: 'asata.club@gmail.com' },
  { icon: 'fas fa-map-marker-alt', label: 'Adresse',       value: 'Asni, Province d\'Al Haouz, Maroc' },
  { icon: 'fas fa-mountain',       label: 'Localisation',  value: '50 km au sud de Marrakech — 1 150 m altitude' },
  { icon: 'fas fa-certificate',    label: 'Accréditation', value: 'N° 2024/1111 — Mai 2024' },
]

export default function Contact() {
  const [form, setForm]         = useState<Form>(init)
  const [sent, setSent]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setApiError(null)
    setFieldErrors({})

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          firstName: form.firstName,
          lastName:  form.lastName,
          email:     form.email,
          phone:     form.phone || undefined,
          subject:   form.subject,
          message:   form.message,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setApiError(json?.message ?? 'Une erreur est survenue. Réessayez.')
        if (json?.errors) setFieldErrors(json.errors)
        return
      }

      setSent(true)
      setForm(init)
      setTimeout(() => setSent(false), 5000)
    } catch {
      setApiError('Impossible de contacter le serveur. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const inputCls = "w-full px-4 py-3 border border-primary-pale rounded-xl bg-white text-gray-800 placeholder-gray-300 text-sm outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/20 transition-all font-body"

  return (
    <PageTransition>
      <PageHero
        title="Contactez-nous"
        subtitle="Une question, un partenariat ou envie de rejoindre l'ASATA ? Nous sommes à votre écoute."
        image={CONTACT_HERO_IMAGE}
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-16 items-start">

          {/* Info */}
          <FadeIn direction="left">
            <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">Coordonnées</span>
            <h2 className="font-heading font-bold text-4xl text-gray-900 mb-3 mt-1">Restons en contact</h2>
            <p className="text-gray-500 mb-7 leading-relaxed">
              Que vous souhaitiez rejoindre un de nos clubs, proposer un partenariat ou simplement en savoir plus sur l'ASATA, n'hésitez pas à nous écrire.
            </p>

            <div className="flex flex-col gap-3 mb-7">
              {contactInfo.map(({ icon, label, value }) => (
                <div key={label} className="flex gap-4 items-start p-4 bg-primary-ghost border border-primary-pale rounded-xl hover:border-primary-light hover:shadow-blue-sm transition-all">
                  <div className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 text-base">
                    <i className={icon} />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">{label}</p>
                    <p className="text-gray-800 font-semibold text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[2px] text-gray-700 mb-3">Suivez-nous</h4>
            <div className="flex gap-2 mb-8">
              {[
                { href: 'https://www.facebook.com/asataclub', icon: 'fab fa-facebook-f', label: 'Facebook' },
              ].map(({ href, icon, label }) => (
                <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-primary-pale bg-primary-ghost text-primary flex items-center justify-center text-base hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-0.5 transition-all"
                  title={label}
                >
                  <i className={icon} />
                </a>
              ))}
            </div>

            <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-5">
              <h4 className="font-heading font-bold text-base text-gray-900 mb-3"><i className="fas fa-info-circle text-primary-light mr-2" />Rejoindre un club</h4>
              <div className="flex flex-col gap-2">
                {[
                  { to: '/ski',        icon: 'fas fa-skiing',  label: 'Ski & Sports de Montagne' },
                  { to: '/football',   icon: 'fas fa-futbol',  label: 'Football' },
                  { to: '/athletisme', icon: 'fas fa-running', label: 'Athlétisme' },
                ].map(({ to, icon, label }) => (
                  <Link key={to} to={to} className="flex items-center gap-3 text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                    <i className={`${icon} text-primary-light w-4`} />{label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" delay={0.1}>
            <div className="bg-primary-ghost border border-primary-pale rounded-3xl p-8">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-6">
                <i className="fas fa-paper-plane text-primary-light mr-2" /> Envoyez-nous un message
              </h3>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-5 text-sm font-semibold"
                  >
                    <i className="fas fa-check-circle text-green-500" />
                    Message envoyé ! Nous vous répondrons bientôt.
                  </motion.div>
                )}
                {apiError && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm font-semibold"
                  >
                    <i className="fas fa-exclamation-circle text-red-400" />
                    {apiError}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading font-bold text-xs text-gray-700 uppercase tracking-wide mb-1.5">Prénom *</label>
                    <input type="text" className={inputCls} placeholder="Votre prénom" value={form.firstName} onChange={set('firstName')} required />
                  </div>
                  <div>
                    <label className="block font-heading font-bold text-xs text-gray-700 uppercase tracking-wide mb-1.5">Nom *</label>
                    <input type="text" className={inputCls} placeholder="Votre nom" value={form.lastName} onChange={set('lastName')} required />
                  </div>
                </div>
                <div>
                  <label className="block font-heading font-bold text-xs text-gray-700 uppercase tracking-wide mb-1.5">Email *</label>
                  <input type="email" className={inputCls} placeholder="votre@email.com" value={form.email} onChange={set('email')} required />
                </div>
                <div>
                  <label className="block font-heading font-bold text-xs text-gray-700 uppercase tracking-wide mb-1.5">Téléphone</label>
                  <input type="tel" className={inputCls} placeholder="+212 6XX XXX XXX" value={form.phone} onChange={set('phone')} />
                </div>
                <div>
                  <label className="block font-heading font-bold text-xs text-gray-700 uppercase tracking-wide mb-1.5">Sujet *</label>
                  <select className={inputCls} value={form.subject} onChange={set('subject')} required>
                    <option value="" disabled>Choisir un sujet</option>
                    <option value="adhesion">Adhésion à un club</option>
                    <option value="partenariat">Partenariat / Sponsoring</option>
                    <option value="evenement">Organisation d'événement</option>
                    <option value="information">Demande d'information</option>
                    <option value="presse">Presse / Médias</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block font-heading font-bold text-xs text-gray-700 uppercase tracking-wide mb-1.5">Message *</label>
                  <textarea className={`${inputCls} resize-none`} rows={5} placeholder="Décrivez votre demande en détail..." value={form.message} onChange={set('message')} required />
                  {fieldErrors.message && <p className="mt-1 text-xs text-red-500">{fieldErrors.message[0]}</p>}
                </div>
                {Object.keys(fieldErrors).length > 0 && !fieldErrors.message && (
                  <p className="text-xs text-red-500">
                    Veuillez corriger les champs suivants : {Object.keys(fieldErrors).join(', ')}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-heading font-bold py-3.5 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <><i className="fas fa-spinner fa-spin" /> Envoi en cours...</> : <><i className="fas fa-paper-plane" /> Envoyer le message</>}
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Map */}
      <section className="bg-primary-ghost pb-16">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Localisation" title="Où nous trouver" subtitle="Asni — Province d'Al Haouz, à 50 km au sud de Marrakech, au pied du Djebel Toubkal" />
          <FadeIn>
            <div className="rounded-2xl overflow-hidden shadow-blue-md h-[380px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.6!2d-7.9847!3d31.2500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafefb71f9d1b13%3A0x0!2sAsni%2C%20Morocco!5e0!3m2!1sfr!2sma!4v1700000000000"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation ASATA"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
