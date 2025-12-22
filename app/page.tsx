import Link from 'next/link'
import { getCurrentUser } from './(auth)/core/currentUser'

const IndexPage = async () => {
  const user = await getCurrentUser()

  if (user) {
    return <h1>Hello, user {user.id}</h1>
  }

  return (
    <h1>
      Hi, you can{' '}
      <Link href="/signin" className="font-semibold text-blue-500 underline">
        sign in
      </Link>{' '}
      or{' '}
      <Link href="/signup" className="font-semibold text-blue-500 underline">
        sign up
      </Link>
    </h1>
  )
}

export default IndexPage
