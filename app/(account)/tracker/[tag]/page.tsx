import ActionMessage from '@/components/ui/ActionMessage'
import { getVillage } from '../../actions'
import { UserData } from '@/types/clash'
import TrackerUserData from '@/components/TrackerUserData'

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

  const data = village.data as UserData

  return <TrackerUserData data={data} tag={tag} />
}

export default TrackerPage
