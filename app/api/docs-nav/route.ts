import { NextResponse } from "next/server"
import { staticNav } from "@/lib/static-nav"

/**
 * GET /api/docs-nav?version=v5.7
 * Returns the navigation tree for the requested docs version.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const version = searchParams.get("version") ?? "v5.7"

  // Always return an array (may be empty) so the client never 500s
  const nav = staticNav[version] ?? []

  return NextResponse.json(nav)
}
