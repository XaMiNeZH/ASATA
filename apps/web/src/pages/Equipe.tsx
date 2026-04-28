import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import FadeIn from '../components/FadeIn'
import { TEAM_PHOTOS, TRAINER_PHOTOS } from '../data/images'

// ─── Data ────────────────────────────────────────────────────────────────────

const presidentData = {
  name: 'M. Med BOUSERHAN',
  role: 'Président du Comité Directeur',
  since: 'Depuis 2008',
  bio: "À la tête de l'ASATA depuis sa fondation, M. Med BOUSERHAN a construit une association sportive solide, respectée au niveau régional et national. Son leadership a permis l'affiliation aux trois fédérations nationales et l'obtention de l'accréditation professionnelle officielle en 2024.",
  highlights: [
    { k: '16+', v: 'années à la tête' },
    { k: '3',   v: 'fédérations affiliées' },
    { k: '2024', v: 'accréditation officielle' },
  ],
}

const vicePresidents = [
  { rank: '01', photo: TEAM_PHOTOS.jamilaChenter,  name: 'Mme. Jamila CHENTER', role: '1ère Vice-Présidente', focus: 'Développement & Gouvernance' },
  { rank: '02', photo: TEAM_PHOTOS.faridBouserhan, name: 'M. Farid BOUSERHAN',  role: '2ème Vice-Président',  focus: 'Sport & Performance' },
]

const bureau = [
  { photo: TEAM_PHOTOS.abdEssamad,      name: 'M. Abd Essamad AIT BEL HAJ', role: 'Secrétaire Général',  group: 'Secrétariat' },
  { photo: TEAM_PHOTOS.medAitChakart,   name: 'M. Med AIT CHAKART',          role: 'Secrétaire Adjoint',  group: 'Secrétariat' },
  { photo: TEAM_PHOTOS.medAourik,       name: 'M. Med AOURIK',               role: 'Trésorier',           group: 'Trésorerie' },
  { photo: TEAM_PHOTOS.noraAchebani,    name: 'Mlle. Nora ACHEBANI',         role: 'Trésorière Adjointe', group: 'Trésorerie' },
  { photo: TEAM_PHOTOS.rachidBouserhan, name: 'M. Rachid BOUSERHAN',         role: 'Conseiller',          group: 'Conseil' },
  { photo: TEAM_PHOTOS.medElAouad,      name: 'M. Med EL AOUAD',             role: 'Conseiller',          group: 'Conseil' },
  { photo: TEAM_PHOTOS.azizAitBourhim,  name: 'M. Aziz AIT BOURHIM',         role: 'Conseiller',          group: 'Conseil' },
  { photo: TEAM_PHOTOS.elmajidOussais,  name: 'M. Abd Elmajid OUSSAIS',      role: 'Conseiller',          group: 'Conseil' },
]

const skiTeam = [
  { photo: TEAM_PHOTOS.faridBouserhan, name: 'M. Farid BOUSERHAN',   role: 'Président · Commission Technique · Porte-parole Média', lead: true },
  { photo: TRAINER_PHOTOS.rachidChib,    name: 'M. Rachid CHIB',       role: 'Entraîneur',   lead: false },
  { photo: TEAM_PHOTOS.noraAchebani,   name: 'Mlle. Nora ACHEBANI',  role: 'Conseillère',  lead: false },
  { photo: null,                        name: 'Mme. Maryem EL QOTBI', role: 'Secrétaire',   lead: false },
  { photo: TEAM_PHOTOS.medAourik,      name: 'M. Med AOURIK',        role: 'Trésorier',    lead: false },
]

const otherClubs = [
  { name: 'Club de Football',   code: 'FC', count: '32 athlètes', note: 'Affilié FRMF', to: '/football' },
  { name: "Club d'Athlétisme", code: 'AT', count: '18 athlètes', note: 'Affilié FRMA', to: '/athletisme' },
]

