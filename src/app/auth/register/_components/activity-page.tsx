'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { UseFormReturn } from 'react-hook-form'
import { RegisterSchema } from '@/lib/schema/register.schema'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'

interface ActivityLevelScreenProps {
  form: UseFormReturn<RegisterSchema>
  setStep: (
    step: 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'register' | 'activity'
  ) => void
  RegisterApi: (data: RegisterSchema) => void
  isPending?: boolean
}

export default function ActivityLevelScreen({
  form,
  RegisterApi,
  isPending,
}: ActivityLevelScreenProps) {
  // Translation
  const { t } = useTranslation()

  // Navigate
  const navigate = useNavigate()

  // Activity Levels
  const activityLevels = [
    { value: 'level1', label: 'Rookie' },
    { value: 'level2', label: 'Beginner' },
    { value: 'level3', label: 'Intermediate' },
    { value: 'level4', label: 'Advance' },
    { value: 'level5', label: 'True Beast' },
  ]
  // Selected Level
  const selectedLevel = form.watch('activityLevel')

  // Handle Submit
  const handleSubmit = () => {
    // Check if activity level is selected
    if (!selectedLevel) {
      toast.error(t('common.error.activity'))
      return
    }

    // Get all the data
    const allData = form.getValues()

    // Check if all the required data is filled
    console.log('Form Data:', allData)

    if (!allData.email || !allData.password) {
      toast.error(t('common.error.required'))
      return
    }

    // Call API
    RegisterApi(allData)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-white">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-2 text-center">
        {t('auth.register.activity.title')}
      </h1>

      {/* Description */}
      <p className="text-lg text-white/70 mb-8 text-center">
        {t('auth.register.activity.description')}
      </p>

      {/* Radio Group */}
      <RadioGroup
        value={selectedLevel}
        onValueChange={(value) => form.setValue('activityLevel', value as any)}
        className="w-full max-w-md space-y-4"
      >
        {activityLevels.map((level) => {
          const isSelected = selectedLevel === level.value

          return (
            <div
              key={level.value}
              onClick={() => form.setValue('activityLevel', level.value as any)}
              className={cn(
                'flex justify-between items-center px-5 py-4 rounded-2xl border transition cursor-pointer backdrop-blur-md',
                isSelected ? 'border-[#FF4100] bg-white/10' : 'border-white/30 bg-white/5'
              )}
            >
              {/* Label */}
              <Label
                htmlFor={level.value}
                className={cn(
                  'cursor-pointer font-medium text-base',
                  isSelected ? 'text-[#FF4100]' : 'text-white'
                )}
              >
                {level.label}
              </Label>

              {/* Radio Group Item */}
              <RadioGroupItem
                id={level.value}
                value={level.value}
                className={cn(
                  'border-2',
                  isSelected
                    ? 'border-[#FF4100] text-[#FF4100]'
                    : 'border-white text-white'
                )}
              />
            </div>
          )
        })}
      </RadioGroup>

      {/* Button */}
      <Button
        disabled={!selectedLevel || isPending}
        onClick={handleSubmit}
        className={cn(
          'w-full max-w-md mt-8 py-4 rounded-2xl text-center text-lg font-semibold transition',
          selectedLevel && !isPending
            ? 'bg-[#FF4100] text-white hover:bg-[#E03A00]'
            : 'bg-white/30 text-white/60 cursor-not-allowed'
        )}
      >
        {t('common.next')} {isPending ? <Loader2 className="animate-spin" /> : null}
      </Button>
    </div>
  )
}
