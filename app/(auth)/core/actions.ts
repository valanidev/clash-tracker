'use server'

import z from 'zod'
import { signInSchema, signUpSchema } from '../schemas/authSchema'
import { eq } from 'drizzle-orm'
import { UserTable } from '@/drizzle/schema'
import { db } from '@/drizzle/db'
import { comparePasswords, generateSalt, hashPassword } from './utils'
import { cookies } from 'next/headers'
import { createUserSession, removeUserFromSession } from './session'
import { redirect } from 'next/navigation'

export const signIn = async (unsafeData: z.infer<typeof signInSchema>) => {
  const { success, data } = signInSchema.safeParse(unsafeData)
  if (!success) return 'Unable to log you in'

  const user = await db.query.UserTable.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(UserTable.email, data.email),
  })

  if (user == null || user.password == null || user.salt == null) {
    return 'Unable to log you in'
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  })

  if (!isCorrectPassword) return 'Unable to log you in'

  await createUserSession(user, await cookies())

  redirect('/me')
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

  try {
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

    await createUserSession(user, await cookies())
  } catch {
    return 'Unable to create your account'
  }

  redirect('/me')
}

export const signOut = async () => {
  await removeUserFromSession(await cookies())
  redirect('/')
}
