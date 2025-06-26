import { docsConfig, getFullDocUrl } from "./docs-config"

export interface DocLinkOptions {
  openInNewTab?: boolean
  trackClick?: boolean
  fallbackUrl?: string
}

/**
 * Create a proper link to documentation with fallback handling
 */
export const createDocLink = (sectionId: string, options: DocLinkOptions = {}): string => {
  const { fallbackUrl = "#" } = options

  const section = docsConfig.sections.find((s) => s.id === sectionId)
  if (!section) {
    console.warn(`Documentation section '${sectionId}' not found`)
    return fallbackUrl
  }

  return getFullDocUrl(section.path)
}

/**
 * Check if documentation file exists (client-side)
 */
export const checkDocExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: "HEAD" })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Handle documentation link click with analytics and fallback
 */
export const handleDocClick = async (sectionId: string, options: DocLinkOptions = {}) => {
  const { openInNewTab = true, trackClick = true, fallbackUrl } = options

  const link = createDocLink(sectionId, { fallbackUrl })

  // Track click if analytics is available
  if (trackClick && typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "doc_click", {
      section_id: sectionId,
      doc_path: link,
    })
  }

  // Check if doc exists before navigating
  const exists = await checkDocExists(link)
  if (!exists && fallbackUrl) {
    console.warn(`Documentation not found: ${link}, using fallback`)
    window.open(fallbackUrl, openInNewTab ? "_blank" : "_self")
    return
  }

  // Navigate to documentation
  if (openInNewTab) {
    window.open(link, "_blank", "noopener,noreferrer")
  } else {
    window.location.href = link
  }
}

/**
 * Get documentation status for UI display
 */
export const getDocStatus = (
  sectionId: string,
): {
  available: boolean
  status: string
  message?: string
} => {
  const section = docsConfig.sections.find((s) => s.id === sectionId)

  if (!section) {
    return {
      available: false,
      status: "not-found",
      message: "Documentation section not configured",
    }
  }

  switch (section.status) {
    case "available":
      return { available: true, status: "available" }
    case "coming-soon":
      return {
        available: false,
        status: "coming-soon",
        message: "Documentation coming soon",
      }
    case "beta":
      return {
        available: true,
        status: "beta",
        message: "Beta documentation - may contain incomplete information",
      }
    default:
      return { available: false, status: "unknown" }
  }
}
