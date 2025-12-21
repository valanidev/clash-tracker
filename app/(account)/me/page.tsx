import { redirect } from 'next/navigation'

const AccountPage = ({ loggedIn = false }: { loggedIn: boolean }) => {
  if (!loggedIn) redirect('/')

  return <h1>Account page...</h1>
}

export default AccountPage
