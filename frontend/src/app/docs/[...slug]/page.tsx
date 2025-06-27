import { getDocData, getAllDocIds } from "@/lib/markdown"
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer"
import PageLayout from "@/components/layout/PageLayout" // Ensure this path is correct
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { slug: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const docData = await getDocData(params.slug)
    return {
      title: docData.title,
      description: docData.description || `Documentation for ${docData.title}`,
    }
  } catch (error) {
    return {
      title: "Document Not Found",
    }
  }
}

export default async function DocPage({ params }: Props) {
  let docData
  try {
    docData = await getDocData(params.slug)
  } catch (error) {
    console.error("Error fetching doc data:", error)
    notFound() // Triggers the not-found.tsx page or default Next.js 404
  }

  return (
    <PageLayout title={docData.title} date={docData.date}>
      <MarkdownRenderer contentHtml={docData.contentHtml} />
    </PageLayout>
  )
}

// This function is optional if you prefer fully dynamic rendering at request time.
// For static generation, it tells Next.js which paths to pre-render.
export async function generateStaticParams() {
  const paths = getAllDocIds()
  return paths.map((p) => ({ slug: p.params.slug }))
}
