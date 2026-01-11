import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type LinkButtonProps = {
  target: string
  text: string
  icon?: ReactNode
  type?: 'default' | 'danger' | 'success'
  className?: string
}

const LinkButton = ({
  target,
  text,
  icon,
  type = 'default',
  className,
}: LinkButtonProps) => {
  return (
    <a
      href={target}
      className={cn(
        'alert flex justify-center bg-teal-600 font-semibold text-nowrap transition-colors duration-100',
        type === 'default' && 'bg-blue-500 hover:bg-blue-600',
        type === 'danger' && 'bg-red-500 hover:bg-red-600',
        type === 'success' && 'bg-green-600 hover:bg-green-700',
        className,
      )}
    >
      {icon && <span className="mr-2">{icon}</span>} {text}
    </a>
  )
}

export default LinkButton
