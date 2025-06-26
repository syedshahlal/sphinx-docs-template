// API service for communicating with backend/Sphinx
export class DocsApiService {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  async getContent(path: string) {
    try {
      const response = await fetch(`${this.baseUrl}/content${path}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching content:", error)
      throw error
    }
  }

  async searchDocs(query: string) {
    try {
      const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error searching docs:", error)
      throw error
    }
  }
}

export const docsApi = new DocsApiService()
