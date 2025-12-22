import { useState, useMemo } from 'react';
import GenderPage from './_components/gender-page';
import AgePage from './_components/age-page';
import WeightPage from './_components/weight-page';
import HeightPage from './_components/height-page';
import GoalSelectionScreen from './_components/goal-page';
import ActivityPage from './_components/activity-page';
import RegisterPage from './_components/register-page';
import { useForm } from 'react-hook-form';
import { getRegisterSchema, RegisterSchema } from '@/lib/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from './_hooks/use-register';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Register() {
  // Translation
  const { t } = useTranslation();

  // Step
  const [step, setStep] = useState<
    'register' | 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'activity'
  >('register');

  // Create schema with translations
  const registerSchema = useMemo(() => getRegisterSchema(t), [t]);

  // Form
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      gender: undefined,
      age: undefined,
      weight: undefined,
      height: undefined,
      goal: undefined,
      activityLevel: undefined,
    },
  });

  // Mutation
  const { mutate, isPending } = useRegister();

  // Function to check and submit the data
  const handleComplete = (data: RegisterSchema) => {
    // Check if all the required data is filled
    if (
      !data.gender ||
      !data.age ||
      !data.weight ||
      !data.height ||
      !data.goal ||
      !data.activityLevel
    ) {
      toast.error(t('common.error.required'));
      return;
    }
    // Call API
    mutate(data);
  };

  return (
    <>
      {/* Register */}
      {step === 'register' && (
        <RegisterPage isPending={isPending} form={form} setStep={setStep} />
      )}

      {/* Gender */}
      {step === 'gender' && <GenderPage form={form} setStep={setStep} />}

      {/* Age */}
      {step === 'age' && <AgePage form={form} setStep={setStep} />}

      {/* Weight */}
      {step === 'weight' && <WeightPage form={form} setStep={setStep} />}

      {/* Height */}
      {step === 'height' && <HeightPage form={form} setStep={setStep} />}

      {/* Goal */}
      {step === 'goal' && <GoalSelectionScreen form={form} setStep={setStep} />}

      {/* Activity */}
      {step === 'activity' && (
        <ActivityPage
          form={form}
          setStep={setStep}
          RegisterApi={handleComplete}
          isPending={isPending}
        />
      )}
    </>
  );
}
