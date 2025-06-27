import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// In a real project you would call the GitHub REST API with a server-side token.
// For the preview build we just return demo data.
export async function GET() {
  return NextResponse.json({ branches: ["main", "develop", "docs"] })
}
