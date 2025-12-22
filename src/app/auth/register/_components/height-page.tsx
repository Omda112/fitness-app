import NumberCarousel from '@/components/embla';
import { Button } from '@/components/ui/button';
import { RegisterSchema } from '@/lib/schema/register.schema';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface HeightProps {
  form: UseFormReturn<RegisterSchema>;
  setStep: (
    step: 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'register' | 'activity'
  ) => void;
}

export default function HeightPage({ form, setStep }: HeightProps) {
  // Translation
  const { t } = useTranslation();
  const handleHeightChange = (value: number) => {
    // Check if the value is a number
    const heightNumber = typeof value === 'string' ? parseFloat(value) : value;
    form.setValue('height', heightNumber);
  };

  // Function
  const handleNext = () => {
    const height = form.getValues('height');

    // Check if height is selected
    if (!height) {
      toast.error(t('common.error.height'));
      return;
    }
    // Next Step
    setStep('goal');
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-1">
      <div className="absolute top-8 text-white text-lg font-semibold">4/6</div>

      <div className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {t('auth.register.height.title')}
        </h1>
        <p className="text-white text-lg">{t('auth.register.height.description')}</p>
      </div>

      <NumberCarousel
        title={t('auth.register.height.unit.title')}
        min={0}
        max={250}
        step={1}
        defaultValue={form.watch('height') || 170}
        onChange={handleHeightChange}
      />

      <Button
        disabled={!form.watch('height')}
        size="lg"
        className="px-12 bg-[#FF4100] w-1/2 mt-5 cursor-pointer hover:bg-[#E03A00]"
        onClick={handleNext}
      >
        {t('common.next')}
      </Button>
    </div>
  );
}
