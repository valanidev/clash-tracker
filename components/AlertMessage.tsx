import { cn } from '@/lib/utils'

type AlertMessageProps = {
  type: 'error' | 'warning' | 'info' | 'success'
  message: string
}

const typeStyles: Record<AlertMessageProps['type'], string> = {
  error: 'bg-red-100 text-red-900',
  warning: 'bg-yellow-100 text-yellow-900',
  info: 'bg-blue-100 text-blue-900',
  success: 'bg-green-100 text-green-900',
}

const AlertMessage = ({ type, message }: AlertMessageProps) => {
  return <div className={cn('alert', typeStyles[type])}>{message}</div>
}

export default AlertMessage
