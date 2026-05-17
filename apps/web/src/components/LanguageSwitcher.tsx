import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const langs = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  function changeLang(code: string) {
    i18n.changeLanguage(code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
    setOpen(false)
  }

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = langs.find(l => l.code === i18n.language) ?? langs[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary-pale bg-primary-ghost hover:bg-primary-pale hover:border-primary-light transition-all duration-200 text-sm font-heading font-bold text-gray-700"
      >
        <i className="fas fa-globe text-primary text-sm" />
        <span className="text-xs">{current.label}</span>
        <i className={`fas fa-chevron-down text-[9px] text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-primary-pale rounded-xl shadow-blue-lg py-1.5 min-w-[130px] z-50">
          {langs.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => changeLang(code)}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm font-heading font-semibold transition-colors duration-150 ${
                i18n.language === code
                  ? 'text-primary bg-primary-ghost'
                  : 'text-gray-600 hover:text-primary hover:bg-primary-ghost'
              }`}
            >
              {i18n.language === code && <i className="fas fa-check text-[10px] text-primary" />}
              {i18n.language !== code && <span className="w-3" />}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
