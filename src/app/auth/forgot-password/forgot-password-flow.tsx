import { useEffect, useState } from 'react';
import EmailForm from './email-form';
import OTPForm from './OTP-form';
import NewPasswordForm from './new-password-form';
import { EmailValue } from '@/lib/schemas/forgot-password.schema';
import { hasActiveTimer } from './_hooks/use-resend-timer';

const EMAIL_KEY = 'forgot_password_email';

export default function ForgotPassword() {
  // State
  // Initialize step: restore to 'verify' if timer is active and email exists
  const [step, setStep] = useState<'email' | 'verify' | 'createPassword'>(() => {
    const storeEmail = localStorage.getItem(EMAIL_KEY);
    return hasActiveTimer() && storeEmail ? 'verify' : 'email';
  });

  // Initialize email: restore from localStorage if exists
  const [email, setEmail] = useState<EmailValue | undefined>(() => {
    const storedEmail = localStorage.getItem(EMAIL_KEY);
    if (storedEmail) {
      try {
        return JSON.parse(storedEmail);
      } catch {
        return undefined;
      }
    }
    return undefined;
  });

  // Sync email to localStorage whenever it changes
  useEffect(() => {
    if (email) {
      localStorage.setItem(EMAIL_KEY, JSON.stringify(email));
    }
  }, [email]);

  //  Cleanup localStorage when flow completes
  useEffect(() => {
    if (step === 'createPassword') {
      localStorage.removeItem(EMAIL_KEY);
    }
  }, [step]);

  return (
    <>
      {/* Email */}
      {step === 'email' && <EmailForm setEmail={setEmail} setStep={setStep} />}

      {/* OTP */}
      {step === 'verify' && email && <OTPForm email={email} setStep={setStep} />}

      {/* New Password */}
      {step === 'createPassword' && email && (
        <NewPasswordForm email={email} setStep={setStep} />
      )}
    </>
  );
}
