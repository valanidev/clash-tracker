'use server'

import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import { db } from '@/drizzle/db'
import { UserTable, VillageTable } from '@/drizzle/schema'
import { ClashData, PlayerApiData, UserData } from '@/types/clash'
import { ActionResult } from '@/types/utils'
import { and, eq } from 'drizzle-orm'
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from '../(auth)/schemas/authSchema'
import { generateSalt, hashPassword } from '../(auth)/core/utils'

// Actions for account management
export const setUsername = async (
  newUsername: string,
): Promise<ActionResult> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const parsedUsername = usernameSchema.safeParse(newUsername)
  if (!parsedUsername.success) {
    return {
      success: false,
      message: JSON.parse(parsedUsername.error.message)[0].message,
    }
  }

  const existingUsername = await db.query.UserTable.findFirst({
    where: eq(UserTable.username, newUsername),
  })
  if (existingUsername)
    return {
      success: false,
      message: 'This username is already used for another account.',
    }

  await db
    .update(UserTable)
    .set({
      username: newUsername,
    })
    .where(eq(UserTable.id, user.id))

  return {
    success: true,
    message: 'Username updated successfully',
  }
}

export const setEmail = async (newEmail: string): Promise<ActionResult> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const parsedEmail = emailSchema.safeParse(newEmail)
  if (!parsedEmail.success) {
    return {
      success: false,
      message: JSON.parse(parsedEmail.error.message)[0].message,
    }
  }

  const existingEmail = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, newEmail),
  })
  if (existingEmail)
    return {
      success: false,
      message: 'This email is already used for another account.',
    }

  await db
    .update(UserTable)
    .set({
      email: newEmail,
    })
    .where(eq(UserTable.id, user.id))

  return {
    success: true,
    message: 'Email updated successfully',
  }
}

export const setPassword = async (
  newPassword: string,
  newPasswordConfirm: string,
): Promise<ActionResult> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const parsedPassword = passwordSchema.safeParse(newPassword)
  if (!parsedPassword.success) {
    return {
      success: false,
      message: JSON.parse(parsedPassword.error.message)[0].message,
    }
  }

  if (newPassword != newPasswordConfirm)
    return {
      success: false,
      message: 'Passwords do not match',
    }

  try {
    const salt = generateSalt()
    const hashedPassword = await hashPassword(newPassword, salt)

    await db
      .update(UserTable)
      .set({
        password: hashedPassword,
        salt: salt,
      })
      .where(eq(UserTable.id, user.id))
  } catch {
    return {
      success: false,
      message: 'Unable to edit your password at the moment.',
    }
  }

  return {
    success: true,
    message: 'Password updated successfully',
  }
}

// Actions for village management
export const addVillage = async (
  clashData: ClashData,
): Promise<ActionResult> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })
  const tag = clashData.tag

  // Check if the user already owns this village
  // const alreadyExists = await db
  //   .select()
  //   .from(VillageTable)
  //   .where(and(eq(VillageTable.userId, user.id), eq(VillageTable.tag, tag)))
  //   .limit(1)
  // if (alreadyExists.length > 0) {
  //   return {
  //     success: false,
  //     message: 'You already own this village',
  //   }
  // }

  // If not, we can request the coc API to get required data
  const { data: playerApiData, error } = await getPlayerFromApi(tag)
  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  const userData: UserData = {
    username: playerApiData!.name,
    items: {
      homeDefenses: [],
      homeTraps: [],
      homeWalls: [],
      homeArmy: [{ id: 1000001, count: 1, levels: [17] }],
      homeResources: [],
      homeTroops: [],
      homeDarkTroops: [],
      homeSpells: [],
      homeSiegeMachines: [],
      homeHeroes: [],
      homePets: [],
    },
  }

  // For now, register empty data
  await db.insert(VillageTable).values({
    userId: user.id,
    tag,
    payload: JSON.stringify(userData),
  })

  return {
    success: true,
    message: `Village ${tag} added successfully`,
  }
}

export const getVillages = async () => {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const villages = await db
    .select()
    .from(VillageTable)
    .where(eq(VillageTable.userId, user.id))

  return villages
}

export const getVillage = async (
  tag: string,
): Promise<ActionResult<UserData>> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const village = await db
    .select()
    .from(VillageTable)
    .where(
      and(eq(VillageTable.userId, user.id), eq(VillageTable.tag, '#' + tag)),
    )

  if (village.length == 0) {
    return {
      success: false,
      message: `Village #${tag} not found`,
    }
  }

  return {
    success: true,
    data: village[0].payload as UserData,
  }
}

export const getPlayerFromApi = async (
  tag: string,
): Promise<{
  data: PlayerApiData | null
  error: { status: number; message: string } | null
  status: number
}> => {
  tag = tag.replace('#', '').trim()

  const base = 'http://localhost:3000'
  const response = await fetch(`${base}/api/player/${tag}`)

  let data = null
  let error = null
  const status = response.status

  if (!response.ok) {
    const errorData = await response.json()
    error = {
      status,
      message: errorData.message || 'Error fetching player data',
    }
  } else {
    data = await response.json()
  }

  return { data, error, status }
}
