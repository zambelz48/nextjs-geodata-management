import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"

interface AuthorizedComponentProps {
  children: React.ReactNode
}

export const AuthorizedComponent: React.FC<AuthorizedComponentProps> = ({
  children,
}) => {
  const router = useRouter()
  const { status } = useSession()

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login")
    }
  }, [status])

  return children
}
