import z from 'zod'

export const usernameSchema = z
  .string()
  .min(3, { message: 'Username must be at least 3 characters long.' })
  .max(16, { message: 'Username must be at most 16 characters long.' })
  .regex(/^[A-Za-z]/, {
    message: 'Username must start with a letter.',
  })
  .regex(/^[A-Za-z0-9_]+$/, {
    message:
      'Username must contain only alphanumeric characters and underscores.',
  })
export const emailSchema = z.email()
export const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[^A-Za-z0-9]/, {
    message:
      'Password must contain at least one special character (e.g., !@#$%)',
  })
export const confirmPasswordSchema = z
  .string()
  .nonempty({ message: 'Password confirmation is required' })

export const signUpSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .nonempty({ message: 'Please fill in the password field' }),
})
