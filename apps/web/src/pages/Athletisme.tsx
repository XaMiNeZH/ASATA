import { useState } from 'react'
import { Link } from 'react-router-dom'
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

const disciplines = [
  { icon: 'fas fa-running',        title: 'Course sur piste',        desc: 'Entraînements structurés sur piste en courtes et longues distances.' },
  { icon: 'fas fa-flag-checkered', title: 'Trail & Montagne',         desc: 'Épreuves de trail sur les sentiers du Haut Atlas, en profitant du relief naturel.' },
  { icon: 'fas fa-medal',          title: 'Compétitions nationales',  desc: 'Participation aux championnats régionaux et nationaux sous l\'égide de la FRMA.' },
  { icon: 'fas fa-child',          title: 'Athlétisme jeunes',        desc: 'Programme adapté pour initier les enfants et adolescents aux disciplines athlétiques.' },
  { icon: 'fas fa-heartbeat',      title: 'Préparation physique',     desc: 'Renforcement musculaire, endurance et récupération encadrés par des professionnels.' },
  { icon: 'fas fa-users',          title: 'Événements locaux',        desc: 'Organisation de courses populaires ouvertes à toute la communauté d\'Asni.' },
]

const achievements = [
  { icon: 'fas fa-trophy',   value: 'Shkodër 2025',  label: 'Championnat International', detail: 'Albanie — Représentation nationale' },
  { icon: 'fas fa-globe',    value: 'Tunis 2025',    label: 'Open African Masters',       detail: 'Athlétisme — Compétition africaine' },
  { icon: 'fas fa-star',     value: 'Rabat 2026',    label: 'Championnat National',       detail: 'Athlétisme — Niveau élite' },
]

const stats = [
  { value: 'FRMA',     label: 'Fédération affiliée' },
  { value: '1 150 m',  label: "Altitude d'entraînement" },
  { value: '3',        label: 'Compétitions internationales' },
  { value: 'National', label: 'Niveau de compétition' },
]

const altitudeAdvantages = [
  { icon: 'fas fa-wind',    title: 'VO₂ max améliorée',    desc: 'L\'entraînement en altitude améliore naturellement la capacité cardio-pulmonaire et l\'endurance.' },
  { icon: 'fas fa-mountain',title: 'Terrain d\'exception',  desc: 'Les sentiers du Toubkal offrent un terrain unique pour le trail et la course montagne.' },
  { icon: 'fas fa-leaf',    title: 'Environnement sain',    desc: 'Air pur, nature préservée et cadre de vie sain pour un développement sportif optimal.' },
]

