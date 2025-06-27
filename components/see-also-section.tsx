import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const links = [
  {
    title: "Getting Started",
    description: "Begin your journey with our platform.",
    href: "/user-guide/getting-started",
  },
  {
    title: "API Reference",
    description: "Explore the full capabilities of our API.",
    href: "/api-reference",
  },
  {
    title: "Changelog",
    description: "See what's new and improved.",
    href: "/changelog",
  },
]

export function SeeAlsoSection() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">See Also</h2>
      <div className="grid gap-8 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Card
            key={link.title}
            className="group hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-colors"
          >
            <CardHeader>
              <CardTitle>{link.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{link.description}</p>
              <Link href={link.href} className="font-semibold text-blue-600 dark:text-blue-400 flex items-center">
                Read more
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
