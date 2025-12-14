import React from 'react'

type EmailProps = {
  setEmail: (email: string) => void
  setStep: (step: 'verify' | 'createPassword') => void
}

export default function EmailForm({ setEmail }: EmailProps) {
  return <div>EmailForm</div>
}
