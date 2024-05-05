import { AuthorizedComponent } from "@/components/AuthorizedComponent"
import { useGetGeodataById } from "@/repositories/geodata/hooks"
import { useRouter } from "next/router"
import React from "react"

export default function Page() {
  const router = useRouter()
  const geodataQuery = useGetGeodataById(
    router.query.id as string,
    {
      enabled: !!router.query.id
    }
  )

  React.useEffect(() => {
    if (router.query.id) {
      geodataQuery.refetch()
    }
  }, [router.query.id])

  React.useEffect(() => {
    if (geodataQuery.data) {
      console.log("[X] result: ", geodataQuery.data.data)
    }
  }, [geodataQuery.data])

  return (
    <AuthorizedComponent>
      <p>TODO: Add button to load GeoJSON from file</p>
      <p>TODO: Add form to fill manually or from uploaded from file</p>
      <p>TODO: Add button to save</p>
      <p>TODO: Add button to delete</p>
    </AuthorizedComponent>
  )
}
