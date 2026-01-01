'use client'

import { signOut } from '../core/actions'

const SignOutButton = () => {
  return (
    <button
      className="cursor-pointer rounded-sm bg-orange-600 px-2 py-1 text-white"
      onClick={async () => await signOut()}
    >
      Sign Out
    </button>
  )
}

export default SignOutButton
