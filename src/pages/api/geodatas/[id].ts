import type { NextApiRequest, NextApiResponse } from "next"
import { ApiResponseCreator } from "@/utils/apiResponse"
import ApiErrorFactory from "@/factories/apiErrorFactory"
import { GeoData } from "@/repositories/geodata/schema"
import { GeoDataModel } from "@/repositories/geodata/model"

const getData = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const responseCreator = new ApiResponseCreator<GeoData>()
  try {
    const id = req.query.id as string
    const geodata = await GeoDataModel.findGeodataById(id)
    const response = responseCreator.success(geodata)
    res.status(200).json(response)
  } catch (error) {
    const errorResponse = responseCreator.failed(ApiErrorFactory.serverError())
    res.status(500).json(errorResponse)
  }
}

const updateData = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const responseCreator = new ApiResponseCreator<GeoData>()
  try {
    const id = req.query.id as string
    const body = JSON.parse(req.body)
    const updateResult = await GeoDataModel.updateGeodata(id, body)
    const response = responseCreator.success(updateResult)
    res.status(200).json(response)
  } catch (error) {
    const errorResponse = responseCreator.failed(ApiErrorFactory.serverError())
    res.status(500).json(errorResponse)
  }
}

const deleteData = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const responseCreator = new ApiResponseCreator<GeoData>()
  try {
    const id = req.query.id as string
    const deleteResult = await GeoDataModel.deleteGeodata(id)
    const response = responseCreator.success(deleteResult)
    res.status(200).json(response)
  } catch (error) {
    const errorResponse = responseCreator.failed(ApiErrorFactory.serverError())
    res.status(500).json(errorResponse)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    await getData(req, res)
    return
  }

  if (req.method === "PUT") {
    await updateData(req, res)
    return
  }

  if (req.method === "DELETE") {
    await deleteData(req, res)
    return
  }

  const responseCreator = new ApiResponseCreator<GeoData>()
  const errorResponse = responseCreator.failed(ApiErrorFactory.notFoundError())
  res.status(404).json(errorResponse)
}
