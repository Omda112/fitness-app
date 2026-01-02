import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Lock, Mail, User } from 'lucide-react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { RegisterSchema } from '@/lib/schema/register.schema';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface RegisterPageProps {
  form: UseFormReturn<RegisterSchema>;
  setStep: (
    step: 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'register' | 'activity'
  ) => void;
  checkEmailExists?: (email: string) => Promise<boolean>;
  isPending: boolean;
}

export default function RegisterPage({
  form,
  setStep,
  checkEmailExists,
  isPending,
}: RegisterPageProps) {
  // Translation
  const { t } = useTranslation();
  const [isChecking, setIsChecking] = useState(false);

  const onSubmit: SubmitHandler<RegisterSchema> = async () => {
    // Continue to next step
    setStep('gender');
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-1">
      <span className="text-center text-white text-lg font-normal">
        {t('auth.register.title')}
        <h1 className="text-center text-4xl font-extrabold text-white m-1">
          {t('auth.register.subtitle')}
        </h1>
      </span>

      <div className="w-120 flex justify-center items-center flex-col max-w-lg border border-[#D3D3D3] rounded-[50px] p-10 mt-2">
        <p className="text-center text-white m-2 text-2xl font-extrabold">
          {t('auth.register.register')}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                      <Input
                        {...field}
                        placeholder={t('auth.register.firstName')}
                        className="pl-10 h-12 w-80"
                        disabled={isChecking}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                      <Input
                        {...field}
                        placeholder={t('auth.register.lastName')}
                        className="pl-10 h-12 w-80"
                        disabled={isChecking}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                      <Input
                        {...field}
                        type="email"
                        placeholder={t('auth.register.email')}
                        className="pl-10 h-12 w-80"
                        disabled={isChecking}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                      <Input
                        {...field}
                        type="password"
                        placeholder={t('auth.register.password')}
                        className="pl-10 h-12 w-80"
                        disabled={isChecking}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                      <Input
                        {...field}
                        type="password"
                        placeholder={t('auth.register.rePassword')}
                        className="pl-10 h-12 w-80"
                        disabled={isChecking}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />

            <Link
              to="/forgot-password"
              className="font-bold text-[#FF4100] text-base underline capitalize flex justify-end"
            >
              {t('auth.register.forgetPassword')}
            </Link>

            <Button
              disabled={isPending}
              type="submit"
              className="bg-[#FF4100] hover:bg-[#FF5C33] font-bold text-base w-full rounded-full mt-4 cursor-pointer text-white"
            >
              {/* Is Pending State */}
              {isPending ? (
                <>
                  {t('forgot-password.email.sending')}{' '}
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                t('auth.register.next')
              )}
            </Button>
          </form>
          <Link
            to="/login"
            className="text-base text-white capitalize flex justify-end mt-1"
          >
            {t('auth.register.alreadyHaveAccount')}
            {'  '}
            <span className="text-[#FF4100] underline ml-1">
              {t('auth.register.login')}
            </span>
          </Link>
        </Form>
      </div>
    </div>
  );
}
