import fs from "fs/promises"
import path from "path"

export interface CollectedFile {
  filePath: string // full absolute path
  repoPath: string // path relative to repo root (what we commit)
  content: Buffer // file bytes
}

const SKIP_DIRS = new Set([
  "public/images", // big binary assets we don't commit
  ".next",
  "node_modules",
])

async function collectFiles(dir: string, base = dir): Promise<CollectedFile[]> {
  const files: CollectedFile[] = []
  let entries: fs.Dirent[]

  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch (err) {
    console.warn(`collectFiles: cannot read ${dir}:`, err)
    return files
  }

  for (const entry of entries) {
    const absPath = path.join(dir, entry.name)
    const relPath = path.relative(base, absPath).replace(/\\/g, "/")

    // Skip any directory that matches our block-list
    if (SKIP_DIRS.has(relPath.split("/")[0])) continue

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absPath, base)))
    } else if (entry.isFile()) {
      try {
        const content = await fs.readFile(absPath)
        files.push({ filePath: absPath, repoPath: relPath, content })
      } catch (err) {
        // EISDIR or other I/O issues – log & keep going
        console.warn(`collectFiles: could not read ${absPath}:`, err)
      }
    }
  }

  return files
}
