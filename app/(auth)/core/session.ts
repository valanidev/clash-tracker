import { SessionTable, userRoles } from '@/drizzle/schema'
import z from 'zod'
import crypto from 'crypto'
import { db } from '@/drizzle/db'

/* 

import { userRoles } from "@/drizzle/schema"
import { z } from "zod"
import crypto from "crypto"
import { redisClient } from "@/redis/redis"

// Seven days in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7
const COOKIE_SESSION_KEY = "session-id"

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
})

type UserSession = z.infer<typeof sessionSchema>
export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: "strict" | "lax"
      expires?: number
    }
  ) => void
  get: (key: string) => { name: string; value: string } | undefined
  delete: (key: string) => void
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize()
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  })

  setCookie(sessionId, cookies)
}

*/

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
})

type UserSession = z.infer<typeof sessionSchema>

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7
const COOKIE_SESSION_KEY = 'tracker-session-id'

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: 'strict' | 'lax'
      expires?: number
    },
  ) => void
  get: (key: string) => { name: string; value: string } | undefined
  delete: (key: string) => void
}

function setCookie(sessionId: string, cookies: Pick<Cookies, 'set'>) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  })
}

export const createUserSession = async (
  user: UserSession,
  cookies: Cookies,
) => {
  const sessionId = crypto.randomBytes(512).toString('hex').normalize()
  const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000)

  await db.insert(SessionTable).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  })

  setCookie(sessionId, cookies)

  return sessionId
}

export default createUserSession
