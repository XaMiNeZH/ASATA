import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import { ABOUT_HERO_IMAGE } from '../data/images'

const valueIcons = [
  'fas fa-user-graduate',
  'fas fa-ban',
  'fas fa-calendar-plus',
  'fas fa-book-open',
  'fas fa-hands-helping',
  'fas fa-chart-line',
]

const infoIcons = [
  'fas fa-tag',
  'fas fa-calendar-alt',
  'fas fa-map-marker-alt',
  'fas fa-envelope',
  'fas fa-certificate',
  'fas fa-registered',
]

const locIcons = [
  'fas fa-road',
  'fas fa-arrows-alt-v',
  'fas fa-users',
  'fas fa-language',
  'fas fa-store',
  'fas fa-leaf',
]

const feds = [
  { icon: 'fas fa-skiing',  name: 'FRMSSM', fullKey: 'frmssm', sinceKey: 'since2013' as const },
  { icon: 'fas fa-futbol',  name: 'FRMF',   fullKey: 'frmf',   sinceKey: 'since' as const },
  { icon: 'fas fa-running', name: 'FRMA',   fullKey: 'frma',   sinceKey: 'since' as const },
]

export default function About() {
  const { t } = useTranslation()

  const values = valueIcons.map((icon, i) => ({
    icon,
    title: t(`about.values.v${i + 1}t`),
    desc:  t(`about.values.v${i + 1}d`),
  }))

  const infoItems = infoIcons.map((icon, i) => ({
    icon,
    label: t(`about.info.l${i + 1}`),
    value: t(`about.info.v${i + 1}`),
  }))

  const location = locIcons.map((icon, i) => ({
    icon,
    label: t(`about.loc.l${i + 1}`),
    value: t(`about.loc.v${i + 1}`),
  }))

  return (
    <PageTransition>
      <PageHero
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
        image={ABOUT_HERO_IMAGE}
        imagePosition="center"
        breadcrumbs={[{ label: t('common.home'), to: '/' }, { label: t('about.hero.crumb') }]}
      />

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-14">
            <FadeIn direction="left">
              <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">{t('about.story.tag')}</span>
              <h2 className="font-heading font-bold text-4xl text-gray-900 mb-6 mt-1">{t('about.story.title')}</h2>
              {[
                t('about.story.p1'),
                t('about.story.p2'),
                t('about.story.p3'),
                t('about.story.p4'),
              ].map((p, i) => (
                <p key={i} className="text-gray-500 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-6">
                <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2 mb-5">
                  <i className="fas fa-id-card" /> {t('about.story.identityTitle')}
                </h3>
                <ul className="flex flex-col gap-3">
                  {infoItems.map(({ icon, label, value }) => (
                    <li key={label} className="flex gap-3 items-start bg-white p-3.5 rounded-xl border border-primary-pale">
                      <i className={`${icon} text-primary-light mt-0.5 w-4 shrink-0`} />
                      <div>
                        <strong className="block font-heading font-bold text-sm text-gray-800">{label}</strong>
                        <span className="text-sm text-gray-500">{value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Location */}
          <FadeIn>
            <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-6">
              <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2 mb-5">
                <i className="fas fa-mountain" /> {t('about.story.regionTitle')}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {location.map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-3 items-start bg-white p-3.5 rounded-xl border border-primary-pale">
                    <i className={`${icon} text-primary-light mt-0.5 w-4 shrink-0`} />
                    <div>
                      <strong className="block font-heading font-bold text-sm text-gray-800">{label}</strong>
                      <span className="text-sm text-gray-500">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('about.values.tag')} title={t('about.values.title')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 hover:shadow-blue-md transition-all duration-300 shadow-blue-sm">
                  <h3 className="font-heading font-bold text-base text-gray-900 mb-2 flex items-center gap-2">
                    <i className={`${icon} text-primary-light`} /> {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Federations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag={t('about.feds.tag')} title={t('about.feds.title')} />
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {feds.map(({ icon, name, fullKey, sinceKey }, i) => (
              <FadeIn key={name} delay={i * 0.1} className="h-full">
                <div className="h-full flex flex-col items-center bg-primary-ghost border border-primary-pale rounded-2xl p-7 text-center hover:bg-primary-pale hover:border-primary-light hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary-pale text-primary rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                    <i className={icon} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-1">{t(`about.feds.${fullKey}`)}</p>
                  <span className="inline-block bg-primary text-white font-heading font-bold text-xs px-3 py-1 rounded-full">{t(`about.feds.${sinceKey}`)}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-dark to-primary text-center">
        <div className="max-w-2xl mx-auto px-5">
          <FadeIn>
            <h2 className="font-heading font-black text-4xl text-white mb-4">{t('about.cta.title')}</h2>
            <p className="text-white/80 mb-8">{t('about.cta.subtitle')}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all">
              <i className="fas fa-envelope" /> {t('about.cta.btn')}
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
