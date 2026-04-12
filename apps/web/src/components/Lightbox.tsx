import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  images: string[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (index === null) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handle)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handle)
      document.body.style.overflow = ''
    }
  }, [index, onClose, onPrev, onNext])

  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <motion.div
          key="lightbox-bg"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Image */}
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Photo ASATA"
            className="max-w-[90vw] max-h-[88vh] object-contain rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="fixed top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <i className="fas fa-times" />
          </button>

          {/* Counter */}
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {index + 1} / {images.length}
          </div>

          {/* Prev */}
          {index > 0 && (
            <button
              onClick={e => { e.stopPropagation(); onPrev() }}
              className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-chevron-left" />
            </button>
          )}

          {/* Next */}
          {index < images.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); onNext() }}
              className="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-chevron-right" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
