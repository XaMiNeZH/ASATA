import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import { SKI_TEAM_IMAGE, TEAM_PHOTOS } from '../data/images'

/* ─── Data ─────────────────────────────────────────────────────────────── */

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

/* ─── Avatar ────────────────────────────────────────────────────────────── */

function Avatar({ photo, initials, className = '' }: { photo: string | null; initials: string; className?: string }) {
  if (photo) {
    return <img src={photo} alt={initials} className={`object-cover ${className}`} />
  }
  return (
    <div className={`bg-gradient-to-br from-primary-pale to-primary-ghost flex items-center justify-center font-heading font-black text-primary ${className}`}>
      <span className="text-4xl">{initials}</span>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function Equipe() {
  return (
    <PageTransition>
      <PageHero
        title="Comité Directeur 2024–2028"
        subtitle="Les femmes et hommes qui dirigent et font vivre l'ASATA"
        image={SKI_TEAM_IMAGE}
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Notre Équipe' }]}
      />

      {/* ── Président ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Présidence" title="Le Président" />
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-blue-md border border-primary-pale">
              {/* Photo side */}
              <div className="relative min-h-[420px] bg-gradient-to-br from-primary-dark to-primary">
                <img
                  src={TEAM_PHOTOS.president}
                  alt="M. Med BOUSERHAN"
                  className="w-full h-full object-cover object-top absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-heading font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                    <i className="fas fa-crown" /> Président
                  </span>
                </div>
              </div>

              {/* Info side */}
              <div className="bg-primary-ghost p-10 flex flex-col justify-center">
                <p className="text-primary font-heading font-bold text-sm uppercase tracking-[3px] mb-3">Comité Directeur 2024–2028</p>
                <h2 className="font-heading font-black text-4xl text-gray-900 mb-6 leading-tight">
                  M. Med<br />BOUSERHAN
                </h2>
                <div className="w-12 h-1 bg-primary rounded mb-6" />
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  À la tête de l'ASATA depuis sa fondation en 2010, M. Med BOUSERHAN a bâti une association sportive solide et respectée au niveau régional et national. Son leadership a permis l'affiliation aux trois fédérations nationales et l'obtention de l'accréditation professionnelle officielle en 2024.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Ski & Montagne', 'Football', 'Athlétisme'].map(c => (
                    <span key={c} className="bg-white border border-primary-pale text-primary font-heading font-bold text-xs px-4 py-2 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Vice-Présidents ─────────────────────────────────────────────── */}
      <section className="py-24 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Vice-Présidence" title="Vice-Présidents" />
          <div className="grid md:grid-cols-2 gap-8">
            {vicePresidents.map(({ photo, initials, name, role }, i) => (
              <FadeIn key={name} delay={i * 0.15}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-blue-sm border border-primary-pale hover:shadow-blue-md hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-72 bg-gradient-to-br from-primary-dark to-primary overflow-hidden">
                    <Avatar
                      photo={photo}
                      initials={initials}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-7">
                    <p className="text-primary font-heading font-bold text-xs uppercase tracking-[2px] mb-1">{role}</p>
                    <h3 className="font-heading font-black text-2xl text-gray-900">{name}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bureau ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Bureau exécutif" title="Membres du bureau" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bureau.map(({ photo, initials, name, role }, i) => (
              <FadeIn key={name} delay={i * 0.07}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-blue-sm hover:shadow-blue-md hover:-translate-y-1 hover:border-primary-pale transition-all duration-300 group">
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary-dark to-primary">
                    <Avatar
                      photo={photo}
                      initials={initials}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="text-primary font-heading font-bold text-[11px] uppercase tracking-[1.5px] mb-1">{role}</p>
                    <h3 className="font-heading font-bold text-base text-gray-900 leading-snug">{name}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Direction des clubs ─────────────────────────────────────────── */}
      <section className="py-24 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Responsables clubs" title="Direction des clubs" subtitle="Chaque club est géré par une équipe dédiée, affiliée à sa fédération nationale." />

          {/* Ski club */}
          <FadeIn className="mb-8">
            <div className="bg-white rounded-3xl overflow-hidden border border-primary-pale shadow-blue-sm">
              {/* Club header */}
              <div className="bg-gradient-to-r from-primary-dark to-primary px-8 py-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <i className="fas fa-skiing text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-white">Club Ski & Sports de Montagne</h3>
                  <span className="text-white/70 text-sm font-medium">Affilié FRMSSM depuis 2013</span>
                </div>
              </div>
              {/* Members list */}
              <div className="divide-y divide-gray-50">
                {skiTeam.map(({ name, role }, i) => (
                  <div key={name} className={`flex flex-col sm:flex-row sm:items-center justify-between px-8 py-5 gap-1 ${i % 2 === 0 ? 'bg-white' : 'bg-primary-ghost/30'} hover:bg-primary-ghost transition-colors`}>
                    <span className="font-heading font-bold text-gray-900 text-base">{name}</span>
                    <span className="text-primary font-semibold text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Football & Athlétisme */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'fas fa-futbol',  title: 'Club Football',   sub: 'Affilié FRMF', to: '/football',   color: 'from-green-700 to-green-500' },
              { icon: 'fas fa-running', title: 'Club Athlétisme', sub: 'Affilié FRMA', to: '/athletisme', color: 'from-orange-600 to-orange-400' },
            ].map(({ icon, title, sub, to, color }) => (
              <FadeIn key={title}>
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-blue-sm hover:shadow-blue-md hover:-translate-y-1 transition-all duration-300">
                  <div className={`bg-gradient-to-r ${color} px-8 py-6 flex items-center gap-4`}>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                      <i className={`${icon} text-white text-2xl`} />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-xl text-white">{title}</h3>
                      <span className="text-white/70 text-sm font-medium">{sub}</span>
                    </div>
                  </div>
                  <div className="px-8 py-6">
                    <p className="text-gray-500 text-sm mb-4">Retrouvez toutes les informations sur ce club, ses activités et son encadrement sur la page dédiée.</p>
                    <div className="flex gap-3">
                      <Link to={to} className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold text-sm px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors">
                        <i className="fas fa-arrow-right text-xs" /> Voir le club
                      </Link>
                      <Link to="/contact" className="inline-flex items-center gap-2 border border-primary-pale text-primary font-heading font-bold text-sm px-5 py-2.5 rounded-full hover:bg-primary-ghost transition-colors">
                        <i className="fas fa-envelope text-xs" /> Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary-dark to-primary text-center">
        <div className="max-w-2xl mx-auto px-5">
          <FadeIn>
            <h2 className="font-heading font-black text-5xl text-white mb-5">Rejoignez l'équipe ASATA</h2>
            <p className="text-white/75 text-lg mb-10">Nous sommes toujours à la recherche de bénévoles, d'encadreurs et de partenaires engagés.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-10 py-4 rounded-full hover:bg-white hover:text-primary transition-all text-base">
              <i className="fas fa-envelope" /> Prendre contact
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
