import { getCurrentUser } from './(auth)/core/currentUser'

const IndexPage = async () => {
  const user = await getCurrentUser({ withFullUser: true })

  if (user) {
    return <h1>Hello, {user.username}</h1>
  }

  return <h1>Hello, random user.</h1>
}

export default IndexPage
