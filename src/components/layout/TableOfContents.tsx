"use client"

import { useEffect, useState } from "react"
import type { ContentSection } from "../../types"

export function TableOfContents() {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    // Extract headings from the content
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const sectionData: ContentSection[] = []

    headings.forEach((heading, index) => {
      const id = heading.id || `section-${index}`
      if (!heading.id) {
        heading.id = id
      }

      sectionData.push({
        id,
        title: heading.textContent || "",
        level: Number.parseInt(heading.tagName.charAt(1)),
      })
    })

    setSections(sectionData)

    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  if (sections.length === 0) return null

  return (
    <div className="hidden xl:block">
      <div className="sticky top-20 w-64 p-4">
        <h4 className="mb-4 text-sm font-semibold">On This Page</h4>
        <nav className="space-y-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`block py-1 text-sm transition-colors hover:text-foreground ${
                activeSection === section.id ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
              style={{ paddingLeft: `${(section.level - 1) * 12}px` }}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
