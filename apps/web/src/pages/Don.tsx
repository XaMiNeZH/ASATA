import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import { DON_HERO_IMAGE } from '../data/images'

interface DonForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  cardName: string
  cardNumber: string
  expiry: string
  cvv: string
}

const init: DonForm = {
  firstName: '', lastName: '', email: '', phone: '',
  cardName: '', cardNumber: '', expiry: '', cvv: '',
}

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
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom]     = useState('')
  const [form, setForm]         = useState<DonForm>(init)
  const [sent, setSent]         = useState(false)
  const [loading, setLoading]   = useState(false)

  const set = (key: keyof DonForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, '').slice(0, 16)
    setForm(f => ({ ...f, cardNumber: d.replace(/(.{4})/g, '$1 ').trim() }))
  }

  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, '').slice(0, 4)
    setForm(f => ({ ...f, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d }))
  }

  const cardIcon = () => {
    const n = form.cardNumber.replace(/\s/g, '')
    if (n.startsWith('4'))                        return 'fab fa-cc-visa'
    if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'fab fa-cc-mastercard'
    if (/^3[47]/.test(n))                         return 'fab fa-cc-amex'
    return 'fas fa-credit-card'
  }

  const amount    = custom ? parseFloat(custom) : selected
  const canSubmit = amount !== null && amount > 0 && !isNaN(amount) &&
                    !!form.cardName &&
                    form.cardNumber.replace(/\s/g, '').length >= 13 &&
                    /^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry) &&
                    form.cvv.length >= 3 &&
                    !!form.firstName && !!form.lastName && !!form.email

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setForm(init)
      setSelected(null)
      setCustom('')
      setTimeout(() => setSent(false), 7000)
    }, 1500)
  }

  const inp = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-300 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-body'
  const lbl = 'block font-heading font-semibold text-xs text-gray-500 uppercase tracking-wider mb-1.5'

  return (
    <PageTransition>

      {/* ── Hero ── */}
      <PageHero
        title="Faire un Don"
        subtitle="Soutenez les jeunes sportifs d'Asni — chaque don construit un avenir meilleur pour nos enfants."
        image={DON_HERO_IMAGE}
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Faire un Don' }]}
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
                  <h3 className="font-heading font-extrabold text-white text-xl">Faire un don maintenant</h3>
                  <p className="text-white/65 text-sm mt-1">Sécurisé · Confidentiel · Impact immédiat</p>
                </div>

                <div className="px-8 py-7 overflow-y-auto flex-1">

                  {/* Success */}
                  <AnimatePresence>
                    {sent && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl px-4 py-4 mb-6 text-sm"
                      >
                        <i className="fas fa-check-circle text-green-500 text-xl mt-0.5 shrink-0" />
                        <div>
                          <p className="font-heading font-bold text-base">Merci infiniment !</p>
                          <p className="text-green-600/80 mt-0.5 leading-relaxed">
                            Votre don a bien été reçu. Vous recevrez un accusé de réception par email. Ensemble, nous aidons plus d'enfants à s'épanouir à travers le sport.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Amount */}
                    <div>
                      <p className={lbl}>Choisissez un montant</p>
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
                      <p className={lbl}>Vos coordonnées</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={lbl}>Prénom *</label>
                          <input type="text" className={inp} placeholder="Prénom" value={form.firstName} onChange={set('firstName')} required />
                        </div>
                        <div>
                          <label className={lbl}>Nom *</label>
                          <input type="text" className={inp} placeholder="Nom" value={form.lastName} onChange={set('lastName')} required />
                        </div>
                      </div>
                      <div>
                        <label className={lbl}>Email *</label>
                        <input type="email" className={inp} placeholder="votre@email.com" value={form.email} onChange={set('email')} required />
                      </div>
                      <div>
                        <label className={lbl}>Téléphone</label>
                        <input type="tel" className={inp} placeholder="+212 6XX XXX XXX" value={form.phone} onChange={set('phone')} />
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Card */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className={lbl}>Paiement par carte</p>
                        <div className="flex items-center gap-2 text-2xl text-gray-300">
                          <i className="fab fa-cc-visa" />
                          <i className="fab fa-cc-mastercard" />
                          <i className="fab fa-cc-amex" />
                        </div>
                      </div>

                      <div>
                        <label className={lbl}>Nom sur la carte *</label>
                        <input type="text" className={inp} placeholder="PRÉNOM NOM" value={form.cardName} onChange={set('cardName')} required autoComplete="cc-name" />
                      </div>

                      <div>
                        <label className={lbl}>Numéro de carte *</label>
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            className={`${inp} pr-12`}
                            placeholder="0000 0000 0000 0000"
                            value={form.cardNumber}
                            onChange={handleCardNumber}
                            required
                            autoComplete="cc-number"
                            maxLength={19}
                          />
                          <i className={`${cardIcon()} absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl pointer-events-none`} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={lbl}>Expiration *</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            className={inp}
                            placeholder="MM/AA"
                            value={form.expiry}
                            onChange={handleExpiry}
                            required
                            autoComplete="cc-exp"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className={lbl}>CVV *</label>
                          <div className="relative">
                            <input
                              type="password"
                              inputMode="numeric"
                              className={`${inp} pr-10`}
                              placeholder="•••"
                              value={form.cvv}
                              onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))}
                              required
                              autoComplete="cc-csc"
                              maxLength={4}
                            />
                            <i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || !canSubmit}
                      className="w-full flex items-center justify-center gap-2.5 bg-primary text-white font-heading font-bold text-base py-4 rounded-2xl hover:bg-primary-dark transition-all shadow-blue-sm disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:translate-y-0 mt-1"
                    >
                      {loading ? (
                        <><i className="fas fa-spinner fa-spin" /> Traitement en cours...</>
                      ) : (
                        <>
                          <i className="fas fa-hand-holding-heart" />
                          {amount ? `Donner ${amount} MAD` : 'Confirmer le don'}
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 leading-relaxed">
                      <i className="fas fa-shield-alt mr-1" />
                      Paiement 100% sécurisé — vos données ne sont jamais partagées
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
