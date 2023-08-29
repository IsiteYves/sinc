import { Eye, EyeSlash, Info, XCircle } from 'phosphor-react'
import React, { FC, useState } from 'react'

interface Props {
  errorMessage?: string
  label?: string
  icon?: React.ReactNode
  iconStyle?: string
}

const TextInput: FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = ({
  errorMessage,
  label,
  type,
  icon,
  iconStyle,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <div className="w-full">
      {errorMessage ? (
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-error text-left">{errorMessage}</span>
          <XCircle size={20} className="text-error" weight="fill" />
        </div>
      ) : label ? (
        <label className="text-primary mb-1.5 block">{label}</label>
      ) : null}
      <div className="relative rounded-lg border border-border_gray px-3">
        <input
          {...props}
          type={isVisible ? 'text' : type}
          className={`${className} w-full lg:w-full py-2.5 text-gray-400 bg-transparent  focus:outline-none`}
          autoComplete="off"
        />
        {type === 'password' ? (
          <button
            type="button"
            className="absolute right-2 transform -translate-y-1/2 top-1/2 text-auth"
            onClick={() => setIsVisible((prevVisible) => !prevVisible)}>
            {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        ) : icon ? (
          <div
            className={`absolute right-2 transform -translate-y-1/2 top-4 text-auth ${iconStyle}`}>
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TextInput
