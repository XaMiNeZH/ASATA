import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { TEAM_PHOTOS, TRAINER_PHOTOS } from '../data/images'

// ─── Data ────────────────────────────────────────────────────────────────────

const president = {
  name: 'M. Med BOUSERHAN',
  role: 'Président · Comité Directeur',
  since: 2008,
  photo: TEAM_PHOTOS.president,
  quote:
    "Notre mission dépasse le sport — nous formons une communauté qui porte les couleurs d'Asni et de l'Atlas, du sommet du Toubkal aux compétitions nationales.",
  bio: "À la tête de l'ASATA depuis sa fondation, M. Med BOUSERHAN a construit une association sportive solide, respectée au niveau régional et national. Son leadership a permis l'affiliation aux trois fédérations nationales et l'obtention de l'accréditation professionnelle officielle en 2024.",
}

const vicePresidents = [
  {
    photo: TEAM_PHOTOS.jamilaChenter,
    name: 'Mme. Jamila CHENTER',
    short: 'Jamila CHENTER',
    role: '1ère Vice-Présidente',
    focus: 'Gouvernance & Développement',
    rank: 'VP·01',
  },
  {
    photo: TEAM_PHOTOS.faridBouserhan,
    name: 'M. Farid BOUSERHAN',
    short: 'Farid BOUSERHAN',
    role: '2ème Vice-Président',
    focus: 'Sport & Performance',
    rank: 'VP·02',
  },
]

const bureau = [
  { photo: TEAM_PHOTOS.abdEssamad,      name: 'M. Abd Essamad AIT BEL HAJ', role: 'Secrétaire Général',  pole: 'Secrétariat' },
  { photo: TEAM_PHOTOS.medAitChakart,   name: 'M. Med AIT CHAKART',          role: 'Secrétaire Adjoint',  pole: 'Secrétariat' },
  { photo: TEAM_PHOTOS.medAourik,       name: 'M. Med AOURIK',               role: 'Trésorier',           pole: 'Trésorerie' },
  { photo: TEAM_PHOTOS.noraAchebani,    name: 'Mlle. Nora ACHEBANI',         role: 'Trésorière Adjointe', pole: 'Trésorerie' },
  { photo: TEAM_PHOTOS.rachidBouserhan, name: 'M. Rachid BOUSERHAN',         role: 'Conseiller',          pole: 'Conseil' },
  { photo: TEAM_PHOTOS.medElAouad,      name: 'M. Med EL AOUAD',             role: 'Conseiller',          pole: 'Conseil' },
  { photo: TEAM_PHOTOS.azizAitBourhim,  name: 'M. Aziz AIT BOURHIM',         role: 'Conseiller',          pole: 'Conseil' },
  { photo: TEAM_PHOTOS.elmajidOussais,  name: 'M. Abd Elmajid OUSSAIS',      role: 'Conseiller',          pole: 'Conseil' },
]

const sportClubs = [
  {
    id: 'ski',
    code: 'SKI',
    name: 'Ski & Sports de Montagne',
    short: 'Ski',
    fed: 'FRMSSM',
    icon: 'fas fa-skiing',
    accent: '#1565C0',
    members: [
      { photo: TEAM_PHOTOS.faridBouserhan, name: 'M. Farid BOUSERHAN',   role: 'Président · Commission Technique · Porte-parole' },
      { photo: TRAINER_PHOTOS.rachidChib,    name: 'M. Rachid CHIB',       role: 'Entraîneur' },
      { photo: TEAM_PHOTOS.noraAchebani,   name: 'Mlle. Nora ACHEBANI',  role: 'Conseillère' },
      { photo: null,                        name: 'Mme. Maryem EL QOTBI', role: 'Secrétaire' },
      { photo: TEAM_PHOTOS.medAourik,      name: 'M. Med AOURIK',        role: 'Trésorier' },
    ],
    desc: 'Discipline historique de l\'ASATA depuis 2008.',
  },
  {
    id: 'football',
    code: 'FC',
    name: 'Club de Football',
    short: 'Football',
    fed: 'FRMF',
    icon: 'fas fa-futbol',
    accent: '#0D47A1',
    members: [],
    desc: '32 athlètes formés sur les terrains régionaux.',
  },
  {
    id: 'athletisme',
    code: 'AT',
    name: 'Club d\'Athlétisme',
    short: 'Athlétisme',
    fed: 'FRMA',
    icon: 'fas fa-running',
    accent: '#42A5F5',
    members: [],
    desc: '18 athlètes en piste et trail de montagne.',
  },
]

