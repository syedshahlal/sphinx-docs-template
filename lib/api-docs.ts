export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  description: string
  parameters?: {
    name: string
    type: string
    required: boolean
    description: string
  }[]
  docPath?: string
}

export async function getApiEndpoints(): Promise<ApiEndpoint[]> {
  // This would typically read from your API routes or OpenAPI spec
  // For now, we'll return some example endpoints
  return [
    {
      method: "GET",
      path: "/api/docs",
      description: "Get all documentation items",
      parameters: [
        {
          name: "category",
          type: "string",
          required: false,
          description: "Filter by category",
        },
      ],
      docPath: "api/docs-endpoint",
    },
    {
      method: "GET",
      path: "/api/docs/{slug}",
      description: "Get a specific documentation item",
      parameters: [
        {
          name: "slug",
          type: "string",
          required: true,
          description: "The document slug",
        },
      ],
      docPath: "api/single-doc-endpoint",
    },
    {
      method: "POST",
      path: "/api/docs",
      description: "Create a new documentation item",
      parameters: [
        {
          name: "title",
          type: "string",
          required: true,
          description: "Document title",
        },
        {
          name: "content",
          type: "string",
          required: true,
          description: "Document content in markdown",
        },
      ],
      docPath: "api/create-doc-endpoint",
    },
  ]
}
