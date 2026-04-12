import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import PageHero from '../components/PageHero'
import Lightbox from '../components/Lightbox'
import { ALL_PHOTOS, GALLERY_HERO_IMAGE } from '../data/images'

type Filter = 'all' | 'ski' | 'football'

const filters: { key: Filter; label: string; icon: string }[] = [
  { key: 'all',      label: 'Tout voir',       icon: 'fas fa-th' },
  { key: 'ski',      label: 'Ski & Montagne',   icon: 'fas fa-skiing' },
  { key: 'football', label: 'Football',         icon: 'fas fa-futbol' },
]

export default function Galerie() {
  const [filter, setFilter]   = useState<Filter>('all')
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  const filtered = useMemo(
    () => filter === 'all' ? ALL_PHOTOS : ALL_PHOTOS.filter(p => p.category === filter),
    [filter]
  )

  const lbImages = filtered.map(p => p.src)

  return (
    <PageTransition>
      <PageHero
        title="Galerie Photos"
        subtitle="Découvrez nos activités à travers les images de nos clubs"
        image={GALLERY_HERO_IMAGE}
        breadcrumbs={[{ label: 'Accueil', to: '/' }, { label: 'Galerie' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5">

          {/* Filter tabs */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {filters.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-sm border transition-all duration-200 ${
                  filter === key
                    ? 'bg-primary text-white border-primary shadow-blue-sm'
                    : 'bg-primary-ghost text-gray-500 border-primary-pale hover:border-primary hover:text-primary'
                }`}
              >
                <i className={icon} /> {label}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-center text-gray-400 text-sm font-medium mb-8">
            {filtered.length} photo{filtered.length > 1 ? 's' : ''}
          </p>

          {/* Grid */}
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            <AnimatePresence>
              {filtered.map(({ src, category }, i) => (
                <motion.div
                  key={src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-3"
                  onClick={() => setLbIndex(i)}
                >
                  <img
                    src={src}
                    alt={`${category} ASATA`}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/45 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <i className="fas fa-search-plus" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-primary/80 text-white text-[10px] font-heading font-bold uppercase tracking-wide px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {category === 'ski' ? '⛷ Ski' : '⚽ Football'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Lightbox
        images={lbImages}
        index={lbIndex}
        onClose={() => setLbIndex(null)}
        onPrev={() => setLbIndex(i => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() => setLbIndex(i => (i !== null && i < lbImages.length - 1 ? i + 1 : i))}
      />
    </PageTransition>
  )
}
