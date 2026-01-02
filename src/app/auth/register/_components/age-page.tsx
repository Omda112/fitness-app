import NumberCarousel from '@/components/embla'
import { Button } from '@/components/ui/button'
import { RegisterSchema } from '@/lib/schemas/register.schema'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

// Props
interface YearsProps {
  form: UseFormReturn<RegisterSchema>
  setStep: (
    step: 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'register' | 'activity'
  ) => void
}

export default function AgePage({ form, setStep }: YearsProps) {
  // Translation
  const { t } = useTranslation()

  const handleAgeChange = (value: number) => {
    // Check if the value is a number
    const ageNumber = typeof value === 'string' ? parseInt(value) : value
    form.setValue('age', ageNumber)
  }

  // Function
  const handleNext = () => {
    const age = form.getValues('age')
    
    // Check if age is selected
    if (!age) {
      toast.error(t('common.error.age'))
      return
    }
    // Next Step
    setStep('weight')
  }

  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-1">
      {/* Progress Indicator */}
      <div className="absolute top-8 text-white text-lg font-semibold">2/6</div>

      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {t('auth.register.age.title')}
        </h1>
        <p className="text-white text-lg">{t('auth.register.age.description')}</p>
      </div>

      {/* Carousel Age */}
      <NumberCarousel
        title={t('auth.register.age.unit.title')}
        min={0}
        max={100}
        step={1}
        defaultValue={form.watch('age') || 25}
        onChange={handleAgeChange}
      />

      {/* Button */}
      <Button
        disabled={!form.watch('age')}
        size="lg"
        className="px-12 bg-[#FF4100] w-1/2 mt-5 cursor-pointer hover:bg-[#E03A00]"
        onClick={handleNext}
      >
        {t('common.next')}
      </Button>
    </div>
  )
}