const staffGroups = [
  {
    club: 'Club Ski & Sports de Montagne',
    icon: 'fas fa-skiing',
    fed: 'FRMSSM',
    color: 'from-primary-dark to-primary',
    trainers: [
      {
        photo: TRAINER_PHOTOS.rachidChib,
        name: 'M. Rachid CHIB',
        role: 'Moniteur & Entraîneur',
        highlights: [
          '1ère place — Coupe du Trône Ski Alpin 2000',
          'Championnats du Maroc 1998–2004',
          'Moniteur ski à Oukaimeden depuis 2005',
          'Guide montagne Haut Atlas',
        ],
      },
    ],
  },
  {
    club: "Club d'Athlétisme",
    icon: 'fas fa-running',
    fed: 'FRMA',
    color: 'from-primary to-primary-mid',
    trainers: [
      {
        photo: TRAINER_PHOTOS.ahmedBiri,
        name: 'M. Ahmed BIRI',
        role: 'Entraîneur — Champion National',
        highlights: [
          '1ère place — Open African Masters, Tunis, 100m & 110m haies (2025)',
          '1ère place — Champ. International, Shkodër (Albanie), 110m haies (2024 & 2025)',
          '2ème place — Championnat National, Salé, 110m haies (2024)',
          '1ère place — Champ. International, Shkodër, 200m (2024)',
        ],
      },
    ],
  },
  {
    club: 'Académie de Football Asni',
    icon: 'fas fa-futbol',
    fed: 'FRMF',
    color: 'from-primary-mid to-primary-light',
    trainers: [
      {
        photo: TRAINER_PHOTOS.younesElMarkat,
        name: 'M. Younes EL MARKAT',
        role: 'Entraîneur — Toutes catégories (Garçons & Filles)',
        highlights: [
          'Ancien joueur de football',
          "A propulsé l'équipe futsal ASATA en Super Ligue Marrakech-Safi 2024–2025",
        ],
      },
      {
        photo: TRAINER_PHOTOS.taherAitElBaraka,
        name: 'M. Taher AIT EL BARAKA',
        role: 'Entraîneur — U10 & U12',
        highlights: [
          'Licencié universitaire',
          "Élément associatif actif sur le territoire d'El Haouz",
          'Expérience dans plusieurs programmes gouvernementaux',
        ],
      },
      {
        photo: TRAINER_PHOTOS.essadiqAitBenAli,
        name: 'M. Essadiq AIT BEN ALI',
        role: 'Entraîneur mixte — U10, U12 & U16',
        highlights: [
          "Pilier fondateur du staff sportif ASATA",
          "Actif depuis la création de l'association",
          'Palmarès classé parmi les meilleurs coachs',
        ],
      },
      {
        photo: TRAINER_PHOTOS.soufianAzzaimi,
        name: 'M. Soufian AZZAIMI',
        role: 'Entraîneur — Équipe A Futsal',
        highlights: [
          'Super Ligue régionale Marrakech-Safi',
        ],
      },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(full: string): string {
  const parts = full.replace(/^(M\.|Mme\.|Mlle\.)\s/, '').split(/\s+/).filter(Boolean)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MemberPhoto({ photo, name, size = 80, dark = false }: { photo: string | null; name: string; size?: number; dark?: boolean }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      className={`rounded-full flex items-center justify-center font-heading font-black shrink-0 ${dark ? 'bg-primary-mid text-white' : 'bg-primary-pale text-primary'}`}
      style={{ width: size, height: size, fontSize: size * 0.3 }}
    >
      {getInitials(name)}
    </div>
  )
}

function SectionHead({ kicker, title, subtitle, num }: { kicker: string; title: string; subtitle?: string; num?: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-primary/30" />
        <span className="text-[11px] uppercase tracking-[0.28em] text-primary/60 font-heading font-semibold">
          {kicker}{num ? ` · ${num}` : ''}
        </span>
        <span className="h-px w-10 bg-primary/30" />
      </div>
      <h2 className="font-heading font-black text-primary-dark text-2xl sm:text-4xl md:text-5xl mt-4 tracking-tight">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-3 max-w-xl leading-relaxed text-sm sm:text-base">{subtitle}</p>}
      <div className="mt-5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary-light" />
        <span className="w-12 h-0.5 bg-primary" />
        <span className="w-2 h-2 rounded-full bg-primary-light" />
      </div>
    </div>
  )
}

function Divider({ label }: { label?: string }) {
  return (
    <div className="my-10 md:my-20 flex items-center gap-5 max-w-7xl mx-auto px-5">
      <span className="h-px flex-1 bg-primary-pale" />
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
      </div>
      {label && (
        <span className="font-heading text-[11px] uppercase tracking-[0.3em] text-primary/40 px-2">{label}</span>
      )}
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
      </div>
      <span className="h-px flex-1 bg-primary-pale" />
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type Trainer = typeof staffGroups[0]['trainers'][0]

export default function Equipe() {
  const [bioOpen, setBioOpen] = useState(false)
  const [activeTrainer, setActiveTrainer] = useState<Trainer | null>(null)

  const bureauGroups = useMemo(() => {
    const map: Record<string, typeof bureau> = {}
    bureau.forEach(b => { ;(map[b.group] = map[b.group] ?? []).push(b) })
    return Object.entries(map)
  }, [])

  return (
    <PageTransition>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-[76px]">
        {/* Background photo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/skiActivitiesPics/PHOTO-2026-04-07-12-10-30.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(120% 80% at 80% 20%, rgba(66,165,245,0.25) 0%, rgba(66,165,245,0) 60%), linear-gradient(180deg, rgba(25,118,210,0.88) 0%, rgba(21,101,192,0.87) 55%, rgba(13,71,161,0.94) 100%)',
          }}
        />
        {/* dot noise */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 1.5px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* decorative rings */}
        <div className="absolute -right-24 -bottom-24 w-[420px] h-[420px] rounded-full border border-white/10" />
        <div className="absolute right-10 top-24 w-[180px] h-[180px] rounded-full border border-white/10" />
        <div className="absolute left-1/2 bottom-8 w-px h-16 bg-white/25" />

        <div className="max-w-7xl mx-auto px-5 pt-16 pb-24 relative">
          {/* breadcrumb */}
          <div className="text-white/70 text-sm flex items-center gap-2 mb-6">
            <Link to="/" className="hover:text-white transition">Accueil</Link>
            <span>›</span>
            <span className="text-white">Notre Équipe</span>
          </div>

          {/* meta row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-heading text-[11px] uppercase tracking-[0.25em] text-white/65 border border-white/25 rounded-full px-3 py-1">
              Mandat 2024 — 2028
            </span>
            <span className="h-px w-10 bg-white/30" />
            <span className="font-heading text-[11px] uppercase tracking-[0.25em] text-white/65">15 Membres</span>
          </div>

          <h1
            className="font-heading font-black text-white leading-[0.95] text-4xl sm:text-5xl md:text-7xl"
            style={{ textShadow: '0 4px 20px rgba(0,22,55,0.25)' }}
          >
            Comité<br />Directeur
          </h1>
          <p className="mt-4 max-w-xl text-white/80 text-base sm:text-lg leading-relaxed">
            Les femmes et hommes qui dirigent et font vivre l'ASATA — de la haute montagne aux pistes, terrains et stades.
          </p>

          {/* anchor pills */}
          <div className="mt-10 flex flex-wrap gap-2">
            {[
              ['Présidence', '#presidence'],
              ['Vice-Présidence', '#vp'],
              ['Bureau', '#bureau'],
              ['Direction des Clubs', '#clubs'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm bg-white/10 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white transition font-heading font-semibold"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* bottom wave */}
        <svg className="block w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60, display: 'block' }}>
          <path d="M0,60 L0,30 Q720,0 1440,30 L1440,60 Z" fill="#FAF9FD" />
        </svg>
      </section>

      {/* ── President ── */}
      <section id="presidence" className="bg-[#FAF9FD] pt-12 md:pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead kicker="Présidence" num="01" title="Le Président" subtitle="Architecte et premier visage de l'ASATA depuis sa création." />

          <FadeIn className="mt-14">
            <div className="relative">
              {/* dot grid accents */}
              <div
                className="absolute -top-6 -right-6 w-44 h-44 hidden md:block opacity-60 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#E3F2FD 1.4px, transparent 1.4px)', backgroundSize: '18px 18px' }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 hidden md:block opacity-60 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#E3F2FD 1.4px, transparent 1.4px)', backgroundSize: '18px 18px' }}
              />

              <div className="relative rounded-3xl overflow-hidden bg-white ring-1 ring-primary-pale shadow-blue-lg grid md:grid-cols-[380px_1fr]">
                {/* Left — navy panel */}
                <div className="relative p-6 sm:p-10 text-white overflow-hidden" style={{ background: 'linear-gradient(160deg, #1565C0 0%, #0D47A1 100%)' }}>
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(66,165,245,0.7) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)' }}
                  />
                  <div className="absolute top-5 right-5 font-heading text-[10px] tracking-[0.25em] uppercase text-white/50">N°01 / 15</div>

                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-crown text-primary-light text-sm" />
                      <span className="font-heading text-[11px] uppercase tracking-[0.25em] text-white/75">Présidence</span>
                    </div>
                    <div className="mt-6 md:mt-auto md:pt-10 flex flex-row md:flex-col items-center md:items-start gap-5 md:gap-0">
                      <div className="ring-4 ring-white/20 rounded-full shrink-0">
                        <MemberPhoto photo={TEAM_PHOTOS.president} name={presidentData.name} size={120} dark />
                      </div>
                      <div className="md:mt-6 font-heading font-black text-xl sm:text-2xl leading-tight">
                        {presidentData.name.replace(/^M\.\s/, '')}
                      </div>
                      <div className="text-primary-light font-heading font-semibold mt-1 text-sm uppercase tracking-wider">
                        {presidentData.role}
                      </div>
                      <div className="mt-1 font-heading text-[11px] tracking-widest text-white/50 uppercase">
                        {presidentData.since}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right — content */}
                <div className="p-6 sm:p-10 md:p-12 flex flex-col">
                  <div className="flex items-center gap-2 text-primary/60">
                    <span className="font-heading text-[11px] uppercase tracking-[0.25em]">Le Président</span>
                    <span className="h-px flex-1 bg-primary/15 ml-2" />
                  </div>
                  <h3 className="font-heading font-black text-primary-dark text-3xl md:text-4xl mt-4 leading-tight">
                    Au service de<br />l'ASATA depuis<br />sa fondation.
                  </h3>
                  <p className="text-gray-500 leading-relaxed mt-5 max-w-xl">{presidentData.bio}</p>

                  {/* highlights */}
                  <div className="grid grid-cols-3 gap-px bg-primary-pale rounded-2xl overflow-hidden mt-8 ring-1 ring-primary-pale">
                    {presidentData.highlights.map((h, i) => (
                      <div key={i} className="bg-white p-5">
                        <div className="font-heading font-black text-primary-dark text-xl sm:text-3xl tracking-tight">{h.k}</div>
                        <div className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{h.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => setBioOpen(o => !o)}
                      className="inline-flex items-center gap-2 bg-primary text-white font-heading font-semibold px-5 py-3 rounded-full hover:bg-primary-dark transition"
                    >
                      {bioOpen ? 'Masquer le message' : 'Lire le message du président'}
                      <i className={`fas fa-chevron-down text-xs transition-transform ${bioOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <Link to="/contact" className="text-primary font-heading font-semibold text-sm hover:underline">
                      Contacter →
                    </Link>
                  </div>

                  {bioOpen && (
                    <div className="mt-5 rounded-2xl bg-primary-ghost border-l-4 border-primary-light p-5 text-gray-600 italic leading-relaxed" style={{ animation: 'fadeUp .5s ease both' }}>
                      « Notre mission dépasse le sport : nous formons une communauté qui porte les couleurs d'Asni et de l'Atlas, du sommet du Toubkal aux compétitions nationales. Chaque athlète, chaque bénévole, chaque membre du bureau écrit une page de cette histoire. »
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider label="Vice-Présidence" />

      {/* ── Vice-Presidents ── */}
      <section id="vp" className="bg-[#FAF9FD]">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead kicker="Vice-Présidence" num="02–03" title="Les Vice-Président·e·s" subtitle="Deux mandats complémentaires : gouvernance et performance sportive." />
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {vicePresidents.map((vp, i) => (
              <FadeIn key={vp.name} delay={i * 0.1}>
                <article className="group relative bg-white rounded-2xl ring-1 ring-primary-pale p-6 lg:p-8 hover:-translate-y-1 hover:shadow-blue-md hover:ring-primary/20 transition-all duration-300">
                  {/* rank badge */}
                  <div className="absolute -top-3 left-6">
                    <span className="bg-primary text-white font-heading font-bold text-xs px-3 py-1 rounded-full shadow-blue-sm">
                      VP · {vp.rank}
                    </span>
                  </div>
                  {/* member number */}
                  <div className="absolute right-6 top-6 font-heading text-[10px] tracking-[0.2em] text-primary/25">0{i + 2}/15</div>

                  <div className="flex items-center gap-4 lg:gap-6">
                    <MemberPhoto photo={vp.photo} name={vp.name} size={80} />
                    <div className="flex-1 min-w-0">
                      <div className="font-heading text-[10px] uppercase tracking-[0.25em] text-primary/55">{vp.role}</div>
                      <h3 className="font-heading font-black text-primary-dark text-base sm:text-xl lg:text-2xl mt-1 leading-tight">{vp.name}</h3>
                      <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-primary-ghost border border-primary-pale rounded-full px-3 py-1 w-fit">
                        <span className="w-2 h-2 rounded-full bg-primary-light shrink-0" />
                        <span className="truncate">{vp.focus}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider label="Bureau" />

      {/* ── Bureau ── */}
      <section id="bureau" className="bg-[#FAF9FD]">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead kicker="Bureau" num="04–11" title="Le Bureau" subtitle="Huit membres répartis sur trois pôles — secrétariat, trésorerie et conseil." />

          <div className="mt-14 space-y-10">
            {bureauGroups.map(([group, members], gi) => {
              let counter = 3 + members.reduce((acc, _, idx) => {
                // calculate offset based on previous groups
                return acc
              }, 0)
              // flat counter across groups
              const startIdx = bureauGroups.slice(0, gi).reduce((s, [, ms]) => s + ms.length, 0)
              return (
                <FadeIn key={group} delay={gi * 0.1}>
                  <div>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-heading font-black text-primary-dark text-lg">{group}</span>
                      <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-primary/45">
                        {members.length} membre{members.length > 1 ? 's' : ''}
                      </span>
                      <span className="h-px flex-1 bg-primary-pale" />
                    </div>
                    <ul className="rounded-2xl bg-white ring-1 ring-primary-pale overflow-hidden divide-y divide-primary-pale">
                      {members.map((m, mi) => {
                        const num = String(startIdx + mi + 4).padStart(2, '0')
                        return (
                          <li key={m.name} className="group relative grid grid-cols-[32px_44px_1fr] md:grid-cols-[64px_76px_1fr_auto] items-center gap-3 md:gap-6 px-3 md:px-6 py-3 md:py-4 hover:bg-primary-ghost transition-colors">
                            {/* hover left accent */}
                            <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-primary-light opacity-0 group-hover:opacity-100 transition" />
                            <span className="font-heading text-[10px] md:text-sm text-primary/35 group-hover:text-primary-light transition tracking-widest">{num}</span>
                            <MemberPhoto photo={m.photo} name={m.name} size={44} />
                            <div className="min-w-0">
                              <div className="font-heading font-bold text-primary-dark text-sm truncate">{m.name}</div>
                              <div className="text-xs text-gray-400 truncate">{m.role}</div>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-full bg-primary-ghost text-primary text-xs font-heading font-semibold">
                                {m.role.split(' ')[0]}
                              </span>
                              <div className="opacity-0 group-hover:opacity-100 transition w-8 h-8 rounded-full bg-primary text-white grid place-items-center">
                                <i className="fas fa-arrow-right text-xs" />
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <div className="bg-primary-dark text-white py-4 overflow-hidden mt-20">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}
        >
          {[...Array(3)].flatMap((_, r) =>
            ['Ski', 'Football', 'Athlétisme', 'Toubkal', '15 Membres', 'Mandat 2024–2028', 'Asni · Maroc'].map((it, i) => (
              <span key={`${r}-${i}`} className="flex items-center gap-6 mx-6 font-heading font-black text-2xl tracking-tight">
                <span>{it}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light inline-block" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Club direction ── */}
      <section id="clubs" className="bg-[#FAF9FD] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead kicker="Direction des Clubs" num="12–15" title="Nos Équipes Sportives" subtitle="Trois clubs, une seule famille — chacun avec sa direction dédiée." />

          {/* Ski club */}
          <div className="mt-14 grid lg:grid-cols-[1fr_340px] gap-10">
            <FadeIn>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center">
                      <i className="fas fa-skiing text-sm" />
                    </div>
                    <div>
                      <div className="font-heading font-black text-primary-dark text-2xl">Club de Ski</div>
                      <div className="font-heading text-[11px] uppercase tracking-[0.22em] text-primary/45">5 membres · Affilié FRMSSM</div>
                    </div>
                  </div>
                  <span className="hidden md:inline-flex items-center gap-2 text-xs text-primary bg-primary-pale px-3 py-1 rounded-full font-heading font-semibold">
                    Discipline phare
                  </span>
                </div>

                {/* Timeline list */}
                <div className="relative">
                  <div
                    className="absolute left-[27px] md:left-[33px] top-2 bottom-2 w-px"
                    style={{ background: 'linear-gradient(to bottom, #42A5F5, #1565C0, transparent)' }}
                  />
                  <ol className="space-y-4 relative">
                    {skiTeam.map((m, i) => (
                      <li key={m.name} className="relative grid grid-cols-[56px_1fr] md:grid-cols-[66px_1fr] gap-4 items-stretch">
                        {/* node */}
                        <div className="flex flex-col items-center pt-3">
                          <div className={`grid place-items-center rounded-full font-heading font-black text-sm ${m.lead ? 'bg-primary text-white w-14 h-14 ring-4 ring-primary-pale' : 'bg-white text-primary ring-1 ring-primary-pale w-12 h-12'}`}>
                            {String(i + 1).padStart(2, '0')}
                            {m.lead && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-light ring-2 ring-white" />}
                          </div>
                        </div>

                        {/* card */}
                        <div className={`relative rounded-2xl p-3 sm:p-5 ring-1 transition-all ${m.lead ? 'bg-primary text-white ring-primary shadow-blue-md' : 'bg-white ring-primary-pale hover:ring-primary/20 hover:shadow-blue-sm'}`}>
                          <div className="flex items-center gap-3 sm:gap-4">
                            <MemberPhoto photo={m.photo} name={m.name} size={m.lead ? 52 : 44} dark={m.lead} />
                            <div className="min-w-0 flex-1">
                              <div className={`font-heading font-black leading-tight ${m.lead ? 'text-white text-sm sm:text-base' : 'text-primary-dark text-xs sm:text-sm'}`}>{m.name}</div>
                              <div className={`text-xs mt-0.5 leading-snug ${m.lead ? 'text-primary-light' : 'text-gray-400'}`}>{m.role}</div>
                            </div>
                            {m.lead && (
                              <div className="hidden md:flex flex-col items-end shrink-0">
                                <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-white/55">Direction</span>
                                <span className="font-heading font-black text-2xl">SKI</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </FadeIn>

            {/* Side card */}
            <FadeIn delay={0.15}>
              <aside className="bg-white rounded-2xl ring-1 ring-primary-pale p-7 self-start sticky top-24 shadow-blue-sm">
                <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-primary/50">À propos</span>
                <h4 className="font-heading font-black text-primary-dark text-xl mt-2 leading-tight">Une équipe née sur les pistes du Toubkal.</h4>
                <p className="text-gray-500 text-sm leading-relaxed mt-4">
                  Le club de ski porte la première discipline historique de l'ASATA. Notre équipe accompagne les athlètes du club-école aux compétitions nationales.
                </p>
                <div className="mt-5 space-y-3 text-sm">
                  {[
                    ['Fondation', '2008'],
                    ['Athlètes actifs', '24'],
                    ['Saison', 'Déc. — Avr.'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center justify-between border-b border-primary-pale pb-2 last:border-0">
                      <span className="text-gray-400">{label}</span>
                      <span className="font-heading font-bold text-primary-dark">{val}</span>
                    </div>
                  ))}
                </div>
                <Link to="/ski" className="mt-5 inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm hover:gap-3 transition-all">
                  Voir le club <i className="fas fa-arrow-right text-xs" />
                </Link>
              </aside>
            </FadeIn>
          </div>

          {/* Other clubs */}
          <div className="mt-16">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-heading font-black text-primary-dark text-lg">Autres clubs affiliés</span>
              <span className="h-px flex-1 bg-primary-pale" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {otherClubs.map(c => (
                <FadeIn key={c.name}>
                  <div className="group relative bg-white rounded-2xl ring-1 ring-primary-pale p-6 hover:-translate-y-1 hover:shadow-blue-md hover:ring-primary/20 transition-all duration-300 overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-40 h-40 rounded-full bg-primary-ghost" />
                    <div className="absolute right-6 top-6 font-heading font-black text-primary/8 text-7xl tracking-tight pointer-events-none select-none">{c.code}</div>
                    <div className="relative">
                      <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-primary/50">Club affilié</span>
                      <h4 className="font-heading font-black text-primary-dark text-2xl mt-1">{c.name}</h4>
                      <div className="mt-4 flex items-center gap-3 text-sm">
                        <span className="px-3 py-1 rounded-full bg-primary-pale text-primary font-heading font-semibold">{c.count}</span>
                        <span className="text-gray-400">{c.note}</span>
                      </div>
                      <Link to={c.to} className="mt-5 inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm group-hover:gap-3 transition-all">
                        Découvrir le club <i className="fas fa-arrow-right text-xs" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Staff Sportif ── */}
      <section className="bg-primary-ghost py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead
            kicker="Staff Technique"
            title="Nos Entraîneurs"
            subtitle="Des professionnels passionnés qui encadrent nos athlètes au quotidien."
          />

          <div className="mt-14 space-y-16">
            {staffGroups.map((group, gi) => (
              <FadeIn key={group.club} delay={gi * 0.1}>
                {/* Club header */}
                <div className="flex items-center gap-3 mb-7">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${group.color} text-white flex items-center justify-center text-lg shrink-0`}>
                    <i className={group.icon} />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-primary-dark text-xl">{group.club}</h3>
                    <span className="font-heading text-[11px] uppercase tracking-[0.22em] text-primary/45">{group.fed}</span>
                  </div>
                </div>

                {/* Trainer cards */}
                <div className={`grid gap-5 ${group.trainers.length === 1 ? 'md:grid-cols-1 max-w-2xl' : group.trainers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-2'}`}>
                  {group.trainers.map((trainer, ti) => (
                    <FadeIn key={trainer.name} delay={ti * 0.08}>
                      <div
                        className="group bg-white rounded-2xl ring-1 ring-primary-pale overflow-hidden hover:shadow-blue-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        onClick={() => setActiveTrainer(trainer)}
                      >
                        {/* top strip */}
                        <div className={`h-1.5 bg-gradient-to-r ${group.color}`} />
                        <div className="p-4 sm:p-6 flex gap-4 sm:gap-5 items-start">
                          {/* Photo */}
                          <div className="shrink-0">
                            <img
                              src={trainer.photo}
                              alt={trainer.name}
                              className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl object-cover shadow-blue-sm ring-2 ring-primary-pale"
                            />
                          </div>
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-black text-primary-dark text-sm sm:text-base leading-tight">{trainer.name}</h4>
                            <p className="text-primary font-heading font-semibold text-[10px] sm:text-xs uppercase tracking-wide mt-1 leading-snug">{trainer.role}</p>
                            <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-1.5">
                              {trainer.highlights.map((h, hi) => (
                                <li key={hi} className="flex items-start gap-2 text-xs sm:text-sm text-gray-500">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light shrink-0 mt-1" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 inline-flex items-center gap-1.5 text-primary text-xs font-heading font-semibold opacity-0 group-hover:opacity-100 transition">
                              Voir le profil <i className="fas fa-arrow-right text-[10px]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#FAF9FD] pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="relative rounded-3xl overflow-hidden text-white p-10 md:p-16" style={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' }}>
            {/* deco glows */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(60% 60% at 90% 20%, rgba(66,165,245,0.5) 0%, transparent 60%), radial-gradient(50% 60% at 10% 100%, rgba(66,165,245,0.25) 0%, transparent 60%)' }}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#D7E3FF 1.4px, transparent 1.4px)', backgroundSize: '18px 18px' }}
            />

            <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <span className="font-heading text-[11px] uppercase tracking-[0.28em] text-primary-light">Rejoignez l'aventure</span>
                <h3 className="font-heading font-black text-4xl md:text-6xl mt-4 leading-[0.95]">
                  Du Toubkal aux<br />terrains, l'équipe<br />vous attend.
                </h3>
                <p className="text-white/70 mt-5 max-w-lg leading-relaxed">
                  Bénévoles, athlètes, partenaires — l'ASATA grandit avec vous. Découvrez comment vous engager auprès de notre comité.
                </p>
              </div>
              <div className="flex flex-wrap md:flex-col gap-3">
                <Link to="/contact" className="bg-white text-primary font-heading font-bold px-6 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-primary-pale transition">
                  Devenir bénévole <i className="fas fa-arrow-right text-xs" />
                </Link>
                <Link to="/contact" className="bg-white/10 ring-1 ring-white/30 text-white font-heading font-bold px-6 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-white/20 transition">
                  <i className="fas fa-envelope text-xs" /> Nous contacter
                </Link>
              </div>
            </div>
          </div>

          {/* footer strip */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-300 font-heading uppercase tracking-[0.22em]">
            <span>ASATA · Atlas Toubkal Asni</span>
            <span>Comité Directeur 2024 — 2028</span>
            <span>Asni · Maroc</span>
          </div>
        </div>
      </section>

      {/* ── Trainer Modal ── */}
      <AnimatePresence>
        {activeTrainer && (
          <motion.div
            key="trainer-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveTrainer(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              key="trainer-modal-card"
              className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top gradient band */}
              <div className="h-2 bg-gradient-to-r from-primary-dark via-primary to-primary-light" />

              {/* Close button */}
              <button
                onClick={() => setActiveTrainer(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition text-gray-500 hover:text-gray-800 z-10"
                aria-label="Fermer"
              >
                <i className="fas fa-times text-sm" />
              </button>

              {/* Photo + name header */}
              <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 flex items-center gap-4 sm:gap-5">
                <img
                  src={activeTrainer.photo}
                  alt={activeTrainer.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-primary-pale shadow-blue-sm shrink-0"
                />
                <div>
                  <div className="font-heading text-[10px] uppercase tracking-[0.28em] text-primary/55 mb-1">
                    Entraîneur ASATA
                  </div>
                  <h3 className="font-heading font-black text-primary-dark text-xl leading-tight">
                    {activeTrainer.name}
                  </h3>
                  <p className="text-primary font-heading font-semibold text-xs uppercase tracking-wide mt-1.5">
                    {activeTrainer.role}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-5 sm:mx-8 h-px bg-primary-pale" />

              {/* Highlights */}
              <div className="px-5 sm:px-8 py-5 sm:py-6">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fas fa-trophy text-primary-light text-sm" />
                  <span className="font-heading font-bold text-primary-dark text-sm uppercase tracking-wider">
                    Palmarès & Expérience
                  </span>
                </div>
                <ul className="space-y-3">
                  {activeTrainer.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-primary-pale flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="px-5 sm:px-8 pb-6 sm:pb-7">
                <div className="rounded-2xl bg-primary-ghost border border-primary-pale px-5 py-4 flex items-center gap-3">
                  <i className="fas fa-map-marker-alt text-primary-light" />
                  <span className="text-sm text-gray-500">
                    Entraîneur au sein de l'<span className="font-semibold text-primary">ASATA</span> — Asni, Haut Atlas
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
