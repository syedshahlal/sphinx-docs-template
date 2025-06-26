import type React from "react"
import { getDocsNavigation, type NavItem } from "@/lib/docs-navigation"
import { DocsNavigation } from "@/components/layout/DocsNavigation"
import { notFound } from "next/navigation"

async function getLayoutData(
  slug: string[] | undefined,
): Promise<{ navItems: NavItem[]; currentVersion: string; availableVersions: string[] }> {
  const currentVersion = slug && slug.length > 0 ? slug[0] : "gcp-5.7"
  const availableVersions = ["gcp-5.7", "gcp-5.6"] // Ideally, generate this list dynamically

  try {
    const navItems = await getDocsNavigation(currentVersion)
    // No explicit warning here if navItems is empty, DocsNavigation component can handle it
    return { navItems, currentVersion, availableVersions }
  } catch (error: any) {
    if (error.code === "ENOENT" && error.path?.includes(currentVersion)) {
      console.warn(`Directory for version ${currentVersion} not found at ${error.path}. Triggering 404.`)
      notFound()
    }
    console.error(`Critical error fetching navigation for version ${currentVersion}:`, error)
    notFound()
  }
}

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug?: string[] }
}) {
  const { navItems, currentVersion, availableVersions } = await getLayoutData(params.slug)

  return (
    <div className="flex flex-1 w-full">
      <DocsNavigation
        navItems={navItems}
        currentVersion={currentVersion}
        availableVersions={availableVersions}
        onVersionChange={(newVersion) => {
          const currentPathParts = params.slug?.slice(1) || []
          const newPath = `/docs/${newVersion}/${currentPathParts.join("/") || "index"}` // Default to 'index' or a known landing page for the version
          // It's generally better to use Next.js router for client-side navigation if possible,
          // but window.location.href works for a full reload to the new version's path.
          window.location.href = newPath
        }}
      />
      {/* Ensure this content div allows scrolling for the main content */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {" "}
        {/* Added overflow-y-auto */}
        <main className="py-6 px-4 md:px-8 lg:px-10 w-full mx-auto prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline">
          {children}
        </main>
      </div>
    </div>
  )
}
