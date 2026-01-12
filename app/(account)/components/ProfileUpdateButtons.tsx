import UsernameDialog from './dialogs/UsernameDialog'
import EmailDialog from './dialogs/EmailDialog'
import PasswordDialog from './dialogs/PasswordDialog'

const ProfileUpdateButtons = () => {
  return (
    <div className="mt-4 space-y-2">
      <UsernameDialog />
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <EmailDialog className="md:w-1/2" />
        <PasswordDialog className="md:w-1/2" />
      </div>
    </div>
  )
}

export default ProfileUpdateButtons
