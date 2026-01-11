import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import LinkButton from '../components/LinkButton'
import { Plus, Trash } from 'lucide-react'
import VillagesViewer from '../components/VillagesViewer'
import Separator from '../components/Separator'
import ProfileUpdateButtons from '../components/ProfileUpdateButtons'

const AccountPage = async () => {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
    withFullUser: true,
  })

  return (
    <main className="box p-4">
      <h1 className="font-semibold">My Account</h1>

      <Separator />

      <h2>
        Logged in as <span className="font-semibold">{user.username}</span>{' '}
        <span className="text-sm">({user.email})</span>
      </h2>

      <ProfileUpdateButtons />

      <Separator />

      <div className="mt-4 flex w-full flex-col gap-2 md:flex-row">
        <LinkButton
          target="/tracker/new"
          text="Add a new village"
          icon={<Plus />}
          className="md:w-1/2"
          type="success"
        />
        <LinkButton
          target="/tracker/remove"
          text="Remove a village"
          icon={<Trash />}
          className="md:w-1/2"
          type="danger"
        />
      </div>

      <div className="box mt-4 flex flex-col gap-4 p-4">
        <h1>Villages</h1>
        <VillagesViewer />
      </div>
    </main>
  )
}

export default AccountPage
