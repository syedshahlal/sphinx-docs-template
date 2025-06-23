"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, BookOpen, ExternalLink, Users, Code, Layers, GitBranch, Server } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Feature = {
  icon: React.ElementType
  title: string
  description: string
  color: string
  gradient: string
  details: string[]
  href: string
  version: string
}

const features: Feature[] = [
  {
    icon: BookOpen,
    title: "GCP Introduction",
    description: "Get started with Google Cloud Platform fundamentals and core concepts.",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20",
    details: ["Core Services", "Getting Started", "Best Practices", "Architecture Overview"],
    href: "/docs/gcp-introduction",
    version: "v1.0",
  },
  {
    icon: Users,
    title: "User Onboarding",
    description: "Complete guide to onboard new users and set up their GCP environment.",
    color: "text-green-600 dark:text-green-400",
    gradient: "from-green-500/20 to-emerald-500/20",
    details: ["Account Setup", "Permissions", "First Project", "Team Management"],
    href: "/docs/user-onboarding",
    version: "v2.0",
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Comprehensive API documentation with examples and authentication guides.",
    color: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20",
    details: ["REST APIs", "Authentication", "SDKs", "Rate Limits"],
    href: "/docs/api-reference",
    version: "v3.1",
  },
  {
    icon: Layers,
    title: "GCP Features in Depth",
    description: "Deep dive into advanced GCP features and enterprise-level capabilities.",
    color: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500/20 to-red-500/20",
    details: ["Advanced Compute", "AI/ML Services", "Data Analytics", "Security Features"],
    href: "/docs/gcp-features-depth",
    version: "v1.8",
  },
  {
    icon: GitBranch,
    title: "Sample Workflow",
    description: "Real-world workflows and implementation patterns for common use cases.",
    color: "text-teal-600 dark:text-teal-400",
    gradient: "from-teal-500/20 to-cyan-500/20",
    details: ["CI/CD Pipelines", "Data Processing", "Web Applications", "Microservices"],
    href: "/docs/sample-workflow",
    version: "v2.3",
  },
  {
    icon: Server,
    title: "GCP Infra",
    description: "Infrastructure as Code, networking, and deployment strategies on GCP.",
    color: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-500/20 to-blue-500/20",
    details: ["Terraform", "Networking", "Load Balancing", "Monitoring"],
    href: "/docs/gcp-infrastructure",
    version: "v1.5",
  },
]

export function FeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

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
            Comprehensive documentation and guides to Global Risk Analytics Core Platform
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map(({ icon: Icon, title, description, color, gradient, details, href, version }, index) => (
            <a
              key={title}
              href={href}
              aria-label={title}
              className="group block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
            >
              <Card
                tabIndex={-1}
                className={`relative border border-border bg-card transition-all duration-500 overflow-hidden h-full
                  hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3 cursor-pointer
                  ${hoveredCard === index ? "scale-[1.02]" : ""}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
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
                        {/* Version Badge */}
                        <span className="mt-1 px-2 py-0.5 rounded-full text-xs border border-border w-fit bg-gray-100 text-slate-900">
                          {version}
                        </span>
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
                      <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
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
                        Explore Documentation <ExternalLink className="w-3 h-3" />
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
            </a>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full border border-primary/20">
            <span className="text-sm font-medium text-foreground">Need help getting started?</span>
            <a
              href="/docs/quick-start"
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Quick Start Guide <ArrowRight className="w-3 h-3" />
            </a>
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
