import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Lock, Mail, User } from 'lucide-react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { RegisterSchema } from '@/lib/schema/register.schema'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface RegisterPageProps {
  form: UseFormReturn<RegisterSchema>
  setStep: (
    step: 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'register' | 'activity'
  ) => void
  checkEmailExists?: (email: string) => Promise<boolean>
}

export default function RegisterPage({ form, setStep, checkEmailExists }: RegisterPageProps) {

  // Translation
  const { t } = useTranslation()
  const [isChecking, setIsChecking] = useState(false)

  const onSubmit: SubmitHandler<RegisterSchema> = async (values) => {
    // Check if email already exists
    if (checkEmailExists) {
      setIsChecking(true)
      try {
        const exists = await checkEmailExists(values.email)
        // Check if email already exists
        if (exists) {
          setIsChecking(false)
          return
        }
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        toast.error(errorMessage)
        setIsChecking(false)
        return
      }
      setIsChecking(false)
    }

    // Continue to next step
    setStep('gender')
  }

  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-1">
      <span className="text-center text-white text-lg font-normal">
       {t('auth.register.title')}
        <h1 className="text-center text-4xl font-extrabold text-white m-1">
          {t('auth.register.subtitle')}
        </h1>
      </span>

      <div className="w-120 flex justify-center items-center flex-col max-w-lg border border-[#D3D3D3] rounded-[50px] p-10 mt-2">
        <p className="text-center text-white m-2 text-2xl font-extrabold">{t('auth.register.register')}</p>
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
              type="submit"
              size="lg"
              disabled={isChecking}
              className={cn(
                "w-full text-white text-lg py-6 rounded-full mt-1 transition",
                !isChecking 
                  ? "bg-[#FF4100] hover:bg-[#E03A00]" 
                  : "bg-white/30 cursor-not-allowed"
              )}
            >
              {isChecking ? t('auth.register.checking') : t('common.next')}
            </Button>
          </form>
          <Link
            to="/login"
            className="text-base text-white capitalize flex justify-end mt-1"
          >
            {t('auth.register.alreadyHaveAccount')}{'  '}
            <span className="text-[#FF4100] underline ml-1">{t('auth.register.login')}</span>
          </Link>
        </Form>
      </div>
    </div>
  )
}