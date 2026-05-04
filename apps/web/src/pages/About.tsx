import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import { ABOUT_HERO_IMAGE } from '../data/images'

const values = [
  { icon: 'fas fa-user-graduate', title: 'Formation des jeunes',        desc: 'Développer les sports en mettant l\'accent sur la formation des jeunes joueurs et des entraîneurs.' },
  { icon: 'fas fa-ban',           title: 'Lutte contre la drogue',      desc: 'Combattre l\'abus de drogues en proposant une alternative sportive saine et épanouissante.' },
  { icon: 'fas fa-calendar-plus', title: 'Événements sportifs',         desc: 'Créer et organiser des événements sportifs réguliers pour dynamiser la région.' },
  { icon: 'fas fa-book-open',     title: 'Documentation & Santé',       desc: 'Fournir aux entraîneurs des documents de formation et informations sur la santé sportive.' },
  { icon: 'fas fa-hands-helping', title: 'Inclusion totale',            desc: 'Encourager la participation de tous, sans distinction d\'âge, de genre ou de situation économique.' },
  { icon: 'fas fa-chart-line',    title: 'Développement socio-éco.',    desc: 'Développer des projets sportifs contribuant à l\'essor de la communauté d\'Asni.' },
]

const feds = [
  { icon: 'fas fa-skiing',  name: 'FRMSSM', full: 'Fédération Royale Marocaine de Ski et Sports de Montagne', since: 'Affilié depuis 2013' },
  { icon: 'fas fa-futbol',  name: 'FRMF',   full: 'Fédération Royale Marocaine de Football',                  since: 'Affilié' },
  { icon: 'fas fa-running', name: 'FRMA',   full: 'Fédération Royale Marocaine d\'Athlétisme',                since: 'Affilié' },
]

const infoItems = [
  { icon: 'fas fa-tag',           label: 'Nom complet',                value: 'Association Sportive Atlas Toubkal Asni (A.S.A.T.A)' },
  { icon: 'fas fa-calendar-alt',  label: 'Date de fondation',          value: '6 juin 2010' },
  { icon: 'fas fa-map-marker-alt',label: 'Localisation',               value: 'Asni, Province d\'Al Haouz, Maroc — Altitude 1 150 m' },
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
  return (
    <PageTransition>
      <PageHero
        title="À Propos de l'ASATA"
        subtitle="Fondée en 2010 à Asni, au cœur du Haut Atlas marocain"
        image={ABOUT_HERO_IMAGE}
        imagePosition="center"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'À Propos' }]}
      />

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-14">
            <FadeIn direction="left">
              <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">Notre histoire</span>
              <h2 className="font-heading font-bold text-4xl text-gray-900 mb-6 mt-1">Une vision née en 2010</h2>
              {[
                "L'Association Sportive Atlas Toubkal Asni (A.S.A.T.A) a été créée le <strong>6 juin 2010</strong> avec une ambition claire : développer le sport dans la région d'Asni et offrir à la jeunesse locale un cadre structuré pour s'épanouir à travers la pratique sportive.",
                "Implantée dans le village d'Asni, à 50 km au sud de Marrakech et à une altitude de 1 150 m, au pied du majestueux <strong>Djebel Toubkal</strong>, l'ASATA tire sa force du cadre naturel exceptionnel qui l'entoure et de l'énergie de ses 21 000 habitants.",
                "Depuis sa fondation, l'association a obtenu une <strong>accréditation professionnelle officielle</strong> (mai 2024, n° 2024/1111) et a enregistré son logo (n° 218955, classe 41) auprès des autorités compétentes.",
                "Aujourd'hui, l'ASATA fédère trois clubs sportifs affiliés à leurs fédérations nationales respectives, rassemblant athlètes, entraîneurs et bénévoles autour d'une même passion : le sport au service du développement humain.",
              ].map((p, i) => (
                <p key={i} className="text-gray-500 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-6">
                <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2 mb-5">
                  <i className="fas fa-id-card" /> Identité de l'association
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
                <i className="fas fa-mountain" /> La région d'Asni
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
          <SectionHeader tag="Nos engagements" title="Mission & Valeurs" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border-l-4 border-primary-light hover:border-primary hover:shadow-blue-md hover:translate-x-1 transition-all duration-300 shadow-blue-sm">
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
          <SectionHeader tag="Affiliations" title="Nos fédérations nationales" />
          <div className="grid md:grid-cols-3 gap-6">
            {feds.map(({ icon, name, full, since }, i) => (
              <FadeIn key={name} delay={i * 0.1}>
                <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-7 text-center hover:bg-primary-pale hover:border-primary-light hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary-pale text-primary rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                    <i className={icon} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{full}</p>
                  <span className="inline-block bg-primary text-white font-heading font-bold text-xs px-3 py-1 rounded-full">{since}</span>
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
            <h2 className="font-heading font-black text-4xl text-white mb-4">Rejoignez l'ASATA</h2>
            <p className="text-white/80 mb-8">Une communauté sportive engagée au cœur du Haut Atlas marocain.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all">
              <i className="fas fa-envelope" /> Nous contacter
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
