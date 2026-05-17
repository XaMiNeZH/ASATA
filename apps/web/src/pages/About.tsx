import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import { ABOUT_HERO_IMAGE } from '../data/images'

const values = [
  { icon: 'fas fa-user-graduate', titleKey: 'Formation des jeunes',        descKey: "Développer les sports en mettant l'accent sur la formation des jeunes joueurs et des entraîneurs." },
  { icon: 'fas fa-ban',           titleKey: 'Lutte contre la drogue',      descKey: "Combattre l'abus de drogues en proposant une alternative sportive saine et épanouissante." },
  { icon: 'fas fa-calendar-plus', titleKey: 'Événements sportifs',         descKey: 'Créer et organiser des événements sportifs réguliers pour dynamiser la région.' },
  { icon: 'fas fa-book-open',     titleKey: 'Documentation & Santé',       descKey: 'Fournir aux entraîneurs des documents de formation et informations sur la santé sportive.' },
  { icon: 'fas fa-hands-helping', titleKey: 'Inclusion totale',            descKey: "Encourager la participation de tous, sans distinction d'âge, de genre ou de situation économique." },
  { icon: 'fas fa-chart-line',    titleKey: 'Développement socio-éco.',    descKey: "Développer des projets sportifs contribuant à l'essor de la communauté d'Asni." },
]

const feds = [
  { icon: 'fas fa-skiing',  name: 'FRMSSM', full: 'Fédération Royale Marocaine de Ski et Sports de Montagne', sinceKey: 'since2013' as const },
  { icon: 'fas fa-futbol',  name: 'FRMF',   full: 'Fédération Royale Marocaine de Football',                  sinceKey: 'since' as const },
  { icon: 'fas fa-running', name: 'FRMA',   full: "Fédération Royale Marocaine d'Athlétisme",                 sinceKey: 'since' as const },
]

const infoItems = [
  { icon: 'fas fa-tag',           label: 'Nom complet',                value: 'Association Sportive Atlas Toubkal Asni (A.S.A.T.A)' },
  { icon: 'fas fa-calendar-alt',  label: 'Date de fondation',          value: '6 juin 2010' },
  { icon: 'fas fa-map-marker-alt',label: 'Localisation',               value: "Asni, Province d'Al Haouz, Maroc — Altitude 1 150 m" },
  { icon: 'fas fa-envelope',      label: 'Email',                      value: 'asata.club@gmail.com' },
  { icon: 'fas fa-certificate',   label: 'Accréditation professionnelle', value: 'Mai 2024 — Réf. 2024/1111' },
  { icon: 'fas fa-registered',    label: 'Logo enregistré',            value: 'N° 218955 / Classe 41 — © 2020' },
]

const location = [
  { icon: 'fas fa-road',       label: 'Distance de Marrakech', value: '50 km au sud' },
  { icon: 'fas fa-arrows-alt-v', label: 'Altitude',            value: '1 150 m' },
  { icon: 'fas fa-users',      label: 'Population',            value: 'Plus de 21 000 habitants' },
  { icon: 'fas fa-language',   label: 'Langue locale',         value: 'Berbère (Tamazight)' },
  { icon: 'fas fa-store',      label: 'Marché hebdomadaire',   value: 'Chaque samedi' },
  { icon: 'fas fa-leaf',       label: 'Économie locale',       value: 'Agriculture & Tourisme de montagne' },
]

export default function About() {
  const { t } = useTranslation()

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
            {values.map(({ icon, titleKey, descKey }, i) => (
              <FadeIn key={titleKey} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 hover:shadow-blue-md transition-all duration-300 shadow-blue-sm">
                  <h3 className="font-heading font-bold text-base text-gray-900 mb-2 flex items-center gap-2">
                    <i className={`${icon} text-primary-light`} /> {titleKey}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{descKey}</p>
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
          <div className="grid md:grid-cols-3 gap-6">
            {feds.map(({ icon, name, full, sinceKey }, i) => (
              <FadeIn key={name} delay={i * 0.1}>
                <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-7 text-center hover:bg-primary-pale hover:border-primary-light hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary-pale text-primary rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                    <i className={icon} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{full}</p>
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
