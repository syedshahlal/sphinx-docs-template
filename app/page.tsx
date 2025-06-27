"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FeatureCards } from "@/components/feature-cards"
import { UserGuideSection } from "@/components/user-guide-section"
import { SeeAlsoSection } from "@/components/see-also-section"
import {
  ArrowRight,
  BookOpen,
  Code,
  Zap,
  Shield,
  Users,
  Rocket,
  Star,
  GitBranch,
  Download,
  Play,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "API Calls/Month", value: "1M+", icon: Zap },
    { label: "Uptime", value: "99.9%", icon: CheckCircle },
    { label: "GitHub Stars", value: "2.5K+", icon: Star },
  ]

  const quickLinks = [
    {
      title: "Quick Start Guide",
      description: "Get up and running in 5 minutes",
      href: "/user-guide/getting-started",
      icon: Rocket,
      color: "bg-blue-500",
    },
    {
      title: "API Documentation",
      description: "Complete API reference and examples",
      href: "/api-reference",
      icon: Code,
      color: "bg-green-500",
    },
    {
      title: "Examples & Tutorials",
      description: "Learn with hands-on examples",
      href: "/examples",
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      title: "Security Guide",
      description: "Best practices for secure implementation",
      href: "/user-guide/security",
      icon: Shield,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="flex justify-center">
              <Badge variant="secondary" className="glass px-4 py-2 text-sm font-medium shadow-themed">
                <GitBranch className="w-4 h-4 mr-2" />
                Version 5.7 - Latest Release
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                GRA Core Platform
                <span className="block text-primary">Documentation</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive documentation for building, deploying, and scaling applications with the GRA Core Platform
                ecosystem.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium shadow-themed-lg interactive"
                asChild
              >
                <Link href="/user-guide/getting-started">
                  <Play className="w-5 h-5 mr-2" />
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 text-lg font-medium shadow-themed interactive bg-transparent"
                asChild
              >
                <Link href="/api-reference">
                  <Code className="w-5 h-5 mr-2" />
                  View API Docs
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass rounded-lg p-6 text-center shadow-themed interactive animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Navigation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jump straight to what you need with our organized documentation sections
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card
                key={link.title}
                className="glass-strong hover:shadow-themed-lg transition-all duration-300 interactive animate-slide-up border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-3`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-card-foreground">{link.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">{link.description}</CardDescription>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10"
                    asChild
                  >
                    <Link href={link.href}>
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful capabilities that make GRA Core Platform the choice for modern applications
            </p>
          </div>
          <FeatureCards />
        </div>
      </section>

      {/* User Guide Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UserGuideSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-2xl p-12 shadow-themed-xl">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers building amazing applications with GRA Core Platform. Start your journey
              today with our comprehensive documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 shadow-themed-lg interactive"
                asChild
              >
                <Link href="/user-guide/getting-started">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Building
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 shadow-themed interactive bg-transparent"
                asChild
              >
                <Link href="/examples">
                  <Download className="w-5 h-5 mr-2" />
                  Download Examples
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* See Also Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SeeAlsoSection />
        </div>
      </section>
    </div>
  )
}
