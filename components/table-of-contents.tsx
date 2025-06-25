"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TableOfContentsProps {
  content: string
}

interface TocItem {
  id: string
  title: string
  level: number
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const headings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const title = match[2].trim()
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

      headings.push({ id, title, level })
    }

    setToc(headings)
  }, [content])

  if (toc.length === 0) return null

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-1">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm hover:text-primary transition-colors ${
                item.level === 1 ? "font-medium" : item.level === 2 ? "pl-3" : item.level === 3 ? "pl-6" : "pl-9"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
