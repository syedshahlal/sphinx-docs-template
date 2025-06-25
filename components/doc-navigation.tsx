import Link from "next/link"
import { getDocumentationStructure } from "@/lib/docs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Folder } from "lucide-react"

interface DocNavigationProps {
  currentSlug: string
}

export async function DocNavigation({ currentSlug }: DocNavigationProps) {
  const docs = await getDocumentationStructure()

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className={`flex items-center gap-2 p-2 rounded text-sm hover:bg-muted transition-colors ${
                currentSlug === doc.slug ? "bg-muted font-medium" : ""
              }`}
            >
              {doc.type === "folder" ? <Folder className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              {doc.title}
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
