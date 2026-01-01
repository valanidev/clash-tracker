import { getCurrentUser } from '@/app/(auth)/core/currentUser'

const AccountPage = async () => {
  const user = await getCurrentUser({ withFullUser: true })
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
    </div>
  )
}

export default AccountPage
