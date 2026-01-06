import { getPlayerFromApi } from '@/app/(account)/actions'
import { ClashData, PlayerApiData } from '@/types/clash'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import TrackerNavbar from './TrackerNavbar'

const TrackerUserData = async ({ data }: { data: ClashData }) => {
  const tag = data.tag.replace('#', '')
  const player = await getPlayerFromApi(tag)

  if (player.error != null) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="box col-span-5 flex flex-col items-center justify-center">
          <h2 className="text-red-600">{player.error.message}</h2>
        </div>
      </div>
    )
  }

  const playerData = player.data as PlayerApiData

  return (
    <div className="-mt-2 grid grid-cols-1 gap-4 lg:grid-cols-5">
      {/* Left Part */}
      <div className="col-span-5 flex flex-col gap-4 lg:col-span-1">
        <div className="box flex flex-col items-center justify-center lg:aspect-square">
          <div className="flex aspect-square justify-center">
            <Image
              src={`/coc-images/1/${playerData.townHallLevel}.png`}
              alt="Town Hall"
              width={150}
              height={150}
            />
          </div>
          <h1>{playerData.name}</h1>
          <a
            href={`https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${tag}`}
          >
            <h2 className="flex items-center gap-2">
              #{tag} <ExternalLink />
            </h2>
          </a>
        </div>
        <div className="box col-span-5 flex items-center justify-center lg:col-span-1">
          <TrackerNavbar />
        </div>
      </div>

      {/* Right Part */}
      <div className="box col-span-5 items-center justify-center lg:col-span-4">
        {/* TODO */}
      </div>
    </div>
  )
}

export default TrackerUserData
