'use server'

import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import { db } from '@/drizzle/db'
import { VillageTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const addVillage = async (tag: string) => {
  const user = await getCurrentUser()
  if (user == null) return

  await db.insert(VillageTable).values({
    userId: user.id,
    tag,
  })
}

export const getVillages = async () => {
  const user = await getCurrentUser()
  if (user == null) return []

  const villages = await db
    .select()
    .from(VillageTable)
    .where(eq(VillageTable.userId, user.id))

  return villages
}
