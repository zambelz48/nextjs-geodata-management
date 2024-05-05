import React from "react"

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const show = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, show, close }
}
