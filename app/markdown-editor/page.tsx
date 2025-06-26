"use client"

import { Banner } from "@/components/banner"
import { Header } from "@/components/header"
import { useTheme } from "next-themes"
import { BlockNoteView, useBlockNote } from "@blocknote/react"
import "@/styles/blocknote-custom.css"
// Ensure "@blocknote/core/style.css" is linked in app/layout.tsx or globals.css, not imported here as a module

export default function MarkdownEditorPage() {
  const { theme } = useTheme()

  const editor = useBlockNote({
    initialContent: [
      {
        type: "heading",
        props: { level: 1 },
        content: "Untitled Document",
      },
      {
        type: "paragraph",
        content: "Start writing here…",
      },
    ],
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Banner />
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl border rounded-md shadow-sm dark:border-neutral-700">
          {editor ? (
            <BlockNoteView
              editor={editor}
              theme={theme === "dark" ? "dark" : "light"}
              className="min-h-[70vh] max-h-[80vh] overflow-y-auto"
            />
          ) : (
            <div>Loading editor...</div>
          )}
        </div>
      </main>
    </div>
  )
}
