"use client"

import { useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Code,
  Zap,
  Shield,
  BarChart3,
  Users,
  Star,
  ChevronRight,
  Play,
  Download,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "High Performance",
      description: "Process millions of records per second with our optimized data pipeline architecture.",
      details:
        "Built on modern microservices architecture with auto-scaling capabilities and intelligent load balancing.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-grade security with comprehensive audit trails and compliance features.",
      details: "Zero-trust security model with end-to-end encryption, role-based access control, and SOX compliance.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Get insights from your data as it flows through the platform with live dashboards.",
      details: "Advanced analytics engine with machine learning capabilities and predictive modeling.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Developer Friendly",
      description: "Comprehensive APIs, SDKs, and documentation for rapid integration.",
      details: "RESTful APIs, GraphQL support, and SDKs for Python, Java, JavaScript, and .NET.",
    },
  ]

  const quickStartSteps = [
    {
      step: "1",
      title: "Install Platform",
      description: "Get up and running in minutes with Docker Compose",
      code: "docker-compose up -d",
    },
    {
      step: "2",
      title: "Create Pipeline",
      description: "Build your first data processing pipeline",
      code: "gra pipeline create --name my-pipeline",
    },
    {
      step: "3",
      title: "Deploy & Monitor",
      description: "Deploy to production and monitor performance",
      code: "gra deploy --env production",
    },
  ]

  const stats = [
    { label: "Data Processed Daily", value: "10+ TB", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Active Pipelines", value: "500+", icon: <Zap className="h-5 w-5" /> },
    { label: "Uptime", value: "99.9%", icon: <Shield className="h-5 w-5" /> },
    { label: "Global Users", value: "1,000+", icon: <Users className="h-5 w-5" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/30">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2"
              >
                <Star className="mr-2 h-4 w-4" />
                Now Available: GRA Core Platform v5.8 Beta
              </Badge>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                GRA Core Platform
              </span>
            </h1>

            <p className="mb-8 text-xl text-muted-foreground sm:text-2xl max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade data processing and analytics platform designed for
              <span className="text-blue-600 dark:text-blue-400 font-semibold"> Bank of America's </span>
              global risk analytics needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 px-8 py-3 text-lg bg-transparent"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">Built for Enterprise Scale</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to handle Bank of America's most demanding data processing requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50"
                      : "border-border hover:border-blue-200 dark:hover:border-blue-800"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        activeFeature === index
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${
                        activeFeature === index ? "rotate-90" : ""
                      } text-muted-foreground`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:pl-8">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600 text-white rounded-lg">{features[activeFeature].icon}</div>
                    <CardTitle className="text-foreground">{features[activeFeature].title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{features[activeFeature].details}</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-24 bg-blue-50/30 dark:bg-blue-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">Get Started in Minutes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow our simple three-step process to have your first data pipeline running.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {quickStartSteps.map((step, index) => (
                <Card key={index} className="relative border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <CardTitle className="text-foreground">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4">
                      <code className="text-green-400 text-sm font-mono">{step.code}</code>
                    </div>
                  </CardContent>
                  {index < quickStartSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Download className="mr-2 h-5 w-5" />
                Download Platform
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Or try our{" "}
                <a href="/quickstart" className="text-blue-600 dark:text-blue-400 hover:underline">
                  interactive tutorial
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Tabs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 sm:text-4xl">Comprehensive Documentation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to successfully deploy and manage GRA Core Platform.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="getting-started" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger
                  value="getting-started"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Getting Started
                </TabsTrigger>
                <TabsTrigger
                  value="user-guide"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  User Guide
                </TabsTrigger>
                <TabsTrigger
                  value="api-reference"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  API Reference
                </TabsTrigger>
                <TabsTrigger
                  value="examples"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Examples
                </TabsTrigger>
              </TabsList>

              <TabsContent value="getting-started" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-foreground">
                        <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                        Installation Guide
                      </CardTitle>
                      <CardDescription>Step-by-step installation for all supported environments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 bg-transparent"
                      >
                        View Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-foreground">
                        <Zap className="mr-2 h-5 w-5 text-blue-600" />
                        Quick Start Tutorial
                      </CardTitle>
                      <CardDescription>Build your first pipeline in 30 minutes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 bg-transparent"
                      >
                        Start Tutorial
                        <Play className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="user-guide" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: "Platform Overview", desc: "Architecture and core concepts" },
                    { title: "Data Processing", desc: "Building and managing pipelines" },
                    { title: "Security & Compliance", desc: "Enterprise security features" },
                  ].map((item, index) => (
                    <Card key={index} className="border-blue-200 dark:border-blue-800">
                      <CardHeader>
                        <CardTitle className="text-foreground">{item.title}</CardTitle>
                        <CardDescription>{item.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 bg-transparent"
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="api-reference" className="space-y-6">
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-foreground">Complete API Documentation</CardTitle>
                    <CardDescription>RESTful APIs, GraphQL endpoints, and SDK documentation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Code className="mr-2 h-4 w-4" />
                        API Docs
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 bg-transparent"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download SDKs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Real-time Analytics", desc: "Stream processing example" },
                    { title: "Batch Processing", desc: "Large dataset processing" },
                    { title: "Machine Learning", desc: "ML pipeline integration" },
                    { title: "Data Visualization", desc: "Dashboard and reporting" },
                  ].map((example, index) => (
                    <Card key={index} className="border-blue-200 dark:border-blue-800">
                      <CardHeader>
                        <CardTitle className="text-foreground">{example.title}</CardTitle>
                        <CardDescription>{example.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 bg-transparent"
                        >
                          View Example
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 sm:text-4xl">Ready to Transform Your Data Processing?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of Bank of America teams already using GRA Core Platform to power their analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
              <Play className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
            >
              <Users className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
