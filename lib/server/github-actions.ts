"use server"

import { publishToGitHub } from "@/lib/github"

interface Params {
  owner: string
  repo: string
  branch: string
  filepath: string
  markdown: string
  defaultBranch: string
}

export async function publishDoc(params: Params) {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error("GITHUB_TOKEN not configured on server")

  const result = await publishToGitHub({
    owner: params.owner,
    repo: params.repo,
    branch: params.branch,
    filepath: params.filepath,
    markdownContent: params.markdown,
    token,
    defaultBranch: params.defaultBranch,
  })
  return result
}
