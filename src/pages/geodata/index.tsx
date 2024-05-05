import { Button } from "@/components/Button"
import { useGetGeodatas } from "@/repositories/geodata"
import { useRouter } from "next/router"
import React from "react"

export default function Page() {
  const router = useRouter()
  const geodataQuery = useGetGeodatas()

  React.useEffect(() => {
    if (geodataQuery.data) {
      console.log("[X] result: ", geodataQuery.data.data?.map((geodata) => geodata._id))
    }
  }, [geodataQuery.data])

  return (
    <div>
      {geodataQuery.isLoading && (
        <div>Loading...</div>
      )}

      {geodataQuery.error ? (
        <div>
          Error:
          {" "}
          {geodataQuery.error.message}
        </div>
      ) : (
        <div>
          <h1>Geodata</h1>
          <ul>
            {geodataQuery.data?.data?.map((geodata) => (
              <li key={geodata._id}>
                <p>Name: {geodata.name}</p>
                <p>Creator: {geodata.createdBy}</p>
                <p>
                    <Button onClick={() => router.push(`/geodata/form?id=${geodata._id}`)}>
                      Edit
                    </Button>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
