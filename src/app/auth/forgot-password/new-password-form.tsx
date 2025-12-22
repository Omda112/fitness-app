import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  createPasswordSchema,
  createPasswordValues,
  EmailValue,
} from '@/lib/schemas/forgot-password.schema';
import { ResetPasswordPayload } from '@/lib/types/forgot-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Lock } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useResetPassword } from './_hooks/use-reset-password';

// Reset Password Props
type NewPasswordFormProps = {
  email: EmailValue;
  setStep: (step: 'verify' | 'email') => void;
};

export default function NewPasswordForm({ email, setStep }: NewPasswordFormProps) {
  // Translationa
  const { t } = useTranslation();
  const passwordSchema = useMemo(() => createPasswordSchema(t), [t]);

  // Hooks
  const { resetPassword, isPending } = useResetPassword();

  // Form
  const form = useForm<createPasswordValues>({
    defaultValues: {
      email: email.email,
      newPassword: '',
      rePassword: '',
    },
    resolver: zodResolver(passwordSchema),
  });

  // Mutation
  const onSubmit: SubmitHandler<createPasswordValues> = (values) => {
    const resetPayload: ResetPasswordPayload = {
      email: values.email,
      newPassword: values.newPassword,
    };
    resetPassword(resetPayload);
  };

  return (
    <section className="flex justify-center items-center min-h-screen h-full bg-white dark:bg-zinc-900">
      {/* New Password Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 max-w-xl w-full text-zinc-900 dark:text-zinc-100"
        >
          {/* Header */}
          <header className="text-5xl font-bold py-2 px-4 capitalize text-center">
            {t('forgot-password.new-password.header')}
          </header>

          {/* New Password Card */}
          <div className="border rounded-4xl flex flex-col gap-2 justify-center items-center border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-4/5 p-10">
            {/* Title */}
            <p className="text-xl w-full capitalize text-center">
              {t('forgot-password.new-password.title')}
            </p>

            {/* New Password Field */}
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      {/* Lock Icon */}
                      <Lock
                        className="absolute top-4.5 text-zinc-500 dark:text-zinc-400 left-4"
                        width={20}
                        height={20}
                      />

                      {/* New Password Input */}
                      <Input
                        type="password"
                        placeholder={t(
                          'forgot-password.new-password.newPasswordPlaceholder'
                        )}
                        className="w-full pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  {/* Feedback message */}
                  <FormMessage className="mt-1 ms-2" />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              name="rePassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      {/* Lock Icon */}
                      <Lock
                        className="absolute top-4.5 text-zinc-500 dark:text-zinc-400 left-4"
                        width={20}
                        height={20}
                      />

                      {/* Confirm Password Input */}
                      <Input
                        type="password"
                        placeholder={t(
                          'forgot-password.new-password.confirmPasswordPlaceholder'
                        )}
                        className="w-full pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  {/* Feedback message */}
                  <FormMessage className="mt-1 ms-2" />
                </FormItem>
              )}
            />

            {/* Confirm Button */}
            <Button
              disabled={isPending}
              type="submit"
              className="bg-[#FF4100] hover:bg-[#FF5C33] font-bold text-base w-full rounded-full mt-4 cursor-pointer text-white"
            >
              {/* Is Pending State */}
              {isPending ? (
                <>
                  {t('forgot-password.new-password.confirming')}{' '}
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                t('forgot-password.new-password.confirmButton')
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
