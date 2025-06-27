import { NextResponse } from "next/server"
import { staticNav } from "@/lib/static-nav"

export const dynamic = "force-dynamic" // tell Next.js not to prerender

export async function GET() {
  return NextResponse.json({ nav: staticNav })
}
