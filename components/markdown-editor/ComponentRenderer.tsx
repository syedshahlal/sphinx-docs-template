"use client"

import type { MarkdownComponent } from "./EditorContext"
import type { JSX } from "react"

interface ComponentRendererProps {
  component: MarkdownComponent
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  switch (component.type) {
    case "heading":
      const HeadingTag = `h${component.content.level}` as keyof JSX.IntrinsicElements
      return <HeadingTag className="font-bold">{component.content.text}</HeadingTag>

    case "paragraph":
      return <p className="text-foreground leading-relaxed">{component.content.text}</p>

    case "image":
      return (
        <div className="text-center">
          <img
            src={component.content.src || "/placeholder.svg"}
            alt={component.content.alt}
            className="max-w-full h-auto rounded-lg border border-border"
          />
          {component.content.caption && (
            <p className="text-sm text-muted-foreground mt-2">{component.content.caption}</p>
          )}
        </div>
      )

    case "code":
      return (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-mono">{component.content.language}</span>
          </div>
          <pre className="text-sm overflow-x-auto">
            <code>{component.content.code}</code>
          </pre>
        </div>
      )

    case "button":
      return (
        <div className="flex justify-center">
          <button className="btn-primary">{component.content.text}</button>
        </div>
      )

    case "card":
      return (
        <div className="card-base p-6">
          <h3 className="text-lg font-semibold mb-2">{component.content.title}</h3>
          <p className="text-muted-foreground">{component.content.description}</p>
        </div>
      )

    case "grid":
      return (
        <div className="grid grid-cols-2 gap-4">
          {component.content.items.map((item: any, index: number) => (
            <div key={index} className="card-base p-4">
              {item.text}
            </div>
          ))}
        </div>
      )

    case "divider":
      return <hr className="border-border my-4" />

    case "list":
      const ListTag = component.content.ordered ? "ol" : "ul"
      return (
        <ListTag className={component.content.ordered ? "list-decimal list-inside" : "list-disc list-inside"}>
          {component.content.items.map((item: any, index: number) => (
            <li key={index} className="mb-1">
              {item.text}
            </li>
          ))}
        </ListTag>
      )

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          {component.content.text}
        </blockquote>
      )

    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr>
                {component.content.headers.map((header: string, index: number) => (
                  <th key={index} className="border border-border p-2 bg-muted font-semibold text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {component.content.rows.map((row: string[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex} className="border border-border p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    default:
      return (
        <div className="p-4 bg-muted rounded-lg text-center text-muted-foreground">
          Unknown component type: {component.type}
        </div>
      )
  }
}
