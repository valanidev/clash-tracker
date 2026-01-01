import { SessionTable, userRoles, UserTable } from '@/drizzle/schema'
import z from 'zod'
import crypto from 'crypto'
import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'

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

const setCookie = (sessionId: string, cookies: Pick<Cookies, 'set'>) => {
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

export const removeUserFromSession = async (
  cookies: Pick<Cookies, 'get' | 'delete'>,
) => {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value
  if (sessionId == null) return null

  await db.delete(SessionTable).where(eq(SessionTable.id, sessionId))
  cookies.delete(COOKIE_SESSION_KEY)
}

export const getUserFromSession = (cookies: Pick<Cookies, 'get'>) => {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value
  if (sessionId == null) return null

  return getUserSessionById(sessionId)
}

const getUserSessionById = async (sessionId: string) => {
  const sessionData = await db.query.SessionTable.findFirst({
    where: eq(SessionTable.id, sessionId),
  })

  if (sessionData == null) return null

  const userData = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, sessionData.userId),
  })

  const { success, data: user } = sessionSchema.safeParse(userData)

  return success ? user : null
}

export const updateUserSessionExpiration = async (
  cookies: Pick<Cookies, 'get' | 'set'>,
) => {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value
  if (sessionId == null) return null

  const user = await getUserSessionById(sessionId)
  if (user == null) return

  // Update from db
  const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000)
  await db
    .update(SessionTable)
    .set({
      expiresAt,
    })
    .where(eq(SessionTable.id, sessionId))
  setCookie(sessionId, cookies)
}
