import Hero from '@/components/features/home/Hero'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <Hero />
  )
}
