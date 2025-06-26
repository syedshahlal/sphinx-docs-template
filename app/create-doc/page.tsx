"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateDocDialog } from "@/components/create-doc/create-doc-dialog"
import { PlusCircle } from "lucide-react"

export default function CreateDocPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePublishSuccess = (filePath: string) => {
    console.log(`Document published successfully: ${filePath}`)
    // Optionally, redirect or show a success message on the page
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Document</h1>
        <p className="text-muted-foreground mt-1">
          Use the visual editor to craft your documentation and publish it directly to GitHub.
        </p>
      </header>

      <section className="flex flex-col items-center justify-center text-center bg-card dark:bg-neutral-800 p-12 rounded-lg border dark:border-neutral-700 shadow-sm">
        <PlusCircle className="w-16 h-16 text-primary mb-6" strokeWidth={1.5} />
        <h2 className="text-2xl font-semibold mb-3 text-foreground">Start a New Document</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Click the button below to open the rich text editor and begin creating your content. You'll be able to format
          text, add images, tables, code blocks, and more.
        </p>
        <Button size="lg" onClick={() => setIsDialogOpen(true)}>
          Open Editor
        </Button>
      </section>

      <CreateDocDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onPublishSuccess={handlePublishSuccess} />

      {/* Placeholder for future: list of recently created documents or templates */}
      {/* <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Documents</h2>
        <p className="text-muted-foreground">Your recently created documents will appear here.</p>
      </section> */}
    </div>
  )
}
