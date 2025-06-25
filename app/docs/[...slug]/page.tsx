import { notFound } from "next/navigation"
import { getDocumentBySlug, getDocumentationStructure } from "@/lib/docs"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { DocNavigation } from "@/components/doc-navigation"
import { TableOfContents } from "@/components/table-of-contents"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const docs = await getDocumentationStructure()
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }))
}

export default async function DocPage({ params }: DocPageProps) {
  const slug = params.slug.join("/")
  const doc = await getDocumentBySlug(slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <DocNavigation currentSlug={slug} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{doc.title}</h1>
              {doc.description && <p className="text-lg text-muted-foreground">{doc.description}</p>}
              {doc.lastModified && (
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(doc.lastModified).toLocaleDateString()}
                </p>
              )}
            </div>
            <MarkdownRenderer content={doc.content} />
          </article>
        </div>

        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <TableOfContents content={doc.content} />
        </div>
      </div>
    </div>
  )
}
