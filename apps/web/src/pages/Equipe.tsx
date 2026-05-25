import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import { TEAM_PHOTOS, TRAINER_PHOTOS } from '../data/images'

// ─── Static data (names / photos — language-independent) ─────────────────────

const vicePresidents = [
  { photo: TEAM_PHOTOS.jamilaChenter,  name: 'Mme. Jamila CHENTER',  vpKey: 'vp1' },
  { photo: TEAM_PHOTOS.faridBouserhan, name: 'M. Farid BOUSERHAN',   vpKey: 'vp2' },
]

const bureau = [
  { photo: TEAM_PHOTOS.abdEssamad,      name: 'M. Abd Essamad AIT BEL HAJ', roleKey: 'b1role', poleKey: 'b1pole' },
  { photo: TEAM_PHOTOS.medAitChakart,   name: 'M. Med AIT CHAKART',          roleKey: 'b2role', poleKey: 'b2pole' },
  { photo: TEAM_PHOTOS.medAourik,       name: 'M. Med AOURIK',               roleKey: 'b3role', poleKey: 'b3pole' },
  { photo: TEAM_PHOTOS.noraAchebani,    name: 'Mlle. Nora ACHEBANI',         roleKey: 'b4role', poleKey: 'b4pole' },
  { photo: TEAM_PHOTOS.rachidBouserhan, name: 'M. Rachid BOUSERHAN',         roleKey: 'b5role', poleKey: 'b5pole' },
  { photo: TEAM_PHOTOS.medElAouad,      name: 'M. Med EL AOUAD',             roleKey: 'b5role', poleKey: 'b5pole' },
  { photo: TEAM_PHOTOS.azizAitBourhim,  name: 'M. Aziz AIT BOURHIM',         roleKey: 'b5role', poleKey: 'b5pole' },
  { photo: TEAM_PHOTOS.elmajidOussais,  name: 'M. Abd Elmajid OUSSAIS',      roleKey: 'b5role', poleKey: 'b5pole' },
]

const sportClubs = [
  { id: 'ski',        icon: 'fas fa-skiing',  fed: 'FRMSSM', image: '/skiActivitiesPics/PHOTO-2026-04-07-12-10-30.jpg',              descKey: 'skiDesc',  countKey: 'skiCount' },
  { id: 'football',   icon: 'fas fa-futbol',  fed: 'FRMF',   image: '/footballActivitiesPics/asata%20tournoi%20raman%20winners.jpg', descKey: 'footDesc', countKey: 'footCount' },
  { id: 'athletisme', icon: 'fas fa-running', fed: 'FRMA',   image: '/athleticism/acc%20image.jpeg',                                 descKey: 'athDesc',  countKey: 'athCount' },
]

