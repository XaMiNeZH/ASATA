import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import Counter from '../components/Counter'
import Lightbox from '../components/Lightbox'
import {
  SKI_PHOTOS,
  FOOTBALL_PHOTOS,
  FOOTBALL_INTRO_IMAGE,
  HOME_ATHLETISME_CARD_IMAGE,
  HOME_HERO_IMAGE,
  HOME_SKI_CARD_IMAGE,
  SKI_TEAM_IMAGE,
} from '../data/images'

const clubs = [
  { to: '/ski',        img: HOME_SKI_CARD_IMAGE,        icon: 'fas fa-skiing',  fed: 'FRMSSM', title: 'Ski & Sports de Montagne', desc: 'Ski alpin à Oukaimden, escalade, randonnée et trail. Stages internationaux en Espagne, France et Corée du Sud.' },
  { to: '/football',   img: FOOTBALL_INTRO_IMAGE,       icon: 'fas fa-futbol',  fed: 'FRMF',   title: 'Football',                 desc: 'Formation des jeunes joueurs et participation aux compétitions régionales sous l\'égide de la FRMF.' },
  { to: '/athletisme', img: HOME_ATHLETISME_CARD_IMAGE, icon: 'fas fa-running', fed: 'FRMA',   title: 'Athlétisme',               desc: 'Trail, course en montagne et disciplines de piste affiliées à la Fédération Royale Marocaine d\'Athlétisme.' },
]

const missions = [
  { icon: 'fas fa-users',           title: 'Formation des jeunes',       desc: 'Former les jeunes joueurs et encadreurs en développant leurs capacités sportives et humaines.' },
  { icon: 'fas fa-trophy',          title: 'Compétition & Excellence',   desc: 'Ligues régionales, Championnat du Maroc, Coupe du Roi et stages internationaux.' },
  { icon: 'fas fa-heart',           title: 'Inclusion sociale',          desc: 'Encourager la participation sans distinction d\'âge, de genre ou de situation économique.' },
  { icon: 'fas fa-shield-alt',      title: 'Valeurs sportives',          desc: 'Combattre la drogue et promouvoir un mode de vie sain à travers le sport.' },
  { icon: 'fas fa-calendar-check',  title: 'Événements sportifs',        desc: 'Créer et organiser des événements réguliers qui dynamisent la région d\'Asni.' },
  { icon: 'fas fa-handshake',       title: 'Partenariats',               desc: 'Collaborer avec les institutions pour soutenir les programmes des fédérations.' },
]

const previewPhotos = [
  SKI_PHOTOS[14], SKI_PHOTOS[10], SKI_PHOTOS[20],
  FOOTBALL_PHOTOS[1], SKI_PHOTOS[22],
]

