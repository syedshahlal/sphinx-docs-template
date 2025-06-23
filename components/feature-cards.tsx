"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Smartphone, Palette, Code, Database, ImageIcon, ArrowRight, ExternalLink } from "lucide-react"

type Feature = {
  icon: React.ElementType
  title: string
  description: string
  color: string
  gradient: string
  details: string[]
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Built with Modern Stack",
    description: "Use Next.js, React, and TypeScript functionality in your platform.",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20",
    details: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Platform sections will adapt and scale at different screen sizes.",
    color: "text-green-600 dark:text-green-400",
    gradient: "from-green-500/20 to-emerald-500/20",
    details: ["Mobile First", "Tablet Optimized", "Desktop Ready", "4K Support"],
  },
  {
    icon: Palette,
    title: "Light / Dark Theme",
    description: "Users can toggle between light and dark themes interactively.",
    color: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20",
    details: ["Auto Detection", "Manual Toggle", "System Sync", "Custom Themes"],
  },
  {
    icon: Code,
    title: "Customizable UI",
    description: "Customize colors and branding with CSS variables, and build custom UIs.",
    color: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500/20 to-red-500/20",
    details: ["CSS Variables", "Component Library", "Design Tokens", "Brand Kit"],
  },
  {
    icon: Database,
    title: "Data & Analytics",
    description: "Full support for data visualization, analytics dashboards, and real-time processing.",
    color: "text-teal-600 dark:text-teal-400",
    gradient: "from-teal-500/20 to-blue-500/20",
    details: ["Real-time Data", "Custom Charts", "Export Tools", "API Integration"],
  },
  {
    icon: ImageIcon,
    title: "Example Gallery",
    description: "See our showcase of projects that use this platform.",
    color: "text-pink-600 dark:text-pink-400",
    gradient: "from-pink-500/20 to-rose-500/20",
    details: ["Live Demos", "Source Code", "Tutorials", "Best Practices"],
  },
]

export function FeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern, scalable applications with confidence
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, color, gradient, details }, index) => (
            <Card
              key={title}
              className={`group relative border border-border bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                hoveredCard === index ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-lg">
                <div className="w-full h-full bg-card rounded-lg" />
              </div>

              <CardHeader className="relative z-10 pb-4">
                <CardTitle className="flex items-center justify-between text-lg group-hover:text-primary transition-colors">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-6 w-6 ${color}`} />
                    </div>
                    <span>{title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="leading-relaxed text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                  {description}
                </p>

                {/* Feature Details */}
                <div
                  className={`space-y-2 transition-all duration-500 ${
                    hoveredCard === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="border-t border-border pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Learn More Button */}
                <div
                  className={`mt-4 transition-all duration-500 ${
                    hoveredCard === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    Learn More
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
            <span className="flex items-center gap-2">
              Explore All Features
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeatureCards
