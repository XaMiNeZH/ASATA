import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { TEAM_PHOTOS, TRAINER_PHOTOS } from '../data/images'

// ─── Data ────────────────────────────────────────────────────────────────────

const president = {
  name: 'M. Med BOUSERHAN',
  role: 'Président · Comité Directeur',
  since: 2008,
  photo: TEAM_PHOTOS.president,
  bio: "À la tête de l'ASATA depuis sa fondation, M. Med BOUSERHAN a construit une association sportive solide, respectée au niveau régional et national. Son leadership a permis l'affiliation aux trois fédérations nationales et l'obtention de l'accréditation professionnelle officielle en 2024.",
}

const vicePresidents = [
  {
    photo: TEAM_PHOTOS.jamilaChenter,
    name: 'Mme. Jamila CHENTER',
    role: '1ère Vice-Présidente',
    focus: 'Gouvernance & Développement',
  },
  {
    photo: TEAM_PHOTOS.faridBouserhan,
    name: 'M. Farid BOUSERHAN',
    role: '2ème Vice-Président',
    focus: 'Sport & Performance',
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
    name: 'Ski & Sports de Montagne',
    short: 'Ski',
    fed: 'FRMSSM',
    icon: 'fas fa-skiing',
    image: '/skiActivitiesPics/PHOTO-2026-04-07-12-10-30.jpg',
    desc: 'Discipline historique de l\'ASATA depuis 2008.',
    count: '5 membres',
  },
  {
    id: 'football',
    name: 'Club de Football',
    short: 'Football',
    fed: 'FRMF',
    icon: 'fas fa-futbol',
    image: '/footballActivitiesPics/asata%20tournoi%20raman%20winners.jpg',
    desc: '32 athlètes formés sur les terrains régionaux.',
    count: '32 athlètes',
  },
  {
    id: 'athletisme',
    name: 'Club d\'Athlétisme',
    short: 'Athlétisme',
    fed: 'FRMA',
    icon: 'fas fa-running',
    image: '/athleticism/acc%20image.jpeg',
    desc: '18 athlètes en piste et trail de montagne.',
    count: '18 athlètes',
  },
]

