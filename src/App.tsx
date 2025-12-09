// src/App.tsx
import { Outlet, Navigate, useParams} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const SUPPORTED_LOCALES = ['en', 'ar'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

export default function App() {
  const { i18n } = useTranslation()
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const isValidLocale = SUPPORTED_LOCALES.includes(locale)

  if (!isValidLocale) {
    return <Navigate to="/en" replace />
  }

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }

    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale, i18n])

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}
