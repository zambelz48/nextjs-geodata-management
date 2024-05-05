import { GeoData, GeometryType } from "@/repositories/geodata/schema"

const is2DArray = (value: any): value is number[][] => {
  try {
    return Array.isArray(value[0])
  } catch {
    return false
  }
}

const is3DArray = (value: any): value is number[][][] => {
  try {
    return Array.isArray(value[0][0])
  } catch {
    return false
  }
}

const isValidGeometryType = (type: string): type is GeometryType => {
  const geometryTypes = [
    "Point",
    "MultiPoint",
    "LineString",
    "MultiLineString",
    "Polygon",
    "MultiPolygon"
  ]
  return geometryTypes.indexOf(type) !== -1
}

const validateFeatureType = (type: unknown) => {
  if (!type) {
    throw new Error("Invalid GeoJSON: missing 'type' key in feature")
  }

  if (type !== "Feature") {
    throw new Error("Invalid GeoJSON: 'type' key in feature is not 'Feature'")
  }
}

const validateFeatureProperties = (properties: unknown) => {
  if (!properties) {
    throw new Error("Invalid GeoJSON: missing 'properties' key in feature")
  }

  if (typeof properties !== "object") {
    throw new Error("Invalid GeoJSON: 'properties' key in feature is not object")
  }
}

const validateGeometry = (geometry: unknown) => {
  if (!geometry) {
    throw new Error("Invalid GeoJSON: missing 'geometry' key in feature")
  }

  if (typeof geometry !== "object") {
    throw new Error("Invalid GeoJSON: 'geometry' key in feature is not object")
  }
}

const validateGeometryType = (type: unknown) => {
  if (!type) {
    throw new Error("Invalid GeoJSON: missing 'type' key in geometry")
  }

  if (!isValidGeometryType(type as string)) {
    throw new Error("Invalid GeoJSON: invalid 'type' key in geometry")
  }
}

const validateGeometryCoordinates = (type: GeometryType, coordinates: unknown) => {
  if (!coordinates) {
    throw new Error("Invalid GeoJSON: missing 'coordinates' key in geometry")
  }

  if (!Array.isArray(coordinates)) {
    throw new Error("Invalid GeoJSON: 'coordinates' key in geometry is not an array")
  }

  if (type === "LineString" && !is2DArray(coordinates)) {
    throw new Error("Invalid GeoJSON: 'coordinates' key in geometry is not 2D array")
  }

  if (type === "Polygon" && !is3DArray(coordinates)) {
    throw new Error("Invalid GeoJSON: 'coordinates' key in geometry is not 3D array")
  }
}

const parseGeojson = (input: string) => {
  try {
    return JSON.parse(input)
  } catch (error) {
    throw new Error("Invalid GeoJSON")
  }
}

export const validateGeojson = (input: string): GeoData => {
  try {
    const geoJson = parseGeojson(input)

    if (!geoJson["type"]) {
      throw new Error("Invalid GeoJSON: missing 'type' key")
    }

    if (!geoJson["features"]) {
      throw new Error("Invalid GeoJSON: missing 'features' key")
    }

    if (!Array.isArray(geoJson["features"])) {
      throw new Error("Invalid GeoJSON: 'features' is not an array")
    }

    for (const feature of geoJson["features"]) {
      validateFeatureType(feature["type"])
      validateFeatureProperties(feature["properties"])
      validateGeometry(feature["geometry"])
      validateGeometryType(feature["geometry"]["type"])
      validateGeometryCoordinates(
        feature["geometry"]["type"],
        feature["geometry"]["coordinates"]
      )
    }

    return geoJson as GeoData
  } catch (error) {
    throw error
  }
}
