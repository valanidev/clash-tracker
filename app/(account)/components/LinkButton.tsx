'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type LinkButtonProps = {
  text: string
  target?: string
  icon?: ReactNode
  style?: 'default' | 'danger' | 'success'
  className?: string
  onClick?: () => void
}

const LinkButton = ({
  target,
  text,
  icon,
  style = 'default',
  className,
  onClick,
  ...props
}: React.ComponentProps<'a'> & LinkButtonProps) => {
  return (
    <a
      href={target}
      className={cn(
        'alert flex cursor-default justify-center bg-blue-500 font-semibold text-nowrap transition-colors duration-100 hover:bg-blue-600',
        style === 'danger' && 'bg-red-500 hover:bg-red-600',
        style === 'success' && 'bg-green-600 hover:bg-green-700',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>} {text}
    </a>
  )
}

export default LinkButton
