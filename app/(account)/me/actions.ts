'use server'

import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import { db } from '@/drizzle/db'
import { VillageTable } from '@/drizzle/schema'

export const addVillage = async (tag: string) => {
  const user = await getCurrentUser()
  if (user == null) return

  const userId = user.id

  const res = await db.insert(VillageTable).values({
    userId,
    tag,
  })
  console.log(res)
}
