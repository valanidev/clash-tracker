'use client'

import { Unit } from '@/types/clash'

export const getBuildingLevelFromData = (
  data: Unit[] | undefined,
  unlockMap: Record<string, number>,
): number => {
  if (!data) return 0

  const maxLevel = data.reduce((max, item) => {
    const unlockLevel = unlockMap[item.name] ?? 0
    return Math.max(max, unlockLevel)
  }, 0)

  return maxLevel
}
