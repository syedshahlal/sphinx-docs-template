"use client" // Required for useEffect and PrismJS client-side highlighting

import { useEffect } from "react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css" // Choose a Prism theme
// Import languages you need
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-python"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-markdown"

// Import custom Markdown styles
import "@/styles/markdown.css" // Ensure this path is correct

type Props = {
  contentHtml: string
}

export default function MarkdownRenderer({ contentHtml }: Props) {
  useEffect(() => {
    Prism.highlightAll()
  }, [contentHtml])

  return (
    <article
      className="prose lg:prose-xl max-w-none dark:prose-invert" // Tailwind Typography classes
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}
