import ActionMessage from '@/components/ui/ActionMessage'
import { getVillage } from '../../actions'
import { ClashData, PlayerApiData } from '@/types/clash'
import TrackerUserData from '@/components/TrackerUserData'

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

const TrackerPage = async ({
  params,
}: {
  params: Promise<{ tag: string }>
}) => {
  const { tag } = await params
  const village = await getVillage(tag)

  // If the village is not found, send the error message to the user
  if (!village.success) {
    return (
      <div className="text-center text-2xl">
        <ActionMessage actionResult={village} />
      </div>
    )
  }

  return <TrackerUserData />
}

export default TrackerPage