export default function Home() {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  return (
    <PageTransition>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: `url(${HOME_HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white text-xs font-heading font-bold uppercase tracking-[2px] px-4 py-2 rounded-full mb-6"
          >
            <i className="fas fa-map-marker-alt" /> Fondée en 2010 · Asni, Marrakech
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-heading font-black text-5xl md:text-7xl leading-tight text-shadow mb-5"
          >
            Association Sportive<br />
            <span className="text-blue-300">Atlas Toubkal Asni</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-9 leading-relaxed"
          >
            Développer le sport, former la jeunesse et promouvoir les valeurs sportives au pied du majestueux Djebel Toubkal
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link to="/about" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-7 py-3.5 rounded-full shadow-blue-md hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200">
              <i className="fas fa-info-circle" /> Découvrir l'association
            </Link>
            <Link to="/galerie" className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/60 font-heading font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-primary hover:-translate-y-0.5 transition-all duration-200">
              <i className="fas fa-images" /> Voir la galerie
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 text-xs tracking-widest uppercase"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>Défiler</span>
          <i className="fas fa-chevron-down" />
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-9">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4">
          <Counter target={2010} label="Année de fondation" />
          <Counter target={3}    label="Clubs affiliés" />
          <Counter target={3}    label="Fédérations nationales" />
          <Counter target={21000} label="Habitants de la région" />
        </div>
      </section>

      {/* ── ABOUT PREVIEW ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left" className="relative">
            <img
              src={SKI_TEAM_IMAGE}
              alt="Équipe ASATA"
              className="w-full h-[460px] object-cover rounded-2xl shadow-blue-lg"
            />
            <div className="absolute -bottom-5 -right-5 bg-primary text-white rounded-xl px-5 py-4 text-center shadow-blue-md hidden md:block">
              <div className="font-heading font-black text-3xl">14</div>
              <div className="text-xs text-white/80">ans d'excellence</div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">
              À propos de nous
            </span>
            <h2 className="font-heading font-bold text-4xl text-gray-900 mb-5 leading-tight">
              Une association au cœur des montagnes
            </h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              L'Association Sportive Atlas Toubkal Asni (A.S.A.T.A), fondée le <strong className="text-gray-700">6 juin 2010</strong>, est implantée à Asni, à 50 km au sud de Marrakech, à 1 150 m d'altitude, au pied du Djebel Toubkal.
            </p>
            <p className="text-gray-500 mb-7 leading-relaxed">
              Notre mission : développer le sport local, former la jeunesse, combattre les fléaux sociaux et organiser des événements sportifs ouverts à tous.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { icon: 'fas fa-skiing',    label: 'Ski & Montagne',  sub: 'FRMSSM depuis 2013' },
                { icon: 'fas fa-futbol',    label: 'Football',        sub: 'Affilié FRMF' },
                { icon: 'fas fa-running',   label: 'Athlétisme',      sub: 'Affilié FRMA' },
                { icon: 'fas fa-certificate', label: 'Accréditation', sub: 'Officielle 2024' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="flex gap-3 items-start bg-primary-ghost p-3.5 rounded-xl border border-primary-pale">
                  <div className="w-9 h-9 bg-primary-pale text-primary rounded-lg flex items-center justify-center shrink-0">
                    <i className={icon} />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm">
              En savoir plus <i className="fas fa-arrow-right" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CLUBS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Nos disciplines" title="Trois clubs, une passion" subtitle="Chaque club est affilié à sa fédération nationale et participe aux compétitions régionales et nationales." />
          <div className="grid md:grid-cols-3 gap-6">
            {clubs.map(({ to, img, icon, fed, title, desc }, i) => (
              <FadeIn key={to} delay={i * 0.1}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-blue-sm hover:shadow-blue-lg hover:-translate-y-2 transition-all duration-300 border border-primary-pale">
                  <div className="relative h-56 overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center text-white">
                      <i className={icon} />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-primary-light font-heading font-bold text-[11px] uppercase tracking-[2px] mb-1">{fed}</p>
                    <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                    <Link to={to} className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm group-hover:gap-3 transition-all">
                      Découvrir le club <i className="fas fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Notre engagement" title="Ce qui nous anime" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {missions.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="group bg-primary-ghost border border-primary-pale rounded-2xl p-6 text-center hover:bg-white hover:shadow-blue-md hover:-translate-y-1 hover:border-primary-light transition-all duration-300">
                  <div className="w-14 h-14 bg-primary-pale text-primary rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <i className={icon} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ───────────────────────────────────── */}
      <section className="py-24 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Photos" title="Aperçu de nos activités" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[220px]">
            {previewPhotos.map((src, i) => (
              <div
                key={src}
                onClick={() => setLbIndex(i)}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-search-plus" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/galerie" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm">
              Voir toute la galerie <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-primary-dark via-primary to-primary-mid text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-3xl mx-auto px-5">
          <FadeIn>
            <span className="inline-block bg-white/15 border border-white/30 text-white font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-4">
              Rejoignez-nous
            </span>
            <h2 className="font-heading font-black text-4xl text-white mb-4">Faites partie de la famille ASATA</h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Que vous soyez passionné de ski, de football ou d'athlétisme, l'ASATA vous ouvre ses portes. Rejoignez une communauté sportive engagée au cœur du Haut Atlas.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-primary hover:-translate-y-0.5 transition-all">
                <i className="fas fa-envelope" /> Nous contacter
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-7 py-3.5 rounded-full hover:bg-primary-pale hover:-translate-y-0.5 transition-all">
                <i className="fas fa-info-circle" /> En savoir plus
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Lightbox images={previewPhotos} index={lbIndex} onClose={() => setLbIndex(null)} onPrev={() => setLbIndex(i => i !== null && i > 0 ? i - 1 : i)} onNext={() => setLbIndex(i => i !== null && i < previewPhotos.length - 1 ? i + 1 : i)} />
    </PageTransition>
  )
}
