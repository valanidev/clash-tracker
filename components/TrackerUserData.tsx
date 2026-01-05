import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

const TrackerUserData = async () => {
  const tag = '22UUR8U0L'
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <div className="box col-span-5 flex flex-col items-center justify-center lg:col-span-1 lg:aspect-square lg:max-w-60">
        <Image
          src="/coc-images/1/1.png"
          alt="Town Hall"
          width={150}
          height={150}
        />
        <h1>Waazix</h1>
        <a
          href={`https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${tag}`}
        >
          <h2 className="flex items-center gap-2">
            #{tag} <ExternalLink />
          </h2>
        </a>
      </div>

      <div className="box col-span-5 items-center justify-center lg:col-span-4">
        {/* TODO: show items */}
      </div>
    </div>
  )
}

export default TrackerUserData
