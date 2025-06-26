import type React from "react"
import { getDocsNavigation, type NavItem } from "@/lib/docs-navigation"
import { DocsNavigation } from "@/components/layout/DocsNavigation"
import { notFound } from "next/navigation"

async function getLayoutData(
  slug: string[] | undefined,
): Promise<{ navItems: NavItem[]; currentVersion: string; availableVersions: string[] }> {
  // For now, assume version is the first part of the slug.
  // Or implement a more robust version detection (e.g., from a global config or URL pattern)
  const currentVersion = slug && slug.length > 0 ? slug[0] : "gcp-5.7" // Fallback to a default version

  // TODO: Dynamically list available versions by scanning `frontend/content/docs`
  const availableVersions = ["gcp-5.7", "gcp-5.6"] // Example

  try {
    const navItems = await getDocsNavigation(currentVersion)
    if (navItems.length === 0 && currentVersion) {
      // This could mean the version directory exists but is empty or unreadable in a way that yields no nav.
      // Or the version itself is invalid.
      console.warn(
        `No navigation items found for version: ${currentVersion}. Content might be missing or path incorrect.`,
      )
      // Depending on strictness, you might call notFound() here if nav is essential.
    }
    return { navItems, currentVersion, availableVersions }
  } catch (error) {
    console.error(`Critical error fetching navigation for version ${currentVersion}:`, error)
    // If getDocsNavigation throws for a critical reason (not just ENOENT for a bad version),
    // it might be appropriate to signal an error page.
    notFound() // Or throw error to be caught by error boundary
  }
}

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug?: string[] } // slug can be undefined for /docs root if you have such a page
}) {
  // If params.slug is undefined (e.g. accessing /docs directly without a version/page)
  // you might want to redirect to a default version/page or show a landing page.
  // For now, getLayoutData has a fallback.
  if (!params.slug || params.slug.length === 0) {
    // Handle case for /docs root if necessary, e.g. redirect or show a specific page
    // For now, let getLayoutData use its default version.
    // Or redirect: import { redirect } from 'next/navigation'; redirect('/docs/gcp-5.7/your-default-page');
  }

  const { navItems, currentVersion, availableVersions } = await getLayoutData(params.slug)

  return (
    // This div is a child of RootLayout's <main>
    // It establishes the flex container for the sidebar and the content
    <div className="flex flex-1 w-full">
      <DocsNavigation
        navItems={navItems}
        currentVersion={currentVersion}
        availableVersions={availableVersions}
        onVersionChange={(newVersion) => {
          // This would typically involve router.push to the new version's equivalent page
          console.log("Version change requested to:", newVersion)
          // Example: window.location.href = `/docs/${newVersion}/${params.slug?.slice(1).join('/') || 'introduction'}`;
        }}
      />
      <div className="flex-1 min-w-0">
        {" "}
        {/* min-w-0 is important for flex children to shrink properly */}
        <main className="py-6 px-4 md:px-8 lg:px-10 w-full mx-auto prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline">
          {/* Content from [..slug]/page.tsx will be rendered here */}
          {children}
        </main>
      </div>
    </div>
  )
}
