import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import FadeIn from '../components/FadeIn'

// ─── Types ────────────────────────────────────────────────────────────────────

type Sport = 'ski' | 'football' | 'athletisme' | 'general'
type Status = 'upcoming' | 'past'
type Category = 'competition' | 'tournoi' | 'stage' | 'ceremonie' | 'rencontre'

interface Evenement {
  id: number
  title: string
  subtitle?: string
  date: string          // ISO date string  "2026-06-14"
  endDate?: string
  location: string
  locationDetail?: string
  sport: Sport
  category: Category
  status: Status
  description: string
  result?: string       // for past events
  highlight?: boolean   // featured card
  image?: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const events: Evenement[] = [
  {
    id: 1,
    title: 'Stage d\'Été Ski & Montagne',
    subtitle: 'Formation technique — Toutes catégories',
    date: '2026-06-20',
    endDate: '2026-06-27',
    location: 'Oukaimeden',
    locationDetail: 'Station de ski d\'Oukaimeden — Alt. 2 600 m',
    sport: 'ski',
    category: 'stage',
    status: 'upcoming',
    description: 'Stage intensif d\'une semaine pour les jeunes skieurs du club. Au programme : perfectionnement technique, initiation au slalom géant et randonnée en haute montagne avec nos moniteurs certifiés.',
    highlight: true,
  },
  {
    id: 2,
    title: 'Tournoi de Football Asni',
    subtitle: '3ème Édition — Garçons & Filles',
    date: '2026-05-15',
    endDate: '2026-05-17',
    location: 'Asni',
    locationDetail: 'Terrain de football d\'Asni',
    sport: 'football',
    category: 'tournoi',
    status: 'upcoming',
    description: 'La troisième édition du tournoi de football de l\'ASATA réunit les équipes des communes d\'Al Haouz. Catégories U12, U16, et senior masculin et féminin. Inscriptions ouvertes.',
  },
  {
    id: 3,
    title: 'Championnat National d\'Athlétisme',
    subtitle: 'Délégation ASATA — FRMA',
    date: '2026-09-06',
    location: 'Rabat',
    locationDetail: 'Complexe sportif Prince Moulay Abdallah',
    sport: 'athletisme',
    category: 'competition',
    status: 'upcoming',
    description: 'Notre délégation d\'athlètes participera au Championnat National sous les couleurs de l\'ASATA, encadrée par M. Ahmed BIRI, champion national en titre du 110m haies.',
  },
  {
    id: 4,
    title: 'Journée Portes Ouvertes ASATA',
    subtitle: '16ème anniversaire de l\'association',
    date: '2026-06-06',
    location: 'Asni',
    locationDetail: 'Siège de l\'ASATA — Village d\'Asni',
    sport: 'general',
    category: 'ceremonie',
    status: 'upcoming',
    description: 'Pour célébrer les 16 ans de l\'ASATA, nous ouvrons nos portes à la communauté. Démonstrations sportives, remise de prix aux athlètes méritants et moment convivial.',
  },
  {
    id: 5,
    title: 'Open African Masters Athletics',
    subtitle: '1ère place · 100m & 110m haies',
    date: '2025-10-12',
    location: 'Tunis, Tunisie',
    locationDetail: 'Stade El Menzah',
    sport: 'athletisme',
    category: 'competition',
    status: 'past',
    description: 'M. Ahmed BIRI a représenté brillamment l\'ASATA lors de l\'Open African Masters à Tunis, décrochant deux médailles d\'or en 100m et 110m haies.',
    result: '🥇 1ère place — 100m & 110m haies',
    highlight: true,
  },
  {
    id: 6,
    title: 'Tournoi Ramadan de Football',
    subtitle: 'Trophée ASATA · Édition 2025',
    date: '2025-03-20',
    endDate: '2025-03-28',
    location: 'Asni',
    locationDetail: 'Terrain de football d\'Asni',
    sport: 'football',
    category: 'tournoi',
    status: 'past',
    description: 'L\'ASATA a organisé et remporté le tournoi de football du Ramadan, rassemblant 8 équipes de la province d\'Al Haouz. Un tournoi marqué par un esprit fair-play exemplaire.',
    result: '🏆 Vainqueur du tournoi',
    image: '/footballActivitiesPics/asata tournoi raman winners.jpg',
  },
  {
    id: 7,
    title: 'Championnat International — Shkodër',
    subtitle: '110m haies & 200m · Albanie',
    date: '2025-06-08',
    location: 'Shkodër, Albanie',
    sport: 'athletisme',
    category: 'competition',
    status: 'past',
    description: 'Participation internationale de M. Ahmed BIRI au championnat de Shkodër avec un double podium remarquable.',
    result: '🥇 1ère place — 110m haies · 🥇 1ère place — 200m',
  },
  {
    id: 8,
    title: '2ème Édition Compétition Ski Alpin',
    subtitle: 'Coupe ASATA — Slalom Géant',
    date: '2025-01-25',
    location: 'Oukaimeden',
    locationDetail: 'Pistes noires & rouges · Alt. 2 600 m',
    sport: 'ski',
    category: 'competition',
    status: 'past',
    description: 'La deuxième édition de la compétition de ski alpin organisée par l\'ASATA a réuni 34 compétiteurs issus de plusieurs clubs du Maroc. Slalom géant chronométré sur 2 manches.',
    image: '/skiActivitiesPics/Ski comp 2eme edution fiche.jpg',
  },
  {
    id: 10,
    title: 'Rencontre Amicale Football',
    subtitle: 'ASATA vs Club Ait Ourir',
    date: '2025-09-14',
    location: 'Ait Ourir',
    sport: 'football',
    category: 'rencontre',
    status: 'past',
    description: 'Match amical entre l\'équipe senior de l\'ASATA et le club d\'Ait Ourir, dans le cadre de la préparation de la saison 2025–2026.',
    result: '2 – 1 (Victoire ASATA)',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SPORT_META: Record<Sport, { label: string; icon: string; color: string; bg: string }> = {
  ski:        { label: 'Ski',         icon: 'fas fa-skiing',  color: 'text-blue-600',   bg: 'bg-blue-50' },
  football:   { label: 'Football',    icon: 'fas fa-futbol',  color: 'text-green-600',  bg: 'bg-green-50' },
  athletisme: { label: 'Athlétisme',  icon: 'fas fa-running', color: 'text-orange-600', bg: 'bg-orange-50' },
  general:    { label: 'ASATA',       icon: 'fas fa-star',    color: 'text-primary',    bg: 'bg-primary-pale' },
}

const CAT_META: Record<Category, { label: string; icon: string }> = {
  competition: { label: 'Compétition', icon: 'fas fa-trophy' },
  tournoi:     { label: 'Tournoi',     icon: 'fas fa-shield-alt' },
  stage:       { label: 'Stage',       icon: 'fas fa-graduation-cap' },
  ceremonie:   { label: 'Cérémonie',   icon: 'fas fa-star' },
  rencontre:   { label: 'Rencontre',   icon: 'fas fa-handshake' },
}

function formatDate(iso: string, short = false): string {
  const d = new Date(iso)
  if (short) {
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
  }
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
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

function getDay(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit' })
}

function getMonth(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '').toUpperCase()
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DateBadge({ date, status }: { date: string; status: Status }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl px-4 py-3 shrink-0 min-w-[64px] ${
      status === 'upcoming'
        ? 'bg-primary text-white shadow-blue-sm'
        : 'bg-gray-100 text-gray-500'
    }`}>
      <span className="font-heading font-black text-2xl leading-none">{getDay(date)}</span>
      <span className="font-heading font-bold text-[10px] uppercase tracking-widest mt-0.5">{getMonth(date)}</span>
    </div>
  )
}

function SportBadge({ sport }: { sport: Sport }) {
  const m = SPORT_META[sport]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-semibold ${m.color} ${m.bg}`}>
      <i className={`${m.icon} text-[10px]`} />
      {m.label}
    </span>
  )
}

function CategoryBadge({ category }: { category: Category }) {
  const m = CAT_META[category]
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-semibold text-gray-500 bg-gray-100">
      <i className={`${m.icon} text-[10px]`} />
      {m.label}
    </span>
  )
}

// ─── Event Card ───────────────────────────────────────────────────────────────

function EventCard({ ev, onClick }: { ev: Evenement; onClick: () => void }) {
  const isPast = ev.status === 'past'
  return (
    <article
      onClick={onClick}
      className={`group cursor-pointer bg-white rounded-2xl ring-1 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-md ${
        isPast ? 'ring-gray-100 opacity-90 hover:opacity-100' : 'ring-primary-pale hover:ring-primary/20'
      }`}
    >
      {/* Top color strip */}
      <div className={`h-1 ${isPast ? 'bg-gray-200' : 'bg-gradient-to-r from-primary to-primary-light'}`} />

      {/* Optional image */}
      {ev.image && (
        <div className="h-40 overflow-hidden">
          <img
            src={ev.image}
            alt={ev.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5 flex gap-4 items-start">
        <DateBadge date={ev.date} status={ev.status} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <SportBadge sport={ev.sport} />
            <CategoryBadge category={ev.category} />
          </div>

          <h3 className={`font-heading font-black leading-tight text-base ${isPast ? 'text-gray-700' : 'text-primary-dark'}`}>
            {ev.title}
          </h3>
          {ev.subtitle && (
            <p className="text-xs text-gray-400 font-heading mt-0.5">{ev.subtitle}</p>
          )}

          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-gray-400">
            <i className="fas fa-map-marker-alt text-primary-light" />
            <span className="truncate">{ev.location}</span>
            {ev.endDate && (
              <>
                <span className="mx-1 text-gray-200">·</span>
                <i className="fas fa-calendar-alt text-primary-light" />
                <span>{formatDateRange(ev.date, ev.endDate)}</span>
              </>
            )}
          </div>

          {ev.result && (
            <div className={`mt-2.5 inline-flex items-center gap-1.5 text-xs font-heading font-semibold px-2.5 py-1 rounded-full ${
              ev.result.startsWith('🥇') || ev.result.startsWith('🏆')
                ? 'bg-amber-50 text-amber-700'
                : ev.result.startsWith('✅')
                ? 'bg-green-50 text-green-700'
                : 'bg-primary-pale text-primary'
            }`}>
              {ev.result}
            </div>
          )}

          <div className="mt-3 text-xs text-primary font-heading font-semibold opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
            Voir les détails <i className="fas fa-arrow-right text-[9px]" />
          </div>
        </div>
      </div>
    </article>
  )
}

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({ ev, onClick }: { ev: Evenement; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group relative rounded-3xl overflow-hidden ring-1 ring-primary/20 shadow-blue-lg"
      style={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}
    >
      {/* background dots */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />
      {/* glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary-light/20 blur-3xl pointer-events-none" />

      <div className="relative p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/15 ring-1 ring-white/20 rounded-full px-3 py-1 text-white text-[11px] font-heading font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
              Prochain événement
            </span>
            <SportBadge sport={ev.sport} />
          </div>
          <h2 className="font-heading font-black text-white text-3xl md:text-4xl leading-tight">
            {ev.title}
          </h2>
          {ev.subtitle && (
            <p className="text-primary-light font-heading font-semibold text-sm mt-1">{ev.subtitle}</p>
          )}
          <p className="text-white/70 mt-4 leading-relaxed max-w-xl text-sm">{ev.description}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <i className="fas fa-calendar text-primary-light" />
              {formatDateRange(ev.date, ev.endDate)}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-primary-light" />
              {ev.location}
            </span>
          </div>
          <button
            onClick={onClick}
            className="mt-6 inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-6 py-3 rounded-full hover:bg-primary-pale transition text-sm"
          >
            Voir les détails <i className="fas fa-arrow-right text-xs" />
          </button>
        </div>

        {/* Big date */}
        <div className="hidden md:flex flex-col items-center justify-center bg-white/10 ring-1 ring-white/20 rounded-2xl px-8 py-6 min-w-[120px]">
          <span className="font-heading font-black text-white text-5xl leading-none">{getDay(ev.date)}</span>
          <span className="font-heading font-bold text-primary-light text-sm uppercase tracking-widest mt-1">{getMonth(ev.date)}</span>
          <span className="font-heading text-white/50 text-xs mt-1">{new Date(ev.date).getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function EventModal({ ev, onClose }: { ev: Evenement; onClose: () => void }) {
  const isPast = ev.status === 'past'
  const sportMeta = SPORT_META[ev.sport]
  const catMeta = CAT_META[ev.category]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header band */}
        <div className={`h-2 ${isPast ? 'bg-gray-300' : 'bg-gradient-to-r from-primary-dark via-primary to-primary-light'}`} />

        {/* Optional image */}
        {ev.image && (
          <div className="h-48 overflow-hidden shrink-0">
            <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-gray-100 transition text-gray-500 z-10"
          aria-label="Fermer"
        >
          <i className="fas fa-times text-sm" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-7">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <SportBadge sport={ev.sport} />
            <CategoryBadge category={ev.category} />
            {isPast ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-semibold text-gray-400 bg-gray-100">
                <i className="fas fa-check text-[10px]" /> Terminé
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-semibold text-green-600 bg-green-50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> À venir
              </span>
            )}
          </div>

          <h2 className="font-heading font-black text-primary-dark text-2xl leading-tight">{ev.title}</h2>
          {ev.subtitle && (
            <p className="text-primary font-heading font-semibold text-sm mt-1">{ev.subtitle}</p>
          )}

          {/* Info grid */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-primary-ghost rounded-2xl p-4 border border-primary-pale">
              <div className="text-[10px] font-heading uppercase tracking-widest text-primary/50 mb-1">Date</div>
              <div className="font-heading font-bold text-primary-dark text-sm">
                {formatDateRange(ev.date, ev.endDate)}
              </div>
            </div>
            <div className="bg-primary-ghost rounded-2xl p-4 border border-primary-pale">
              <div className="text-[10px] font-heading uppercase tracking-widest text-primary/50 mb-1">Lieu</div>
              <div className="font-heading font-bold text-primary-dark text-sm">{ev.location}</div>
              {ev.locationDetail && (
                <div className="text-xs text-gray-400 mt-0.5">{ev.locationDetail}</div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-5">
            <p className="text-gray-600 text-sm leading-relaxed">{ev.description}</p>
          </div>

          {/* Result */}
          {ev.result && (
            <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-100 p-4 flex items-start gap-3">
              <i className="fas fa-trophy text-amber-500 mt-0.5" />
              <div>
                <div className="font-heading font-bold text-amber-800 text-sm uppercase tracking-wider mb-1">Résultat</div>
                <div className="text-amber-700 text-sm font-semibold">{ev.result}</div>
              </div>
            </div>
          )}

          {/* CTA for upcoming */}
          {!isPast && (
            <div className="mt-5 rounded-2xl bg-primary-ghost border border-primary-pale p-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-heading font-bold text-primary-dark text-sm">Intéressé ?</div>
                <div className="text-xs text-gray-400 mt-0.5">Contactez-nous pour plus d'informations</div>
              </div>
              <Link
                to="/contact"
                onClick={onClose}
                className="shrink-0 inline-flex items-center gap-2 bg-primary text-white font-heading font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-primary-dark transition"
              >
                Contact <i className="fas fa-arrow-right text-xs" />
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
  { key: 'all',        label: 'Tous les sports', icon: 'fas fa-layer-group' },
  { key: 'ski',        label: 'Ski',             icon: 'fas fa-skiing' },
  { key: 'football',   label: 'Football',         icon: 'fas fa-futbol' },
  { key: 'athletisme', label: 'Athlétisme',       icon: 'fas fa-running' },
  { key: 'general',    label: 'Général',          icon: 'fas fa-star' },
]

export default function Evenements() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sportFilter,  setSportFilter]  = useState<SportFilter>('all')
  const [activeEvent,  setActiveEvent]  = useState<Evenement | null>(null)

  // Next upcoming highlighted event
  const featuredEvent = useMemo(
    () => events.find(e => e.status === 'upcoming' && e.highlight) ?? events.find(e => e.status === 'upcoming'),
    [],
  )

  const filtered = useMemo(() => {
    return events
      .filter(e => statusFilter === 'all' || e.status === statusFilter)
      .filter(e => sportFilter  === 'all' || e.sport  === sportFilter)
      .sort((a, b) => {
        // Upcoming: soonest first; past: most recent first
        if (a.status === 'upcoming' && b.status === 'upcoming') return a.date < b.date ? -1 : 1
        if (a.status === 'past'     && b.status === 'past')     return a.date > b.date ? -1 : 1
        // Mixed: upcoming before past
        return a.status === 'upcoming' ? -1 : 1
      })
  }, [statusFilter, sportFilter])

  const upcomingCount = events.filter(e => e.status === 'upcoming').length
  const pastCount     = events.filter(e => e.status === 'past').length

  return (
    <PageTransition>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-[76px]">
        {/* Photo background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/skiActivitiesPics/PHOTO-2026-04-07-12-10-44.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* Blue overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(25,118,210,0.82) 0%, rgba(21,101,192,0.78) 50%, rgba(13,71,161,0.88) 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        {/* rings */}
        <div className="absolute -right-20 -bottom-20 w-[380px] h-[380px] rounded-full border border-white/10" />
        <div className="absolute right-24 top-16 w-[140px] h-[140px] rounded-full border border-white/10" />

        <div className="relative max-w-7xl mx-auto px-5 pt-16 pb-24">
          {/* Breadcrumb */}
          <div className="text-white/70 text-sm flex items-center gap-2 mb-6">
            <Link to="/" className="hover:text-white transition">Accueil</Link>
            <span>›</span>
            <span className="text-white">Événements</span>
          </div>

          <h1
            className="font-heading font-black text-white leading-[0.95] text-5xl md:text-7xl"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
          >
            Nos<br />Événements
          </h1>
          <p className="mt-6 max-w-xl text-white/75 text-lg leading-relaxed">
            Compétitions, tournois, stages et cérémonies — toute l'actualité sportive de l'ASATA.
          </p>

          {/* Category quick-filters */}
          <div className="mt-10 flex flex-wrap gap-2">
            {[
              { icon: 'fas fa-trophy',        label: 'Compétitions' },
              { icon: 'fas fa-shield-alt',    label: 'Tournois' },
              { icon: 'fas fa-graduation-cap',label: 'Stages' },
              { icon: 'fas fa-handshake',     label: 'Rencontres' },
              { icon: 'fas fa-star',          label: 'Cérémonies' },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-heading font-semibold transition cursor-default"
              >
                <i className={`${icon} text-white/60 text-xs`} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Wave */}
        <svg className="block w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0,60 L0,30 Q720,0 1440,30 L1440,60 Z" fill="#F8F9FB" />
        </svg>
      </section>

      {/* ── Featured next event ── */}
      {featuredEvent && statusFilter === 'all' && sportFilter === 'all' && (
        <section className="bg-[#F8F9FB] pt-14 pb-0">
          <div className="max-w-7xl mx-auto px-5">
            <FadeIn>
              <FeaturedCard ev={featuredEvent} onClick={() => setActiveEvent(featuredEvent)} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Filters ── */}
      <section className="bg-[#F8F9FB] pt-12 pb-0 sticky top-[76px] z-30">
        <div className="max-w-7xl mx-auto px-5">
          <div className="bg-white rounded-2xl ring-1 ring-primary-pale shadow-blue-sm p-4 flex flex-col sm:flex-row gap-4">
            {/* Status tabs */}
            <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
              {([
                { key: 'all',      label: 'Tous',    count: events.length },
                { key: 'upcoming', label: 'À venir', count: upcomingCount },
                { key: 'past',     label: 'Passés',  count: pastCount },
              ] as { key: StatusFilter; label: string; count: number }[]).map(f => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`font-heading font-semibold text-sm px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    statusFilter === f.key
                      ? 'bg-primary text-white shadow-blue-sm'
                      : 'text-gray-500 hover:text-primary hover:bg-primary-ghost'
                  }`}
                >
                  {f.label}
                  <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${
                    statusFilter === f.key ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>{f.count}</span>
                </button>
              ))}
            </div>

            {/* Sport filter */}
            <div className="flex items-center gap-1 flex-wrap">
              {SPORT_FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setSportFilter(f.key)}
                  className={`font-heading font-semibold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    sportFilter === f.key
                      ? 'bg-primary-pale text-primary ring-1 ring-primary/20'
                      : 'text-gray-400 hover:text-primary hover:bg-primary-ghost'
                  }`}
                >
                  <i className={`${f.icon} text-[10px]`} />
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* subtle bottom border */}
        <div className="h-4 bg-[#F8F9FB]" />
      </section>

      {/* ── Event grid ── */}
      <section className="bg-[#F8F9FB] py-10 pb-24">
        <div className="max-w-7xl mx-auto px-5">

          {/* Result count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-400 font-heading">
              <span className="font-bold text-primary-dark">{filtered.length}</span> événement{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            </p>
            {(statusFilter !== 'all' || sportFilter !== 'all') && (
              <button
                onClick={() => { setStatusFilter('all'); setSportFilter('all') }}
                className="text-xs text-primary font-heading font-semibold hover:underline flex items-center gap-1"
              >
                <i className="fas fa-times text-[10px]" /> Réinitialiser
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20 bg-white rounded-3xl ring-1 ring-primary-pale">
                <div className="w-16 h-16 rounded-full bg-primary-pale flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-calendar-times text-primary-light text-2xl" />
                </div>
                <h3 className="font-heading font-black text-primary-dark text-xl mb-2">Aucun événement trouvé</h3>
                <p className="text-gray-400 text-sm">Essayez un autre filtre ou revenez plus tard.</p>
              </div>
            </FadeIn>
          ) : (
            <>
              {/* Upcoming section */}
              {filtered.some(e => e.status === 'upcoming') && (
                <div className="mb-10">
                  {statusFilter === 'all' && (
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-heading font-black text-primary-dark text-lg">À venir</span>
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="h-px flex-1 bg-primary-pale" />
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered
                      .filter(e => e.status === 'upcoming')
                      .map((ev, i) => (
                        <FadeIn key={ev.id} delay={i * 0.06}>
                          <EventCard ev={ev} onClick={() => setActiveEvent(ev)} />
                        </FadeIn>
                      ))}
                  </div>
                </div>
              )}

              {/* Past section */}
              {filtered.some(e => e.status === 'past') && (
                <div>
                  {statusFilter === 'all' && (
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-heading font-black text-gray-600 text-lg">Événements passés</span>
                      <span className="h-px flex-1 bg-gray-100" />
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered
                      .filter(e => e.status === 'past')
                      .map((ev, i) => (
                        <FadeIn key={ev.id} delay={i * 0.06}>
                          <EventCard ev={ev} onClick={() => setActiveEvent(ev)} />
                        </FadeIn>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-white" style={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
              <i className="fas fa-calendar-plus text-primary-light text-3xl mb-4 block" />
              <h3 className="font-heading font-black text-3xl md:text-4xl mb-3">
                Vous organisez un événement ?
              </h3>
              <p className="text-white/75 mb-7 leading-relaxed">
                L'ASATA est ouverte aux partenariats et co-organisations sportives dans la région d'Asni et du Haut Atlas.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-8 py-4 rounded-full hover:bg-primary-pale transition"
              >
                <i className="fas fa-envelope" /> Nous contacter
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Event Detail Modal ── */}
      <AnimatePresence>
        {activeEvent && (
          <EventModal ev={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </AnimatePresence>

    </PageTransition>
  )
}
