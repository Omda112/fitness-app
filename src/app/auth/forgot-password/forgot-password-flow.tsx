import React, { useState } from 'react'
import EmailForm from './email-form'
import OTPForm from './OTP-form'
import NewPasswordForm from './new-password-form'

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'verify' | 'createPassword'>('email')
  const [email, setEmail] = useState<string>()

  return (
    <>
      {/* Email */}
      {step === 'email' && <EmailForm setEmail={setEmail} setStep={setStep} />}

      {/* OTP */}
      {step === 'verify' && <OTPForm />}

      {/* New Password */}
      {step === 'createPassword' && <NewPasswordForm />}
    </>
  )
}
