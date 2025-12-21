import z from 'zod'
import { signInSchema, signUpSchema } from './schemas/authSchema'

export const signIn = async (unsafeData: z.infer<typeof signInSchema>) => {
  const data = signInSchema.safeParse(unsafeData)
  console.log('Sign in...', data)
  alert('Sign in user!')
}

export const signUp = async (unsafeData: z.infer<typeof signUpSchema>) => {
  const data = signUpSchema.safeParse(unsafeData)
  console.log('Sign up...', data)
  alert('Sign up user!')
}
