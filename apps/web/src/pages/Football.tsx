import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import Lightbox from '../components/Lightbox'
import { FOOTBALL_HERO_IMAGE, FOOTBALL_INTRO_IMAGE, FOOTBALL_PHOTOS } from '../data/images'

export default function Football() {
  const { t } = useTranslation()
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const activities = [
    { icon: 'fas fa-futbol',             title: t('football.a1t'), desc: t('football.a1d') },
    { icon: 'fas fa-star-and-crescent',  title: t('football.a2t'), desc: t('football.a2d') },
    { icon: 'fas fa-child',              title: t('football.a3t'), desc: t('football.a3d') },
    { icon: 'fas fa-chalkboard-teacher', title: t('football.a4t'), desc: t('football.a4d') },
    { icon: 'fas fa-heartbeat',          title: t('football.a5t'), desc: t('football.a5d') },
    { icon: 'fas fa-handshake',          title: t('football.a6t'), desc: t('football.a6d') },
  ]

  return (
    <PageTransition>
      <PageHero
        title={t('football.hero.title')}
        subtitle={t('football.hero.subtitle')}
        image={FOOTBALL_HERO_IMAGE}
        icon="fas fa-futbol"
        breadcrumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.clubs') }, { label: t('football.hero.crumb') }]}
      />

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <FadeIn direction="left">
              <img src={FOOTBALL_INTRO_IMAGE} alt="Football ASATA" className="w-full h-[400px] object-cover rounded-2xl shadow-blue-md" />
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">{t('football.tag')}</span>
              <h2 className="font-heading font-bold text-4xl text-gray-900 mt-1 mb-4">{t('football.title')}</h2>
              <p className="text-gray-500 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('football.p1') }} />
              <p className="text-gray-500 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('football.p2') }} />
              <p className="text-gray-500 mb-6 leading-relaxed">{t('football.p3')}</p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/galerie" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm"><i className="fas fa-images" /> {t('football.viewPhotos')}</Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold px-6 py-3 rounded-full hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all"><i className="fas fa-envelope" /> {t('football.join')}</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('football.activitiesTag')} title={t('football.activitiesTitle')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activities.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="group bg-white border border-primary-pale rounded-2xl p-5 flex gap-4 items-start hover:shadow-blue-md hover:border-primary-light hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary-pale text-primary rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-primary group-hover:text-white transition-all"><i className={icon} /></div>
                  <div><h3 className="font-heading font-bold text-sm text-gray-900 mb-1">{title}</h3><p className="text-gray-500 text-sm leading-relaxed">{desc}</p></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('football.galleryTag')} title={t('football.galleryTitle')} />
          <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
            {FOOTBALL_PHOTOS.map((src, i) => (
              <FadeIn key={src} delay={i * 0.1}>
                <div onClick={() => setLbIndex(i)} className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer shadow-blue-sm">
                  <img src={src} alt="Football ASATA" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/40 transition-all flex items-center justify-center"><i className="fas fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={FOOTBALL_PHOTOS} index={lbIndex} onClose={() => setLbIndex(null)} onPrev={() => setLbIndex(i => (i !== null && i > 0 ? i - 1 : i))} onNext={() => setLbIndex(i => (i !== null && i < FOOTBALL_PHOTOS.length - 1 ? i + 1 : i))} />
    </PageTransition>
  )
}
