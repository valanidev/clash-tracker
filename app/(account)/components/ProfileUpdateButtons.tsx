'use client'

import { AtSign, Lock, User } from 'lucide-react'
import LinkButton from './LinkButton'

const ProfileUpdateButtons = () => {
  return (
    <div className="mt-4 space-y-2">
      <LinkButton
        text="Change Username"
        icon={<User />}
        onClick={() => console.log('TODO change username toast')}
      />
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <LinkButton
          text="Change Password"
          icon={<Lock />}
          className="md:w-1/2"
          onClick={() => console.log('TODO change password toast')}
        />
        <LinkButton
          text="Change Email"
          icon={<AtSign />}
          className="md:w-1/2"
          onClick={() => console.log('TODO change email toast')}
        />
      </div>
    </div>
  )
}

export default ProfileUpdateButtons
