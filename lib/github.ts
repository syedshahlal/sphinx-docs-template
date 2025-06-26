"use server" // Marking as server action for security if token was not NEXT_PUBLIC_

import { Octokit } from "@octokit/rest"

interface GitHubParams {
  owner: string
  repo: string
  token: string
}

interface PublishParams extends GitHubParams {
  branch: string
  filepath: string
  markdownContent: string
  defaultBranch: string
  commitMessage?: string
}

interface BranchInfo {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

// IMPORTANT SECURITY NOTE:
// Using NEXT_PUBLIC_GITHUB_TOKEN on the client-side for write operations is highly insecure.
// This token will be exposed in the browser.
// For production, this logic MUST be moved to a dedicated API route or Server Action
// that uses a securely stored GitHub token (e.g., from server environment variables, not prefixed with NEXT_PUBLIC_).
// The functions below are structured to work with a token passed in,
// assuming this will be refactored for server-side execution.

export async function getBranches({ owner, repo, token }: GitHubParams): Promise<BranchInfo[]> {
  const octokit = new Octokit({ auth: token })
  try {
    const { data } = await octokit.repos.listBranches({ owner, repo, per_page: 100 })
    return data
  } catch (error) {
    console.error("Error fetching branches:", error)
    throw new Error("Could not fetch branches from GitHub.")
  }
}

export async function publishToGitHub({
  owner,
  repo,
  branch,
  filepath,
  markdownContent,
  token,
  defaultBranch,
  commitMessage = `docs: update ${filepath}`,
}: PublishParams) {
  const octokit = new Octokit({ auth: token })

  const targetBranch = branch
  let branchExists = false
  let baseSha: string | undefined

  // 1. Check if branch exists, create if not
  try {
    await octokit.repos.getBranch({ owner, repo, branch: targetBranch })
    branchExists = true
  } catch (error: any) {
    if (error.status === 404) {
      // Branch does not exist
      // Get default branch SHA to create new branch from
      const { data: defaultBranchData } = await octokit.repos.getBranch({
        owner,
        repo,
        branch: defaultBranch,
      })
      baseSha = defaultBranchData.commit.sha

      await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${targetBranch}`,
        sha: baseSha,
      })
      branchExists = true // Now it exists
    } else {
      console.error("Error checking branch:", error)
      throw new Error(`Could not verify or create branch '${targetBranch}'.`)
    }
  }

  // 2. Create or update file content
  let fileSha: string | undefined
  try {
    // Check if file exists to get its SHA (required for update)
    const { data: existingFileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: filepath,
      ref: targetBranch,
    })
    if (!Array.isArray(existingFileData) && existingFileData.type === "file") {
      fileSha = existingFileData.sha
    }
  } catch (error: any) {
    if (error.status !== 404) {
      // Ignore 404 (file not found), means it's a new file
      console.error("Error checking existing file:", error)
      throw new Error(`Could not check file '${filepath}' on branch '${targetBranch}'.`)
    }
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filepath,
    message: commitMessage,
    content: Buffer.from(markdownContent).toString("base64"),
    branch: targetBranch,
    sha: fileSha, // Undefined if new file
  })

  // 3. Open PR to default branch if a new/different branch was used
  if (targetBranch !== defaultBranch) {
    try {
      const { data: pr } = await octokit.pulls.create({
        owner,
        repo,
        title: commitMessage,
        head: targetBranch,
        base: defaultBranch,
        body: `Automated PR for changes to ${filepath} on branch ${targetBranch}. Please review and merge.`,
        maintainer_can_modify: true,
      })
      return { success: true, prUrl: pr.html_url, branch: targetBranch }
    } catch (error: any) {
      // If PR already exists, it might throw an error. Check for this.
      if (error.errors && error.errors.some((e: any) => e.message.includes("A pull request already exists"))) {
        console.warn(`Pull request from ${targetBranch} to ${defaultBranch} likely already exists.`)
        // Try to find existing PR
        const { data: existingPRs } = await octokit.pulls.list({
          owner,
          repo,
          head: `${owner}:${targetBranch}`,
          base: defaultBranch,
          state: "open",
        })
        if (existingPRs.length > 0) {
          return {
            success: true,
            prUrl: existingPRs[0].html_url,
            branch: targetBranch,
            message: "Pull request already exists.",
          }
        }
        return {
          success: true,
          branch: targetBranch,
          message: "Content published. PR might already exist or could not be created.",
        }
      }
      console.error("Error creating pull request:", error)
      throw new Error(`Content published to '${targetBranch}', but failed to create Pull Request.`)
    }
  }

  return { success: true, branch: targetBranch, message: `Content published to default branch: ${targetBranch}` }
}
