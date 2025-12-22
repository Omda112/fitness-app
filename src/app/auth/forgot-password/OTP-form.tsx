import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { EmailValue, otpSchema, OTPvalue } from '@/lib/schemas/forgot-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useVerifyOTP } from './_hooks/use-verify-OTP';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useSendEmail } from './_hooks/use-send-email';
import { useResendTimer } from './_hooks/use-resend-timer';

// Props
type OTPFormProps = {
  email: EmailValue;
  setStep: (step: 'email' | 'createPassword') => void;
};

export default function OTPForm({ email, setStep }: OTPFormProps) {
  // Translation
  const { t } = useTranslation();
  const otpValidationSchema = useMemo(() => otpSchema(t), [t]);

  // Hooks
  const { verifyOTP, isPending } = useVerifyOTP();
  const { sendEmail } = useSendEmail();
  const { timeLeft, canResend, triggerResend } = useResendTimer();

  // Form
  const form = useForm<OTPvalue>({
    defaultValues: {
      resetCode: '',
    },
    resolver: zodResolver(otpValidationSchema),
  });

  // Mutation
  const onSubmit: SubmitHandler<OTPvalue> = (resetCode) => {
    verifyOTP(resetCode, {
      onSuccess: () => setStep('createPassword'),
    });
  };

  const resendCodeHandler = () => {
    if (!canResend) return; // Prevent action if timer is active
    sendEmail(email, {
      onSuccess: () => {
        triggerResend();
      },
    });
  };

  return (
    <section className="flex justify-center items-center min-h-screen h-full bg-white dark:bg-zinc-900">
      {/* Verify Form Section */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 max-w-xl w-full text-zinc-900 dark:text-zinc-100"
        >
          {/* Header */}
          <header className="text-5xl font-bold py-2 px-4 text-center">
            {t('forgot-password.otp.header')}
          </header>

          {/* Verify Card */}
          <div className="border rounded-4xl flex flex-col gap-2 justify-center items-center border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-4/5 p-10">
            {/* Back Button */}
            <Button
              disabled={!canResend}
              type="button"
              variant="ghost"
              onClick={() => setStep('email')}
              className="self-start mb-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('forgot-password.otp.backButton')}
            </Button>

            {/* Title */}
            <p className="text-2xl mb-5">{t('forgot-password.otp.title')}</p>

            {/* Reset Code Field */}
            <FormField
              name="resetCode"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-col flex justify-center items-center">
                  <FormControl>
                    {/* Input */}
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="gap-4">
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Button */}
            <Button
              disabled={isPending}
              type="submit"
              className="bg-[#FF4100] hover:bg-[#FF5C33] font-bold text-base w-full rounded-full mt-4 cursor-pointer text-white"
            >
              {isPending ? (
                <>
                  {t('forgot-password.otp.confirming')}{' '}
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                t('forgot-password.otp.confirmButton')
              )}
            </Button>

            {/* Resend Code Section */}
            <div className="text-center mt-2">
              {/* Title */}
              <p className="capitalize text-zinc-600 dark:text-zinc-400">
                {t('forgot-password.otp.didntReceive')}
              </p>

              {/* Conditional Rendering: Show button OR countdown message */}
              {canResend ? (
                // Show Resend Button when timer is not active
                <Button
                  type="button"
                  onClick={resendCodeHandler}
                  className="text-[#FF4100] dark:text-[#FF5C33] text-base font-bold underline cursor-pointer hover:text-[#FF5C33] dark:hover:text-[#FF4100] hover:opacity-90 transition-colors"
                >
                  {t('forgot-password.otp.resendCode')}
                </Button>
              ) : (
                // Show countdown message when timer is active
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                  {t('forgot-password.otp.requestAnotherCode')}{' '}
                  <span className="font-bold text-zinc-700 dark:text-zinc-200">
                    {timeLeft}s
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
