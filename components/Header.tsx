import { getCurrentUser } from '@/app/(auth)/core/currentUser'
import Link from 'next/link'

import { LogOut } from 'lucide-react'

const Header = async () => {
  const user = await getCurrentUser()

  return (
    <header className="border-b border-white/10 bg-white/5">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">Clash Tracker</Link>
        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          {user === null ? (
            <>
              <Link href="/signin">Sign In</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          ) : (
            <>
              <Link href="/me">My Account</Link>
              <Link
                href="/signout"
                className="rounded-sm p-1 hover:bg-white/5"
                title="Sign out"
              >
                <LogOut />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
