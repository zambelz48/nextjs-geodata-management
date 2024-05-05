import React from "react"
import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { useGetGeodatas } from "@/repositories/geodata/hooks"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { GeoData } from "@/repositories/geodata/schema"

export default function Page() {
  const router = useRouter()
  const geodataQuery = useGetGeodatas()
  const [selectedMap, setSelectedMap] = React.useState<GeoData | null>(null)

  React.useEffect(() => {
    if (geodataQuery.data?.data) {
      setSelectedMap(geodataQuery.data.data[0])
    }
  }, [geodataQuery.data])

  const geojson = React.useMemo(() => {
    if (!selectedMap) {
      return null
    }

    const featureCollection: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: selectedMap.features.map((feature) => {
        return {
          type: "Feature",
          properties: feature.properties as GeoJSON.GeoJsonProperties,
          geometry: feature.geometry as GeoJSON.Geometry
        }
      })
    }

    return featureCollection
  }, [selectedMap])

  const MapView = React.useMemo(() => dynamic(
    () => import("@/components/MapView"),
    {
      loading: () => <p>Loading Map</p>,
      ssr: false
    }
  ), [selectedMap])

  const activeColor = (id: string) => {
    if (selectedMap?._id === id) {
      return "bg-gray-200"
    }
    return ""
  }

  return (
    <Container>
      <div className="flex min-h-screen flex-row">
        <aside className="w-full sm:w-60">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-semibold uppercase dark:text-gray-600">
              Geodata List
            </h2>
            <Button onClick={() => router.push("/geodata/form")}>
              Add
            </Button>
          </div>
          <nav className="space-y-8 text-sm">
            <div className="space-y-2 w-full">
              <div className="flex flex-col space-y-2">
                {geodataQuery.data?.data && geodataQuery.data.data.map((geodata) => (
                  <div key={geodata._id}
                    className={`border-b-2 border-gray-100 cursor-pointer hover:bg-gray-300 ${activeColor(geodata._id)}`}
                    onClick={() => setSelectedMap(geodata)}
                  >
                    <p>{geodata.name}</p>
                    <p>{geodata.createdBy}</p>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </aside>
        <main className="main -ml-48 flex flex-grow flex-col px-4 transition-all duration-150 ease-in md:ml-0">
          {geojson && (
            <MapView data={geojson} />
          )}
        </main>
      </div>
    </Container>
  )
}
