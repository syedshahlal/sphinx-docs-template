import type React from "react"
import { getDocsNavigation, type NavItem } from "@/lib/docs-navigation"
import { DocsNavigation } from "@/components/layout/DocsNavigation"
import { notFound } from "next/navigation"

async function getLayoutData(
  slug: string[] | undefined,
): Promise<{ navItems: NavItem[]; currentVersion: string; availableVersions: string[] }> {
  const currentVersion = slug && slug.length > 0 ? slug[0] : "gcp-5.7" // Fallback to a default version
  const availableVersions = ["gcp-5.7", "gcp-5.6"] // Example, ideally dynamically generated

  try {
    const navItems = await getDocsNavigation(currentVersion)
    if (navItems.length === 0 && currentVersion) {
      console.warn(
        `No navigation items found for version: ${currentVersion}. Content might be missing or path incorrect.`,
      )
    }
    return { navItems, currentVersion, availableVersions }
  } catch (error: any) {
    // Check if the error is due to the version directory not found
    if (error.code === "ENOENT" && error.path?.includes(currentVersion)) {
      console.warn(`Directory for version ${currentVersion} not found.`)
      notFound() // Trigger 404 if version directory doesn't exist
    }
    console.error(`Critical error fetching navigation for version ${currentVersion}:`, error)
    notFound() // Or throw error to be caught by error boundary
  }
}

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug?: string[] }
}) {
  if (!params.slug || params.slug.length === 0) {
    // Handle /docs root: redirect to a default version/page or show a specific landing page
    // For example: import { redirect } from 'next/navigation'; redirect('/docs/gcp-5.7/introduction');
    // For now, we let getLayoutData use its default, but a redirect is often better.
  }

  const { navItems, currentVersion, availableVersions } = await getLayoutData(params.slug)

  return (
    <div className="flex flex-1 w-full">
      <DocsNavigation
        navItems={navItems}
        currentVersion={currentVersion}
        availableVersions={availableVersions}
        onVersionChange={(newVersion) => {
          // Basic client-side redirect. For robust solution, consider Next.js router if available in Server Component context,
          // or a full page reload.
          const currentPathParts = params.slug?.slice(1) || []
          const newPath = `/docs/${newVersion}/${currentPathParts.join("/") || "index"}`
          window.location.href = newPath
          console.log("Version change requested to:", newVersion, "New path:", newPath)
        }}
      />
      <div className="flex-1 min-w-0">
        {" "}
        {/* min-w-0 is important for flex children to shrink properly */}
        <main className="py-6 px-4 md:px-8 lg:px-10 w-full mx-auto prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline">
          {children}
        </main>
      </div>
    </div>
  )
}
