import { Outlet, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const SUPPORTED_LOCALES = ['en', 'ar'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

export default function App() {
  // Translation
  const { i18n } = useTranslation()

  // Hooks
  const params = useParams()

  // Variables
  const queryClient = new QueryClient()
  const locale = (params.locale as Locale) || 'en'
  const isValidLocale = SUPPORTED_LOCALES.includes(locale)

  if (!isValidLocale) {
    return <Navigate to="/en" replace />
  }

  // Effects
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }

    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale, i18n])

  return (
    <QueryClientProvider client={queryClient}>
      {/* React Query Developer Tools */}
      <ReactQueryDevtools initialIsOpen={false} />

      {/* Application Content */}
      <div className="min-h-screen">
        <Outlet />
      </div>
    </QueryClientProvider>
  )
}
