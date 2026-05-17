import { useTranslation } from 'react-i18next'

const langs = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'ع' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  function changeLang(code: string) {
    i18n.changeLanguage(code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
  }

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-0.5 gap-0.5">
      {langs.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => changeLang(code)}
          className={`text-xs font-heading font-bold px-2.5 py-1 rounded-full transition-all duration-200 min-w-[28px] ${
            i18n.language === code
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
