import FadeIn from './FadeIn'

interface Props {
  tag?: string
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeader({ tag, title, subtitle, center = true }: Props) {
  return (
    <FadeIn className={center ? 'text-center mb-14' : 'mb-10'}>
      {tag && (
        <span className="inline-block bg-primary-pale text-primary font-heading font-bold text-[11px] uppercase tracking-[2px] px-3 py-1 rounded-full mb-3">
          {tag}
        </span>
      )}
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-3">{title}</h2>
      <div className={`w-14 h-1 rounded-full bg-gradient-to-r from-primary-light to-primary ${center ? 'mx-auto' : ''} mb-3`} />
      {subtitle && (
        <p className={`text-gray-500 text-base leading-relaxed max-w-xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </FadeIn>
  )
}