const coachData = [
  { photo: TRAINER_PHOTOS.rachidChib,      name: 'M. Rachid CHIB',        club: 'Ski',        fed: 'FRMSSM', roleKey: 'c1role', highlights: ['c1h1','c1h2','c1h3','c1h4'] },
  { photo: TRAINER_PHOTOS.ahmedBiri,       name: 'M. Ahmed BIRI',         club: 'Athlétisme', fed: 'FRMA',   roleKey: 'c2role', highlights: ['c2h1','c2h2','c2h3','c2h4'] },
  { photo: TRAINER_PHOTOS.younesElMarkat,  name: 'M. Younes EL MARKAT',   club: 'Football',   fed: 'FRMF',   roleKey: 'c3role', highlights: ['c3h1','c3h2','c3h3'] },
  { photo: TRAINER_PHOTOS.taherAitElBaraka,name: 'M. Taher AIT EL BARAKA',club: 'Football',   fed: 'FRMF',   roleKey: 'c4role', highlights: ['c4h1','c4h2','c4h3'] },
  { photo: TRAINER_PHOTOS.essadiqAitBenAli,name: 'M. Essadiq AIT BEN ALI',club: 'Football',   fed: 'FRMF',   roleKey: 'c5role', highlights: ['c5h1','c5h2','c5h3'] },
  { photo: TRAINER_PHOTOS.soufianAzzaimi,  name: 'M. Soufian AZZAIMI',    club: 'Football',   fed: 'FRMF',   roleKey: 'c6role', highlights: ['c6h1','c6h2'] },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(full: string): string {
  const parts = full.replace(/^(M\.|Mme\.|Mlle\.)\s/, '').split(/\s+/).filter(Boolean)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function PhotoOrInitials({ photo, name, className = '' }: { photo: string | null; name: string; className?: string }) {
  if (photo) return <img src={photo} alt={name} className={`object-cover ${className}`} />
  return (
    <div className={`flex items-center justify-center font-heading font-black bg-primary-pale text-primary text-5xl ${className}`}>
      {getInitials(name)}
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

type CoachEntry = typeof coachData[0]

export default function Equipe() {
  const { t } = useTranslation()
  const [activeCoach, setActiveCoach] = useState<CoachEntry | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveCoach(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <PageTransition>

      {/* ═══════ HERO ═══════ */}
      <section className="relative bg-white pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary-light/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-ghost border border-primary-pale rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
            <span className="font-heading font-semibold text-[11px] tracking-[0.2em] uppercase text-primary">{t('team.mandate')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-black text-primary-dark leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
          >
            {t('team.hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed"
          >
            {t('team.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ═══════ PRESIDENT ═══════ */}
      <section className="relative bg-white pb-20 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-8">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">{t('team.president')}</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary/40">01 / 15</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-blue-sm ring-1 ring-primary-pale overflow-hidden"
          >
            <div className="grid md:grid-cols-[280px_1fr]">
              <div className="relative h-72 md:h-auto bg-primary-pale overflow-hidden">
                <img src={TEAM_PHOTOS.president} alt="M. Med BOUSERHAN" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-heading font-bold text-[10px] tracking-widest text-primary-dark uppercase">{t('team.president')} · 01/15</span>
                </div>
              </div>
              <div className="p-7 md:p-9 flex flex-col justify-center">
                <h3 className="font-heading font-black text-primary-dark text-2xl md:text-3xl leading-tight">M. Med BOUSERHAN</h3>
                <p className="text-primary font-heading font-bold text-xs md:text-sm uppercase tracking-widest mt-2">
                  {t('team.presidentRole')} · {t('team.presidentSince')}
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4">{t('team.presidentBio')}</p>
                <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-primary-dark text-2xl">16+</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{t('team.statYears')}</span>
                  </div>
                  <div className="h-6 w-px bg-primary-pale" />
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-primary-dark text-2xl">03</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{t('team.statFeds')}</span>
                  </div>
                  <div className="h-6 w-px bg-primary-pale" />
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-primary-dark text-2xl">2024</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{t('team.statAccred')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ VICE-PRESIDENTS ═══════ */}
      <section className="relative bg-primary-ghost py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-8">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">{t('team.vpSection')}</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary/40">02 — 03 / 15</span>
          </div>

          <h2 className="font-heading font-black text-primary-dark leading-tight tracking-tight mb-10 text-2xl md:text-4xl">
            {t('team.vpSubtitle')}
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {vicePresidents.map((vp, i) => (
              <motion.article
                key={vp.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl ring-1 ring-primary-pale overflow-hidden hover:shadow-blue-md hover:-translate-y-1 hover:ring-primary/30 transition-all duration-300"
              >
                <div className="grid grid-cols-[140px_1fr]">
                  <div className="relative bg-primary-pale overflow-hidden">
                    <PhotoOrInitials photo={vp.photo} name={vp.name} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col justify-center">
                    <span className="font-heading font-bold text-[10px] tracking-widest uppercase text-primary">VP · 0{i + 2} / 15</span>
                    <h3 className="font-heading font-black text-primary-dark text-lg md:text-xl leading-tight mt-1">{vp.name}</h3>
                    <p className="text-primary text-xs font-heading font-semibold uppercase tracking-wide mt-1.5">{t(`team.${vp.vpKey}role`)}</p>
                    <p className="text-gray-500 text-sm mt-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-light shrink-0" />
                      {t(`team.${vp.vpKey}focus`)}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ BUREAU ═══════ */}
      <section className="relative bg-white py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-8">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">{t('team.bureau')}</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary/40">04 — 11 / 15</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <h2 className="font-heading font-black text-primary-dark leading-tight tracking-tight text-2xl md:text-4xl">
              {t('team.bureauSubtitle')}
            </h2>
            <p className="text-gray-500 text-sm max-w-md">{t('team.bureauDesc')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bureau.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="group bg-white rounded-2xl ring-1 ring-primary-pale overflow-hidden hover:shadow-blue-sm hover:-translate-y-0.5 hover:ring-primary/30 transition-all"
              >
                <div className="relative aspect-square bg-primary-pale overflow-hidden">
                  <PhotoOrInitials photo={m.photo} name={m.name} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur px-2 py-0.5 rounded-full">
                    <span className="font-heading font-bold text-[8px] tracking-widest text-primary-dark uppercase">{t(`team.${m.poleKey}`)}</span>
                  </div>
                  <div className="absolute top-2 right-2 font-heading font-black text-white text-xs bg-primary/70 backdrop-blur w-6 h-6 grid place-items-center rounded-full">
                    {String(i + 4).padStart(2, '0')}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-heading font-bold text-primary-dark text-xs md:text-sm leading-tight truncate">{m.name.replace(/^(M\.|Mme\.|Mlle\.)\s/, '')}</h4>
                  <p className="text-gray-500 text-[10px] md:text-xs mt-0.5 truncate">{t(`team.${m.roleKey}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SPORT CLUBS ═══════ */}
      <section className="relative bg-primary-ghost py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-8">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">{t('team.clubsSection')}</span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary/40">12 — 15 / 15</span>
          </div>

          <h2 className="font-heading font-black text-primary-dark leading-tight tracking-tight mb-10 text-2xl md:text-4xl">
            {t('team.clubsSubtitle')}
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {sportClubs.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden ring-1 ring-primary-pale hover:shadow-blue-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] bg-primary-pale overflow-hidden">
                  <img src={c.image} alt={c.id} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full">
                    <i className={`${c.icon} text-primary text-[10px]`} />
                    <span className="font-heading font-bold text-[9px] tracking-widest text-primary-dark uppercase">{c.fed}</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <p className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase text-blue-100 mb-1">{t(`team.${c.countKey}`)}</p>
                    <h3 className="font-heading font-black text-lg md:text-xl leading-tight">{t(`nav.${c.id}`)}</h3>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between gap-3">
                  <p className="text-gray-500 text-xs leading-snug flex-1">{t(`team.${c.descKey}`)}</p>
                  <Link to={`/${c.id}`} className="w-9 h-9 rounded-full bg-primary-pale text-primary grid place-items-center group-hover:bg-primary group-hover:text-white transition shrink-0">
                    <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ COACHES ═══════ */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-10">
            <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-primary">{t('team.trainers')}</span>
            <span className="h-px flex-1 bg-primary/15" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <h2 className="font-heading font-black text-primary-dark leading-[0.95] tracking-tight max-w-3xl"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
              {t('team.coachesTitle')}
            </h2>
            <p className="text-gray-500 max-w-md leading-relaxed">{t('team.coachesHint')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coachData.map((c, i) => (
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
                    <p className="text-white/85 text-sm mt-2 leading-snug">{t(`team.${c.roleKey}`)}</p>
                  </div>

                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 md:p-8">
                    <p className="font-heading font-semibold text-[10px] tracking-[0.3em] text-primary uppercase mb-4">{t('team.profilePreview')}</p>
                    <ul className="space-y-2.5">
                      {c.highlights.slice(0, 3).map((hk, hi) => (
                        <li key={hi} className="flex items-start gap-2.5 text-primary-dark/90 text-sm leading-relaxed">
                          <i className="fas fa-trophy text-primary-light text-xs mt-1.5 shrink-0" />
                          <span>{t(`team.${hk}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 inline-flex items-center gap-2 text-primary font-heading font-bold text-sm">
                      {t('team.fullProfile')} <i className="fas fa-arrow-right text-xs" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative bg-primary-ghost py-20 md:py-28 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-light/15 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h3 className="font-heading font-black text-primary-dark leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {t('team.ctaTitle')}
          </h3>
          <p className="mt-5 text-gray-600 max-w-xl mx-auto">{t('team.ctaDesc')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-primary-dark hover:shadow-blue-md transition">
              {t('team.ctaVolunteer')} <i className="fas fa-arrow-right text-xs" />
            </Link>
            <Link to="/don" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-7 py-3.5 rounded-full ring-1 ring-primary/30 hover:ring-primary hover:shadow-blue-sm transition">
              <i className="fas fa-heart" /> {t('team.ctaSupport')}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ COACH MODAL ═══════ */}
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
                  aria-label={t('common.close')}
                >
                  <i className="fas fa-times" />
                </button>

                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-heading font-bold text-[10px] tracking-widest text-primary-dark uppercase">{activeCoach.fed} · {activeCoach.club}</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white">
                  <p className="font-heading font-semibold text-[10px] tracking-[0.3em] text-blue-100 uppercase mb-2">{t('team.coachLabel')}</p>
                  <h3 className="font-heading font-black text-3xl md:text-4xl leading-tight">{activeCoach.name}</h3>
                  <p className="font-heading text-blue-100 font-semibold mt-1">{t(`team.${activeCoach.roleKey}`)}</p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <i className="fas fa-trophy text-primary text-lg" />
                  <span className="font-heading font-black text-primary-dark uppercase tracking-wider text-sm">{t('team.achievementsLabel')}</span>
                  <span className="h-px flex-1 bg-primary-pale" />
                </div>

                <ul className="space-y-3">
                  {activeCoach.highlights.map((hk, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <span className="font-heading font-bold text-[10px] text-primary/50 mt-1.5 tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm md:text-base">{t(`team.${hk}`)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl bg-primary-ghost border border-primary-pale p-4 flex items-center gap-3">
                  <i className="fas fa-map-marker-alt text-primary" />
                  <span className="text-sm text-gray-600">{t('team.locationLabel')}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </PageTransition>
  )
}
