import { Schema } from "mongoose"

export interface GeoData {
  _id: string
  name: string
  createdBy: string
  type: string
  features: {
    type: string
    properties: Record<string, unknown>
    geometry: {
      type:
        | "Point"
        | "LineString"
        | "Polygon"
        | "MultiPoint"
        | "MultiLineString"
        | "MultiPolygon"
        | "GeometryCollection"
      coordinates: number[] | number[][] | number[][][]
    }
  }[]
}

export const geoDataSchema = new Schema<GeoData>({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  type: { type: String, required: true },
  features: [new Schema({
    type: { type: String, required: true },
    properties: { type: Schema.Types.Map, required: true },
    geometry: {
      type: { type: String, required: true },
      coordinates: {
        type: [Schema.Types.Mixed],
        required: false,
      },
    },
  }),
  ],
})
