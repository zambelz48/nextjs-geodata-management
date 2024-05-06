import { signOut, useSession } from "next-auth/react"
import React from "react"
import { useRouter } from "next/router"
import { Button } from "./Button"

export const Navigation: React.FC = () => {
  const router = useRouter()
  const { data } = useSession()

  const userEmail = React.useMemo(() => {
    if (!data?.user) {
      return null
    }

    // @ts-ignore
    return data.user.sub as string
  }, [data])

  const login = () => {
    router.push("/auth/login")
  }

  const logout = async () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="bg-gray-600">
      <div className="flex flex-row justify-between mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-end space-x-4">
          <Button className="bg-green-400 text-black" onClick={() => router.replace("/geodata")}>
            Home
          </Button>
        </div>
        <div className="relative flex h-16 items-center justify-end space-x-4">
          {userEmail && (
            <label className="text-white">
              Welcome,
              {" "}
              <strong>{userEmail}</strong>
            </label>
          )}
          {userEmail ? (
            <Button className="bg-red-600" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button className="bg-green-600" onClick={login}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
