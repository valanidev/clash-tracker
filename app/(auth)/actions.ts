'use server'

import z from 'zod'
import { signInSchema, signUpSchema } from './schemas/authSchema'
import { eq } from 'drizzle-orm'
import { UserTable } from '@/drizzle/schema'
import { db } from '@/drizzle/db'
import { generateSalt, hashPassword } from './utils'

export const signIn = async (unsafeData: z.infer<typeof signInSchema>) => {
  const data = signInSchema.safeParse(unsafeData)
  console.log('Sign in...', data)
  alert('Sign in user!')
}

export const signUp = async (unsafeData: z.infer<typeof signUpSchema>) => {
  const { success, data } = signUpSchema.safeParse(unsafeData)
  if (!success) return 'Unable to create the account'

  const existingEmail = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  })
  if (existingEmail)
    return 'This email address is already used for another account.'

  const existingUsername = await db.query.UserTable.findFirst({
    where: eq(UserTable.username, data.username),
  })
  if (existingUsername)
    return 'This username is already used for another account.'

  if (data.password != data.confirmPassword) return 'Passwords do not match'

  const salt = generateSalt()
  const hashedPassword = await hashPassword(data.password, salt)

  const [user] = await db
    .insert(UserTable)
    .values({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: UserTable.id, role: UserTable.role })

  if (user == null)
    return 'There was an error while creating your account... Try again.'
}
