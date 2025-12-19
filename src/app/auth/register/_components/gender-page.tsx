import { Button } from '@/components/ui/button'
import { RegisterSchema } from '@/lib/schema/register.schema'
import { Mars, Venus } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// Props
interface GenderProps {
  form: UseFormReturn<RegisterSchema>
  setStep: (
    step: 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'register' | 'activity'
  ) => void
}

export default function GenderPage({ form, setStep }: GenderProps) {
  // Translation
  const { t } = useTranslation()
  // Next Step
  const handleNext = () => {
    const gender = form.getValues('gender')

    // Check if gender is selected
    if (!gender) {
      form.setError('gender', {
        type: 'manual',
        message: t('common.error.gender'),
      })
      // Return if gender is not selected
      return
    }

    // Next Step
    setStep('age')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Progress Indicator */}
      <div className="absolute top-8 text-white text-lg font-semibold">1/6</div>

      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 tracking-tight">
        {t('auth.register.gender.title')}
        </h1>
        <p className="text-gray-400 text-lg">{t('auth.register.gender.description')}</p>
      </div>

      {/* Gender Selection Buttons */}
      <div className="flex gap-6 mb-8">
        {/* Male Button */}
        <button
          onClick={() => {
            form.setValue('gender', 'male')
            form.clearErrors('gender')
          }}
          className={`w-32 h-32 rounded-full border-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
            form.watch('gender') === 'male'
              ? 'border-[#FF4100] bg-[#FF4100]/10'
              : 'border-gray-500 hover:border-gray-400'
          }`}
        >
          {/* Mars Icon */}
          <Mars className="w-12 h-12 text-white -rotate-45" />
          <span className="text-white font-medium">{t('auth.register.gender.male')}</span>
        </button>

        {/* Female Button */}
        <button
          onClick={() => {
            form.setValue('gender', 'female')
            form.clearErrors('gender')
          }}
          className={`w-32 h-32 rounded-full border-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
            form.watch('gender') === 'female'
              ? 'border-[#FF4100] bg-[#FF4100]/10'
              : 'border-gray-500 hover:border-gray-400'
          }`}
        >
          {/* Venus Icon */}
          <Venus className="w-12 h-12 text-white" />
          <span className="text-white font-medium">{t('auth.register.gender.female')}</span>
        </button>
      </div>

      {/* Error Message */}
      {form.formState.errors.gender && (
        <p className="text-red-500 text-sm mb-4">
          {form.formState.errors.gender.message}
        </p>
      )}

      {/* Next Button */}
      <Button
        onClick={handleNext}
        className="bg-gray-300 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-24 rounded-full transition-all duration-300 shadow-lg"
      >
        {t('common.next')}
      </Button>
    </div>
  )
}
