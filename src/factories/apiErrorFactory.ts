class ApiErrorFactory {
  code?: number

  message: string = ""

  private constructor(message: string, code?: number) {
    this.code = code
    this.message = message
  }

  static notFoundError(): ApiErrorFactory {
    return new ApiErrorFactory(
      "Not found",
      404,
    )
  }

  static badRequestError(): ApiErrorFactory {
    return new ApiErrorFactory(
      "Bad request",
      400,
    )
  }

  static unauthorizedError(): ApiErrorFactory {
    return new ApiErrorFactory(
      "Unauthorized",
      401,
    )
  }

  static forbiddenError(): ApiErrorFactory {
    return new ApiErrorFactory(
      "Forbidden",
      403,
    )
  }

  static uknownError(): ApiErrorFactory {
    return new ApiErrorFactory(
      "Unknown error",
      500,
    )
  }

  static serverError(): ApiErrorFactory {
    return new ApiErrorFactory(
      "Internal server error",
      500,
    )
  }

  static customError(code: number, message: string): ApiErrorFactory {
    return new ApiErrorFactory(
      message,
      code,
    )
  }
}

export default ApiErrorFactory
