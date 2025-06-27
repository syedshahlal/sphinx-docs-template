"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  BookOpen,
  Code,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Search,
  Star,
  GitBranch,
  Clock,
  CheckCircle,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function HomePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Star className="w-3 h-3 mr-1" />
              Now Available: v5.8 Beta
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            GRA Core Platform
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A comprehensive, modern platform built for the GRA community. Streamline your workflows with powerful APIs,
            real-time analytics, and enterprise-grade security.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/user-guide/getting-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <Link href="/api-reference">
                View API Docs
                <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Quick Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-background border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Everything you need to build amazing applications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From rapid prototyping to enterprise deployment, GRA Core Platform provides the tools and services you
              need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Lightning Fast</CardTitle>
                <CardDescription className="text-muted-foreground">
                  40% performance improvement with optimized data pipelines and enhanced caching
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Enterprise Security</CardTitle>
                <CardDescription className="text-muted-foreground">
                  AES-256 encryption, MFA support, and advanced threat detection built-in
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Developer First</CardTitle>
                <CardDescription className="text-muted-foreground">
                  GraphQL API, TypeScript SDK, and comprehensive documentation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Real-time Analytics</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Monitor performance, track KPIs, and get insights with live dashboards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Team Collaboration</CardTitle>
                <CardDescription className="text-muted-foreground">
                  RBAC, team workspaces, and integrated communication tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Cloud Native</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Kubernetes-ready with Helm charts, auto-scaling, and service mesh support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Version Highlights */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What's New in v5.8 Beta</h2>
            <p className="text-lg text-muted-foreground">Explore the latest features and improvements</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Enhanced Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  40% faster query processing
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Redis Cluster support for caching
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Improved memory management
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  New APIs & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  GraphQL API with subscriptions
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  WebSocket real-time events
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  Enhanced TypeScript SDK
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <Link href="/docs/gcp-5.8">
                Explore v5.8 Beta Documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Popular Resources</h2>
            <p className="text-lg text-muted-foreground">Jump right into the most commonly used documentation</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border bg-card hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">Getting Started</CardTitle>
                <CardDescription className="text-muted-foreground">Quick setup and first steps</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
                  <Link href="/user-guide/getting-started" className="text-primary hover:text-primary/80">
                    Start here →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">API Reference</CardTitle>
                <CardDescription className="text-muted-foreground">Complete API documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
                  <Link href="/api-reference" className="text-primary hover:text-primary/80">
                    View APIs →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">Examples</CardTitle>
                <CardDescription className="text-muted-foreground">Code samples and tutorials</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
                  <Link href="/examples" className="text-primary hover:text-primary/80">
                    Browse examples →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">Migration Guide</CardTitle>
                <CardDescription className="text-muted-foreground">Upgrade from previous versions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
                  <Link href="/docs/gcp-5.8/migration-guides" className="text-primary hover:text-primary/80">
                    Learn more →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of developers building with GRA Core Platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/user-guide/getting-started">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <Link href="/create-doc">
                Create Documentation
                <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
