'use server'

import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import { db } from '@/drizzle/db'
import { VillageTable } from '@/drizzle/schema'
import { ClashData, PlayerApiData, UserData } from '@/types/clash'
import { ActionResult } from '@/types/utils'
import { and, eq } from 'drizzle-orm'

export const addVillage = async (
  clashData: ClashData,
): Promise<ActionResult> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })
  const tag = clashData.tag

  // Check if the user already owns this village
  const alreadyExists = await db
    .select()
    .from(VillageTable)
    .where(and(eq(VillageTable.userId, user.id), eq(VillageTable.tag, tag)))
    .limit(1)
  if (alreadyExists.length > 0) {
    return {
      success: false,
      message: 'You already own this village',
    }
  }

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
