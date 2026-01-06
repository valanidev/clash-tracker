'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '../core/actions'

const LogoutPage = () => {
  const router = useRouter()

  useEffect(() => {
    let isMounted = true
    let to: ReturnType<typeof setTimeout>

    const run = async () => {
      await signOut()
      to = setTimeout(() => {
        if (isMounted) {
          router.replace('/')
        }
      }, 5000)
    }
    run()

    return () => {
      isMounted = false
      if (to) clearTimeout(to)
    }
  }, [router])

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">You are being disconnected</h1>
      <p>You will be redirected to the home page in 5 seconds.</p>
    </div>
  )
}

export default LogoutPage
