import { EmailSchema, EmailValue } from '@/lib/schemas/forgot-password.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSendEmail } from './_hooks/use-send-email';
import { useResendTimer } from './_hooks/use-resend-timer';
import { useTranslation } from 'react-i18next';

// Props
type EmailProps = {
  setEmail: (email: EmailValue) => void;
  setStep: (step: 'verify' | 'createPassword') => void;
};

export default function EmailForm({ setEmail, setStep }: EmailProps) {
  // Translation
  const { t } = useTranslation();
  const emailSchema = useMemo(() => EmailSchema(t), [t]);

  // Hooks
  const { isPending, sendEmail } = useSendEmail();
  const { triggerResend } = useResendTimer();

  // Form
  const form = useForm<EmailValue>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  });

  // Mutation
  const onSubmit: SubmitHandler<EmailValue> = (email) => {
    sendEmail(email, {
      onSuccess: () => {
        //Store email to use it in Create Password Component
        setEmail(email);
        //Move to verify component after submit email
        setStep('verify');
        triggerResend();
      },
    });
  };

  return (
    <section className="flex justify-center items-center min-h-screen h-full bg-white dark:bg-zinc-900">
      {/* Email Form */}
      <Form {...form}>
        <form
          className="flex flex-col items-center gap-4 max-w-xl w-full text-zinc-900 dark:text-zinc-100"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Header */}
          <header className="text-5xl font-bold py-2 px-4 text-center">
            {t('forgot-password.email.header')}
          </header>

          {/* Send Email Card */}
          <div className="border rounded-4xl flex flex-col gap-2 justify-center items-center border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-4/5 p-10">
            {/* Title */}
            <p className="text-2xl">{t('forgot-password.email.title')}</p>

            {/* Email Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      {/* Mail Icon */}
                      <Mail
                        className="absolute top-5 text-zinc-500 dark:text-zinc-400 left-4"
                        width={19}
                        height={19}
                      />
                      {/* Email Input */}
                      <Input
                        placeholder={t('forgot-password.email.emailPlaceholder')}
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

            {/* Sent OTP Button */}
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
                t('forgot-password.email.sendButton')
              )}
            </Button>

            {/* Register Navigation */}
            <div className="text-center mt-2 text-zinc-600 dark:text-zinc-400">
              {t('forgot-password.email.noAccount')}{' '}
              <Link to="/en/register">
                <span className="text-[#FF4100] hover:text-[#FF5C33] dark:text-[#FF5C33] dark:hover:text-[#FF4100] transition-colors">
                  {t('forgot-password.email.createAccount')}
                </span>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
