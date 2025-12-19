type TextInputProps = {
  type: 'text' | 'password' | 'email'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

const TextInput = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}: TextInputProps) => {
  return (
    <input
      className={`w-full rounded-lg bg-white/20 px-4 py-3 placeholder:text-white/50 ${className && className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default TextInput
