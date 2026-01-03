import ActionMessage from '@/components/ui/ActionMessage'
import { getVillage } from '../../actions'
import { PlayerApiData } from '@/types/clash'

type TrackerPageProps = {
  params: Promise<{ tag: string }>
}

const getPlayer = async (
  tag: string,
): Promise<{
  data: PlayerApiData | null
  error: { status: number; message: string } | null
  status: number
}> => {
  const base = 'http://localhost:3000'
  const response = await fetch(`${base}/api/player/${tag}`)

  let data = null
  let error = null
  const status = response.status

  if (!response.ok) {
    const errorData = await response.json()
    error = {
      status,
      message: errorData.message || 'Error fetching player data',
    }
  } else {
    data = await response.json()
  }

  return { data, error, status }
}

const TrackerPage = async ({ params }: TrackerPageProps) => {
  const { tag } = await params
  const village = await getVillage(tag)

  if (!village.success) {
    return (
      <div className="text-center text-2xl">
        <ActionMessage actionResult={village} />
      </div>
    )
  }

  const villageData = village.data

  if (villageData == null) {
    return (
      <div className="text-center text-2xl">
        <ActionMessage
          actionResult={{ success: false, message: 'Nothing found...' }}
        />
      </div>
    )
  }

  const { data, error } = await getPlayer(tag)

  if (error) {
    return (
      <div className="text-center text-2xl">
        <ActionMessage
          actionResult={{ success: false, message: error.message }}
        />
      </div>
    )
  }

  if (data == null) return

  return (
    <div>
      <h1>
        Track #{tag} ({data.name})
      </h1>
    </div>
  )
}

export default TrackerPage
