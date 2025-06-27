import { NextResponse } from "next/server"
import { buildNav } from "@/lib/docs-utils"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const version = searchParams.get("version") ?? "v5.7"
  const nav = await buildNav(version)
  return NextResponse.json(nav)
}
