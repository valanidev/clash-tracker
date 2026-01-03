import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import { getVillages } from '../actions'
import Link from 'next/link'

const AccountPage = async () => {
  const user = await getCurrentUser({ withFullUser: true })
  const villages = await getVillages()

  if (user == null) throw new Error('User not authenticated') // Should never happen, middleware is taking care of this

  return (
    <div>
      <ul>
        <li>
          <span className="font-semibold">ID: </span>
          {user.id}
        </li>
        <li>
          <span className="font-semibold">Email: </span>
          {user.email}
        </li>
        <li>
          <span className="font-semibold">Username: </span>
          {user.username}
        </li>
        <li>
          <span className="font-semibold">Role: </span>
          {user.role}
        </li>
      </ul>

      <Link
        href="/tracker/new"
        className="font-semibold text-blue-500 underline"
      >
        Add Village
      </Link>

      <div className="mt-2 flex flex-col flex-wrap gap-2 rounded-lg bg-white/5 p-2">
        {villages.map((village) => (
          <div key={village.id} className="flex gap-2">
            <h2>Village: {village.tag}</h2>
            <Link
              href={`/tracker/${village.tag.replace('#', '')}`}
              className="font-semibold text-blue-500 underline"
            >
              view
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountPage
