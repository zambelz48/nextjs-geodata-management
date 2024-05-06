import { generateOpenApi } from "@ts-rest/open-api"
import { contract } from "./contract"

export const openApiContract = generateOpenApi(
  contract,
  {
    info: {
      title: "Geodata API",
      version: "1.0.0",
      description: "API for geodata",
    },
  },
)
