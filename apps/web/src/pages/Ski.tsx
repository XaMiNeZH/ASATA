import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import Lightbox from '../components/Lightbox'
import { SKI_HERO_IMAGE, SKI_PHOTOS, SKI_TEAM_IMAGE } from '../data/images'

const team = [
  { name: 'M. Farid BOUSERHAN',   role: 'Président — Commission Technique — Porte-parole Média' },
  { name: 'M. Rachid CHIB',       role: 'Entraîneur' },
  { name: 'Mlle. Nora ACHEBANI',  role: 'Conseillère' },
  { name: 'Mme. Maryem EL QOTBI', role: 'Secrétaire' },
  { name: 'M. Med AOURIK',        role: 'Trésorier' },
]

const galleryPhotos = SKI_PHOTOS.slice(0, 12)

export default function Ski() {
  const { t } = useTranslation()
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const activities = [
    { icon: 'fas fa-skiing',             title: t('ski.a1t'), desc: t('ski.a1d') },
    { icon: 'fas fa-mountain',           title: t('ski.a2t'), desc: t('ski.a2d') },
    { icon: 'fas fa-hiking',             title: t('ski.a3t'), desc: t('ski.a3d') },
    { icon: 'fas fa-flag-checkered',     title: t('ski.a4t'), desc: t('ski.a4d') },
    { icon: 'fas fa-plane',              title: t('ski.a5t'), desc: t('ski.a5d') },
    { icon: 'fas fa-chalkboard-teacher', title: t('ski.a6t'), desc: t('ski.a6d') },
  ]

  return (
    <PageTransition>
      <PageHero
        title={t('ski.hero.title')}
        subtitle={t('ski.hero.subtitle')}
        image={SKI_HERO_IMAGE}
        icon="fas fa-skiing"
        breadcrumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.clubs') }, { label: t('ski.hero.crumb') }]}
      />

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-14 items-start mb-12">
            <FadeIn direction="left">
              <img src={SKI_TEAM_IMAGE} alt="Équipe Ski ASATA" className="w-full h-[400px] object-cover rounded-2xl shadow-blue-md" />
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">{t('ski.tag')}</span>
              <h2 className="font-heading font-bold text-4xl text-gray-900 mt-1 mb-4">{t('ski.title')}</h2>
              <p className="text-gray-500 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('ski.p1') }} />
              <p className="text-gray-500 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('ski.p2') }} />
              <div className="flex gap-3 flex-wrap">
                <Link to="/galerie" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm"><i className="fas fa-images" /> {t('ski.viewPhotos')}</Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold px-6 py-3 rounded-full hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all"><i className="fas fa-envelope" /> {t('ski.join')}</Link>
              </div>
            </FadeIn>
          </div>

          {/* Quick stats */}
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { v: '2013',     l: t('ski.stats.affiliation') },
                { v: '3+',       l: t('ski.stats.camps') },
                { v: '3800m',    l: t('ski.stats.altitude') },
                { v: 'National', l: t('ski.stats.level') },
              ].map(({ v, l }) => (
                <div key={l} className="bg-primary-ghost border border-primary-pale rounded-2xl p-5 text-center">
                  <div className="font-heading font-black text-2xl text-primary mb-1">{v}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('ski.activitiesTag')} title={t('ski.activitiesTitle')} />
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

      {/* Team table */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <SectionHeader tag={t('ski.teamTag')} title={t('ski.teamTitle')} />
          <FadeIn>
            <div className="rounded-2xl overflow-hidden shadow-blue-sm border border-primary-pale">
              <table className="w-full border-collapse">
                <thead><tr className="bg-gradient-to-r from-primary-dark to-primary text-white"><th className="text-left px-6 py-4 font-heading font-bold text-sm">{t('ski.teamName')}</th><th className="text-left px-6 py-4 font-heading font-bold text-sm">{t('ski.teamRole')}</th></tr></thead>
                <tbody>
                  {team.map(({ name, role }, i) => (
                    <tr key={name} className={`border-b border-primary-pale last:border-0 hover:bg-primary-ghost transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-primary-ghost/40'}`}>
                      <td className="px-6 py-4 font-semibold text-gray-800 text-sm">{name}</td>
                      <td className="px-6 py-4 text-primary font-semibold text-sm">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('ski.galleryTag')} title={t('ski.galleryTitle')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryPhotos.map((src, i) => (
              <FadeIn key={src} delay={i * 0.04}>
                <div onClick={() => setLbIndex(i)} className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer">
                  <img src={src} alt="Ski ASATA" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/40 transition-all flex items-center justify-center"><i className="fas fa-search-plus text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/galerie" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm">
              {t('ski.viewGallery')} <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      <Lightbox images={galleryPhotos} index={lbIndex} onClose={() => setLbIndex(null)} onPrev={() => setLbIndex(i => (i !== null && i > 0 ? i - 1 : i))} onNext={() => setLbIndex(i => (i !== null && i < galleryPhotos.length - 1 ? i + 1 : i))} />
    </PageTransition>
  )
}
