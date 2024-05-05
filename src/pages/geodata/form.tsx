import { AuthorizedComponent } from "@/components/AuthorizedComponent"
import { ErrorModal } from "@/components/Modal"
import { useGetGeodataById } from "@/repositories/geodata/hooks"
import { validateGeojson } from "@/utils/geojsonValidator"
import { useModal } from "@/utils/useModal"
import { useRouter } from "next/router"
import React from "react"

export default function Page() {
  const router = useRouter()
  const modal = useModal()
  const [errorMessage, setErrorMessage] = React.useState("")
  const geodataQuery = useGetGeodataById(
    router.query.id as string,
    {
      enabled: !!router.query.id,
    },
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

  const onChangeCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result !== "string") {
        return
      }

      try {
        const geoJson = validateGeojson(result)
        console.log("[X] valid geoJson: ", geoJson)
      } catch (error) {
        // @ts-ignore
        setErrorMessage(error.message)
        modal.show()
      }
    }

    reader.readAsText(file)
  }

  return (
    <>
      <AuthorizedComponent>
        <p>TODO: Add button to load GeoJSON from file</p>
        <p>TODO: Add form to fill manually or from uploaded from file</p>
        <p>TODO: Add button to save</p>
        <p>TODO: Add button to delete</p>
        <p>
          <label>Upload GeoJSON file:</label>
          <input
            type="file"
            accept="application/JSON"
            onChangeCapture={onChangeCapture}
          />
        </p>
      </AuthorizedComponent>
      <ErrorModal
        message={errorMessage}
        isOpen={modal.isOpen}
        onClose={modal.close}
      />
    </>
  )
}
