import { NextResponse } from "next/server"
import { getDocsNavigation } from "@/lib/docs-navigation"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const version = searchParams.get("version") || "v5.7"
  const nav = getDocsNavigation(version)
  return NextResponse.json({ nav })
}
