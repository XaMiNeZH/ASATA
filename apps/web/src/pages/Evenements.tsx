import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import FadeIn from '../components/FadeIn'
import { eventsApi, ApiEvent } from '../lib/api'

// ─── Types ────────────────────────────────────────────────────────────────────

type Sport    = 'ski' | 'football' | 'athletisme' | 'general'
type Status   = 'upcoming' | 'past'
type Category = 'competition' | 'tournoi' | 'stage' | 'ceremonie' | 'rencontre'

interface Evenement {
  id: string
  title: string
  subtitle?: string
  date: string
  endDate?: string
  location: string
  locationDetail?: string
  sport: Sport
  category: Category
  status: Status
  description: string
  result?: string
  highlight?: boolean
  image?: string
}

// ─── API → local mapper ───────────────────────────────────────────────────────

function mapEvent(e: ApiEvent): Evenement {
  return {
    id:             e.id,
    title:          e.title,
    subtitle:       e.subtitle ?? undefined,
    date:           e.date,
    endDate:        e.endDate ?? undefined,
    location:       e.location,
    locationDetail: e.locationDetail ?? undefined,
    sport:          (e.sport as Sport) ?? 'general',
    category:       (e.category as Category) ?? 'competition',
    status:         (e.status as Status) ?? 'upcoming',
    description:    e.description,
    result:         e.result ?? undefined,
    highlight:      e.highlight,
    image:          e.image ?? undefined,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SPORT_META: Record<Sport, { label: string; icon: string; accent: string; pale: string; text: string }> = {
  ski:        { label: 'Ski',        icon: 'fas fa-skiing',  accent: '#1565C0', pale: '#E3F2FD', text: '#0D47A1' },
  football:   { label: 'Football',   icon: 'fas fa-futbol',  accent: '#166534', pale: '#DCFCE7', text: '#14532D' },
  athletisme: { label: 'Athlétisme', icon: 'fas fa-running', accent: '#C2410C', pale: '#FFF7ED', text: '#9A3412' },
  general:    { label: 'ASATA',      icon: 'fas fa-star',    accent: '#7C3AED', pale: '#F5F3FF', text: '#5B21B6' },
}

const CAT_META: Record<Category, { label: string; icon: string }> = {
  competition: { label: 'Compétition', icon: 'fas fa-trophy' },
  tournoi:     { label: 'Tournoi',     icon: 'fas fa-shield-alt' },
  stage:       { label: 'Stage',       icon: 'fas fa-graduation-cap' },
  ceremonie:   { label: 'Cérémonie',   icon: 'fas fa-star' },
  rencontre:   { label: 'Rencontre',   icon: 'fas fa-handshake' },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatDateRange(start: string, end?: string): string {
  if (!end) return formatDate(start)
  const s = new Date(start)
  const e = new Date(end)
  const sDay = s.toLocaleDateString('fr-FR', { day: 'numeric' })
  const eDay = e.toLocaleDateString('fr-FR', { day: 'numeric' })
  const month = e.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  return `${sDay} – ${eDay} ${month}`
}

function getDaysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
}

// ─── Countdown chip ───────────────────────────────────────────────────────────

function CountdownChip({ date }: { date: string }) {
  const days = getDaysUntil(date)
  if (days < 0) return null
  if (days === 0) return (
    <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-[11px] font-heading font-bold px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Aujourd'hui
    </span>
  )
  if (days <= 7) return (
    <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-[11px] font-heading font-bold px-2.5 py-1 rounded-full">
      <i className="fas fa-clock text-[9px]" /> Dans {days}j
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 bg-primary-pale text-primary text-[11px] font-heading font-semibold px-2.5 py-1 rounded-full">
      <i className="fas fa-calendar text-[9px]" /> Dans {days}j
    </span>
  )
}

// ─── Spotlight card (upcoming horizontal scroll) ──────────────────────────────

function SpotlightCard({ ev, onClick }: { ev: Evenement; onClick: () => void }) {
  const m = SPORT_META[ev.sport]
  const d = new Date(ev.date)
  const day   = d.toLocaleDateString('fr-FR', { day: '2-digit' })
  const month = d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '').toUpperCase()

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="text-left shrink-0 w-64 bg-white rounded-2xl border border-primary-pale shadow-blue-sm overflow-hidden hover:shadow-blue-md hover:border-primary/30 transition-shadow duration-300 focus:outline-none"
    >
      {/* Sport color top strip */}
      <div className="h-1.5" style={{ background: m.accent }} />

      <div className="p-5">
        {/* Date + countdown */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col items-center justify-center bg-primary-ghost rounded-xl w-14 h-14 shrink-0">
            <span className="font-heading font-black text-primary-dark text-xl leading-none">{day}</span>
            <span className="font-heading font-bold text-primary/60 text-[9px] uppercase tracking-widest mt-0.5">{month}</span>
          </div>
          <CountdownChip date={ev.date} />
        </div>

        {/* Sport pill */}
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-heading font-bold px-2 py-0.5 rounded-full mb-2"
          style={{ background: m.pale, color: m.text }}
        >
          <i className={`${m.icon} text-[9px]`} /> {m.label}
        </span>

        {/* Title */}
        <h3 className="font-heading font-black text-gray-900 text-[15px] leading-tight line-clamp-2">{ev.title}</h3>
        {ev.subtitle && (
          <p className="text-[11px] text-gray-400 font-heading mt-0.5 truncate">{ev.subtitle}</p>
        )}

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
          <i className="fas fa-map-marker-alt text-primary-light text-[10px]" />
          <span className="truncate">{ev.location}</span>
        </div>

        <div className="mt-3 flex items-center gap-1 text-primary text-[11px] font-heading font-semibold">
          Voir les détails <i className="fas fa-arrow-right text-[9px]" />
        </div>
      </div>
    </motion.button>
  )
}

// ─── Event row (main list) ────────────────────────────────────────────────────

function EventRow({ ev, onClick, index }: { ev: Evenement; onClick: () => void; index: number }) {
  const isPast = ev.status === 'past'
  const m = SPORT_META[ev.sport]
  const d = new Date(ev.date)
  const day   = d.toLocaleDateString('fr-FR', { day: '2-digit' })
  const month = d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '').toUpperCase()
  const year  = d.getFullYear()

  return (
    <FadeIn delay={index * 0.05}>
      <motion.article
        onClick={onClick}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.18 }}
        className={`group cursor-pointer flex gap-0 rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-blue-md ${
          isPast
            ? 'bg-white border-gray-100 hover:border-gray-200'
            : 'bg-white border-primary-pale hover:border-primary/25'
        }`}
      >
        {/* Sport accent bar */}
        <div className="w-1 shrink-0" style={{ background: isPast ? '#E5E7EB' : m.accent }} />

        {/* Date block */}
        <div className={`flex flex-col items-center justify-center px-5 py-5 shrink-0 w-20 ${isPast ? 'opacity-50' : ''}`}>
          <span className="font-heading font-black text-primary-dark text-2xl leading-none">{day}</span>
          <span className="font-heading font-bold text-primary/60 text-[10px] uppercase tracking-widest">{month}</span>
          <span className="font-heading text-gray-300 text-[10px] mt-0.5">{year}</span>
        </div>

        {/* Vertical divider */}
        <div className={`w-px self-stretch my-4 ${isPast ? 'bg-gray-100' : 'bg-primary-pale'}`} />

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              <span
                className="inline-flex items-center gap-1 text-[10px] font-heading font-bold px-2 py-0.5 rounded-full"
                style={{ background: m.pale, color: m.text }}
              >
                <i className={`${m.icon} text-[8px]`} /> {m.label}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-heading font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                <i className={`${CAT_META[ev.category].icon} text-[8px]`} /> {CAT_META[ev.category].label}
              </span>
              {ev.result && (
                <span className="inline-flex items-center gap-1 text-[10px] font-heading font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  {ev.result}
                </span>
              )}
            </div>

            <h3 className={`font-heading font-black text-base leading-tight ${isPast ? 'text-gray-600' : 'text-gray-900'}`}>
              {ev.title}
            </h3>
            {ev.subtitle && (
              <p className="text-xs text-gray-400 font-heading mt-0.5">{ev.subtitle}</p>
            )}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <i className="fas fa-map-marker-alt text-primary-light text-[10px]" />
                {ev.location}
              </span>
              <span className="flex items-center gap-1">
                <i className="fas fa-calendar text-primary-light text-[10px]" />
                {formatDateRange(ev.date, ev.endDate)}
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            {!isPast && <CountdownChip date={ev.date} />}
            {ev.image && (
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 hidden sm:block">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="w-8 h-8 rounded-full bg-primary-ghost flex items-center justify-center group-hover:bg-primary transition-colors duration-200 shrink-0">
              <i className="fas fa-arrow-right text-primary group-hover:text-white text-[10px] transition-colors duration-200" />
            </div>
          </div>
        </div>
      </motion.article>
    </FadeIn>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function EventModal({ ev, onClose }: { ev: Evenement; onClose: () => void }) {
  const { t } = useTranslation()
  const isPast = ev.status === 'past'
  const m = SPORT_META[ev.sport]

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative bg-white w-full sm:max-w-xl sm:rounded-3xl rounded-t-3xl overflow-hidden max-h-[92vh] flex flex-col shadow-2xl"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="relative shrink-0" style={{ background: isPast ? '#F9FAFB' : m.accent }}>
          {ev.image ? (
            <div className="h-52 overflow-hidden">
              <img src={ev.image} alt={ev.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
            </div>
          ) : (
            <div className="h-36 flex items-center justify-center relative overflow-hidden">
              {/* dot pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '18px 18px' }}
              />
              <i className={`${m.icon} text-6xl`} style={{ color: isPast ? m.accent : 'rgba(255,255,255,0.3)' }} />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/30 transition text-white z-10"
            aria-label="Fermer"
          >
            <i className="fas fa-times text-sm" />
          </button>

          {/* Status pill overlay */}
          <div className="absolute bottom-3 left-4">
            {isPast ? (
              <span className="inline-flex items-center gap-1.5 bg-white/90 text-gray-600 text-xs font-heading font-bold px-3 py-1.5 rounded-full">
                <i className="fas fa-check-circle text-green-500 text-[10px]" /> {t('events.past')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-white/90 text-green-700 text-xs font-heading font-bold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {t('events.upcoming')}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {/* Sport + category */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold px-2.5 py-1 rounded-full"
              style={{ background: m.pale, color: m.text }}
            >
              <i className={`${m.icon} text-[10px]`} /> {m.label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              <i className={`${CAT_META[ev.category].icon} text-[10px]`} /> {CAT_META[ev.category].label}
            </span>
          </div>

          <h2 className="font-heading font-black text-gray-900 text-2xl leading-tight">{ev.title}</h2>
          {ev.subtitle && (
            <p className="font-heading font-semibold text-sm mt-1" style={{ color: m.accent }}>{ev.subtitle}</p>
          )}

          {/* Info grid */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-primary-ghost rounded-2xl p-4 border border-primary-pale">
              <div className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary/40 mb-1.5">
                <i className="fas fa-calendar-alt mr-1" /> Date
              </div>
              <div className="font-heading font-bold text-gray-900 text-sm leading-snug">
                {formatDateRange(ev.date, ev.endDate)}
              </div>
            </div>
            <div className="bg-primary-ghost rounded-2xl p-4 border border-primary-pale">
              <div className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary/40 mb-1.5">
                <i className="fas fa-map-marker-alt mr-1" /> {t('events.location')}
              </div>
              <div className="font-heading font-bold text-gray-900 text-sm">{ev.location}</div>
              {ev.locationDetail && (
                <div className="text-xs text-gray-400 mt-0.5 leading-snug">{ev.locationDetail}</div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-gray-500 text-sm leading-relaxed">{ev.description}</p>

          {/* Result */}
          {ev.result && (
            <div className="mt-5 flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <i className="fas fa-trophy text-amber-500" />
              </div>
              <div>
                <div className="font-heading font-black text-amber-800 text-xs uppercase tracking-widest mb-1">{t('events.result')}</div>
                <div className="font-heading font-semibold text-amber-700 text-sm">{ev.result}</div>
              </div>
            </div>
          )}

          {/* Countdown for upcoming */}
          {!isPast && (
            <div className="mt-5 flex items-center gap-4 bg-primary-ghost border border-primary-pale rounded-2xl p-4">
              <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-primary text-white shrink-0">
                <span className="font-heading font-black text-xl leading-none">{getDaysUntil(ev.date)}</span>
                <span className="font-heading text-[9px] text-white/70 uppercase tracking-wider">jours</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-heading font-bold text-primary-dark text-sm">Restants avant l'événement</div>
                <div className="text-xs text-gray-400 mt-0.5">Contactez-nous pour participer</div>
              </div>
              <Link
                to="/contact"
                onClick={onClose}
                className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-white font-heading font-bold text-xs px-4 py-2.5 rounded-full hover:bg-primary-dark transition"
              >
                Contact <i className="fas fa-arrow-right text-[9px]" />
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type StatusFilter = 'all' | 'upcoming' | 'past'
type SportFilter  = 'all' | Sport

const SPORT_FILTERS: { key: SportFilter; label: string; icon: string }[] = [
  { key: 'all',        label: 'Tous',       icon: 'fas fa-layer-group' },
  { key: 'ski',        label: 'Ski',        icon: 'fas fa-skiing' },
  { key: 'football',   label: 'Football',   icon: 'fas fa-futbol' },
  { key: 'athletisme', label: 'Athlétisme', icon: 'fas fa-running' },
  { key: 'general',    label: 'Général',    icon: 'fas fa-star' },
]

export default function Evenements() {
  const { t } = useTranslation()
  const [events,       setEvents]       = useState<Evenement[]>([])
  const [apiLoading,   setApiLoading]   = useState(true)
  const [apiError,     setApiError]     = useState('')

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sportFilter,  setSportFilter]  = useState<SportFilter>('all')
  const [activeEvent,  setActiveEvent]  = useState<Evenement | null>(null)
  const [search,       setSearch]       = useState('')

  // Fetch from API
  useEffect(() => {
    eventsApi.list()
      .then(data => setEvents(data.map(mapEvent)))
      .catch(err => setApiError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setApiLoading(false))
  }, [])

  const upcomingEvents = useMemo(
    () => events.filter(e => e.status === 'upcoming').sort((a, b) => a.date < b.date ? -1 : 1),
    [events],
  )

  const filtered = useMemo(() => {
    return events
      .filter(e => statusFilter === 'all' || e.status === statusFilter)
      .filter(e => sportFilter  === 'all' || e.sport  === sportFilter)
      .filter(e =>
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => {
        if (a.status === 'upcoming' && b.status === 'upcoming') return a.date < b.date ? -1 : 1
        if (a.status === 'past'     && b.status === 'past')     return a.date > b.date ? -1 : 1
        return a.status === 'upcoming' ? -1 : 1
      })
  }, [events, statusFilter, sportFilter, search])

  const upcomingFiltered = filtered.filter(e => e.status === 'upcoming')
  const pastFiltered     = filtered.filter(e => e.status === 'past')
  const hasActiveFilters = statusFilter !== 'all' || sportFilter !== 'all' || !!search

  if (apiLoading) {
    return (
      <PageTransition>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400 font-heading">{t('events.loading')}</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (apiError) {
    return (
      <PageTransition>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-circle text-red-400 text-xl" />
            </div>
            <h2 className="font-heading font-black text-gray-900 text-xl mb-2">{t('events.error')}</h2>
            <p className="text-gray-400 text-sm">{apiError}</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-[76px] border-b border-primary-pale overflow-hidden">
        {/* Soft background gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 50%, #EBF5FF 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-5 py-16 grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left */}
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 font-heading mb-6">
              <Link to="/" className="hover:text-primary transition">{t('common.home')}</Link>
              <i className="fas fa-chevron-right text-[9px]" />
              <span className="text-primary font-semibold">{t('nav.events')}</span>
            </div>

            <h1 className="font-heading font-black text-gray-900 text-5xl md:text-6xl leading-[0.95] tracking-tight">
              {t('events.hero.title')}
            </h1>
            <p className="mt-5 text-gray-500 text-lg leading-relaxed max-w-lg">
              {t('events.hero.subtitle')}
            </p>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { value: events.filter(e => e.status === 'upcoming').length, label: t('events.upcoming'), icon: 'fas fa-calendar-check', color: 'text-primary' },
                { value: events.filter(e => e.status === 'past').length,     label: t('events.past'),     icon: 'fas fa-history',        color: 'text-gray-400' },
                { value: 3,                                                   label: 'Sports',             icon: 'fas fa-medal',          color: 'text-amber-500' },
              ].map(({ value, label, icon, color }) => (
                <div key={label} className="flex items-center gap-3 bg-primary-ghost border border-primary-pale rounded-2xl px-5 py-3">
                  <i className={`${icon} ${color} text-lg`} />
                  <div>
                    <div className="font-heading font-black text-gray-900 text-2xl leading-none">{value}</div>
                    <div className="font-heading text-gray-400 text-xs mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — next featured event teaser */}
          {upcomingEvents[0] && (
            <FadeIn direction="right">
              <div
                className="cursor-pointer w-full sm:w-80 rounded-3xl overflow-hidden shadow-blue-lg ring-1 ring-primary/10"
                onClick={() => setActiveEvent(upcomingEvents[0])}
              >
                {/* Blue header */}
                <div className="bg-primary px-6 pt-6 pb-4 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                  />
                  <div className="relative">
                    <span className="inline-flex items-center gap-1.5 bg-white/15 ring-1 ring-white/20 text-white text-[10px] font-heading font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" /> Prochain
                    </span>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-heading font-black text-white text-xl leading-tight line-clamp-2">{upcomingEvents[0].title}</div>
                        {upcomingEvents[0].subtitle && (
                          <div className="text-primary-light text-xs font-heading mt-1">{upcomingEvents[0].subtitle}</div>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center bg-white/10 ring-1 ring-white/20 rounded-xl px-3 py-2 shrink-0">
                        <span className="font-heading font-black text-white text-2xl leading-none">
                          {new Date(upcomingEvents[0].date).toLocaleDateString('fr-FR', { day: '2-digit' })}
                        </span>
                        <span className="font-heading text-primary-light text-[9px] uppercase tracking-widest">
                          {new Date(upcomingEvents[0].date).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* White footer */}
                <div className="bg-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <i className="fas fa-map-marker-alt text-primary-light" />
                    {upcomingEvents[0].location}
                  </div>
                  <CountdownChip date={upcomingEvents[0].date} />
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Upcoming spotlight strip ──────────────────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="bg-primary-ghost border-b border-primary-pale py-10">
          <div className="max-w-7xl mx-auto px-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-gray-900 text-lg">{t('events.upcoming')}</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <button
                onClick={() => { setStatusFilter('upcoming'); setSportFilter('all'); setSearch('') }}
                className="text-xs text-primary font-heading font-semibold hover:underline flex items-center gap-1"
              >
                Voir tous <i className="fas fa-arrow-right text-[9px]" />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {upcomingEvents.map(ev => (
                <div key={ev.id} className="snap-start">
                  <SpotlightCard ev={ev} onClick={() => setActiveEvent(ev)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Search + Filters ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-primary-pale sticky top-[76px] z-30">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

            {/* Search */}
            <div className="relative flex-1 min-w-0 w-full sm:max-w-xs">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Chercher un événement…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-primary-pale bg-primary-ghost text-sm font-heading placeholder-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                  <i className="fas fa-times text-xs" />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-primary-pale" />

            {/* Status tabs */}
            <div className="flex items-center gap-1 bg-primary-ghost rounded-xl p-1">
              {([
                { key: 'all',      label: t('events.filters.all'),      count: events.length },
                { key: 'upcoming', label: t('events.filters.upcoming'),  count: events.filter(e => e.status === 'upcoming').length },
                { key: 'past',     label: t('events.filters.past'),      count: events.filter(e => e.status === 'past').length },
              ] as { key: StatusFilter; label: string; count: number }[]).map(f => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`font-heading font-semibold text-xs px-3 py-2 rounded-lg transition-all flex items-center gap-1 ${
                    statusFilter === f.key
                      ? 'bg-white text-primary shadow-blue-sm ring-1 ring-primary-pale'
                      : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  {f.label}
                  <span className={`text-[9px] rounded-full px-1 font-bold ${statusFilter === f.key ? 'text-primary' : 'text-gray-300'}`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sport pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {SPORT_FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setSportFilter(f.key)}
                  className={`font-heading font-semibold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    sportFilter === f.key
                      ? 'bg-primary text-white shadow-blue-sm'
                      : 'text-gray-400 hover:text-primary hover:bg-primary-ghost border border-transparent hover:border-primary-pale'
                  }`}
                >
                  <i className={`${f.icon} text-[9px]`} />
                  {f.label}
                </button>
              ))}
            </div>

            {/* Reset */}
            {hasActiveFilters && (
              <button
                onClick={() => { setStatusFilter('all'); setSportFilter('all'); setSearch('') }}
                className="text-xs text-gray-400 font-heading font-semibold hover:text-primary flex items-center gap-1 shrink-0 ml-auto"
              >
                <i className="fas fa-times text-[10px]" /> Réinitialiser
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Event list ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFD] py-10 pb-24 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-5">

          {/* Result count */}
          <div className="flex items-center gap-2 mb-6">
            <span className="font-heading font-bold text-gray-900">{filtered.length}</span>
            <span className="text-sm text-gray-400 font-heading">
              {t('events.hero.crumb')}
            </span>
          </div>

          {filtered.length === 0 ? (
            <FadeIn>
              <div className="text-center py-24 bg-white rounded-3xl border border-primary-pale">
                <div className="w-16 h-16 rounded-2xl bg-primary-ghost flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-calendar-times text-primary-light text-2xl" />
                </div>
                <h3 className="font-heading font-black text-gray-900 text-xl mb-2">{t('events.empty')}</h3>
                <p className="text-gray-400 text-sm mb-6">{t('events.empty')}</p>
                <button
                  onClick={() => { setStatusFilter('all'); setSportFilter('all'); setSearch('') }}
                  className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold text-sm px-5 py-2.5 rounded-full hover:bg-primary-dark transition"
                >
                  <i className="fas fa-redo text-xs" /> Tout afficher
                </button>
              </div>
            </FadeIn>
          ) : (
            <div className="flex flex-col gap-8">

              {/* Upcoming block */}
              {upcomingFiltered.length > 0 && (
                <div>
                  {statusFilter === 'all' && (
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-heading font-black text-gray-900">{t('events.upcoming')}</span>
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="h-px flex-1 bg-primary-pale" />
                      <span className="text-xs text-gray-400 font-heading">{upcomingFiltered.length}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    {upcomingFiltered.map((ev, i) => (
                      <EventRow key={ev.id} ev={ev} onClick={() => setActiveEvent(ev)} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Past block */}
              {pastFiltered.length > 0 && (
                <div>
                  {statusFilter === 'all' && (
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-heading font-black text-gray-500">{t('events.past')}</span>
                      <span className="h-px flex-1 bg-gray-200" />
                      <span className="text-xs text-gray-400 font-heading">{pastFiltered.length}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    {pastFiltered.map((ev, i) => (
                      <EventRow key={ev.id} ev={ev} onClick={() => setActiveEvent(ev)} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-5">
          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden bg-primary p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-8 items-center">
              {/* dots */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
              {/* glow */}
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-primary-light/20 blur-3xl pointer-events-none" />

              <div className="relative">
                <span className="inline-flex items-center gap-1.5 bg-white/15 text-white/80 text-[11px] font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  <i className="fas fa-handshake text-[9px]" /> Partenariat
                </span>
                <h3 className="font-heading font-black text-white text-3xl md:text-4xl leading-tight mb-3">
                  Vous organisez un événement ?
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-lg">
                  L'ASATA est ouverte aux partenariats et co-organisations sportives dans la région d'Asni et du Haut Atlas marocain.
                </p>
              </div>

              <div className="relative shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-7 py-4 rounded-full hover:bg-primary-pale transition text-sm shadow-blue-sm"
                >
                  <i className="fas fa-envelope" /> Nous contacter
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Modal ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeEvent && (
          <EventModal ev={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </AnimatePresence>

    </PageTransition>
  )
}
