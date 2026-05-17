import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import { DON_HERO_IMAGE } from '../data/images'

interface DonForm {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const init: DonForm = {
  firstName: '', lastName: '', email: '', phone: '',
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const presetAmounts = [50, 100, 200, 500]

const impacts = [
  { icon: 'fas fa-child',        value: '200+', label: 'Enfants accompagnés' },
  { icon: 'fas fa-calendar-alt', value: '30+',  label: 'Événements organisés' },
  { icon: 'fas fa-mountain',     value: '3',    label: 'Disciplines sportives' },
  { icon: 'fas fa-trophy',       value: '15+',  label: 'Compétitions financées' },
]

const whyItems = [
  {
    icon: 'fas fa-futbol',
    title: 'Plus d\'événements sportifs',
    desc: 'Vos dons nous permettent d\'organiser des tournois, des compétitions et des stages pour les jeunes d\'Asni tout au long de l\'année.',
  },
  {
    icon: 'fas fa-child',
    title: 'Aider plus d\'enfants',
    desc: 'Chaque contribution permet à un enfant de plus d\'accéder au sport, à l\'encadrement professionnel et à l\'épanouissement personnel.',
  },
  {
    icon: 'fas fa-skiing',
    title: 'Équiper nos jeunes talents',
    desc: 'Le matériel sportif coûte cher. Grâce à vous, aucun enfant ne sera exclu faute d\'équipement.',
  },
]

export default function Don() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom]     = useState('')
  const [form, setForm]         = useState<DonForm>(init)
  const [sent, setSent]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [reference, setReference] = useState<string | null>(null)
  const [apiError, setApiError]   = useState<string | null>(null)