const coaches = [
  {
    photo: TRAINER_PHOTOS.rachidChib,
    name: 'M. Rachid CHIB',
    role: 'Moniteur & Entraîneur Ski',
    club: 'Ski',
    fed: 'FRMSSM',
    color: 'from-blue-300 to-blue-500',
    highlights: [
      '1ère place — Coupe du Trône Ski Alpin 2000',
      'Championnats du Maroc 1998–2004',
      'Moniteur ski à Oukaimeden depuis 2005',
      'Guide montagne Haut Atlas',
    ],
  },
  {
    photo: TRAINER_PHOTOS.ahmedBiri,
    name: 'M. Ahmed BIRI',
    role: 'Entraîneur — Champion National',
    club: 'Athlétisme',
    fed: 'FRMA',
    color: 'from-blue-200 to-blue-400',
    highlights: [
      '1ère place — Open African Masters, Tunis (2025)',
      '1ère — Champ. International Shkodër, 110m haies (2024 & 2025)',
      '2ème — Championnat National Salé, 110m haies (2024)',
      '1ère — Champ. International Shkodër, 200m (2024)',
    ],
  },
  {
    photo: TRAINER_PHOTOS.younesElMarkat,
    name: 'M. Younes EL MARKAT',
    role: 'Entraîneur Football',
    club: 'Football',
    fed: 'FRMF',
    color: 'from-blue-300 to-blue-500',
    highlights: [
      'Toutes catégories (Garçons & Filles)',
      'Ancien joueur de football',
      "Équipe futsal ASATA en Super Ligue Marrakech-Safi 2024–2025",
    ],
  },
  {
    photo: TRAINER_PHOTOS.taherAitElBaraka,
    name: 'M. Taher AIT EL BARAKA',
    role: 'Entraîneur U10 & U12',
    club: 'Football',
    fed: 'FRMF',
    color: 'from-blue-300 to-blue-500',
    highlights: [
      'Licencié universitaire',
      "Élément associatif actif — territoire d'El Haouz",
      'Expérience dans plusieurs programmes gouvernementaux',
    ],
  },
  {
    photo: TRAINER_PHOTOS.essadiqAitBenAli,
    name: 'M. Essadiq AIT BEN ALI',
    role: 'Entraîneur U10, U12 & U16',
    club: 'Football',
    fed: 'FRMF',
    color: 'from-blue-300 to-blue-500',
    highlights: [
      "Pilier fondateur du staff sportif ASATA",
      "Actif depuis la création de l'association",
      'Palmarès classé parmi les meilleurs coachs',
    ],
  },
  {
    photo: TRAINER_PHOTOS.soufianAzzaimi,
    name: 'M. Soufian AZZAIMI',
    role: 'Entraîneur Équipe A Futsal',
    club: 'Football',
    fed: 'FRMF',
    color: 'from-blue-300 to-blue-500',
    highlights: [
      'Super Ligue régionale Marrakech-Safi',
      'Encadrement de l\'équipe première',
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(full: string): string {
  const parts = full.replace(/^(M\.|Mme\.|Mlle\.)\s/, '').split(/\s+/).filter(Boolean)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function Avatar({ photo, name, size = 80, square = false, ring = false }: { photo: string | null; name: string; size?: number; square?: boolean; ring?: boolean }) {
  const cls = `${square ? 'rounded-2xl' : 'rounded-full'} object-cover shrink-0 ${ring ? 'ring-2 ring-white/40' : ''}`
  if (photo) {
    return <img src={photo} alt={name} className={cls} style={{ width: size, height: size }} />
  }
  return (
    <div
      className={`${square ? 'rounded-2xl' : 'rounded-full'} flex items-center justify-center font-heading font-black shrink-0 bg-primary-pale text-primary`}
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {getInitials(name)}
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

type Coach = typeof coaches[0]

export default function Equipe() {
  const [activeCoach, setActiveCoach] = useState<Coach | null>(null)
  const [activeClub, setActiveClub] = useState<string>('ski')
  const [activePole, setActivePole] = useState<string>('Tous')
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  // close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveCoach(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const poles = ['Tous', 'Secrétariat', 'Trésorerie', 'Conseil']
  const filteredBureau = activePole === 'Tous' ? bureau : bureau.filter(b => b.pole === activePole)
  const club = sportClubs.find(c => c.id === activeClub) ?? sportClubs[0]

  return (
    <PageTransition>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── HERO — Editorial cover (light blue + white)                     ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen bg-white overflow-hidden pt-[76px]">
        {/* Background image with parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/skiActivitiesPics/PHOTO-2026-04-07-12-10-30.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(1.1) saturate(0.9)',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(227,242,253,0.82) 50%, rgba(187,222,251,0.88) 100%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(21,101,192,0.08) 1px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        </motion.div>

        {/* Top meta bar */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-8 flex items-center justify-between text-primary/60 font-mono text-[11px] tracking-widest uppercase">
          <Link to="/" className="hover:text-primary-dark transition flex items-center gap-2">
            <i className="fas fa-arrow-left text-[10px]" /> Accueil
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <span>Édition 2024–2028</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>15 Membres</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>Asni · Maroc</span>
          </div>
        </div>

        {/* Main hero content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 md:pt-24 pb-32">
          {/* Year stamp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-[11px] tracking-[0.4em] text-primary uppercase">№ 01 / Comité</span>
            <span className="h-px w-16 bg-primary" />
            <span className="font-mono text-[11px] tracking-[0.4em] text-primary/40 uppercase">2024</span>
          </motion.div>

          {/* Massive title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading font-black text-primary-dark leading-[0.85] tracking-tighter"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
          >
            <span className="block">Le Comité.</span>
            <span className="block text-primary-light italic font-light">Les visages.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 max-w-2xl text-gray-600 text-lg md:text-xl leading-relaxed font-light"
          >
            Quinze femmes et hommes — un président fondateur, deux vice-président·e·s, huit membres du bureau et quatre directions sportives — qui font vivre l'ASATA depuis le Haut Atlas marocain.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl"
          >
            {[
              { k: '15', v: 'Membres' },
              { k: '03', v: 'Fédérations' },
              { k: '16', v: 'Années' },
              { k: '01', v: 'Mission' },
            ].map((s, i) => (
              <div key={i} className="border-l-2 border-primary/30 pl-4 md:pl-6">
                <div className="font-heading font-black text-primary-dark text-3xl md:text-5xl tracking-tight">{s.k}</div>
                <div className="font-mono text-[10px] text-primary/60 uppercase tracking-widest mt-2">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-primary/50"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Défiler</span>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── PRESIDENT — Editorial split with quote                          ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">№ 01</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-mono text-xs tracking-[0.3em] text-primary/50 uppercase">Présidence</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left — Photo with frame */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-primary-dark">
                <img src={president.photo} alt={president.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                {/* Bottom info on photo */}
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-blue-300 uppercase mb-2">Depuis 2008</div>
                  <div className="font-heading font-black text-2xl md:text-3xl leading-tight">{president.name.replace(/^M\.\s/, '')}</div>
                </div>
                {/* Corner stamp */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/95 grid place-items-center font-heading font-black text-primary-dark text-xl">
                  01
                </div>
              </div>
              {/* Decorative offset frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-3xl -z-10" />
            </motion.div>

            {/* Right — Editorial text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 lg:pl-8"
            >
              <p className="font-heading text-primary uppercase tracking-[0.3em] text-xs mb-4">Le Président</p>
              <h2 className="font-heading font-black text-primary-dark leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                À la tête depuis<br />le premier jour.
              </h2>

              {/* Quote block */}
              <div className="mt-12 relative pl-6 md:pl-10 py-6 border-l-2 border-primary">
                <i className="fas fa-quote-left absolute -left-3 top-0 text-primary text-2xl bg-white pr-2" />
                <p className="font-heading italic text-gray-700 text-lg md:text-xl leading-relaxed">
                  {president.quote}
                </p>
                <div className="mt-5 flex items-center gap-3 font-mono text-xs text-primary/70 uppercase tracking-widest">
                  <span className="h-px w-10 bg-primary/40" />
                  Med Bouserhan
                </div>
              </div>

              {/* Bio paragraph */}
              <p className="mt-10 text-gray-600 leading-relaxed text-base md:text-lg">{president.bio}</p>

              {/* Stat strip */}
              <div className="mt-12 grid grid-cols-3 divide-x divide-primary-pale border-t border-b border-primary-pale py-6">
                {[
                  { k: '16+', v: 'Années' },
                  { k: '03', v: 'Fédérations' },
                  { k: '2024', v: 'Accréditation' },
                ].map((s, i) => (
                  <div key={i} className={`px-4 ${i === 0 ? 'pr-4' : ''}`}>
                    <div className="font-heading font-black text-primary-dark text-2xl md:text-4xl tracking-tight">{s.k}</div>
                    <div className="font-mono text-[10px] text-primary/50 uppercase tracking-widest mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── VICE-PRESIDENTS — Asymmetric duo                                ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#F4F7FB] py-24 md:py-32 overflow-hidden">
        {/* Decorative big number */}
        <div className="absolute right-0 top-10 font-heading font-black text-primary/[0.04] leading-none pointer-events-none select-none"
             style={{ fontSize: 'clamp(20rem, 40vw, 38rem)' }}>02</div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">№ 02</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-mono text-xs tracking-[0.3em] text-primary/50 uppercase">Vice-Présidence</span>
          </div>

          <h2 className="font-heading font-black text-primary-dark mb-12 md:mb-20 leading-[0.95] tracking-tight max-w-3xl"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
            Deux mandats, une<br /><span className="italic font-light text-primary">mission partagée.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {vicePresidents.map((vp, i) => (
              <motion.article
                key={vp.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Photo banner */}
                <div className="relative aspect-[16/10] bg-primary-pale overflow-hidden">
                  {vp.photo ? (
                    <img src={vp.photo} alt={vp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-heading font-black text-primary text-9xl">
                      {getInitials(vp.name)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />

                  {/* Top tag */}
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[10px] tracking-widest text-primary-dark uppercase font-bold">{vp.rank}</span>
                  </div>

                  {/* Corner number */}
                  <div className="absolute top-5 right-5 font-heading font-black text-white/30 text-7xl leading-none">
                    0{i + 2}
                  </div>
                </div>

                {/* Body */}
                <div className="p-7 md:p-9">
                  <p className="font-mono text-xs tracking-[0.25em] text-primary uppercase mb-2">{vp.role}</p>
                  <h3 className="font-heading font-black text-primary-dark text-2xl md:text-3xl leading-tight">{vp.name}</h3>
                  <div className="mt-5 flex items-center gap-3">
                    <i className="fas fa-bullseye text-primary-light text-sm" />
                    <span className="text-gray-600 text-sm md:text-base">{vp.focus}</span>
                  </div>
                  {/* Hover arrow */}
                  <div className="mt-6 flex items-center gap-3 text-primary font-heading font-bold text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Direction
                    <i className="fas fa-arrow-right" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── BUREAU — Bento grid with filters                                ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">№ 03</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-mono text-xs tracking-[0.3em] text-primary/50 uppercase">Le Bureau</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <h2 className="font-heading font-black text-primary-dark leading-[0.95] tracking-tight max-w-3xl"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
              Huit piliers,<br /><span className="italic font-light text-primary">trois pôles.</span>
            </h2>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {poles.map(p => (
                <button
                  key={p}
                  onClick={() => setActivePole(p)}
                  className={`px-4 py-2 rounded-full font-mono text-[11px] tracking-widest uppercase transition-all ${
                    activePole === p
                      ? 'bg-primary-dark text-white shadow-blue-md'
                      : 'bg-primary-ghost text-primary hover:bg-primary-pale'
                  }`}
                >
                  {p}
                  {p !== 'Tous' && <span className="ml-2 opacity-60">{bureau.filter(b => b.pole === p).length}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Bento grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredBureau.map((m, i) => {
                // Featured pattern: every 4th tile is "tall"
                const isFeatured = i % 5 === 0
                return (
                  <motion.div
                    key={m.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className={`group relative rounded-2xl overflow-hidden bg-primary-ghost ring-1 ring-primary-pale hover:ring-primary/40 transition-all hover:-translate-y-1 hover:shadow-blue-md cursor-pointer ${
                      isFeatured ? 'md:row-span-2' : ''
                    }`}
                  >
                    <div className={`relative ${isFeatured ? 'aspect-[3/4] md:aspect-[3/5]' : 'aspect-square'} bg-primary-pale`}>
                      {m.photo ? (
                        <img src={m.photo} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-heading font-black text-primary text-5xl">
                          {getInitials(m.name)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />

                      {/* Pole badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur font-mono text-[9px] tracking-widest uppercase font-bold text-primary-dark px-2 py-1 rounded-full">
                          {m.pole}
                        </span>
                      </div>

                      {/* Number */}
                      <div className="absolute top-3 right-3 font-heading font-black text-white/40 text-2xl leading-none">
                        {String(i + 4).padStart(2, '0')}
                      </div>

                      {/* Bottom info */}
                      <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                        <h4 className="font-heading font-bold text-sm md:text-base leading-tight">{m.name.replace(/^(M\.|Mme\.|Mlle\.)\s/, '')}</h4>
                        <p className="font-mono text-[10px] tracking-wider text-blue-200 uppercase mt-1">{m.role}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── MARQUEE                                                          ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-primary-pale text-primary-dark py-6 overflow-hidden border-y border-primary/15">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 50s linear infinite', width: 'max-content' }}>
          {[...Array(3)].flatMap((_, r) =>
            ['Comité Directeur', '★', 'Mandat 2024–2028', '★', 'Asni · Atlas Toubkal', '★', '15 Membres', '★', 'Ski · Football · Athlétisme', '★'].map((it, i) => (
              <span key={`${r}-${i}`} className={`mx-6 font-heading font-black tracking-tight ${it === '★' ? 'text-primary-light text-2xl' : 'text-3xl md:text-4xl'}`}>
                {it}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── SPORT CLUBS — Tabbed showcase                                   ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#F4F7FB] py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">№ 04</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-mono text-xs tracking-[0.3em] text-primary/50 uppercase">Direction des Clubs</span>
          </div>

          <h2 className="font-heading font-black text-primary-dark mb-12 leading-[0.95] tracking-tight max-w-3xl"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
            Trois clubs,<br /><span className="italic font-light text-primary">trois familles.</span>
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
            {sportClubs.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveClub(c.id)}
                className={`group inline-flex items-center gap-3 px-5 py-3 rounded-full font-heading font-bold tracking-wide transition-all ${
                  activeClub === c.id
                    ? 'bg-primary-dark text-white shadow-blue-lg'
                    : 'bg-white ring-1 ring-primary-pale text-primary-dark hover:ring-primary'
                }`}
              >
                <i className={`${c.icon} text-sm`} />
                <span>{c.short}</span>
                <span className={`font-mono text-[10px] tracking-widest ${activeClub === c.id ? 'text-blue-300' : 'text-primary/40'}`}>{c.fed}</span>
              </button>
            ))}
          </div>

          {/* Active club content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeClub}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Club banner */}
              <div className="lg:col-span-4 relative rounded-3xl p-8 md:p-10 text-white overflow-hidden min-h-[300px] flex flex-col justify-between"
                   style={{ background: `linear-gradient(160deg, ${club.accent} 0%, #1565C0 100%)` }}>
                <div className="absolute -right-10 -bottom-10 font-heading font-black text-white/8 leading-none pointer-events-none select-none"
                     style={{ fontSize: '14rem' }}>{club.code}</div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur grid place-items-center text-2xl mb-6">
                    <i className={club.icon} />
                  </div>
                  <p className="font-mono text-xs tracking-[0.3em] text-blue-200 uppercase mb-2">Affilié {club.fed}</p>
                  <h3 className="font-heading font-black text-3xl md:text-4xl leading-tight">{club.name}</h3>
                </div>
                <div className="relative mt-8 pt-6 border-t border-white/15">
                  <p className="text-white/70 text-sm leading-relaxed">{club.desc}</p>
                  <Link
                    to={`/${club.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-white font-heading font-bold text-sm hover:gap-3 transition-all"
                  >
                    Découvrir le club <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
              </div>

              {/* Members list */}
              <div className="lg:col-span-8">
                {club.members.length > 0 ? (
                  <div className="bg-white rounded-3xl ring-1 ring-primary-pale overflow-hidden">
                    <div className="px-6 md:px-8 py-5 border-b border-primary-pale flex items-center justify-between">
                      <span className="font-heading font-black text-primary-dark">Direction du club</span>
                      <span className="font-mono text-[10px] tracking-widest text-primary/40 uppercase">{club.members.length} Membres</span>
                    </div>
                    <ul>
                      {club.members.map((m, mi) => (
                        <li key={m.name} className="group grid grid-cols-[44px_56px_1fr_auto] md:grid-cols-[64px_72px_1fr_auto] items-center gap-3 md:gap-5 px-4 md:px-8 py-4 hover:bg-primary-ghost transition-colors border-b border-primary-pale last:border-0">
                          <span className="font-mono text-xs text-primary/35 tracking-widest">{String(mi + 1).padStart(2, '0')}</span>
                          <Avatar photo={m.photo} name={m.name} size={48} square />
                          <div className="min-w-0">
                            <div className="font-heading font-bold text-primary-dark text-sm md:text-base truncate">{m.name}</div>
                            <div className="text-xs md:text-sm text-gray-500 truncate">{m.role}</div>
                          </div>
                          <div className="hidden md:flex w-8 h-8 rounded-full bg-primary-ghost grid place-items-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all">
                            <i className="fas fa-arrow-right text-xs" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl ring-1 ring-primary-pale p-10 md:p-14 text-center">
                    <i className={`${club.icon} text-primary/30 text-5xl mb-5`} />
                    <p className="font-heading font-black text-primary-dark text-xl md:text-2xl mb-2">Direction en cours de constitution</p>
                    <p className="text-gray-500 text-sm md:text-base">L'équipe dirigeante du {club.short.toLowerCase()} est en cours de formation.</p>
                    <Link to={`/${club.id}`} className="mt-6 inline-flex items-center gap-2 text-primary font-heading font-bold text-sm hover:gap-3 transition-all">
                      Voir le club <i className="fas fa-arrow-right text-xs" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── COACHES — Trading-card grid                                     ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">№ 05</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-mono text-xs tracking-[0.3em] text-primary/50 uppercase">Staff Technique</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <h2 className="font-heading font-black text-primary-dark leading-[0.95] tracking-tight max-w-3xl"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
              Les <span className="italic font-light text-primary">entraîneurs.</span>
            </h2>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Cliquez sur une carte pour découvrir le palmarès et l'expérience de chaque entraîneur.
            </p>
          </div>

          {/* Coach grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coaches.map((c, i) => (
              <motion.button
                key={c.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                onClick={() => setActiveCoach(c)}
                className="group relative bg-white rounded-3xl ring-1 ring-primary-pale overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left"
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-primary-pale">
                  <img src={c.photo} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.color} opacity-30 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />

                  {/* Top — Fed badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[10px] tracking-widest text-primary-dark uppercase font-bold">{c.fed}</span>
                  </div>

                  {/* Top right — Number */}
                  <div className="absolute top-4 right-4 font-heading font-black text-white/30 text-5xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Bottom — name + role */}
                  <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 text-white">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-blue-200 uppercase mb-2">{c.club}</p>
                    <h3 className="font-heading font-black text-xl md:text-2xl leading-tight">{c.name.replace(/^M\.\s/, '')}</h3>
                    <p className="text-white/80 text-sm mt-2 leading-snug">{c.role}</p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 md:p-8">
                    <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">Aperçu palmarès</p>
                    <ul className="space-y-2.5">
                      {c.highlights.slice(0, 3).map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2.5 text-primary-dark/90 text-sm leading-relaxed">
                          <i className="fas fa-trophy text-primary-light text-xs mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 inline-flex items-center gap-2 text-primary font-heading font-bold text-sm">
                      Voir le profil complet <i className="fas fa-arrow-right text-xs" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── CTA — Light blue magazine outro                                 ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-primary-ghost via-primary-pale to-white text-primary-dark py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none"
             style={{ background: 'radial-gradient(60% 60% at 90% 30%, rgba(66,165,245,0.25) 0%, transparent 60%), radial-gradient(50% 60% at 10% 100%, rgba(187,222,251,0.5) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(21,101,192,0.3) 1px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">

          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">— Fin</span>
            <span className="h-px flex-1 bg-primary/20" />
            <span className="font-mono text-xs tracking-[0.3em] text-primary/50 uppercase">Rejoignez l'aventure</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h2 className="font-heading font-black leading-[0.9] tracking-tighter"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
                Du Toubkal aux<br />
                <span className="italic font-light text-primary-light">terrains</span> — l'équipe<br />
                vous attend.
              </h2>
              <p className="mt-8 text-gray-600 text-lg max-w-xl leading-relaxed">
                Bénévoles, athlètes, partenaires — l'ASATA grandit avec vous. Découvrez comment vous engager auprès du comité directeur.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link to="/contact" className="group inline-flex items-center justify-between bg-primary text-white font-heading font-bold px-7 py-5 rounded-2xl hover:bg-primary-dark hover:shadow-blue-lg transition">
                <span>Devenir bénévole</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/don" className="group inline-flex items-center justify-between bg-white ring-1 ring-primary/30 text-primary-dark font-heading font-bold px-7 py-5 rounded-2xl hover:ring-primary hover:shadow-blue-md transition">
                <span>Soutenir l'ASATA</span>
                <i className="fas fa-heart text-primary-light" />
              </Link>
              <Link to="/contact" className="group inline-flex items-center justify-between bg-transparent ring-1 ring-primary/20 text-primary-dark/80 font-heading font-bold px-7 py-5 rounded-2xl hover:ring-primary/50 hover:text-primary-dark hover:bg-white/50 transition">
                <span>Nous contacter</span>
                <i className="fas fa-envelope text-primary/60" />
              </Link>
            </div>
          </div>

          {/* Footer strip */}
          <div className="mt-20 pt-8 border-t border-primary/15 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] text-primary/50 uppercase">
            <span>ASATA · Atlas Toubkal Asni</span>
            <span>Comité Directeur 2024 — 2028</span>
            <span>Asni · Maroc · 1 150 m</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── COACH MODAL                                                      ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeCoach && (
          <motion.div
            key="coach-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveCoach(null)}
          >
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" />

            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Hero photo */}
              <div className="relative aspect-[16/9] bg-primary-pale overflow-hidden">
                <img src={activeCoach.photo} alt={activeCoach.name} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${activeCoach.color} opacity-50 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />

                {/* Close */}
                <button
                  onClick={() => setActiveCoach(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 hover:bg-white grid place-items-center text-primary-dark transition z-10"
                  aria-label="Fermer"
                >
                  <i className="fas fa-times" />
                </button>

                {/* Top tag */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest text-primary-dark uppercase font-bold">{activeCoach.fed} · {activeCoach.club}</span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-blue-200 uppercase mb-2">Entraîneur ASATA</p>
                  <h3 className="font-heading font-black text-3xl md:text-4xl leading-tight">{activeCoach.name}</h3>
                  <p className="font-heading text-blue-200 font-semibold mt-1">{activeCoach.role}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <i className="fas fa-trophy text-primary text-lg" />
                  <span className="font-heading font-black text-primary-dark uppercase tracking-wider text-sm">Palmarès & Expérience</span>
                  <span className="h-px flex-1 bg-primary-pale" />
                </div>

                <ul className="space-y-3">
                  {activeCoach.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <span className="font-mono text-[10px] text-primary/50 mt-1.5 tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm md:text-base">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl bg-primary-ghost border border-primary-pale p-4 flex items-center gap-3">
                  <i className="fas fa-map-marker-alt text-primary" />
                  <span className="text-sm text-gray-600">
                    Entraîneur — <span className="font-bold text-primary-dark">ASATA Asni</span>, Haut Atlas
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </PageTransition>
  )
}
