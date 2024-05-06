import React from "react"

interface SubmitButtonProps {
  label: string
  disabled?: boolean
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  disabled = false,
}) => {
  return (
    <input
      disabled={disabled}
      type="submit"
      value={label}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    />
  )
}
