import type { NextApiRequest, NextApiResponse } from "next"
import { openApiContract } from "../../../../../docs/openApi"

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(openApiContract)
}
