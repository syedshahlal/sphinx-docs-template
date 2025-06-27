"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Code,
  Zap,
  Users,
  ArrowRight,
  ExternalLink,
  FileText,
  Settings,
  HelpCircle,
  Lightbulb,
} from "lucide-react"

interface SeeAlsoItem {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  external?: boolean
}

const seeAlsoItems: SeeAlsoItem[] = [
  {
    title: "Getting Started Guide",
    description: "Complete walkthrough for new users to get up and running quickly",
    href: "/user-guide/getting-started",
    icon: BookOpen,
    badge: "Essential",
  },
  {
    title: "API Reference",
    description: "Comprehensive documentation of all available endpoints and methods",
    href: "/api-reference",
    icon: Code,
    badge: "Technical",
  },
  {
    title: "Examples & Tutorials",
    description: "Practical examples and step-by-step tutorials for common use cases",
    href: "/examples",
    icon: Zap,
    badge: "Popular",
  },
  {
    title: "Community Forum",
    description: "Connect with other developers, ask questions, and share knowledge",
    href: "/community",
    icon: Users,
    badge: "Community",
  },
  {
    title: "Configuration Guide",
    description: "Learn how to configure and customize the platform for your needs",
    href: "/user-guide/configuration",
    icon: Settings,
  },
  {
    title: "Best Practices",
    description: "Industry best practices and recommended patterns for development",
    href: "/user-guide/best-practices",
    icon: Lightbulb,
  },
  {
    title: "Troubleshooting",
    description: "Common issues and their solutions to help you resolve problems quickly",
    href: "/user-guide/troubleshooting",
    icon: HelpCircle,
  },
  {
    title: "Changelog",
    description: "Stay updated with the latest features, improvements, and bug fixes",
    href: "/changelog",
    icon: FileText,
    badge: "Updated",
  },
]

export function SeeAlsoSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 p-8 md:p-12">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="flex-shrink-0 p-3 bg-green-500/10 dark:bg-green-400/10 rounded-xl border border-green-200/50 dark:border-green-700/50">
            <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">See Also</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Explore related documentation and resources to enhance your understanding
            </p>
          </div>
        </div>

        {/* Grid of Related Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {seeAlsoItems.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-200 border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                    <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {item.title}
                      </h3>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {item.external && <ExternalLink className="w-3 h-3 text-gray-400" />}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>
                  </div>
                </div>
                <Link href={item.href} className="block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between h-8 text-xs group-hover:bg-green-50 dark:group-hover:bg-green-900/20 group-hover:text-green-600 dark:group-hover:text-green-400"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Need more help?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Join our community or contact support for personalized assistance
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <Link href="/community">
                  <Users className="w-4 h-4 mr-2" />
                  Community
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/support">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Named export for compatibility
export { SeeAlsoSection as default }
