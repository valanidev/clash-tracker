import { ActionResult } from '@/types/utils'

type ActionMessageProps = {
  actionResult: ActionResult
}

const ActionMessage = ({ actionResult }: ActionMessageProps) => {
  return (
    <p
      className={`${actionResult.success ? 'text-green-600' : 'text-red-600'} my-1`}
    >
      {actionResult.message}
    </p>
  )
}

export default ActionMessage
