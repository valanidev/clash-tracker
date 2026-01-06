import { UserData } from '@/types/clash'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import TrackerNavbar from './TrackerNavbar'
import TrackerItems from './TrackerItems'

const TrackerUserData = async ({
  tag,
  data,
}: {
  tag: string
  data: UserData
}) => {
  const thLevel = data.items.homeArmy.find((item) => item.id === 1000001)
    ?.levels[0]

  return (
    <div className="-mt-2 grid grid-cols-1 gap-4 lg:grid-cols-5">
      {/* Left Part */}
      <div className="col-span-5 flex flex-col gap-4 lg:col-span-1">
        <div className="box flex flex-col items-center justify-center lg:aspect-square">
          <div className="flex aspect-square justify-center">
            <Image
              src={`/coc-images/1/${thLevel}.png`}
              alt="Town Hall"
              width={150}
              height={150}
              loading="eager"
            />
          </div>
          <h1>{data.username}</h1>
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
        <TrackerItems items={data.items} />
      </div>
    </div>
  )
}

export default TrackerUserData
