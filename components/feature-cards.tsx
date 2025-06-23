"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, BookOpen, ExternalLink, GraduationCap, LayoutDashboard, Settings } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Feature = {
  icon: React.ElementType
  title: string
  description: string
  color: string
  gradient: string
  details: string[]
  href: string // NEW – destination docs page
  version: string // NEW – version badge text
}

const features: Feature[] = [
  {
    icon: BookOpen,
    title: "GCP Introduction",
    description: "Get started with Google Cloud Platform fundamentals and core concepts.",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20",
    details: ["Core Services", "Getting Started", "Best Practices", "Architecture Overview"],
    href: "/docs/gcp-introduction", // NEW
    version: "v1.0", // NEW
  },
  {
    icon: LayoutDashboard,
    title: "Compute Engine",
    description: "Virtual machines for compute-intensive workloads and scalable applications.",
    color: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500/20 to-yellow-500/20",
    details: ["VM Instances", "Autoscaling", "Networking", "Storage Options"],
    href: "/docs/compute-engine", // NEW
    version: "v2.1", // NEW
  },
  {
    icon: GraduationCap,
    title: "Kubernetes Engine",
    description: "Managed Kubernetes service for container orchestration and application deployment.",
    color: "text-teal-600 dark:text-teal-400",
    gradient: "from-teal-500/20 to-green-500/20",
    details: ["Cluster Management", "Container Deployment", "Service Discovery", "Scaling"],
    href: "/docs/kubernetes-engine", // NEW
    version: "v1.5", // NEW
  },
  {
    icon: Settings,
    title: "Cloud Storage",
    description: "Scalable and durable object storage for unstructured data and backups.",
    color: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20",
    details: ["Object Storage", "Data Lifecycle", "Access Control", "Integration"],
    href: "/docs/cloud-storage", // NEW
    version: "v3.0", // NEW
  },
]

export function FeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map(({ icon: Icon, title, description, color, gradient, details, href, version }, index) => (
        <a
          key={title}
          href={href}
          aria-label={title}
          className="group block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
        >
          <Card
            tabIndex={-1}
            className={`relative border border-border bg-card transition-all duration-500 overflow-hidden
              hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer
              ${hoveredCard === index ? "scale-105" : ""}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* BACKGROUND & BORDER */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-lg">
              <div className="w-full h-full bg-card rounded-lg" />
            </div>

            {/* HEADER */}
            <CardHeader className="relative z-10 pb-4">
              <CardTitle className="flex items-center justify-between text-lg group-hover:text-primary transition-colors">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                  <span>{title}</span>
                  {/* VERSION BADGE */}
                  <span className="ml-1 px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground border border-border">
                    {version}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </CardTitle>
            </CardHeader>

            {/* CONTENT */}
            <CardContent className="relative z-10">
              <p className="leading-relaxed text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                {description}
              </p>

              {/* DETAILS */}
              <div
                className={`space-y-2 transition-all duration-500 ${hoveredCard === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
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

              {/* CTA */}
              <div
                className={`mt-4 transition-all duration-500 ${hoveredCard === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <span className="inline-flex items-center gap-2 text-sm text-primary group-hover:text-primary/80 transition-colors">
                  Read Docs <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  )
}

export default FeatureCards
