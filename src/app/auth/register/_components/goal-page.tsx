'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { UseFormReturn, Controller } from 'react-hook-form'
import { RegisterSchema } from '@/lib/schema/register.schema'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

// Props
interface GoalSelectionScreenProps {
  form: UseFormReturn<RegisterSchema>
  setStep: (
    step: 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'register' | 'activity'
  ) => void
}

export default function GoalSelectionScreen({ form, setStep }: GoalSelectionScreenProps) {
  // Translation
  const { t } = useTranslation()
  // Goals
  const goals = [
    { value: 'Lose weight', label: 'Lose Weight' },
    { value: 'Gain weight', label: 'Gain Muscle' },
    { value: 'Maintain weight', label: 'Stay Fit' },
  ]

  // Next Step
  const handleNext = () => {
    // Check if goal is selected
    const goal = form.getValues('goal')
    if (!goal) {
      toast.error(t('common.error.goal'))
      return
    }
    // Next Step
    setStep('activity')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-white">
      {/* Progress Indicator */}
      <div className="absolute top-8 text-white text-lg font-semibold">5/6</div>

      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {t('auth.register.goal.title')}
        </h1>
        <p className="text-white text-lg">{t('auth.register.goal.description')}</p>
      </div>

      {/* Radio Group */}
      <Controller
        control={form.control}
        name="goal"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="w-full max-w-md space-y-4"
          >
            {/* Goals */}
            {goals.map((goal) => {
              const isSelected = field.value === goal.value

              return (
                // Goal Item
                <div
                  key={goal.value}
                  onClick={() => field.onChange(goal.value)}
                  className={cn(
                    "flex justify-between items-center px-5 py-4 rounded-2xl border transition cursor-pointer backdrop-blur-md",
                    isSelected 
                      ? "border-[#FF4100] bg-white/10" 
                      : "border-white/30 bg-white/5"
                  )}
                >
                  {/* Label */}
                  <Label
                    htmlFor={goal.value}
                    className={cn(
                      "cursor-pointer font-medium text-base",
                      isSelected ? "text-[#FF4100]" : "text-white"
                    )}
                  >
                    {goal.label}
                  </Label>

                  {/* Radio Group Item */}
                  <RadioGroupItem
                    id={goal.value}
                    value={goal.value}
                    className={cn(
                      "border-2",
                      isSelected 
                        ? "border-[#FF4100] text-[#FF4100]" 
                        : "border-white text-white"
                    )}
                  />
                </div>
              )
            })}
          </RadioGroup>
        )}
      />

      {/* Button */}
      <Button
        disabled={!form.watch('goal')}
        onClick={handleNext}
        className={cn(
          "w-full max-w-md mt-8 py-4 rounded-2xl text-center text-lg font-semibold transition",
          form.watch('goal')
            ? "bg-[#FF4100] text-white hover:bg-[#E03A00]"
            : "bg-white/30 text-white/60 cursor-not-allowed"
        )}
      >
        {t('common.next')}
      </Button>
    </div>
  )
}