  const set = (key: keyof DonForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const amount    = custom ? parseFloat(custom) : selected
  const canSubmit = amount !== null && amount > 0 && !isNaN(amount) &&
                    !!form.firstName && !!form.lastName && !!form.email

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setApiError(null)

    try {
      const res = await fetch(`${API_URL}/api/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'MAD',
          method: 'VIREMENT',
          donorName:  `${form.firstName} ${form.lastName}`.trim(),
          donorEmail: form.email || undefined,
          donorPhone: form.phone || undefined,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setApiError(json.message ?? 'Une erreur est survenue. Veuillez réessayer.')
        return
      }

      setReference(json.data?.reference ?? null)
      setSent(true)
      setForm(init)
      setSelected(null)
      setCustom('')
    } catch {
      setApiError('Impossible de contacter le serveur. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }

  const inp = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-300 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-body'
  const lbl = 'block font-heading font-semibold text-xs text-gray-500 uppercase tracking-wider mb-1.5'

  return (
    <PageTransition>

      {/* ── Hero ── */}
      <PageHero
        title={t('donate.hero.title')}
        subtitle={t('donate.hero.subtitle')}
        image={DON_HERO_IMAGE}
        breadcrumbs={[{ label: t('common.home'), to: '/' }, { label: t('donate.hero.crumb') }]}
      />

      {/* ── Stats bar ── */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {impacts.map(({ icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <i className={`${icon} text-white text-lg`} />
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl text-white leading-none">{value}</p>
                <p className="text-white/60 text-xs font-medium mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── LEFT — why donate ── */}
            <FadeIn direction="left">
              <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-4">
                Votre impact
              </span>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight mb-5">
                Votre don change<br />
                <span className="text-primary">la vie d'un enfant</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                Grâce à votre générosité, l'ASATA peut organiser davantage d'événements sportifs,
                accueillir plus d'enfants et leur offrir un encadrement de qualité au pied du Djebel Toubkal.
                Chaque dirham compte et se traduit directement en sourires, en médailles et en rêves accomplis.
              </p>

              <div className="flex flex-col gap-5 mb-10">
                {whyItems.map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0 mt-0.5">
                      <i className={icon} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="relative bg-white border-l-4 border-primary rounded-2xl p-6 shadow-blue-sm">
                <i className="fas fa-quote-left text-primary/20 text-4xl absolute top-4 right-5" />
                <p className="text-gray-700 text-base leading-relaxed italic mb-3">
                  "Le sport nous a appris la discipline, le dépassement de soi et la solidarité.
                  Avec votre aide, nous pouvons offrir ces valeurs à encore plus d'enfants d'Asni."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold font-heading">A</div>
                  <div>
                    <p className="font-heading font-bold text-sm text-gray-900">L'équipe ASATA</p>
                    <p className="text-xs text-gray-400">Association Sportive Atlas Toubkal Asni</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── RIGHT — form ── */}
            <FadeIn direction="right" delay={0.1}>
              <div className="bg-white rounded-3xl shadow-blue-lg overflow-hidden sticky top-24 max-h-[calc(100vh-7rem)] flex flex-col">

                {/* Form header */}
                <div className="bg-gradient-to-r from-primary-dark to-primary px-8 py-6">
                  <h3 className="font-heading font-extrabold text-white text-xl">{t('donate.form.title')}</h3>
                  <p className="text-white/65 text-sm mt-1">Sécurisé · Confidentiel · Impact immédiat</p>
                </div>

                <div className="px-8 py-7 overflow-y-auto flex-1">

                  {/* API Error */}
                  <AnimatePresence>
                    {apiError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-4 mb-4 text-sm"
                      >
                        <i className="fas fa-exclamation-circle text-red-500 text-lg mt-0.5 shrink-0" />
                        <p>{apiError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Success */}
                  <AnimatePresence>
                    {sent && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex flex-col gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-5 mb-6"
                      >
                        <div className="flex items-start gap-3">
                          <i className="fas fa-check-circle text-green-500 text-xl mt-0.5 shrink-0" />
                          <div>
                            <p className="font-heading font-bold text-base text-green-700">Merci infiniment !</p>
                            <p className="text-green-600/80 text-sm mt-0.5 leading-relaxed">
                              Votre don a bien été enregistré. Ensemble, nous aidons plus d'enfants à s'épanouir à travers le sport.
                            </p>
                          </div>
                        </div>
                        {reference && (
                          <div className="bg-white border border-green-200 rounded-xl px-4 py-3">
                            <p className="text-[11px] text-gray-400 font-heading uppercase tracking-widest mb-1">Référence de votre don</p>
                            <p className="font-heading font-black text-primary tracking-wide text-sm break-all">{reference}</p>
                            <p className="text-[11px] text-gray-400 mt-1">Conservez cette référence pour le suivi de votre don.</p>
                          </div>
                        )}
                          <div className="bg-white border border-green-200 rounded-xl px-4 py-3 text-sm">
                            <p className="font-heading font-bold text-gray-700 mb-2">
                              <i className="fas fa-university mr-1.5 text-primary" />
                              {t('donate.virement.title')}
                            </p>
                            <div className="space-y-1 text-gray-500 text-xs">
                              <p><span className="font-semibold text-gray-700">Bénéficiaire :</span> Association Sportive Atlas Toubkal Asni</p>
                              <p><span className="font-semibold text-gray-700">Banque :</span> CIH Bank</p>
                              <p><span className="font-semibold text-gray-700">Motif :</span> Don ASATA — {reference}</p>
                            </div>
                          </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Amount */}
                    <div>
                      <p className={lbl}>{t('donate.form.amount')}</p>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {presetAmounts.map(a => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => { setSelected(a); setCustom('') }}
                            className={`py-3.5 rounded-xl border-2 font-heading font-bold text-sm transition-all ${
                              selected === a && !custom
                                ? 'border-primary bg-primary text-white shadow-blue-sm scale-[1.03]'
                                : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary bg-white'
                            }`}
                          >
                            {a}
                            <span className="block text-[10px] font-normal opacity-70 mt-0.5">MAD</span>
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          className={`${inp} pr-16`}
                          placeholder="Autre montant"
                          value={custom}
                          onChange={e => { setCustom(e.target.value); setSelected(null) }}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-heading font-bold text-gray-400 pointer-events-none">MAD</span>
                      </div>
                      {amount && (
                        <p className="mt-2 text-xs text-primary font-heading font-semibold">
                          <i className="fas fa-check-circle mr-1" />
                          Montant sélectionné : {amount} MAD
                        </p>
                      )}
                    </div>

                    <hr className="border-gray-100" />

                    {/* Personal info */}
                    <div className="flex flex-col gap-3">
                      <p className={lbl}>{t('donate.form.name')}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={lbl}>{t('donate.form.name')} *</label>
                          <input type="text" className={inp} placeholder={t('donate.form.name')} value={form.firstName} onChange={set('firstName')} required />
                        </div>
                        <div>
                          <label className={lbl}>{t('donate.form.name')} *</label>
                          <input type="text" className={inp} placeholder={t('donate.form.name')} value={form.lastName} onChange={set('lastName')} required />
                        </div>
                      </div>
                      <div>
                        <label className={lbl}>{t('donate.form.email')} *</label>
                        <input type="email" className={inp} placeholder="votre@email.com" value={form.email} onChange={set('email')} required />
                      </div>
                      <div>
                        <label className={lbl}>{t('contact.form.phone')}</label>
                        <input type="tel" className={inp} placeholder="+212 6XX XXX XXX" value={form.phone} onChange={set('phone')} />
                      </div>
                    </div>

                    {/* Virement info */}
                    <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-4 text-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="fas fa-university text-primary" />
                        <span className="font-heading font-bold text-primary-dark">{t('donate.virement.title')}</span>
                      </div>
                      <div className="space-y-1.5 text-gray-500 text-xs">
                        <p><span className="font-semibold text-gray-700">Bénéficiaire :</span> Asso. Sportive Atlas Toubkal Asni</p>
                        <p><span className="font-semibold text-gray-700">Banque :</span> CIH Bank</p>
                        <p className="mt-2 text-primary/70">
                          <i className="fas fa-info-circle mr-1" />
                          Une référence unique vous sera communiquée après soumission — indiquez-la dans le motif du virement.
                        </p>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || !canSubmit}
                      className="w-full flex items-center justify-center gap-2.5 bg-primary text-white font-heading font-bold text-base py-4 rounded-2xl hover:bg-primary-dark transition-all shadow-blue-sm disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:translate-y-0 mt-1"
                    >
                      {loading ? (
                        <><i className="fas fa-spinner fa-spin" /> {t('donate.form.submitting')}</>
                      ) : (
                        <>
                          <i className="fas fa-hand-holding-heart" />
                          {amount ? `Donner ${amount} MAD` : 'Confirmer le don'}
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 leading-relaxed">
                      <i className="fas fa-lock mr-1" />
                      Vos données personnelles sont confidentielles et ne sont jamais partagées
                    </p>

                  </form>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

    </PageTransition>
  )
}
