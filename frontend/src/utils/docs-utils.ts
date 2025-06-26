import { docsConfig } from "./docs-config"

export interface DocClickOptions {
  openInNewTab?: boolean
  trackClick?: boolean
  fallbackUrl?: string
}

export function getDocStatus(sectionId: string) {
  const section = docsConfig.sections.find((s) => s.id === sectionId)

  if (!section) {
    return {
      available: false,
      status: "not-found" as const,
      message: "Documentation section not found",
    }
  }

  switch (section.status) {
    case "available":
      return {
        available: true,
        status: section.status,
        message: "Available",
      }
    case "beta":
      return {
        available: true,
        status: section.status,
        message: "Beta - May contain incomplete information",
      }
    case "coming-soon":
      return {
        available: false,
        status: section.status,
        message: "Coming Soon - Documentation in development",
      }
    default:
      return {
        available: false,
        status: "unknown" as const,
        message: "Status unknown",
      }
  }
}

export async function handleDocClick(sectionId: string, options: DocClickOptions = {}): Promise<void> {
  const { openInNewTab = false, trackClick = false, fallbackUrl } = options

  const section = docsConfig.sections.find((s) => s.id === sectionId)
  const status = getDocStatus(sectionId)

  if (trackClick) {
    // Track the click event (implement your analytics here)
    console.log(`Doc click tracked: ${sectionId}`)
  }

  if (!status.available) {
    console.warn(`Documentation not available: ${status.message}`)
    return
  }

  const url = section ? `${docsConfig.baseUrl}${section.path}` : fallbackUrl

  if (!url) {
    console.error("No URL available for navigation")
    return
  }

  if (openInNewTab) {
    window.open(url, "_blank", "noopener,noreferrer")
  } else {
    window.location.href = url
  }
}
