"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BookOpen,
  Code,
  Zap,
  Users,
  Shield,
  Globe,
  Cpu,
  Database,
  Cloud,
  Lock,
  Smartphone,
  BarChart3,
} from "lucide-react"

export function FeatureCards() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Documentation",
      description: "Detailed guides, tutorials, and API references to help you build faster",
      href: "/user-guide",
      badge: "Essential",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      icon: Code,
      title: "Developer Tools",
      description: "Powerful SDKs, CLI tools, and integrations for seamless development",
      href: "/api-reference",
      badge: "Popular",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for speed and scalability with modern architecture",
      href: "/examples/performance",
      badge: "Fast",
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in security features with compliance standards and best practices",
      href: "/user-guide/security",
      badge: "Secure",
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/30",
      borderColor: "border-red-200 dark:border-red-800",
    },
    {
      icon: Globe,
      title: "Global Deployment",
      description: "Deploy anywhere with multi-region support and CDN integration",
      href: "/user-guide/deployment",
      badge: "Scalable",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Active community with regular contributions and support",
      href: "/community",
      badge: "Active",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
  ]

  const capabilities = [
    {
      icon: Cpu,
      title: "High-Performance Computing",
      description: "Optimized algorithms and parallel processing capabilities",
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Advanced data processing and storage solutions",
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "Built for modern cloud infrastructure and containerization",
    },
    {
      icon: Lock,
      title: "Security First",
      description: "End-to-end encryption and security by design",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Responsive design and mobile-first approach",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Built-in analytics and monitoring capabilities",
    },
  ]

  return (
    <div className="space-y-16">
      {/* Main Features */}
      <div>
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-on-surface mb-4">Core Features</h3>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale your applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`card-elevated group hover:scale-105 transition-all duration-300 border-2 ${feature.borderColor} hover:shadow-large`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-base mb-4 leading-relaxed">{feature.description}</CardDescription>
                <Button variant="ghost" size="sm" asChild className="group/btn p-0 h-auto">
                  <Link href={feature.href} className="flex items-center text-primary hover:text-primary/80">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Capabilities Grid */}
      <div>
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-on-surface mb-4">Platform Capabilities</h3>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Powerful features designed for modern application development
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-outline-variant bg-surface hover:bg-surface-variant transition-all duration-200 hover:shadow-medium"
            >
              <capability.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-on-surface mb-2">{capability.title}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="glass border-2 border-primary/20 p-8 max-w-2xl mx-auto">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold text-on-surface mb-4">Ready to explore all features?</h3>
            <p className="text-on-surface-variant mb-6">
              Dive deeper into our comprehensive documentation and discover everything the platform has to offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="btn-primary" asChild>
                <Link href="/user-guide/getting-started">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/examples">
                  <Code className="w-4 h-4 mr-2" />
                  View Examples
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FeatureCards
