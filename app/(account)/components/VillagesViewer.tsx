import { UserData } from '@/types/clash'
import { getVillage, getVillages } from '../actions'
import Image from 'next/image'
import LinkButton from './LinkButton'
import { Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

const VillageViewer = async () => {
  const villages = await getVillages()

  if (villages.length === 0) {
    return <p>No villages to show yet...</p>
  }

  return (
    <div
      className={cn(
        'grid gap-4',
        villages.length > 1 && 'flex-wrap md:grid-cols-3 lg:grid-cols-4',
      )}
    >
      {villages.map(async (village, index) => {
        const tag = village.tag.replace('#', '')
        const villageData = await getVillage(tag)
        if (!villageData.success)
          return <p key={village.id}>Could not get the village data...</p>

        const data = villageData.data as UserData
        const townhallId = 1000001
        const thLevel = data.items.homeArmy.find(
          (item) => item.id === townhallId,
        )?.levels[0]
        return (
          <div key={index} className="box flex flex-col items-center gap-4 p-4">
            <h2 className="font-semibold">{data.username}</h2>
            <div className="flex h-50 w-50 items-center justify-center">
              <Image
                src={`/coc-images/${townhallId}/${thLevel}.png`}
                alt={`Townhall ${thLevel}`}
                width={0}
                height={0}
                sizes="100vw"
                className="h-50 w-auto"
              />
            </div>

            <LinkButton target={`/tracker/${tag}`} text="View" icon={<Eye />} />
          </div>
        )
      })}
    </div>
  )
}

export default VillageViewer
