"use client"

import { Banner } from "@/components/banner"
import { Header } from "@/components/header"
import { useTheme } from "next-themes"
import { useBlockNote } from "@blocknote/react"
import BlockNoteView from "@blocknote/react"
import "@/styles/blocknote-custom.css"

export default function MarkdownEditorPage() {
  const { theme } = useTheme()

  // Create a BlockNote editor instance.
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

      {/* Editor area */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl border rounded-md shadow-sm dark:border-neutral-700">
          <BlockNoteView
            editor={editor}
            theme={theme === "dark" ? "dark" : "light"}
            className="min-h-[70vh] max-h-[80vh] overflow-y-auto"
          />
        </div>
      </main>
    </div>
  )
}
