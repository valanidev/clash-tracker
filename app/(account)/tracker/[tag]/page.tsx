import ActionMessage from '@/components/ui/ActionMessage'
import { getVillage } from '../../actions'
import { redirect } from 'next/navigation'

type TrackerPageProps = {
  params: Promise<{ tag: string }>
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

  return (
    <div>
      <h1>Track #{tag}</h1>
    </div>
  )
}

export default TrackerPage
