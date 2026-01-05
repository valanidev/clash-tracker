'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '../core/actions'

const LogoutPage = () => {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      await signOut()
      setTimeout(() => {
        router.replace('/')
      }, 5000)
    }
    run()
  }, [router])

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">You are being disconnected</h1>
      <p>You will be redirected to the home page in 5 seconds.</p>
    </div>
  )
}

export default LogoutPage
