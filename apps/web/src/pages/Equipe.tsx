import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import { SKI_TEAM_IMAGE, TEAM_PHOTOS } from '../data/images'

/* ─── Data ─────────────────────────────────────────────────────────────── */

const president = {
  photo: TEAM_PHOTOS.president,
  initials: 'MB',
  name: 'M. Med BOUSERHAN',
  role: 'Président du Comité Directeur',
  bio: 'À la tête de l\'ASATA depuis sa fondation en 2010, M. Med BOUSERHAN a bâti une association sportive solide et respectée au niveau régional et national. Son leadership a permis l\'affiliation aux trois fédérations nationales et l\'obtention de l\'accréditation professionnelle officielle en 2024.',
}

const vicePresidents = [
  { photo: TEAM_PHOTOS.jamilaChenter,  initials: 'JC', name: 'Mme. Jamila CHENTER',  role: '1ère Vice-Présidente' },
  { photo: TEAM_PHOTOS.faridBouserhan, initials: 'FB', name: 'M. Farid BOUSERHAN',   role: '2ème Vice-Président' },
]

const bureau = [
  { photo: TEAM_PHOTOS.abdEssamad,      initials: 'AA', name: 'M. Abd Essamad AIT BEL HAJ', role: 'Secrétaire Général',    icon: 'fas fa-file-alt' },
  { photo: TEAM_PHOTOS.medAitChakart,   initials: 'MA', name: 'M. Med AIT CHAKART',          role: 'Secrétaire Adjoint',    icon: 'fas fa-file-alt' },
  { photo: TEAM_PHOTOS.medAourik,       initials: 'MO', name: 'M. Med AOURIK',               role: 'Trésorier',             icon: 'fas fa-coins' },
  { photo: TEAM_PHOTOS.noraAchebani,    initials: 'NA', name: 'Mlle. Nora ACHEBANI',         role: 'Trésorière Adjointe',   icon: 'fas fa-coins' },
  { photo: TEAM_PHOTOS.rachidBouserhan, initials: 'RB', name: 'M. Rachid BOUSERHAN',         role: 'Conseiller',            icon: 'fas fa-comments' },
  { photo: TEAM_PHOTOS.medElAouad,      initials: 'ME', name: 'M. Med EL AOUAD',             role: 'Conseiller',            icon: 'fas fa-comments' },
  { photo: TEAM_PHOTOS.azizAitBourhim,  initials: 'AB', name: 'M. Aziz AIT BOURHIM',         role: 'Conseiller',            icon: 'fas fa-comments' },
  { photo: TEAM_PHOTOS.elmajidOussais,  initials: 'AO', name: 'M. Abd Elmajid OUSSAIS',      role: 'Conseiller',            icon: 'fas fa-comments' },
]

const skiTeam = [
  { name: 'M. Farid BOUSERHAN',   role: 'Président — Commission Technique — Porte-parole Média', icon: 'fas fa-star' },
  { name: 'M. Rachid CHIB',       role: 'Entraîneur',   icon: 'fas fa-whistle' },
  { name: 'Mlle. Nora ACHEBANI',  role: 'Conseillère',  icon: 'fas fa-comments' },
  { name: 'Mme. Maryem EL QOTBI', role: 'Secrétaire',   icon: 'fas fa-file-alt' },
  { name: 'M. Med AOURIK',        role: 'Trésorier',    icon: 'fas fa-coins' },
]

/* ─── Sub-components ────────────────────────────────────────────────────── */

