import Link from 'next/link'

const IndexPage = () => {
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
