import NumberCarousel from '@/components/embla'
import { Button } from '@/components/ui/button'
import { RegisterSchema } from '@/lib/schemas/register.schema'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

// Props
interface WeightProps {
  form: UseFormReturn<RegisterSchema>
  setStep: (
    step: 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'register' | 'activity'
  ) => void
}

export default function WeightPage({ form, setStep }: WeightProps) {
  // Translation
  const { t } = useTranslation()
  const handleWeightChange = (value: number) => {
    // Check if the value is a number
    const weightNumber = typeof value === 'string' ? parseFloat(value) : value
    form.setValue('weight', weightNumber)
  }

  // Function
  const handleNext = () => {
    const weight = form.getValues('weight')
    
    if (!weight) {
      toast.error(t('common.error.weight'))
      return
    }
    // Next Step
    setStep('height')
  }

  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-1">
      <div className="absolute top-8 text-white text-lg font-semibold">3/6</div>

      <div className="text-center mb-12">
        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {t('auth.register.weight.title')}
        </h1>
        {/* Description */}
        <p className="text-white text-lg">{t('auth.register.weight.description')}</p>
      </div>

      {/* Carousel Weight */}
      <NumberCarousel
        title={t('auth.register.weight.unit')}
        min={0}
        max={300}
        step={0.5}
        defaultValue={form.watch('weight') || 70}
        onChange={handleWeightChange}
      />

      {/* Button */}
      <Button
        disabled={!form.watch('weight')}
        size="lg"
        className="px-12 bg-[#FF4100] w-1/2 mt-5 cursor-pointer hover:bg-[#E03A00]"
        onClick={handleNext}
      >
        {t('common.next')}
      </Button>
    </div>
  )
}
