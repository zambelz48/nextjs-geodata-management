import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  className,
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`p-1 min-w-28 bg-blue-500 text-white rounded-md disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  )
}
