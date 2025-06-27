import { NextResponse } from "next/server"
import { staticNav } from "@/lib/static-nav"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const version = searchParams.get("version") ?? "v5.7"
  const nav = staticNav[version] ?? []
  return NextResponse.json(nav)
}
