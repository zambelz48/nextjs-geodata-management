import { Model } from "mongoose"
import { createMongooseModel, mongooseExecutor } from "@/utils/mongooseUtils"
import { GeoData, geoDataSchema } from "./schema"

const modelName = "geodata"

interface GeoDataModelInterface extends Model<GeoData> {
  findGeodatas: () => Promise<GeoData[]>
  findGeodataById: (id: string) => Promise<GeoData>
  updateGeodata: (id: string, data: GeoData) => Promise<GeoData>
  deleteGeodata: (id: string) => Promise<GeoData>
}

geoDataSchema.statics.findGeodatas = async function findGeodatas() {
  return mongooseExecutor(() => this.find({}))
}

geoDataSchema.statics.findGeodataById = async function findGeodataById(id: string) {
  return mongooseExecutor(() => this.findOne({ _id: id }))
}

geoDataSchema.statics.updateGeodata = async function updateGeodata(id: string, data: GeoData) {
  return mongooseExecutor(() => this.updateOne(
    { _id: id },
    {
      type: data.type,
      features: data.features,
    },
  ))
}

geoDataSchema.statics.deleteGeodata = async function deleteGeodata(id: string) {
  return mongooseExecutor(() => this.deleteOne({ _id: id }))
}

const GeoDataModel = createMongooseModel<GeoData, GeoDataModelInterface>(modelName, geoDataSchema)

export { GeoDataModel }
