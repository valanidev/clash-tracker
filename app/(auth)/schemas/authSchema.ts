import z from 'zod'

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' })
      .max(16, { message: 'Username must be at most 16 characters long.' })
      .regex(/^[A-Za-z]/, {
        message: 'Username must start with a letter.',
      })
      .regex(/^[A-Za-z0-9_]+$/, {
        message:
          'Username must contain only alphanumeric characters and underscores.',
      }),
    email: z.email().nonempty({ message: 'A valid email address is required' }),
    password: z
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
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Password confirmation is required' }),
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
