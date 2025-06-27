import { NextResponse } from "next/server"
import { buildNav } from "@/lib/server/docs-utils"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const version = searchParams.get("version") ?? "v5.7"
  try {
    const nav = await buildNav(version)
    return NextResponse.json(nav)
  } catch (error) {
    console.error(`Failed to build nav for version ${version}:`, error)
    return NextResponse.json({ error: "Failed to build navigation from file system." }, { status: 500 })
  }
}
