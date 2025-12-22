import z from 'zod';

type TFunction = (key: string) => string;

export const EmailSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t('forgot-password.email.validation.emailRequired'))
      .email(t('forgot-password.email.validation.emailInvalid')),
  });

export const otpSchema = (t: TFunction) =>
  z.object({
    resetCode: z
      .string()
      .min(6, t('forgot-password.otp.validation.otpLength'))
      .max(6, t('forgot-password.otp.validation.otpLength'))
      .regex(/^\d+$/, t('forgot-password.otp.validation.otpNumbers')),
  });

export const PasswordFieldSchema = (t: TFunction) =>
  z
    .string()
    .min(1, t('forgot-password.new-password.validation.passwordRequired'))
    .regex(/^(?=.*[0-9]).*$/, t('forgot-password.new-password.validation.digit'))
    .regex(/^(?=.*[a-z]).*$/, t('forgot-password.new-password.validation.lowercase'))
    .regex(/^(?=.*[A-Z]).*$/, t('forgot-password.new-password.validation.uppercase'))
    .regex(/^(?=.*\W).*$/, t('forgot-password.new-password.validation.specialCharacter'))
    .regex(/^(?!.* ).*$/, t('forgot-password.new-password.validation.spaces'))
    .regex(/^.{8,25}$/, t('forgot-password.new-password.validation.range'));

export const createPasswordSchema = (t: TFunction) =>
  z
    .object({
      email: z
        .string()
        .min(1, t('forgot-password.email.validation.emailRequired'))
        .email(t('forgot-password.email.validation.emailInvalid')),
      newPassword: PasswordFieldSchema(t),
      rePassword: z
        .string()
        .min(1, t('forgot-password.new-password.validation.confirmRequired')),
    })
    .refine((data) => data.newPassword === data.rePassword, {
      message: t('forgot-password.new-password.validation.passwordsMatch'),
      path: ['rePassword'],
    });

export type EmailValue = z.infer<ReturnType<typeof EmailSchema>>;
export type OTPvalue = z.infer<ReturnType<typeof otpSchema>>;
export type createPasswordValues = z.infer<ReturnType<typeof createPasswordSchema>>;
