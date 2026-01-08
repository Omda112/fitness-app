import Aboutus from '@/components/features/home/Aboutus'
import Hero from '@/components/features/home/Hero'
import Meals from '@/components/features/home/Meals'
import Whyus from '@/components/features/home/Whyu'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
 <>
    <Hero />
    <Aboutus/>
    <Whyus/>
    <Meals/>
 </>
  )
}
