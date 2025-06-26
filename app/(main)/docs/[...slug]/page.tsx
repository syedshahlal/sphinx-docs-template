import { Breadcrumb } from "@/components/docs/Breadcrumb"
import { InfoPanel } from "@/components/docs/InfoPanel"
import { WarningPanel } from "@/components/docs/WarningPanel"
import { TiptapEditor } from "@/components/docs/TiptapEditor"
import { Github } from "lucide-react"
import Link from "next/link"

export default function DocsPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug || []

  return (
    <div className="space-y-6">
      <Breadcrumb path={slug} />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold capitalize">
          {slug.length > 0 ? slug[slug.length - 1].replace(/-/g, " ") : "Docs"}
        </h1>
        <Link
          href={`https://github.com/your-repo/edit/main/docs/${slug.join("/")}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
        >
          <Github className="w-4 h-4" />
          Edit on GitHub
        </Link>
      </div>
      <InfoPanel title="Good to know">
        This is an informational panel to highlight key details. You can use it for tips, notes, or other important
        information.
      </InfoPanel>
      <TiptapEditor />
      <WarningPanel title="Heads up!">
        This is a warning panel. Use it to call out potential issues, breaking changes, or deprecations.
      </WarningPanel>
    </div>
  )
}
