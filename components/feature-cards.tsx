"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, BookOpen, ExternalLink, Users, Code, Layers, GitBranch, Server } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { docsConfig, getFullDocUrl } from "@/lib/docs-config"
import { handleDocClick, getDocStatus } from "@/lib/docs-utils"

type Feature = {
  icon: React.ElementType
  title: string
  description: string
  color: string
  gradient: string
  details: string[]
  sectionId: string
  href: string
}

const iconMap = {
  BookOpen,
  Users,
  Code,
  Layers,
  GitBranch,
  Server,
}

// Generate features from documentation configuration
const features: Feature[] = docsConfig.sections.map((section, index) => {
  const icons = [BookOpen, Users, Code, Layers, GitBranch, Server]
  const colors = [
    "text-blue-600 dark:text-blue-400",
    "text-green-600 dark:text-green-400",
    "text-purple-600 dark:text-purple-400",
    "text-orange-600 dark:text-orange-400",
    "text-teal-600 dark:text-teal-400",
    "text-indigo-600 dark:text-indigo-400",
  ]

  return {
    icon: icons[index % icons.length],
    title: section.title,
    description: section.description,
    color: colors[index % colors.length],
    gradient: section.gradient,
    details: section.topics,
    sectionId: section.id,
    href: getFullDocUrl(section.path),
  }
})

export function FeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const handleCardClick = async (sectionId: string, href: string, event: React.MouseEvent) => {
    event.preventDefault()

    const status = getDocStatus(sectionId)
    if (!status.available) {
      alert(status.message || "Documentation not available")
      return
    }

    await handleDocClick(sectionId, {
      openInNewTab: true,
      trackClick: true,
      fallbackUrl: href,
    })
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              GRA Core Platform Documentation
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive documentation and guides to help you master GRA Core Platform with our enterprise-grade tools
            and workflows.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map(({ icon: Icon, title, description, color, gradient, details, sectionId, href }, index) => {
            const status = getDocStatus(sectionId)

            return (
              <div
                key={title}
                onClick={(e) => handleCardClick(sectionId, href, e)}
                className="group block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl cursor-pointer"
              >
                <Card
                  tabIndex={-1}
                  className={`relative border border-border bg-card transition-all duration-500 overflow-hidden h-full
                    hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3 cursor-pointer
                    ${hoveredCard === index ? "scale-[1.02]" : ""}
                    ${!status.available ? "opacity-75" : ""}`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Status Badge */}
                  {status.status !== "available" && (
                    <div className="absolute top-4 right-4 z-20">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          status.status === "beta"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {status.status === "beta" ? "Beta" : "Coming Soon"}
                      </span>
                    </div>
                  )}

                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Animated Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-xl">
                    <div className="w-full h-full bg-card rounded-xl" />
                  </div>

                  {/* Shimmer Effect */}
                  <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                      animation: hoveredCard === index ? "shimmer 1.5s ease-in-out" : "none",
                    }}
                  />

                  {/* Header */}
                  <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="flex items-center justify-between text-xl group-hover:text-primary transition-colors">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <Icon className={`h-7 w-7 ${color}`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">{title}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </CardTitle>
                  </CardHeader>

                  {/* Content */}
                  <CardContent className="relative z-10 pt-0">
                    <p className="leading-relaxed text-muted-foreground mb-6 group-hover:text-foreground transition-colors">
                      {description}
                    </p>

                    {/* Feature Details */}
                    <div
                      className={`space-y-3 transition-all duration-500 ${
                        hoveredCard === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <div className="border-t border-border pt-4">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Key Topics:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient.replace("/20", "")}`} />
                              <span className="group-hover:text-foreground transition-colors">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div
                      className={`mt-6 transition-all duration-500 ${
                        hoveredCard === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                          {status.available ? "View Documentation" : status.message}
                          {status.available && <ExternalLink className="w-3 h-3" />}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                          <div
                            className="w-1 h-1 bg-primary rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-1 h-1 bg-primary rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-xl overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${gradient.replace("/20", "")} transition-all duration-700 ease-out`}
                      style={{ width: hoveredCard === index ? "100%" : "0%" }}
                    />
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full border border-primary/20">
            <span className="text-sm font-medium text-foreground">Need help getting started?</span>
            <button
              onClick={(e) =>
                handleCardClick("getting-started", "/docs/_build/html/v5.7/getting-started/quickstart.html", e)
              }
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Quick Start Guide <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe Animation for Shimmer Effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  )
}

export default FeatureCards
