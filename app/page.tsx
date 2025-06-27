"use client"
import Link from "next/link"
import { Header } from "@/components/header"
import { SeeAlsoSection } from "@/components/see-also-section"
import { FeatureCards } from "@/components/feature-cards"
import { UserGuideSection } from "@/components/user-guide-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BookOpen,
  Code,
  Zap,
  Users,
  Star,
  GitBranch,
  Download,
  Play,
  CheckCircle,
  Sparkles,
  Rocket,
  Shield,
  Globe,
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Rocket,
      title: "Fast Setup",
      description: "Get started in minutes with our streamlined installation process",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in security features and compliance standards",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy anywhere with our distributed architecture",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ]

  const quickLinks = [
    { title: "Getting Started", href: "/user-guide/getting-started", icon: Play },
    { title: "API Reference", href: "/api-reference", icon: Code },
    { title: "Examples", href: "/examples", icon: Zap },
    { title: "Community", href: "/community", icon: Users },
  ]

  const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "GitHub Stars", value: "2.5K", icon: Star },
    { label: "Downloads", value: "50K+", icon: Download },
    { label: "Contributors", value: "100+", icon: GitBranch },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-variant">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Latest Release v5.7
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="gradient-text">GRA Core Platform</span>
              <br />
              <span className="text-on-surface">Documentation</span>
            </h1>

            <p className="text-xl sm:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-10 leading-relaxed">
              A comprehensive, modern platform built for the GRA community. Get started with our powerful tools and
              extensive documentation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="btn-primary text-lg px-8 py-4" asChild>
                <Link href="/user-guide/getting-started">
                  <Play className="w-5 h-5 mr-2" />
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent" asChild>
                <Link href="/api-reference">
                  <Code className="w-5 h-5 mr-2" />
                  API Reference
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-on-surface">{stat.value}</div>
                  <div className="text-sm text-on-surface-variant">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface-variant/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">Why Choose GRA Core Platform?</h2>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
              Built with modern technologies and best practices for enterprise-grade applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="card-elevated group hover:scale-105 transition-transform duration-200">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <FeatureCards />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">Quick Access</h2>
            <p className="text-xl text-on-surface-variant">Jump right into what you need</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.href} className="group">
                <Card className="card hover:card-elevated transition-all duration-200 h-full">
                  <CardContent className="p-6 text-center">
                    <link.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-on-surface mb-2">{link.title}</h3>
                    <ArrowRight className="w-4 h-4 text-on-surface-variant mx-auto group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* User Guide Preview */}
      <section className="py-20 bg-surface-variant/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <UserGuideSection />
        </div>
      </section>

      {/* Getting Started CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass border-2 border-primary/20 p-8 lg:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-on-surface-variant mb-8">
                Join thousands of developers building amazing applications with GRA Core Platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-primary text-lg px-8 py-4" asChild>
                  <Link href="/user-guide/getting-started">
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Building
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent" asChild>
                  <Link href="/examples">
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Examples
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* See Also Section */}
      <SeeAlsoSection />

      {/* Footer */}
      <footer className="bg-surface-variant border-t border-outline-variant py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-on-surface-variant">© 2024 GRA Core Platform. Built with ❤️ for the community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
