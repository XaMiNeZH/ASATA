import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
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

const previewPhotos = [
  SKI_PHOTOS[14], SKI_PHOTOS[10], SKI_PHOTOS[20],
  FOOTBALL_PHOTOS[1], SKI_PHOTOS[22],
]

export default function Home() {
  const [lbIndex, setLbIndex] = useState<number | null>(null)
  const { t } = useTranslation()

  const clubs = [
    { to: '/ski',        img: HOME_SKI_CARD_IMAGE,        icon: 'fas fa-skiing',  fed: 'FRMSSM', title: t('home.clubs.skiTitle'), desc: t('home.clubs.skiDesc') },
    { to: '/football',   img: FOOTBALL_INTRO_IMAGE,       icon: 'fas fa-futbol',  fed: 'FRMF',   title: t('home.clubs.footTitle'), desc: t('home.clubs.footDesc') },
    { to: '/athletisme', img: HOME_ATHLETISME_CARD_IMAGE, icon: 'fas fa-running', fed: 'FRMA',   title: t('home.clubs.athTitle'), desc: t('home.clubs.athDesc') },
  ]

  const missions = [
    { icon: 'fas fa-users',           title: t('home.missions.m1t'), desc: t('home.missions.m1d') },
    { icon: 'fas fa-trophy',          title: t('home.missions.m2t'), desc: t('home.missions.m2d') },
    { icon: 'fas fa-heart',           title: t('home.missions.m3t'), desc: t('home.missions.m3d') },
    { icon: 'fas fa-shield-alt',      title: t('home.missions.m4t'), desc: t('home.missions.m4d') },
    { icon: 'fas fa-calendar-check',  title: t('home.missions.m5t'), desc: t('home.missions.m5d') },
    { icon: 'fas fa-handshake',       title: t('home.missions.m6t'), desc: t('home.missions.m6d') },
  ]

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
            <i className="fas fa-map-marker-alt" /> {t('home.badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-heading font-black text-5xl md:text-7xl leading-tight text-shadow mb-5"
          >
            {t('home.title1')}<br />
            <span className="text-blue-300">{t('home.title2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-9 leading-relaxed"
          >
            {t('home.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link to="/about" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-7 py-3.5 rounded-full shadow-blue-md hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200">
              <i className="fas fa-info-circle" /> {t('home.discoverBtn')}
            </Link>
            <Link to="/galerie" className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/60 font-heading font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-primary hover:-translate-y-0.5 transition-all duration-200">
              <i className="fas fa-images" /> {t('home.galleryBtn')}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 text-xs tracking-widest uppercase"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>{t('home.scroll')}</span>
          <i className="fas fa-chevron-down" />
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-9">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4">
          <Counter target={2010} label={t('home.stats.founded')} />
          <Counter target={3}    label={t('home.stats.clubs')} />
          <Counter target={3}    label={t('home.stats.feds')} />
          <Counter target={21000} label={t('home.stats.pop')} />
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
              <div className="text-xs text-white/80">{t('home.about.years')}</div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">
              {t('home.about.tag')}
            </span>
            <h2 className="font-heading font-bold text-4xl text-gray-900 mb-5 leading-tight">
              {t('home.about.title')}
            </h2>
            <p className="text-gray-500 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.about.p1') }} />
            <p className="text-gray-500 mb-7 leading-relaxed">
              {t('home.about.p2')}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { icon: 'fas fa-skiing',      label: 'Ski & Montagne',  sub: t('home.about.badge1') },
                { icon: 'fas fa-futbol',      label: 'Football',        sub: t('home.about.badge2') },
                { icon: 'fas fa-running',     label: 'Athlétisme',      sub: t('home.about.badge3') },
                { icon: 'fas fa-certificate', label: 'Accréditation',   sub: t('home.about.badge4') },
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
              {t('home.about.readMore')} <i className="fas fa-arrow-right" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CLUBS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('home.clubs.tag')} title={t('home.clubs.title')} subtitle={t('home.clubs.subtitle')} />
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
                      {t('home.clubs.discover')} <i className="fas fa-arrow-right" />
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
          <SectionHeader tag={t('home.missions.tag')} title={t('home.missions.title')} />
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
          <SectionHeader tag={t('home.gallery.tag')} title={t('home.gallery.title')} />
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
              {t('home.gallery.viewAll')} <i className="fas fa-arrow-right" />
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
              {t('home.cta.tag')}
            </span>
            <h2 className="font-heading font-black text-4xl text-white mb-4">{t('home.cta.title')}</h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {t('home.cta.subtitle')}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-primary hover:-translate-y-0.5 transition-all">
                <i className="fas fa-envelope" /> {t('home.cta.contactBtn')}
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-7 py-3.5 rounded-full hover:bg-primary-pale hover:-translate-y-0.5 transition-all">
                <i className="fas fa-info-circle" /> {t('home.cta.learnBtn')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Lightbox images={previewPhotos} index={lbIndex} onClose={() => setLbIndex(null)} onPrev={() => setLbIndex(i => i !== null && i > 0 ? i - 1 : i)} onNext={() => setLbIndex(i => i !== null && i < previewPhotos.length - 1 ? i + 1 : i)} />
    </PageTransition>
  )
}
