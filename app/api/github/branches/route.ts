"use server"

import { Octokit } from "@octokit/rest"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const owner = searchParams.get("owner") ?? ""
  const repo = searchParams.get("repo") ?? ""
  const token = process.env.GITHUB_TOKEN

  if (!token) return new Response("GitHub token missing", { status: 500 })
  try {
    const octokit = new Octokit({ auth: token })
    const { data } = await octokit.repos.listBranches({ owner, repo, per_page: 100 })
    const branchNames = data.map((b) => b.name)
    return Response.json(branchNames, { status: 200 })
  } catch (err: any) {
    return new Response("Failed to fetch branches", { status: 500 })
  }
}