export default function Athletisme() {
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  return (
    <PageTransition>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <PageHero
        title="Club Athlétisme"
        subtitle="Affilié à la Fédération Royale Marocaine d'Athlétisme (FRMA)"
        image={ATHLETISME_HERO_IMAGE}
        icon="fas fa-running"
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Nos Clubs' }, { label: 'Athlétisme' }]}
      />

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
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

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Main image + small overlay */}
            <FadeIn direction="left">
              <div className="relative">
                <img
                  src={ATHLETISME_INTRO_IMAGE}
                  alt="Athlétisme ASATA"
                  className="w-full h-[480px] object-cover rounded-2xl shadow-blue-md"
                />
                {/* Small overlay image bottom-right */}
                <div className="absolute bottom-4 right-4 w-36 h-36 rounded-xl overflow-hidden border-4 border-white shadow-blue-md">
                  <img
                    src={ATHLETISME_LANDSCAPE_IMAGE}
                    alt="Paysage Asni"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge top-left */}
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  🏃 Club FRMA
                </div>
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn direction="right" delay={0.1}>
              <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-4">
                Notre club
              </span>
              <h2 className="font-heading font-bold text-4xl text-gray-900 mb-5 leading-tight">
                Courir pour <br />aller plus loin
              </h2>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Le Club Athlétisme de l'ASATA est affilié à la{' '}
                <strong className="text-gray-700">Fédération Royale Marocaine d'Athlétisme (FRMA)</strong>.
                Il regroupe des athlètes encadrés par des entraîneurs qualifiés qui ont représenté le Maroc à l'international.
              </p>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Berceau de nombreux champions, la région du Haut Atlas a une longue tradition athlétique.
                L'ASATA s'appuie sur ce terroir exceptionnel pour former des athlètes capables de briller
                aux niveaux régional, national et international.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Le club organise également des activités de{' '}
                <strong className="text-gray-700">trail running</strong> et de{' '}
                <strong className="text-gray-700">course en montagne</strong>,
                disciplines naturellement adaptées au cadre d'Asni au pied du Djebel Toubkal.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-blue-sm"
                >
                  <i className="fas fa-envelope" /> Rejoindre le club
                </Link>
                <Link
                  to="/evenements"
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold px-6 py-3 rounded-full hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all"
                >
                  <i className="fas fa-calendar" /> Nos événements
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Achievements ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Palmarès" title="Nos participations internationales" />
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map(({ icon, value, label, detail }, i) => (
              <FadeIn key={value} delay={i * 0.1}>
                <div className="bg-white border border-primary-pale rounded-2xl p-7 text-center hover:shadow-blue-md hover:-translate-y-1 hover:border-primary-light transition-all duration-300">
                  <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                    <i className={icon} />
                  </div>
                  <div className="font-heading font-black text-2xl text-primary mb-1">{value}</div>
                  <div className="font-heading font-bold text-gray-900 mb-2">{label}</div>
                  <div className="text-sm text-gray-400">{detail}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disciplines ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Disciplines" title="Nos activités" subtitle="Un programme complet pour tous les niveaux, des débutants aux athlètes de haut niveau." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {disciplines.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="group bg-primary-ghost border border-primary-pale rounded-2xl p-6 flex gap-4 items-start hover:shadow-blue-md hover:border-primary-light hover:-translate-y-1 hover:bg-white transition-all duration-300">
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <i className={icon} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-gray-900 mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Altitude advantage ─────────────────────────────────────────────── */}
      <section className="py-20 bg-primary-ghost">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader
            tag="Notre atout"
            title="L'avantage de l'altitude"
            subtitle="S'entraîner à 1 150 m d'altitude au pied du plus haut sommet d'Afrique du Nord offre des conditions exceptionnelles."
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <img
                  src={ATHLETISME_LANDSCAPE_IMAGE}
                  alt="Paysage Asni"
                  className="w-full h-[380px] object-cover rounded-2xl shadow-blue-md"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                    <i className="fas fa-mountain" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-gray-900">Asni, Haut Atlas</div>
                    <div className="text-xs text-gray-500">Au pied du Djebel Toubkal — 4 167 m</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col gap-4">
                {altitudeAdvantages.map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex gap-4 items-start p-5 bg-white border border-primary-pale rounded-2xl hover:border-primary-light hover:shadow-blue-sm transition-all"
                  >
                    <div className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                      <i className={icon} />
                    </div>
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

      {/* ── Gallery ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeader tag="Nos photos" title="Galerie Athlétisme" />

          {/* Preview strip — 3 wide images */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {ATHLETISME_PHOTOS.slice(0, 3).map((src, i) => (
              <FadeIn key={`strip-${src}`} delay={i * 0.08}>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLbIndex(i)}
                >
                  <img
                    src={src}
                    alt={`Athlétisme ASATA ${i + 1}`}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/45 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-search-plus" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Masonry grid — remaining photos */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {ATHLETISME_PHOTOS.slice(3).map((src, i) => (
              <FadeIn key={src} delay={i * 0.08}>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-3"
                  onClick={() => setLbIndex(i + 3)}
                >
                  <img
                    src={src}
                    alt={`Athlétisme ASATA ${i + 4}`}
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
          <div className="text-center mt-10">
            <Link
              to="/galerie"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold px-7 py-3 rounded-full hover:bg-primary hover:text-white transition-all"
            >
              <i className="fas fa-images" /> Voir toute la galerie
            </Link>
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

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary-dark to-primary text-center">
        <div className="max-w-2xl mx-auto px-5">
          <FadeIn>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6">
              <i className="fas fa-running" />
            </div>
            <h2 className="font-heading font-black text-4xl text-white mb-4">
              Rejoignez le Club Athlétisme
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Entraînez-vous dans un cadre naturel exceptionnel au pied du Djebel Toubkal.
              Ouverts à tous les niveaux, du débutant au champion.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold px-8 py-4 rounded-full hover:bg-primary-ghost hover:-translate-y-0.5 transition-all shadow-blue-sm"
              >
                <i className="fas fa-envelope" /> Nous contacter
              </Link>
              <Link
                to="/evenements"
                className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              >
                <i className="fas fa-calendar" /> Voir les événements
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
