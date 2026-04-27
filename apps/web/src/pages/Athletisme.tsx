import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import FadeIn from '../components/FadeIn'
import SectionHeader from '../components/SectionHeader'
import Lightbox from '../components/Lightbox'
import { ATHLETISME_HERO_IMAGE, ATHLETISME_INTRO_IMAGE, ATHLETISME_LANDSCAPE_IMAGE, ATHLETISME_PHOTOS } from '../data/images'

const activities = [
  { icon: 'fas fa-running',        title: 'Course sur piste',         desc: 'Entraînements structurés et compétitions sur piste en courtes et longues distances.' },
  { icon: 'fas fa-flag-checkered', title: 'Trail & Course montagne',  desc: 'Épreuves de trail sur les sentiers du Haut Atlas, en profitant du relief naturel.' },
  { icon: 'fas fa-medal',          title: 'Compétitions régionales',  desc: 'Participation aux championnats régionaux et nationaux sous l\'égide de la FRMA.' },
  { icon: 'fas fa-child',          title: 'Athlétisme jeunes',        desc: 'Programme adapté pour initier les enfants et adolescents aux disciplines athlétiques.' },
  { icon: 'fas fa-heartbeat',      title: 'Préparation physique',     desc: 'Renforcement musculaire, endurance et récupération encadrés par des professionnels certifiés.' },
  { icon: 'fas fa-users',          title: 'Événements locaux',        desc: 'Organisation de courses populaires ouvertes à toute la communauté d\'Asni.' },
]

const altitudeAdvantages = [
  { icon: 'fas fa-wind',    title: 'Capacité cardio-pulmonaire', desc: 'L\'entraînement en altitude améliore naturellement la VO₂ max et l\'endurance des athlètes.' },
  { icon: 'fas fa-mountain',title: 'Terrain varié',              desc: 'Les sentiers du Toubkal offrent un terrain unique pour le trail et la course montagne.' },
  { icon: 'fas fa-leaf',    title: 'Environnement sain',         desc: 'Air pur, nature préservée et cadre de vie sain pour un développement sportif optimal.' },
]

export default function Athletisme() {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  return (
    <PageTransition>
      <PageHero title="Club Athlétisme" subtitle="Affilié à la Fédération Royale Marocaine d'Athlétisme (FRMA)" image={ATHLETISME_HERO_IMAGE} icon="fas fa-running" breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Nos Clubs' }, { label: 'Athlétisme' }]} />

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-14 items-start mb-12">
            <FadeIn direction="left">
              <img src={ATHLETISME_INTRO_IMAGE} alt="Athlétisme ASATA" className="w-full h-[400px] object-cover rounded-2xl shadow-blue-md" />
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">Club Athlétisme</span>
              <h2 className="font-heading font-bold text-4xl text-gray-900 mt-1 mb-4">Courir pour aller plus loin</h2>
              <p className="text-gray-500 mb-4 leading-relaxed">Le Club Athlétisme de l'ASATA est affilié à la <strong className="text-gray-700">Fédération Royale Marocaine d'Athlétisme (FRMA)</strong>. Il regroupe des athlètes encadrés par des entraîneurs qualifiés.</p>
              <p className="text-gray-500 mb-4 leading-relaxed">Berceau de nombreux champions, la région du Haut Atlas a une longue tradition athlétique. L'ASATA s'appuie sur ce terroir exceptionnel pour former des athlètes capables de briller aux niveaux régional et national.</p>
              <p className="text-gray-500 mb-6 leading-relaxed">Le club organise également des activités de <strong className="text-gray-700">trail running</strong> et de <strong className="text-gray-700">course en montagne</strong>, disciplines naturellement adaptées au cadre d'Asni au pied du Djebel Toubkal.</p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm"><i className="fas fa-envelope" /> Rejoindre le club</Link>
                <Link to="/galerie" className="inline-flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold px-6 py-3 rounded-full hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all"><i className="fas fa-images" /> Galerie</Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="grid grid-cols-3 gap-4">
              {[{ v: 'FRMA', l: 'Fédération affiliée' }, { v: '1150m', l: 'Altitude entraînement' }, { v: 'National', l: 'Niveau compétition' }].map(({ v, l }) => (
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
          <SectionHeader tag="Disciplines" title="Nos activités" />
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

      {/* Altitude advantage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Notre atout" title="L'avantage de l'altitude" subtitle="S'entraîner à 1 150 m d'altitude au pied du plus haut sommet d'Afrique du Nord offre des conditions exceptionnelles." />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <img src={ATHLETISME_LANDSCAPE_IMAGE} alt="Paysage Asni" className="w-full h-[340px] object-cover rounded-2xl shadow-blue-md" />
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col gap-4">
                {altitudeAdvantages.map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start p-5 bg-primary-ghost border border-primary-pale rounded-2xl hover:border-primary-light hover:shadow-blue-sm transition-all">
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

      {/* Photo Gallery */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Nos photos" title="Galerie Athlétisme" />
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {ATHLETISME_PHOTOS.map((src, i) => (
              <FadeIn key={src} delay={i * 0.08}>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-3"
                  onClick={() => setLbIndex(i)}
                >
                  <img
                    src={src}
                    alt={`Athlétisme ASATA ${i + 1}`}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/45 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <i className="fas fa-search-plus" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={ATHLETISME_PHOTOS}
        index={lbIndex}
        onClose={() => setLbIndex(null)}
        onPrev={() => setLbIndex(i => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() => setLbIndex(i => (i !== null && i < ATHLETISME_PHOTOS.length - 1 ? i + 1 : i))}
      />

      <section className="py-20 bg-gradient-to-br from-primary-dark to-primary text-center">
        <div className="max-w-2xl mx-auto px-5">
          <FadeIn>
            <h2 className="font-heading font-black text-4xl text-white mb-4">Rejoignez le Club Athlétisme</h2>
            <p className="text-white/80 mb-8">Entraînez-vous dans un cadre naturel exceptionnel au pied du Djebel Toubkal.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all">
              <i className="fas fa-envelope" /> Nous contacter
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
