"use client"

/**
 * Client-side utilities for documentation UI.
 * NOTE:  DO NOT import Node-only modules here.
 */

import { docsConfig } from "./docs-config"

export type DocStatus =
  | { status: "available"; available: true; message?: string }
  | { status: "beta"; available: true; message?: string }
  | { status: "coming-soon"; available: false; message: string }

/**
 * Returns the availability information for a documentation section.
 * The logic relies solely on the statically imported `docsConfig`,
 * so it is 100 % safe to run in the browser.
 */
export function getDocStatus(sectionId: string): DocStatus {
  const section = docsConfig.sections.find((s) => s.id === sectionId)

  // Default: coming soon
  if (!section) {
    return {
      status: "coming-soon",
      available: false,
      message: "Coming Soon",
    }
  }

  // Section object may contain a `status` field (optional)
  switch (section.status) {
    case "beta":
      return { status: "beta", available: true }
    case "coming-soon":
      return {
        status: "coming-soon",
        available: false,
        message: section.message ?? "Coming Soon",
      }
    default:
      // Treat everything else (or missing) as available
      return { status: "available", available: true }
  }
}
