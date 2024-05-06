import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function Page() {
  return (
    <SwaggerUI
      url="/api/openapi/v1/openapi.json"
      docExpansion="list"
      defaultModelsExpandDepth={0}
      defaultModelExpandDepth={1}
      displayOperationId
    />
  )
}
