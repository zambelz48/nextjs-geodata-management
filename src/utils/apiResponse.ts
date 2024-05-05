import ApiErrorFactory from "@/factories/apiErrorFactory"

export interface ApiResponse<Data> {
  data?: Data | null
  error?: ApiErrorFactory | null
}

export class ApiResponseCreator<Data> {
  error?: unknown

  data?: Data

  success(data: Data): ApiResponse<Data> {
    return {
      data,
      error: null,
    }
  }

  failed(error: ApiErrorFactory): ApiResponse<Data> {
    return {
      data: null,
      error,
    }
  }
}
