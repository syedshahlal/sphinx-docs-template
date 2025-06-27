"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Simple “See Also” call-out that suggests other parts of the docs.
 * – No needless left/right spacing (full-width radial background)
 * – No `bg-slate-300` container – that wrapper has been removed
 * – Light/Dark-mode aware colours
 */
const links = [
  {
    href: "/user-guide/getting-started",
    title: "Getting Started",
    desc: "Set up the GRA Core Platform in minutes.",
    icon: "🚀",
    color: "bg-green-500/10 text-green-600 dark:text-green-300",
    border: "border-green-200/50 dark:border-green-700/50",
  },
  {
    href: "/examples",
    title: "Examples",
    desc: "Real-world templates and code samples.",
    icon: "💻",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
    border: "border-blue-200/50 dark:border-blue-700/50",
  },
  {
    href: "/api-reference",
    title: "API Reference",
    desc: "Every endpoint, parameter and response.",
    icon: "📚",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-300",
    border: "border-purple-200/50 dark:border-purple-700/50",
  },
]

export default function SeeAlsoSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Decorative radial gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            See&nbsp;Also
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Keep exploring the documentation with these resources.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {links.map(({ href, title, desc, icon, color, border }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-shadow hover:shadow-lg",
                color,
                border,
              )}
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-700 dark:text-slate-300">{desc}</p>

              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
