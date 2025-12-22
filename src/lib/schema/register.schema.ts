import { z } from 'zod'

export const getRegisterSchema = (t: (key: string) => string) => {
  return z
    .object({
      firstName: z.string().min(2, t('common.error.firstName.minLength')).max(50),
      lastName: z.string().min(2, t('common.error.lastName.minLength')).max(50),
      email: z.string().email(t('common.error.email.invalid')),
      password: z
        .string()
        .min(8, t('common.error.password.minLength'))
        .regex(/[A-Z]/, t('common.error.password.uppercase'))
        .regex(/[a-z]/, t('common.error.password.lowercase'))
        .regex(/[0-9]/, t('common.error.password.number'))
        .regex(/[@$!%*?&]/, t('common.error.password.specialCharacter')),
      rePassword: z.string(),

      gender: z.enum(['male', 'female']).optional(),
      goal: z.enum(['Gain weight', 'Lose weight', 'Maintain weight']).optional(),
      activityLevel: z.enum(['level1', 'level2', 'level3', 'level4', 'level5']).optional(),

      height: z.number().optional(),
      weight: z.number().optional(),
      age: z.number().optional(),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t('common.error.password.match'),
      path: ['rePassword'],
    })
}

export type RegisterSchema = z.infer<ReturnType<typeof getRegisterSchema>>
