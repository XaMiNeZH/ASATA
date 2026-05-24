import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import Lightbox from '../components/Lightbox'
import {
  ATHLETISME_HERO_IMAGE,
  ATHLETISME_INTRO_IMAGE,
  ATHLETISME_LANDSCAPE_IMAGE,
  ATHLETISME_PHOTOS,
} from '../data/images'

const achievements = [
  { icon: 'fas fa-trophy', value: 'Shkodër 2025', label: 'Championnat International', detail: 'Albanie — Représentation nationale' },
  { icon: 'fas fa-globe',  value: 'Tunis 2025',   label: 'Open African Masters',       detail: 'Athlétisme — Compétition africaine' },
  { icon: 'fas fa-star',   value: 'Rabat 2026',   label: 'Championnat National',       detail: 'Athlétisme — Niveau élite' },
]

export default function Athletisme() {
  const { t } = useTranslation()
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const stats = [
    { value: 'FRMA',     label: t('athletisme.statsAffiliated') },
    { value: '1 150 m',  label: t('athletisme.statsAltitude') },
    { value: '3',        label: t('athletisme.statsIntl') },
    { value: 'National', label: t('athletisme.statsLevel') },
  ]

  const disciplines = [
    { icon: 'fas fa-running',        title: t('athletisme.d1t'), desc: t('athletisme.d1d') },
    { icon: 'fas fa-flag-checkered', title: t('athletisme.d2t'), desc: t('athletisme.d2d') },
    { icon: 'fas fa-medal',          title: t('athletisme.d3t'), desc: t('athletisme.d3d') },
    { icon: 'fas fa-child',          title: t('athletisme.d4t'), desc: t('athletisme.d4d') },
    { icon: 'fas fa-heartbeat',      title: t('athletisme.d5t'), desc: t('athletisme.d5d') },
    { icon: 'fas fa-users',          title: t('athletisme.d6t'), desc: t('athletisme.d6d') },
  ]

  const altitudeAdvantages = [
    { icon: 'fas fa-wind',     title: t('athletisme.alt1t'), desc: t('athletisme.alt1d') },
    { icon: 'fas fa-mountain', title: t('athletisme.alt2t'), desc: t('athletisme.alt2d') },
    { icon: 'fas fa-leaf',     title: t('athletisme.alt3t'), desc: t('athletisme.alt3d') },
  ]

  return (
    <PageTransition>
      <PageHero
        title={t('athletisme.hero.title')}
        subtitle={t('athletisme.hero.subtitle')}
        image={ATHLETISME_HERO_IMAGE}
        icon="fas fa-running"
        breadcrumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.clubs') }, { label: t('athletisme.hero.crumb') }]}
      />

      {/* Stats bar */}
      <section className="bg-primary py-8">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="font-heading font-black text-2xl md:text-3xl text-white mb-1">{value}</div>
                <div className="text-white/70 text-xs uppercase tracking-widest font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <img src={ATHLETISME_INTRO_IMAGE} alt="Athlétisme ASATA" className="w-full h-[480px] object-cover rounded-2xl shadow-blue-md" />
                <div className="absolute bottom-4 right-4 w-36 h-36 rounded-xl overflow-hidden border-4 border-white shadow-blue-md">
                  <img src={ATHLETISME_LANDSCAPE_IMAGE} alt="Paysage Asni" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  🏃 Club FRMA
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-4">{t('athletisme.clubTag')}</span>
              <h2 className="font-heading font-bold text-4xl text-gray-900 mb-5 leading-tight">{t('athletisme.title')}</h2>
              <p className="text-gray-500 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('athletisme.p1') }} />
              <p className="text-gray-500 mb-4 leading-relaxed">{t('athletisme.p2')}</p>
              <p className="text-gray-500 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('athletisme.p3') }} />
              <div className="flex gap-3 flex-wrap">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm">
                  <i className="fas fa-envelope" /> {t('athletisme.joinBtn')}
                </Link>
                <Link to="/evenements" className="inline-flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold px-6 py-3 rounded-full hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all">
                  <i className="fas fa-calendar" /> {t('athletisme.eventsBtn')}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('athletisme.achievementsTag')} title={t('athletisme.achievementsTitle')} />
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map(({ icon, value, label, detail }, i) => (
              <FadeIn key={value} delay={i * 0.1}>
                <div className="bg-white border border-primary-pale rounded-2xl p-7 text-center hover:shadow-blue-md hover:-translate-y-1 hover:border-primary-light transition-all duration-300">
                  <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"><i className={icon} /></div>
                  <div className="font-heading font-black text-2xl text-primary mb-1">{value}</div>
                  <div className="font-heading font-bold text-gray-900 mb-2">{label}</div>
                  <div className="text-sm text-gray-400">{detail}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('athletisme.disciplinesTag')} title={t('athletisme.disciplinesTitle')} subtitle={t('athletisme.disciplinesSubtitle')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {disciplines.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="group bg-primary-ghost border border-primary-pale rounded-2xl p-6 flex gap-4 items-start hover:shadow-blue-md hover:border-primary-light hover:-translate-y-1 hover:bg-white transition-all duration-300">
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300"><i className={icon} /></div>
                  <div><h3 className="font-heading font-bold text-sm text-gray-900 mb-1">{title}</h3><p className="text-gray-500 text-sm leading-relaxed">{desc}</p></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Altitude advantage */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('athletisme.altitudeTag')} title={t('athletisme.altitudeTitle')} subtitle={t('athletisme.altitudeSubtitle')} />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <img src={ATHLETISME_LANDSCAPE_IMAGE} alt="Paysage Asni" className="w-full h-[380px] object-cover rounded-2xl shadow-blue-md" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0"><i className="fas fa-mountain" /></div>
                  <div>
                    <div className="font-heading font-bold text-sm text-gray-900">{t('athletisme.altitudeCaption')}</div>
                    <div className="text-xs text-gray-500">{t('athletisme.altitudeSub')}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col gap-4">
                {altitudeAdvantages.map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start p-5 bg-white border border-primary-pale rounded-2xl hover:border-primary-light hover:shadow-blue-sm transition-all">
                    <div className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shrink-0"><i className={icon} /></div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-gray-900 mb-1">{title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('athletisme.galleryTag')} title={t('athletisme.galleryTitle')} />
          <div className="grid grid-cols-3 gap-4 mb-4">
            {ATHLETISME_PHOTOS.slice(0, 3).map((src, i) => (
              <FadeIn key={`strip-${src}`} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => setLbIndex(i)}>
                  <img src={src} alt={`Athlétisme ASATA ${i + 1}`} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/45 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><i className="fas fa-search-plus" /></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {ATHLETISME_PHOTOS.slice(3).map((src, i) => (
              <FadeIn key={src} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-3" onClick={() => setLbIndex(i + 3)}>
                  <img src={src} alt={`Athlétisme ASATA ${i + 4}`} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/45 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"><i className="fas fa-search-plus" /></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/galerie" className="inline-flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold px-7 py-3 rounded-full hover:bg-primary hover:text-white transition-all">
              <i className="fas fa-images" /> {t('athletisme.viewGallery')}
            </Link>
          </div>
        </div>
      </section>

      <Lightbox images={ATHLETISME_PHOTOS} index={lbIndex} onClose={() => setLbIndex(null)} onPrev={() => setLbIndex(i => (i !== null && i > 0 ? i - 1 : i))} onNext={() => setLbIndex(i => (i !== null && i < ATHLETISME_PHOTOS.length - 1 ? i + 1 : i))} />

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary-dark to-primary text-center">
        <div className="max-w-2xl mx-auto px-5">
          <FadeIn>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6"><i className="fas fa-running" /></div>
            <h2 className="font-heading font-black text-4xl text-white mb-4">{t('athletisme.ctaTitle')}</h2>
            <p className="text-white/80 mb-8 text-lg">{t('athletisme.ctaSubtitle')}</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-8 py-4 rounded-full hover:bg-primary-ghost hover:-translate-y-0.5 transition-all shadow-blue-sm">
                <i className="fas fa-envelope" /> {t('athletisme.contactBtn')}
              </Link>
              <Link to="/evenements" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                <i className="fas fa-calendar" /> {t('athletisme.eventsLink')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
