import { getVillage } from '@/app/(account)/actions'
import VillageDeleteButtons from '@/app/(account)/components/buttons/VillageDeleteButtons'
import { redirect } from 'next/navigation'

const DeletePage = async ({ params }: { params: Promise<{ tag: string }> }) => {
  const { tag } = await params
  const village = await getVillage(tag)

  if (!village.success) {
    redirect('/me')
  }

  return (
    <main className="box">
      <h1>Delete Village </h1>
      <p>Are you sure you want to delete this village?</p>

      <h2 className="my-4">#{tag}</h2>

      <VillageDeleteButtons tag={tag} />
    </main>
  )
}

export default DeletePage
