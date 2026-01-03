'use server'

import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import { db } from '@/drizzle/db'
import { VillageTable } from '@/drizzle/schema'
import { ClashData } from '@/types/clash'
import { ActionResult } from '@/types/utils'
import { eq } from 'drizzle-orm'

export const addVillage = async (data: ClashData): Promise<ActionResult> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const tag = data.tag

  const alreadyExists = await db
    .select()
    .from(VillageTable)
    .where(eq(VillageTable.userId, user.id) && eq(VillageTable.tag, tag))
    .limit(1)
  if (alreadyExists.length > 0) {
    return {
      success: false,
      message: 'You already own this village',
    }
  }

  await db.insert(VillageTable).values({
    userId: user.id,
    tag,
    payload: data,
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
): Promise<ActionResult<unknown>> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const village = await db
    .select()
    .from(VillageTable)
    .where(eq(VillageTable.userId, user.id) && eq(VillageTable.tag, '#' + tag))

  if (village.length == 0) {
    return {
      success: false,
      message: `Village #${tag} not found`,
    }
  }

  return {
    success: true,
    data: village[0].payload,
  }
}
