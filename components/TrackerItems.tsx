'use client'

import { Item, UserData } from '@/types/clash'
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

  const dummyItems = [
    { id: 1389893, count: 4, levels: [5, 5, 3, 2] },
    { id: 1389891, count: 2, levels: [3, 1] },
  ]

  return (
    <>
      {categoriesToRender.map(({ key, label }) => {
        const categoryItems = items[key]

        return (
          <section key={key}>
            <h2 className="mb-2 text-lg font-semibold">{label}</h2>

            <table
              cellSpacing={0}
              className="w-full border-collapse border border-white text-center"
            >
              <thead>
                <tr className="bg-white/10">
                  <th>Item</th>
                  <th>Level</th>
                  <th>Upgrades</th>
                </tr>
              </thead>
              <tbody>
                {categoryItems.length < 1 && (
                  <tr className="border-t border-white">
                    <td></td>
                    <td className="py-4">Nothing here...</td>
                    <td></td>
                  </tr>
                )}
                {categoryItems.map((item: Item, idx) => {
                  const name = item.id
                  const maxLevel = 2

                  const firstRow = (
                    <tr key={`${item.id}-0`} className="even:bg-white/5">
                      <td
                        rowSpan={item.count}
                        className="border border-white p-2"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="font-semibold">{name}</span>
                        </div>
                      </td>
                      <td className="border border-white p-2">
                        {item.levels[0]}/{maxLevel}
                      </td>
                      <td className="border border-white p-2 text-green-400">
                        {item.levels[0] >= maxLevel
                          ? '✓ Fully upgraded for this Town Hall level'
                          : 'Upgrade available'}
                      </td>
                    </tr>
                  )

                  const additionalRows = item.levels
                    .slice(1)
                    .map((level, index) => (
                      <tr
                        key={`${item.id}-${index + 1}`}
                        className="even:bg-white/5"
                      >
                        <td className="border border-white p-2">
                          {level}/{maxLevel}
                        </td>
                        <td className="border border-white p-2 text-green-400">
                          {level >= maxLevel
                            ? '✓ Fully upgraded for this Town Hall level'
                            : 'Upgrade available'}
                        </td>
                      </tr>
                    ))

                  return [firstRow, ...additionalRows]
                })}
              </tbody>
            </table>
          </section>
        )
      })}
    </>
  )
}

export default TrackerItems
