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
    desc: 'Discipline historique de l\'ASATA depuis 2008.',
    members: [
      { photo: TEAM_PHOTOS.faridBouserhan, name: 'M. Farid BOUSERHAN',   role: 'Président · Commission Technique' },
      { photo: TRAINER_PHOTOS.rachidChib,    name: 'M. Rachid CHIB',       role: 'Entraîneur' },
      { photo: TEAM_PHOTOS.noraAchebani,   name: 'Mlle. Nora ACHEBANI',  role: 'Conseillère' },
      { photo: null,                        name: 'Mme. Maryem EL QOTBI', role: 'Secrétaire' },
      { photo: TEAM_PHOTOS.medAourik,      name: 'M. Med AOURIK',        role: 'Trésorier' },
    ],
  },
  {
    id: 'football',
    name: 'Club de Football',
    short: 'Football',
    fed: 'FRMF',
    icon: 'fas fa-futbol',
    desc: '32 athlètes formés sur les terrains régionaux.',
    members: [],
  },
  {
    id: 'athletisme',
    name: 'Club d\'Athlétisme',
    short: 'Athlétisme',
    fed: 'FRMA',
    icon: 'fas fa-running',
    desc: '18 athlètes en piste et trail de montagne.',
    members: [],
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

function Avatar({ photo, name, size = 64 }: { photo: string | null; name: string; size?: number }) {
  if (photo) {
    return <img src={photo} alt={name} className="rounded-full object-cover shrink-0" style={{ width: size, height: size }} />
  }
  return (
    <div
      className="rounded-full flex items-center justify-center font-heading font-bold shrink-0 bg-primary-pale text-primary"
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveCoach(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <PageTransition>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO — Clean centered intro                                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Soft blue blobs */}
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary-light/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Breadcrumb / Tag */}
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
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Notre équipe.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed"
          >
            Quinze femmes et hommes qui dirigent l'ASATA — un président, deux vice-président·e·s, huit membres du bureau et les directions de nos trois clubs.
          </motion.p>

          {/* Avatar stack preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex items-center justify-center"
          >
            <div className="flex -space-x-3">
              {[
                president.photo,
                vicePresidents[0].photo,
                vicePresidents[1].photo,
                bureau[0].photo,
                bureau[2].photo,
                bureau[4].photo,
              ].map((p, i) => (
                <img key={i} src={p ?? ''} alt="" className="w-12 h-12 rounded-full ring-4 ring-white object-cover" />
              ))}
              <div className="w-12 h-12 rounded-full ring-4 ring-white bg-primary text-white grid place-items-center font-heading font-bold text-xs">
                +9
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ORG CHART — Visual hierarchy                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-primary-ghost py-20 md:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">

          {/* Section header */}
          <div className="text-center mb-14">
            <span className="font-heading font-semibold text-[11px] tracking-[0.25em] uppercase text-primary">Présidence</span>
            <h2 className="font-heading font-black text-primary-dark text-3xl md:text-5xl mt-3 tracking-tight">
              À la tête de l'ASATA
            </h2>
          </div>

          {/* President card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative bg-white rounded-3xl shadow-blue-sm ring-1 ring-primary-pale overflow-hidden"
          >
            <div className="grid md:grid-cols-[280px_1fr]">
              {/* Photo side */}
              <div className="relative h-72 md:h-auto bg-primary-pale overflow-hidden">
                <img src={president.photo} alt={president.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full">
                  <span className="font-heading font-bold text-[10px] tracking-widest text-primary uppercase">Président · 01/15</span>
                </div>
              </div>
              {/* Text side */}
              <div className="p-7 md:p-10 flex flex-col justify-center">
                <h3 className="font-heading font-black text-primary-dark text-2xl md:text-3xl leading-tight">
                  {president.name}
                </h3>
                <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wide mt-2">
                  {president.role}
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4">
                  {president.bio}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-primary-dark text-2xl">16+</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Années</span>
                  </div>
                  <div className="h-6 w-px bg-primary-pale" />
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-primary-dark text-2xl">03</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Fédérations</span>
                  </div>
                  <div className="h-6 w-px bg-primary-pale" />
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-primary-dark text-2xl">2024</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Accréditation</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector line */}
          <div className="flex justify-center my-8">
            <div className="w-px h-12 bg-primary/30" />
          </div>

          {/* VPs row */}
          <div className="grid sm:grid-cols-2 gap-5">
            {vicePresidents.map((vp, i) => (
              <motion.div
                key={vp.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group bg-white rounded-2xl ring-1 ring-primary-pale p-6 hover:ring-primary/40 hover:shadow-blue-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <Avatar photo={vp.photo} name={vp.name} size={64} />
                  <div className="min-w-0 flex-1">
                    <span className="font-heading font-bold text-[10px] tracking-widest uppercase text-primary">VP · 0{i + 2}/15</span>
                    <h4 className="font-heading font-black text-primary-dark text-lg leading-tight mt-1">{vp.name}</h4>
                    <p className="text-primary text-xs font-heading font-semibold uppercase tracking-wide mt-1">{vp.role}</p>
                    <p className="text-gray-500 text-sm mt-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                      {vp.focus}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BUREAU — Refined directory list                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-heading font-semibold text-[11px] tracking-[0.25em] uppercase text-primary">Le Bureau</span>
              <h2 className="font-heading font-black text-primary-dark text-3xl md:text-5xl mt-3 tracking-tight">
                Huit membres, trois pôles
              </h2>
            </div>
            <p className="text-gray-500 text-sm md:text-base max-w-sm">
              Le bureau veille à la gestion administrative, financière et stratégique de l'association.
            </p>
          </div>

          {/* Grouped list */}
          <div className="space-y-8">
            {(['Secrétariat', 'Trésorerie', 'Conseil'] as const).map((pole, gi) => {
              const members = bureau.filter(b => b.pole === pole)
              return (
                <motion.div
                  key={pole}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: gi * 0.1 }}
                  className="bg-primary-ghost/50 ring-1 ring-primary-pale rounded-2xl overflow-hidden"
                >
                  {/* Pole header */}
                  <div className="px-5 md:px-7 py-4 flex items-center gap-3 border-b border-primary-pale bg-white/50">
                    <span className="w-8 h-8 rounded-full bg-primary text-white grid place-items-center font-heading font-bold text-xs">
                      {String(gi + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading font-black text-primary-dark">{pole}</h3>
                    <span className="font-heading font-bold text-[10px] tracking-widest text-primary/50 uppercase">
                      {members.length} membre{members.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  {/* Members */}
                  <div className="divide-y divide-primary-pale">
                    {members.map((m) => (
                      <div key={m.name} className="group flex items-center gap-4 px-5 md:px-7 py-4 hover:bg-white transition-colors">
                        <Avatar photo={m.photo} name={m.name} size={52} />
                        <div className="flex-1 min-w-0">
                          <div className="font-heading font-bold text-primary-dark text-sm md:text-base truncate">{m.name}</div>
                          <div className="text-gray-500 text-xs md:text-sm truncate">{m.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SPORT CLUBS — Three column showcase                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-primary-ghost py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="font-heading font-semibold text-[11px] tracking-[0.25em] uppercase text-primary">Direction des clubs</span>
            <h2 className="font-heading font-black text-primary-dark text-3xl md:text-5xl mt-3 tracking-tight">
              Trois clubs, une famille
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {sportClubs.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl ring-1 ring-primary-pale overflow-hidden hover:ring-primary/40 hover:shadow-blue-md transition-all"
              >
                {/* Top header */}
                <div className="p-6 md:p-7 border-b border-primary-pale">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-primary-pale text-primary grid place-items-center text-lg group-hover:bg-primary group-hover:text-white transition">
                      <i className={c.icon} />
                    </div>
                    <span className="font-heading font-bold text-[10px] tracking-widest uppercase text-primary/60">{c.fed}</span>
                  </div>
                  <h3 className="font-heading font-black text-primary-dark text-xl leading-tight">{c.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">{c.desc}</p>
                </div>
                {/* Members or empty */}
                {c.members.length > 0 ? (
                  <div className="p-6 md:p-7">
                    <span className="font-heading font-bold text-[10px] tracking-widest uppercase text-primary/50 mb-3 block">
                      Direction · {c.members.length} membres
                    </span>
                    <ul className="space-y-3">
                      {c.members.slice(0, 3).map((m) => (
                        <li key={m.name} className="flex items-center gap-3">
                          <Avatar photo={m.photo} name={m.name} size={36} />
                          <div className="min-w-0 flex-1">
                            <div className="font-heading font-bold text-primary-dark text-xs truncate">{m.name}</div>
                            <div className="text-gray-400 text-[10px] truncate">{m.role}</div>
                          </div>
                        </li>
                      ))}
                      {c.members.length > 3 && (
                        <li className="text-primary text-xs font-heading font-semibold pl-12">
                          +{c.members.length - 3} autres membres
                        </li>
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="p-6 md:p-7 text-center">
                    <span className="font-heading font-bold text-[10px] tracking-widest uppercase text-primary/40 block mb-2">
                      En constitution
                    </span>
                    <p className="text-gray-400 text-xs">Direction en cours de formation</p>
                  </div>
                )}
                {/* Footer link */}
                <div className="px-6 md:px-7 pb-5">
                  <Link to={`/${c.id}`} className="inline-flex items-center gap-2 text-primary font-heading font-bold text-xs tracking-wide uppercase hover:gap-3 transition-all">
                    Découvrir le club <i className="fas fa-arrow-right text-[10px]" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* COACHES — KEPT — Trading-card grid                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <span className="font-heading font-semibold text-[11px] tracking-[0.25em] uppercase text-primary">Staff Technique</span>
              <h2 className="font-heading font-black text-primary-dark mt-3 leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
                Les <span className="italic font-light text-primary">entraîneurs.</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Cliquez sur une carte pour découvrir le palmarès et l'expérience de chaque entraîneur.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

                  {/* Hover overlay */}
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
      <section className="relative bg-primary-ghost py-20 md:py-24 overflow-hidden">
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
