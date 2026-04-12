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
  { photo: TEAM_PHOTOS.abdEssamad,       initials: 'AA', name: 'M. Abd Essamad AIT BEL HAJ', role: 'Secrétaire Général' },
  { photo: TEAM_PHOTOS.medAitChakart,    initials: 'MA', name: 'M. Med AIT CHAKART',          role: 'Secrétaire Adjoint' },
  { photo: TEAM_PHOTOS.medAourik,        initials: 'MO', name: 'M. Med AOURIK',               role: 'Trésorier' },
  { photo: TEAM_PHOTOS.noraAchebani,     initials: 'NA', name: 'Mlle. Nora ACHEBANI',         role: 'Trésorière Adjointe' },
  { photo: TEAM_PHOTOS.rachidBouserhan,  initials: 'RB', name: 'M. Rachid BOUSERHAN',         role: 'Conseiller' },
  { photo: TEAM_PHOTOS.medElAouad,       initials: 'ME', name: 'M. Med EL AOUAD',             role: 'Conseiller' },
  { photo: TEAM_PHOTOS.azizAitBourhim,   initials: 'AB', name: 'M. Aziz AIT BOURHIM',         role: 'Conseiller' },
  { photo: TEAM_PHOTOS.elmajidOussais,   initials: 'AO', name: 'M. Abd Elmajid OUSSAIS',      role: 'Conseiller' },
]

const skiTeam = [
  { name: 'M. Farid BOUSERHAN',   role: 'Président — Commission Technique — Porte-parole Média' },
  { name: 'M. Rachid CHIB',       role: 'Entraîneur' },
  { name: 'Mlle. Nora ACHEBANI',  role: 'Conseillère' },
  { name: 'Mme. Maryem EL QOTBI', role: 'Secrétaire' },
  { name: 'M. Med AOURIK',        role: 'Trésorier' },
]

function MemberAvatar({ photo, initials, size = 'md' }: { photo: string | null; initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-36 h-36' : size === 'md' ? 'w-28 h-28' : 'w-20 h-20'
  const text = size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-lg'

  if (photo) {
    return (
      <img
        src={photo}
        alt={initials}
        className={`${dim} rounded-full object-cover mx-auto border-4 border-white/40 shadow-lg`}
      />
    )
  }
  return (
    <div className={`${dim} rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-heading font-black ${text} text-white mx-auto`}>
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
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Présidence" title="Le Président" />
          <FadeIn>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-ghost to-primary-pale border border-primary-pale rounded-3xl p-8 flex flex-col sm:flex-row gap-7 items-center">
              <img
                src={TEAM_PHOTOS.president}
                alt="M. Med BOUSERHAN — Président ASATA"
                className="w-32 h-32 rounded-full object-cover shadow-blue-md shrink-0"
                style={{ border: '4px solid #42A5F5' }}
              />
              <div>
                <h2 className="font-heading font-black text-2xl text-gray-900 mb-1">M. Med BOUSERHAN</h2>
                <p className="text-primary font-heading font-bold text-sm uppercase tracking-widest mb-3">
                  <i className="fas fa-crown mr-1" /> Président du Comité Directeur
                </p>
                <p className="text-gray-500 leading-relaxed">
                  À la tête de l'ASATA depuis sa fondation, M. Med BOUSERHAN a construit une association sportive solide, respectée au niveau régional et national. Son leadership a permis l'affiliation aux trois fédérations nationales et l'obtention de l'accréditation professionnelle officielle en 2024.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vice presidents */}
      <section className="py-10 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Vice-Présidence" title="Vice-Présidents" />
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {vicePresidents.map(({ photo, initials, name, role }, i) => (
              <FadeIn key={name} delay={i * 0.1}>
                <div className="bg-white border border-primary-pale rounded-2xl overflow-hidden shadow-blue-sm hover:shadow-blue-md hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-r from-primary-dark to-primary-mid p-7 text-center">
                    <MemberAvatar photo={photo} initials={initials} size="md" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-heading font-bold text-base text-gray-900 mb-1">{name}</h3>
                    <p className="text-primary font-heading font-bold text-xs uppercase tracking-wide">{role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bureau */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Bureau exécutif" title="Membres du bureau" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bureau.map(({ photo, initials, name, role }, i) => (
              <FadeIn key={name} delay={i * 0.07}>
                <div className="bg-white border border-primary-pale rounded-2xl overflow-hidden shadow-blue-sm hover:shadow-blue-md hover:-translate-y-1 hover:border-primary-light transition-all duration-300">
                  <div className="bg-gradient-to-r from-primary-dark to-primary-mid p-7 text-center">
                    <MemberAvatar photo={photo} initials={initials} size="md" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-heading font-bold text-sm text-gray-900 mb-1">{name}</h3>
                    <p className="text-primary font-heading font-bold text-[11px] uppercase tracking-wide">{role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Club leaders */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Responsables clubs" title="Direction des clubs" subtitle="Chaque club est géré par une équipe dédiée, affiliée à sa fédération nationale." />

          <FadeIn className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fas fa-skiing" /></div>
              <div>
                <h3 className="font-heading font-bold text-lg">Club Ski & Sports de Montagne</h3>
                <span className="text-sm text-gray-400">Affilié FRMSSM depuis 2013</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-blue-sm border border-primary-pale">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-dark to-primary text-white">
                    <th className="text-left px-6 py-3.5 font-heading font-bold text-sm">Nom</th>
                    <th className="text-left px-6 py-3.5 font-heading font-bold text-sm">Fonction</th>
                  </tr>
                </thead>
                <tbody>
                  {skiTeam.map(({ name, role }, i) => (
                    <tr key={name} className={`border-b border-primary-pale last:border-0 hover:bg-primary-ghost transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-primary-ghost/40'}`}>
                      <td className="px-6 py-4 font-semibold text-gray-800 text-sm">{name}</td>
                      <td className="px-6 py-4 text-primary font-semibold text-sm">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: 'fas fa-futbol',  title: 'Club Football',   sub: 'Affilié FRMF', to: '/football' },
              { icon: 'fas fa-running', title: 'Club Athlétisme', sub: 'Affilié FRMA', to: '/athletisme' },
            ].map(({ icon, title, sub, to }) => (
              <FadeIn key={title}>
                <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center text-xl shrink-0"><i className={icon} /></div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{sub}</p>
                    <p className="text-sm text-gray-500">
                      <i className="fas fa-info-circle text-primary-light mr-1" />
                      Visitez la <Link to={to} className="text-primary font-semibold hover:underline">page du club</Link> ou <Link to="/contact" className="text-primary font-semibold hover:underline">contactez-nous</Link>.
                    </p>
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
            <h2 className="font-heading font-black text-4xl text-white mb-4">Faites partie de l'équipe ASATA</h2>
            <p className="text-white/80 mb-8">Nous sommes toujours à la recherche de bénévoles, d'encadreurs et de partenaires engagés.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all">
              <i className="fas fa-envelope" /> Prendre contact
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
