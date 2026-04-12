import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  target: number
  suffix?: string
  label: string
}

export default function Counter({ target, suffix = '', label }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <div ref={ref} className="text-center text-white px-4 border-r border-white/15 last:border-0">
      <div className="font-heading text-4xl font-black tracking-tight">
        {count >= 1000 ? count.toLocaleString() : count}{suffix}
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest text-white/65 mt-1">{label}</div>
    </div>
  )
}
