import React from "react"
import { UseFormReturn } from "react-hook-form"

interface FormContainerProps<T> {
  form: UseFormReturn<Required<T>, object>
  children: React.ReactNode
  onSubmit: (value: T) => void
}

export const FormContainer = <T, >({
  form,
  children,
  onSubmit,
}: FormContainerProps<T>) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {children}
        </form>
      </div>
    </div>
  )
}
