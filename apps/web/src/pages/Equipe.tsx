import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import { SKI_TEAM_IMAGE, TEAM_PHOTOS } from '../data/images'

const vicePresidents = [
  { photo: TEAM_PHOTOS.jamilaChenter,  initials: 'JC', name: 'Mme. Jamila CHENTER',  role: '1ère Vice-Présidente' },
  { photo: TEAM_PHOTOS.faridBouserhan, initials: 'FB', name: 'M. Farid BOUSERHAN',   role: '2ème Vice-Président' },
]

const bureau = [
  { photo: TEAM_PHOTOS.abdEssamad,      initials: 'AA', name: 'M. Abd Essamad AIT BEL HAJ', role: 'Secrétaire Général' },
  { photo: TEAM_PHOTOS.medAitChakart,   initials: 'MA', name: 'M. Med AIT CHAKART',          role: 'Secrétaire Adjoint' },
  { photo: TEAM_PHOTOS.medAourik,       initials: 'MO', name: 'M. Med AOURIK',               role: 'Trésorier' },
  { photo: TEAM_PHOTOS.noraAchebani,    initials: 'NA', name: 'Mlle. Nora ACHEBANI',         role: 'Trésorière Adjointe' },
  { photo: TEAM_PHOTOS.rachidBouserhan, initials: 'RB', name: 'M. Rachid BOUSERHAN',         role: 'Conseiller' },
  { photo: TEAM_PHOTOS.medElAouad,      initials: 'ME', name: 'M. Med EL AOUAD',             role: 'Conseiller' },
  { photo: TEAM_PHOTOS.azizAitBourhim,  initials: 'AB', name: 'M. Aziz AIT BOURHIM',         role: 'Conseiller' },
  { photo: TEAM_PHOTOS.elmajidOussais,  initials: 'AO', name: 'M. Abd Elmajid OUSSAIS',      role: 'Conseiller' },
]

const skiTeam = [
  { name: 'M. Farid BOUSERHAN',   role: 'Président — Commission Technique — Porte-parole Média' },
  { name: 'M. Rachid CHIB',       role: 'Entraîneur' },
  { name: 'Mlle. Nora ACHEBANI',  role: 'Conseillère' },
  { name: 'Mme. Maryem EL QOTBI', role: 'Secrétaire' },
  { name: 'M. Med AOURIK',        role: 'Trésorier' },
]

function MemberPhoto({ photo, initials, className = '' }: { photo: string | null; initials: string; className?: string }) {
  if (photo) return <img src={photo} alt={initials} className={`object-cover ${className}`} />
  return (
    <div className={`bg-primary-pale flex items-center justify-center font-heading font-black text-primary text-2xl ${className}`}>
      {initials}
    </div>
  )
}

export default function Equipe() {
  return (
    <PageTransition>
      <PageHero
        title="Comité Directeur 2024–2028"
        subtitle="Les femmes et hommes qui dirigent et font vivre l'ASATA"
        image={SKI_TEAM_IMAGE}
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Notre Équipe' }]}
      />

      {/* President */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Présidence" title="Le Président" />
          <FadeIn>
            <div className="max-w-2xl mx-auto flex items-center gap-8 bg-primary-ghost border border-primary-pale rounded-2xl p-7">
              <img
                src={TEAM_PHOTOS.president}
                alt="M. Med BOUSERHAN"
                className="w-28 h-28 rounded-2xl object-cover object-top shrink-0 shadow-blue-sm"
              />
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-[2px] text-primary mb-2">
                  <i className="fas fa-crown" /> Président du Comité Directeur
                </span>
                <h2 className="font-heading font-black text-2xl text-gray-900 mb-2">M. Med BOUSERHAN</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  À la tête de l'ASATA depuis 2010, il a conduit l'affiliation aux trois fédérations nationales et obtenu l'accréditation professionnelle officielle en 2024.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vice Presidents */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Vice-Présidence" title="Vice-Présidents" />
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {vicePresidents.map(({ photo, initials, name, role }, i) => (
              <FadeIn key={name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden border border-primary-pale shadow-blue-sm hover:shadow-blue-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-primary-dark to-primary">
                    <MemberPhoto photo={photo} initials={initials} className="w-full h-full" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-primary font-heading font-bold text-[11px] uppercase tracking-widest mb-1">{role}</p>
                    <h3 className="font-heading font-bold text-lg text-gray-900">{name}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bureau */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Bureau exécutif" title="Membres du bureau" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {bureau.map(({ photo, initials, name, role }, i) => (
              <FadeIn key={name} delay={i * 0.06}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-blue-sm hover:shadow-blue-md hover:-translate-y-0.5 hover:border-primary-pale transition-all duration-300 group">
                  <div className="h-44 overflow-hidden bg-gradient-to-br from-primary-dark to-primary">
                    <MemberPhoto photo={photo} initials={initials} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-primary font-heading font-bold text-[10px] uppercase tracking-widest mb-1">{role}</p>
                    <h3 className="font-heading font-semibold text-sm text-gray-900 leading-snug">{name}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Responsables clubs" title="Direction des clubs" />

          {/* Ski */}
          <FadeIn className="mb-6">
            <div className="bg-white rounded-2xl overflow-hidden border border-primary-pale shadow-blue-sm">
              <div className="bg-gradient-to-r from-primary-dark to-primary px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className="fas fa-skiing text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Club Ski & Sports de Montagne</h3>
                  <span className="text-white/65 text-xs">Affilié FRMSSM depuis 2013</span>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {skiTeam.map(({ name, role }, i) => (
                  <div key={name} className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-1 ${i % 2 === 0 ? 'bg-white' : 'bg-primary-ghost/30'}`}>
                    <span className="font-heading font-semibold text-gray-900 text-sm">{name}</span>
                    <span className="text-primary font-semibold text-xs">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Football & Athlétisme */}
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: 'fas fa-futbol',  title: 'Club Football',   sub: 'Affilié FRMF', to: '/football' },
              { icon: 'fas fa-running', title: 'Club Athlétisme', sub: 'Affilié FRMA', to: '/athletisme' },
            ].map(({ icon, title, sub, to }) => (
              <FadeIn key={title}>
                <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary-pale hover:shadow-blue-sm transition-all duration-300">
                  <div className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                    <i className={`${icon} text-lg`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900">{title}</h3>
                    <p className="text-xs text-gray-400 mb-3">{sub}</p>
                    <div className="flex gap-2">
                      <Link to={to} className="inline-flex items-center gap-1.5 bg-primary text-white font-heading font-bold text-xs px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
                        Voir le club
                      </Link>
                      <Link to="/contact" className="inline-flex items-center gap-1.5 border border-primary-pale text-primary font-heading font-bold text-xs px-4 py-2 rounded-full hover:bg-primary-ghost transition-colors">
                        Contact
                      </Link>
                    </div>
                  </div>
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
            <h2 className="font-heading font-black text-4xl text-white mb-4">Rejoignez l'équipe ASATA</h2>
            <p className="text-white/75 mb-8">Nous sommes toujours à la recherche de bénévoles, d'encadreurs et de partenaires engagés.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all">
              <i className="fas fa-envelope" /> Prendre contact
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
