import React from "react"
import { FieldError, Path, UseFormReturn } from "react-hook-form"

interface FormInputProps<T> {
  form: UseFormReturn<Required<T>, object>
  label: string
  type: string
  name: Path<Required<T>>
  value?: string
  error?: FieldError
}

export const FormInput = <T, >({
  form,
  label,
  type,
  name,
  value,
  error,
}: FormInputProps<T>) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...form.register(name)}
      />
      {error?.message && (
        <label htmlFor={name} className="text-sm text-red-500">
          {error.message}
        </label>
      )}
    </div>
  )
}
