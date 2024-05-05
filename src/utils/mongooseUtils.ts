import mongoose from "mongoose"
import { MONGODB_URI } from "@/configs/env"

export const createMongooseModel = <E, M>(
  modelName: string,
  schema: mongoose.Schema<E>,
) => {
  return (
    (mongoose.models[modelName] as M) ?? mongoose.model<E, M>(modelName, schema)
  )
}

export const mongooseExecutor = async <T>(fn: () => Promise<T>): Promise<T> => {
  if (MONGODB_URI === "") {
    return Promise.reject(new Error("MONGODB_URI is not defined"))
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI)
    }

    return fn()
  } catch (error) {
    return Promise.reject(error)
  }
}
