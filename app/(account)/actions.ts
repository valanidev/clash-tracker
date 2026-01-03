'use server'

import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import { db } from '@/drizzle/db'
import { VillageTable } from '@/drizzle/schema'
import { ActionResult } from '@/types/utils'
import { eq } from 'drizzle-orm'

export const addVillage = async (tag: string): Promise<ActionResult> => {
  const user = await getCurrentUser({ redirectIfNotFound: true })

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
