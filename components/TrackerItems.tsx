'use client'

import { UserData } from '@/types/clash'
import { useEffect, useState } from 'react'

type CategoryKey = keyof UserData['items']

const ITEM_CATEGORIES = [
  { key: 'homeDefenses', label: 'Defenses' },
  { key: 'homeTraps', label: 'Traps' },
  { key: 'homeWalls', label: 'Walls' },
  { key: 'homeArmy', label: 'Army' },
  { key: 'homeResources', label: 'Resources' },
  { key: 'homeTroops', label: 'Troops' },
  { key: 'homeDarkTroops', label: 'Dark Troops' },
  { key: 'homeSpells', label: 'Spells' },
  { key: 'homeSiegeMachines', label: 'Siege Machines' },
  { key: 'homeHeroes', label: 'Heroes' },
  { key: 'homePets', label: 'Pets' },
] as const

const TrackerItems = ({ items }: { items: UserData['items'] }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null)

  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash.replace('#', '').replace('-', ' ')
      const found = ITEM_CATEGORIES.find((c) => c.label === hash)
      setActiveCategory(found?.key ?? null)
    }
    readHash()

    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])

  const categoriesToRender = activeCategory
    ? ITEM_CATEGORIES.filter((c) => c.key === activeCategory)
    : null

  if (categoriesToRender == null) {
    return (
      <section>
        <h2 className="mb-2 text-lg font-semibold">
          Statistics will show soon.
        </h2>
      </section>
    )
  }

  return (
    <>
      {categoriesToRender.map(({ key, label }) => {
        const categoryItems = items[key]

        return (
          <section key={key}>
            <h2 className="mb-2 text-lg font-semibold">{label}</h2>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {categoryItems.map((item, index) => (
                <div key={index} className="rounded-lg border p-2 text-center">
                  <p className="text-sm">{item.id}</p>
                  <p className="text-muted-foreground text-xs">
                    Level {item.levels.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}

export default TrackerItems
