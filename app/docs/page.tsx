import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Folder } from "lucide-react"
import Link from "next/link"
import { getDocumentationStructure } from "@/lib/docs"

export default async function DocsPage() {
  const docStructure = await getDocumentationStructure()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Documentation</h1>
        <p className="text-muted-foreground">Browse all available documentation sections</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docStructure.map((doc) => (
          <Card key={doc.slug} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                {doc.type === "folder" ? <Folder className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                <CardTitle className="text-lg">{doc.title}</CardTitle>
              </div>
              {doc.description && <CardDescription>{doc.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {doc.lastModified ? new Date(doc.lastModified).toLocaleDateString() : "No date"}
                </span>
                <Button asChild>
                  <Link href={`/docs/${doc.slug}`}>Read</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {docStructure.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Documentation Found</h3>
            <p className="text-muted-foreground mb-4">
              Create your first documentation file in the <code className="bg-muted px-2 py-1 rounded">docu</code>{" "}
              folder
            </p>
            <Button variant="outline" asChild>
              <Link href="/docs/getting-started">View Setup Guide</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
