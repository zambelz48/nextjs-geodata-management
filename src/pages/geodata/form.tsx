import { AuthorizedComponent } from "@/components/AuthorizedComponent"
import { Button } from "@/components/Button"
import { ErrorModal } from "@/components/Modal"
import { useAddGeodata } from "@/repositories/geodata/hooks"
import { GeoData } from "@/repositories/geodata/schema"
import { validateGeojson } from "@/utils/geojsonValidator"
import { useModal } from "@/utils/useModal"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"

export default function Page() {
  const router = useRouter()
  const modal = useModal()
  const [uploadedJson, setUploadedJson] = React.useState<GeoData | null>(null)
  const [errorMessage, setErrorMessage] = React.useState("")
  const geodataMutation = useAddGeodata({
    onSuccess: () => {
      router.back()
    },
    onError: (error) => {
      setErrorMessage(error.message)
      modal.show()
    },
  })

  const MapView = React.useMemo(() => dynamic(
    () => import("@/components/MapView"),
    {
      loading: () => <p>Loading Map</p>,
      ssr: false,
    },
  ), [uploadedJson])

  const geojson = React.useMemo(() => {
    if (!uploadedJson) {
      return null
    }

    const featureCollection: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: uploadedJson.features.map((feature) => {
        return {
          type: "Feature",
          properties: feature.properties as GeoJSON.GeoJsonProperties,
          geometry: feature.geometry as GeoJSON.Geometry,
        }
      }),
    }

    return featureCollection
  }, [uploadedJson])

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
        const uploadedGeoJson = validateGeojson(result)
        setUploadedJson(uploadedGeoJson)
      } catch (error) {
        // @ts-ignore
        setErrorMessage(error.message)
        modal.show()
      }
    }

    reader.readAsText(file)
  }

  const save = () => {
    if (!uploadedJson) {
      return
    }

    geodataMutation.mutate({
      body: {
        ...uploadedJson,
        name: new Date().toISOString(),
        createdBy: "admin",
      },
    })
  }

  const clear = () => {
    setUploadedJson(null)
  }

  const cancel = () => {
    router.back()
  }

  return (
    <>
      <AuthorizedComponent>
        <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
          <main className="container mx-auto max-w-screen-lg h-full">
            <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
              <section className="overflow-auto p-8 w-full h-full flex flex-col">

                <header className="border-dashed border-2 border-gray-400 py-8 flex flex-col justify-center items-center">
                  <input type="file" accept="applications/JSON" onChangeCapture={onChangeCapture} />
                </header>

                {geojson ? (
                  <div className="mt-10 flex flex-grow flex-col h-full transition-all duration-150 ease-in md:ml-0">
                    <MapView data={geojson} />
                  </div>
                ) : (
                  <ul id="gallery" className="flex flex-1 mt-10">
                    <li id="empty" className="h-full w-full text-center flex flex-col justify-center items-center">
                      <span className="text-small text-gray-500">
                        Your geodata will be appear here
                      </span>
                    </li>
                  </ul>
                )}
              </section>

              <footer className="flex justify-end px-8 pb-8 space-x-4">
                <Button disabled={!uploadedJson} onClick={save}>Save</Button>
                <Button className="bg-red-300" onClick={clear}>Clear</Button>
                <Button className="bg-red-500" onClick={cancel}>Cancel</Button>
              </footer>
            </article>
          </main>
        </div>
      </AuthorizedComponent>
      <ErrorModal
        message={errorMessage}
        isOpen={modal.isOpen}
        onClose={modal.close}
      />
    </>
  )
}
