import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getApiEndpoints } from "@/lib/api-docs"

export default async function ApiDocsPage() {
  const endpoints = await getApiEndpoints()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <p className="text-muted-foreground">Explore available API endpoints and their documentation</p>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint) => (
          <Card key={`${endpoint.method}-${endpoint.path}`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    endpoint.method === "GET"
                      ? "default"
                      : endpoint.method === "POST"
                        ? "destructive"
                        : endpoint.method === "PUT"
                          ? "secondary"
                          : endpoint.method === "DELETE"
                            ? "outline"
                            : "default"
                  }
                >
                  {endpoint.method}
                </Badge>
                <CardTitle className="font-mono">{endpoint.path}</CardTitle>
              </div>
              <CardDescription>{endpoint.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Parameters</h4>
                    <div className="space-y-2">
                      {endpoint.parameters.map((param) => (
                        <div key={param.name} className="flex items-center gap-2">
                          <code className="bg-muted px-2 py-1 rounded text-sm">{param.name}</code>
                          <Badge variant="outline" className="text-xs">
                            {param.type}
                          </Badge>
                          {param.required && (
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Try it out
                  </Button>
                  {endpoint.docPath && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={`/docs/${endpoint.docPath}`}>View Documentation</a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
