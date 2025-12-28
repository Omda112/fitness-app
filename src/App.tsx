
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';

// src/App.tsx
import { Outlet, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Footer from './components/layout/footer/Footer'

// Variables
const SUPPORTED_LOCALES = ['en', 'ar'] as const;
const queryClient = new QueryClient();

// Types
type Locale = (typeof SUPPORTED_LOCALES)[number];

export default function App() {
  // Translation
  const { i18n } = useTranslation();

  // Hooks
  const params = useParams();

  // Variables
  const locale = (params.locale as Locale) || 'en';
  const isValidLocale = SUPPORTED_LOCALES.includes(locale);

  if (!isValidLocale) {
    return <Navigate to="/en" replace />;
  }

  // Effects
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }

    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale, i18n]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      storageKey="app-theme"
    >
      <QueryClientProvider client={queryClient}>
        <Toaster />

        {/* React Query Developer Tools */}
        <ReactQueryDevtools initialIsOpen={false} />

        {/* Application Content */}
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
          <Outlet />
          <Footer/>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
    
  
}
