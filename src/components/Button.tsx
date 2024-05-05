import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 bg-blue-500 text-white rounded-md ${className}`}
    >
      {children}
    </button>
  )
}
