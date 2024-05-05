import type { NextApiRequest, NextApiResponse } from "next"
import { ApiResponseCreator } from "@/utils/apiResponse"
import ApiErrorFactory from "@/factories/apiErrorFactory"
import { GeoData } from "@/repositories/geodata/schema"
import { GeoDataModel } from "@/repositories/geodata/model"

const getList = async (
  _: NextApiRequest,
  res: NextApiResponse,
) => {
  const responseCreator = new ApiResponseCreator<GeoData[]>()
  try {
    const geodatas = await GeoDataModel.findGeodatas()
    const response = responseCreator.success(geodatas)
    res.status(200).json(response)
  } catch (error) {
    const errorResponse = responseCreator.failed(ApiErrorFactory.serverError())
    res.status(500).json(errorResponse)
  }
}

const addNew = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const responseCreator = new ApiResponseCreator<GeoData>()
  try {
    const body = JSON.parse(req.body) as GeoData
    const geodata = new GeoDataModel(body)
    const saveResult = await geodata.save()
    const response = responseCreator.success(saveResult)
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
    await getList(req, res)
    return
  }

  if (req.method === "POST") {
    await addNew(req, res)
    return
  }

  const responseCreator = new ApiResponseCreator<GeoData>()
  const errorResponse = responseCreator.failed(ApiErrorFactory.notFoundError())
  res.status(404).json(errorResponse)
}
