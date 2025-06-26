import { type NextRequest, NextResponse } from "next/server"

interface PublishRequest {
  repository: string
  branch: string
  path: string
  filename: string
  content: string
  commitMessage: string
  createPR: boolean
  prTitle?: string
  prDescription?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: PublishRequest = await request.json()

    // Validate required fields
    if (!body.repository || !body.content || !body.filename) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get Bitbucket credentials from environment
    const bitbucketUsername = process.env.BITBUCKET_USERNAME
    const bitbucketAppPassword = process.env.BITBUCKET_APP_PASSWORD

    if (!bitbucketUsername || !bitbucketAppPassword) {
      return NextResponse.json({ error: "Bitbucket credentials not configured" }, { status: 500 })
    }

    const auth = Buffer.from(`${bitbucketUsername}:${bitbucketAppPassword}`).toString("base64")
    const baseUrl = `https://api.bitbucket.org/2.0/repositories/${body.repository}`

    // Create or update file
    const filePath = `${body.path}${body.filename}`.replace(/\/+/g, "/")
    const fileUrl = `${baseUrl}/src/${body.branch}/${filePath}`

    // First, try to get the current file to check if it exists
    let existingFile = null
    try {
      const getResponse = await fetch(fileUrl, {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        },
      })
      if (getResponse.ok) {
        existingFile = await getResponse.json()
      }
    } catch (error) {
      // File doesn't exist, which is fine
    }

    // Create or update the file
    const commitUrl = `${baseUrl}/src`
    const formData = new FormData()
    formData.append("message", body.commitMessage)
    formData.append("branch", body.branch)
    formData.append(filePath, body.content)

    const commitResponse = await fetch(commitUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      body: formData,
    })

    if (!commitResponse.ok) {
      const errorText = await commitResponse.text()
      throw new Error(`Failed to commit file: ${errorText}`)
    }

    const commitResult = await commitResponse.json()

    // Create pull request if requested
    let prResult = null
    if (body.createPR && body.branch !== "main" && body.branch !== "master") {
      const prUrl = `${baseUrl}/pullrequests`
      const prData = {
        title: body.prTitle || `Update ${body.filename}`,
        description: body.prDescription || `Automated update of ${body.filename}`,
        source: {
          branch: {
            name: body.branch,
          },
        },
        destination: {
          branch: {
            name: "main", // or 'master', depending on the repo
          },
        },
      }

      const prResponse = await fetch(prUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prData),
      })

      if (prResponse.ok) {
        prResult = await prResponse.json()
      }
    }

    return NextResponse.json({
      success: true,
      commit: commitResult,
      pullRequest: prResult,
      fileUrl: `https://bitbucket.org/${body.repository}/src/${body.branch}/${filePath}`,
    })
  } catch (error) {
    console.error("Bitbucket publish error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 },
    )
  }
}
