import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Crumb { label: string; to?: string }

interface Props {
  title: string
  subtitle?: string
  image: string
  breadcrumbs?: Crumb[]
  icon?: string
  imagePosition?: 'top' | 'center' | 'bottom'
}

export default function PageHero({ title, subtitle, image, breadcrumbs, icon, imagePosition = 'center' }: Props) {
  const positionClass = imagePosition === 'top' ? 'bg-top' : imagePosition === 'bottom' ? 'bg-bottom' : 'bg-center'
  return (
    <section
      className={`relative min-h-[52vh] flex items-center bg-cover ${positionClass} pt-[76px]`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 py-16 text-white w-full">
        {breadcrumbs && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-white/65 mb-4 font-medium"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <i className="fas fa-chevron-right text-[9px]" />}
                {crumb.to
                  ? <Link to={crumb.to} className="hover:text-white transition-colors">{crumb.label}</Link>
                  : <span>{crumb.label}</span>
                }
              </span>
            ))}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-4xl md:text-5xl font-heading font-black text-white mb-3 text-shadow"
        >
          {icon && <i className={`${icon} mr-3 text-3xl`} />}
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-white/80 text-lg max-w-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
