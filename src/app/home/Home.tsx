import Card from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">{t('home.headline')}</h1>
      <p className="text-muted-foreground">{t('common.welcome')}</p>
      <button className="px-4 py-2 rounded-md bg-black text-white">
        {t('home.cta')}
      </button>


    </div>
  )
}