const coaches = [
  {
    photo: TRAINER_PHOTOS.rachidChib,
    name: 'M. Rachid CHIB',
    role: 'Moniteur & Entraîneur Ski',
    club: 'Ski',
    fed: 'FRMSSM',
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

function PhotoOrInitials({ photo, name, className = '' }: { photo: string | null; name: string; className?: string }) {
  if (photo) {
    return <img src={photo} alt={name} className={`object-cover ${className}`} />
  }
  return (
    <div className={`flex items-center justify-center font-heading font-black bg-primary-pale text-primary text-5xl ${className}`}>
      {getInitials(name)}
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

type Coach = typeof coaches[0]

export default function Equipe() {
  const [activeCoach, setActiveCoach] = useState<Coach | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveCoach(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <PageTransition>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary-light/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-ghost border border-primary-pale rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
            <span className="font-heading font-semibold text-[11px] tracking-[0.2em] uppercase text-primary">Mandat 2024 — 2028</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-black text-primary-dark leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
          >
            Notre équipe.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed"
          >
            Quinze femmes et hommes qui dirigent l'ASATA — un président, deux vice-président·e·s, huit membres du bureau et les directions de nos trois clubs sportifs.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PRESIDENT — HUGE feature card                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-10">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">Présidence</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary/40">01 / 15</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* HUGE photo */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-3xl overflow-hidden shadow-blue-lg">
                <img src={president.photo} alt={president.name} className="w-full h-full object-cover" />
                {/* Top badge */}
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-blue-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-heading font-bold text-xs tracking-widest text-primary-dark uppercase">Président · Depuis 2008</span>
                </div>
                {/* Big number stamp */}
                <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-white/95 backdrop-blur grid place-items-center shadow-blue-sm">
                  <span className="font-heading font-black text-primary-dark text-3xl">01</span>
                </div>
              </div>
            </div>

            {/* Right info */}
            <div className="lg:col-span-5 lg:pl-6">
              <h2 className="font-heading font-black text-primary-dark leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}>
                {president.name.replace(/^M\.\s/, '')}
              </h2>
              <p className="text-primary font-heading font-bold text-sm md:text-base uppercase tracking-widest mt-3">
                {president.role}
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-6">
                {president.bio}
              </p>

              {/* Big stat blocks */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { k: '16+', v: 'Années' },
                  { k: '03', v: 'Fédérations' },
                  { k: '2024', v: 'Accréditation' },
                ].map((s, i) => (
                  <div key={i} className="bg-primary-ghost border border-primary-pale rounded-2xl p-4 md:p-5">
                    <div className="font-heading font-black text-primary-dark text-2xl md:text-3xl tracking-tight">{s.k}</div>
                    <div className="font-heading font-bold text-[10px] md:text-xs text-primary/60 uppercase tracking-widest mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* VICE-PRESIDENTS — Two large feature cards                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-primary-ghost py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-10">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">Vice-Présidence</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary/40">02 — 03 / 15</span>
          </div>

          <h2 className="font-heading font-black text-primary-dark leading-[0.9] tracking-tight mb-12 max-w-3xl"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Deux mandats, une mission partagée.
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {vicePresidents.map((vp, i) => (
              <motion.article
                key={vp.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-white rounded-3xl shadow-blue-sm overflow-hidden hover:shadow-blue-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] bg-primary-pale overflow-hidden">
                  <PhotoOrInitials photo={vp.photo} name={vp.name} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />

                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-heading font-bold text-[10px] tracking-widest text-primary-dark uppercase">VP · 0{i + 2}</span>
                  </div>

                  <div className="absolute top-5 right-5 font-heading font-black text-white/40 text-7xl leading-none">
                    0{i + 2}
                  </div>

                  {/* Big info on photo */}
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white">
                    <p className="font-heading font-bold text-[11px] tracking-[0.25em] uppercase text-blue-100 mb-2">{vp.role}</p>
                    <h3 className="font-heading font-black text-2xl md:text-4xl leading-tight">{vp.name}</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-ghost grid place-items-center text-primary text-xl shrink-0">
                    <i className="fas fa-bullseye" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[10px] tracking-widest uppercase text-primary/50 mb-1">Mission</p>
                    <p className="text-primary-dark font-heading font-bold text-base md:text-lg">{vp.focus}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BUREAU — Big photo cards (4 per row, then 4 per row)                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-10">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">Le Bureau</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary/40">04 — 11 / 15</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 className="font-heading font-black text-primary-dark leading-[0.9] tracking-tight max-w-3xl"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Huit membres, trois pôles.
            </h2>
            <p className="text-gray-500 max-w-md">
              Le bureau veille à la gestion administrative, financière et stratégique de l'association.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {bureau.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="group bg-white rounded-2xl ring-1 ring-primary-pale overflow-hidden hover:shadow-blue-md hover:-translate-y-1 hover:ring-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-[3/4] bg-primary-pale overflow-hidden">
                  <PhotoOrInitials photo={m.photo} name={m.name} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/15 to-transparent" />

                  {/* Pole badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span className="font-heading font-bold text-[9px] tracking-widest text-primary-dark uppercase">{m.pole}</span>
                  </div>

                  {/* Number */}
                  <div className="absolute top-3 right-3 font-heading font-black text-white/40 text-3xl leading-none">
                    {String(i + 4).padStart(2, '0')}
                  </div>

                  {/* Bottom info on photo */}
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <h4 className="font-heading font-black text-base md:text-lg leading-tight">{m.name.replace(/^(M\.|Mme\.|Mlle\.)\s/, '')}</h4>
                    <p className="font-heading font-semibold text-[10px] md:text-xs tracking-wider text-blue-100 uppercase mt-1">{m.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SPORT CLUBS — Three large feature cards                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-primary-ghost py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-10">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">Direction des clubs</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary/40">12 — 15 / 15</span>
          </div>

          <h2 className="font-heading font-black text-primary-dark leading-[0.9] tracking-tight mb-12 max-w-3xl"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Trois clubs, une famille.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {sportClubs.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-blue-sm hover:shadow-blue-lg hover:-translate-y-2 transition-all duration-500"
              >
                {/* Big image */}
                <div className="relative aspect-[4/5] bg-primary-pale overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

                  {/* Top badge */}
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-full">
                    <i className={`${c.icon} text-primary text-xs`} />
                    <span className="font-heading font-bold text-[10px] tracking-widest text-primary-dark uppercase">{c.fed}</span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-7 text-white">
                    <p className="font-heading font-bold text-[11px] tracking-[0.25em] uppercase text-blue-100 mb-2">{c.count}</p>
                    <h3 className="font-heading font-black text-2xl md:text-3xl leading-tight">{c.name}</h3>
                  </div>
                </div>

                {/* Bottom action */}
                <div className="p-6 md:p-7 flex items-center justify-between gap-3">
                  <p className="text-gray-500 text-sm leading-snug flex-1">{c.desc}</p>
                  <Link
                    to={`/${c.id}`}
                    className="w-12 h-12 rounded-full bg-primary-pale text-primary grid place-items-center group-hover:bg-primary group-hover:text-white transition shrink-0"
                  >
                    <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* COACHES — KEPT — Trading cards                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-10">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">Staff Technique</span>
            <span className="h-px flex-1 bg-primary/15" />
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.map((c, i) => (
              <motion.button
                key={c.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                onClick={() => setActiveCoach(c)}
                className="group relative bg-white rounded-3xl ring-1 ring-primary-pale overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-primary-pale">
                  <img src={c.photo} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/15 to-transparent" />

                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-heading font-bold text-[10px] tracking-widest text-primary-dark uppercase">{c.fed}</span>
                  </div>

                  <div className="absolute top-4 right-4 font-heading font-black text-white/40 text-5xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 text-white">
                    <p className="font-heading font-semibold text-[10px] tracking-[0.25em] text-blue-100 uppercase mb-2">{c.club}</p>
                    <h3 className="font-heading font-black text-xl md:text-2xl leading-tight">{c.name.replace(/^M\.\s/, '')}</h3>
                    <p className="text-white/85 text-sm mt-2 leading-snug">{c.role}</p>
                  </div>

                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 md:p-8">
                    <p className="font-heading font-semibold text-[10px] tracking-[0.3em] text-primary uppercase mb-4">Aperçu palmarès</p>
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
      {/* CTA                                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-primary-ghost py-20 md:py-28 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-light/15 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h3 className="font-heading font-black text-primary-dark leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Rejoignez l'aventure ASATA.
          </h3>
          <p className="mt-5 text-gray-600 max-w-xl mx-auto">
            Bénévoles, athlètes, partenaires — l'ASATA grandit avec vous.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-primary-dark hover:shadow-blue-md transition">
              Devenir bénévole <i className="fas fa-arrow-right text-xs" />
            </Link>
            <Link to="/don" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-7 py-3.5 rounded-full ring-1 ring-primary/30 hover:ring-primary hover:shadow-blue-sm transition">
              <i className="fas fa-heart" /> Soutenir
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* COACH MODAL                                                          */}
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
              <div className="relative aspect-[16/9] bg-primary-pale overflow-hidden">
                <img src={activeCoach.photo} alt={activeCoach.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />

                <button
                  onClick={() => setActiveCoach(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 hover:bg-white grid place-items-center text-primary-dark transition z-10"
                  aria-label="Fermer"
                >
                  <i className="fas fa-times" />
                </button>

                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-heading font-bold text-[10px] tracking-widest text-primary-dark uppercase">{activeCoach.fed} · {activeCoach.club}</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white">
                  <p className="font-heading font-semibold text-[10px] tracking-[0.3em] text-blue-100 uppercase mb-2">Entraîneur ASATA</p>
                  <h3 className="font-heading font-black text-3xl md:text-4xl leading-tight">{activeCoach.name}</h3>
                  <p className="font-heading text-blue-100 font-semibold mt-1">{activeCoach.role}</p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <i className="fas fa-trophy text-primary text-lg" />
                  <span className="font-heading font-black text-primary-dark uppercase tracking-wider text-sm">Palmarès & Expérience</span>
                  <span className="h-px flex-1 bg-primary-pale" />
                </div>

                <ul className="space-y-3">
                  {activeCoach.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <span className="font-heading font-bold text-[10px] text-primary/50 mt-1.5 tracking-wider">
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
