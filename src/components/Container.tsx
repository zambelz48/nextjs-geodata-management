import React from "react"
import { Navigation } from "./Navigation"

interface ContainerProps {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({
  children,
}) => {
  return (
    <main>
      <Navigation />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  )
}