function Avatar({ photo, initials, size = 'md' }: { photo: string | null; initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const dim  = size === 'lg' ? 'w-24 h-24' : size === 'md' ? 'w-16 h-16' : 'w-11 h-11'
  const text = size === 'lg' ? 'text-3xl'  : size === 'md' ? 'text-xl'   : 'text-sm'
  if (photo) {
    return <img src={photo} alt={initials} className={`${dim} rounded-full object-cover shrink-0 ring-2 ring-primary-pale`} />
  }
  return (
    <div className={`${dim} rounded-full bg-primary-pale flex items-center justify-center font-heading font-black ${text} text-primary shrink-0`}>
      {initials}
    </div>
  )
}

function LevelTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-primary-pale" />
      <span className="text-[11px] font-heading font-bold uppercase tracking-[2px] text-primary bg-primary-pale px-3 py-1 rounded-full">
        {label}
      </span>
      <div className="h-px flex-1 bg-primary-pale" />
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

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 flex flex-col gap-16">

          {/* ── Président ─────────────────────────────────── */}
          <div>
            <LevelTag label="Présidence" />
            <FadeIn>
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-gradient-to-br from-primary-ghost to-white border border-primary-pale rounded-3xl p-8 shadow-blue-sm">
                <Avatar photo={president.photo} initials={president.initials} size="lg" />
                <div className="text-center sm:text-left">
                  <p className="text-[11px] font-heading font-bold uppercase tracking-[2px] text-primary mb-1">
                    <i className="fas fa-crown mr-1.5" />Président
                  </p>
                  <h2 className="font-heading font-black text-2xl text-gray-900 mb-3">{president.name}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{president.bio}</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── Vice-Présidents ───────────────────────────── */}
          <div>
            <LevelTag label="Vice-Présidence" />
            <div className="grid sm:grid-cols-2 gap-4">
              {vicePresidents.map(({ photo, initials, name, role }, i) => (
                <FadeIn key={name} delay={i * 0.1}>
                  <div className="flex items-center gap-4 bg-white border border-primary-pale rounded-2xl p-5 shadow-blue-sm hover:shadow-blue-md hover:-translate-y-0.5 transition-all duration-300">
                    <Avatar photo={photo} initials={initials} size="md" />
                    <div>
                      <h3 className="font-heading font-bold text-base text-gray-900 leading-tight">{name}</h3>
                      <p className="text-primary font-heading font-bold text-xs uppercase tracking-wide mt-1">{role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* ── Bureau ───────────────────────────────────── */}
          <div>
            <LevelTag label="Bureau exécutif" />
            <div className="grid sm:grid-cols-2 gap-3">
              {bureau.map(({ photo, initials, name, role, icon }, i) => (
                <FadeIn key={name} delay={i * 0.06}>
                  <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-primary-pale hover:shadow-blue-sm transition-all duration-300">
                    <Avatar photo={photo} initials={initials} size="sm" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-sm text-gray-900 truncate">{name}</h3>
                      <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1.5">
                        <i className={`${icon} text-primary-light`} />
                        {role}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* ── Clubs ────────────────────────────────────── */}
          <div>
            <LevelTag label="Direction des clubs" />

            {/* Ski */}
            <FadeIn>
              <div className="bg-primary-ghost border border-primary-pale rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                    <i className="fas fa-skiing text-base" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900">Club Ski & Sports de Montagne</h3>
                    <span className="text-xs text-gray-400">Affilié FRMSSM depuis 2013</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {skiTeam.map(({ name, role, icon }, i) => (
                    <div key={name} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-primary-pale">
                      <i className={`${icon} text-primary-light text-sm w-4 shrink-0`} />
                      <span className="font-semibold text-sm text-gray-800 min-w-[170px]">{name}</span>
                      <span className="text-xs text-gray-400">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Football & Athlétisme */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: 'fas fa-futbol',  title: 'Club Football',   sub: 'Affilié FRMF', to: '/football' },
                { icon: 'fas fa-running', title: 'Club Athlétisme', sub: 'Affilié FRMA', to: '/athletisme' },
              ].map(({ icon, title, sub, to }) => (
                <FadeIn key={title}>
                  <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary-pale hover:shadow-blue-sm transition-all duration-300">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                      <i className={`${icon} text-base`} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-gray-900">{title}</h3>
                      <p className="text-xs text-gray-400 mb-2">{sub}</p>
                      <p className="text-xs text-gray-500">
                        Voir la{' '}
                        <Link to={to} className="text-primary font-semibold hover:underline">page du club</Link>
                        {' '}ou{' '}
                        <Link to="/contact" className="text-primary font-semibold hover:underline">nous contacter</Link>.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
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
