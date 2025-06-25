import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Folder, Zap } from "lucide-react"
import NextLink from "next/link"
import { getDocumentationStructure } from "@/lib/docs"

export default async function HomePage() {
  const docStructure = await getDocumentationStructure()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Documentation Hub</h1>
        <p className="text-xl text-muted-foreground mb-8">Create, manage, and integrate your documentation with ease</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <NextLink href="/docs">Browse Documentation</NextLink>
          </Button>
          <Button variant="outline" asChild>
            <NextLink href="/api-docs">API Reference</NextLink>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 mb-2" />
            <CardTitle>Markdown Support</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Write documentation in Markdown with full syntax support</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Folder className="h-8 w-8 mb-2" />
            <CardTitle>File-based</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Organize docs in folders with automatic navigation generation</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Folder className="h-8 w-8 mb-2" />
            <CardTitle>API Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Link documentation to API endpoints with live examples</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 mb-2" />
            <CardTitle>Live Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Real-time updates when documentation files change</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Documentation Overview */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Available Documentation</CardTitle>
            <CardDescription>{docStructure.length} documentation sections available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {docStructure.slice(0, 5).map((doc) => (
                <div key={doc.slug} className="flex items-center justify-between p-2 rounded border">
                  <span className="font-medium">{doc.title}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <NextLink href={`/docs/${doc.slug}`}>View</NextLink>
                  </Button>
                </div>
              ))}
              {docStructure.length > 5 && (
                <Button variant="outline" className="w-full" asChild>
                  <NextLink href="/docs">View All Documentation</NextLink>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and utilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <NextLink href="/docs/getting-started">
                <FileText className="mr-2 h-4 w-4" />
                Getting Started Guide
              </NextLink>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <NextLink href="/api-docs">
                <Folder className="mr-2 h-4 w-4" />
                API Documentation
              </NextLink>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <NextLink href="/search">
                <Zap className="mr-2 h-4 w-4" />
                Search Documentation
              </NextLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
