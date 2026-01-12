import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import LinkButton from '../components/LinkButton'
import { Plus } from 'lucide-react'
import VillagesViewer from '../components/VillagesViewer'
import Separator from '../components/Separator'
import ProfileUpdateButtons from '../components/ProfileUpdateButtons'

const AccountPage = async () => {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
    withFullUser: true,
  })

  return (
    <main className="box">
      <h1 className="text-center font-semibold md:text-left">My Account</h1>

      <Separator />

      <h2 className="text-center md:text-left">
        Logged in as <span className="font-semibold">{user.username}</span>{' '}
        <span className="text-sm">({user.email})</span>
      </h2>

      <ProfileUpdateButtons />

      <Separator />

      <div className="mt-4 w-full">
        <LinkButton
          target="/tracker/new"
          text="Add a new village"
          icon={<Plus />}
          style="success"
        />
      </div>

      <div className="box mt-4 flex flex-col gap-4">
        <h1 className="text-center md:text-left">Villages</h1>
        <VillagesViewer />
      </div>
    </main>
  )
}

export default AccountPage
