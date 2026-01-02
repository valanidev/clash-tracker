import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import { getVillages } from '../actions'

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

      <div className="mt-2 flex flex-col flex-wrap gap-2 rounded-lg bg-white/5 p-2">
        {villages.map((village) => (
          <div key={village.id}>
            <h2>Village: #{village.tag}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountPage
