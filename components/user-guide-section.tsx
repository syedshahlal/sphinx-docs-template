"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  ArrowRight,
  Clock,
  User,
  Star,
  PlayCircle,
  FileText,
  Settings,
  Wrench,
  Shield,
  BarChart3,
  Zap,
} from "lucide-react"
import Link from "next/link"

export function UserGuideSection() {
  const guides = [
    {
      title: "Getting Started",
      description: "Complete setup guide from installation to your first API call",
      icon: PlayCircle,
      difficulty: "Beginner",
      duration: "15 min",
      rating: 4.9,
      topics: ["Installation", "Configuration", "First Steps", "Hello World"],
      href: "/user-guide/getting-started",
      color: "bg-green-500",
    },
    {
      title: "API Integration",
      description: "Learn how to integrate with our REST and GraphQL APIs",
      icon: FileText,
      difficulty: "Intermediate",
      duration: "30 min",
      rating: 4.8,
      topics: ["REST API", "GraphQL", "Authentication", "Rate Limiting"],
      href: "/user-guide/api-integration",
      color: "bg-blue-500",
    },
    {
      title: "Configuration Guide",
      description: "Advanced configuration options and environment setup",
      icon: Settings,
      difficulty: "Intermediate",
      duration: "25 min",
      rating: 4.7,
      topics: ["Environment Variables", "Config Files", "Secrets", "Validation"],
      href: "/user-guide/configuration",
      color: "bg-purple-500",
    },
    {
      title: "Development Tools",
      description: "CLI tools, debugging, and development best practices",
      icon: Wrench,
      difficulty: "Intermediate",
      duration: "20 min",
      rating: 4.8,
      topics: ["CLI Tools", "Debugging", "Testing", "Local Development"],
      href: "/user-guide/development-tools",
      color: "bg-orange-500",
    },
    {
      title: "Security Best Practices",
      description: "Implement security measures and compliance requirements",
      icon: Shield,
      difficulty: "Advanced",
      duration: "45 min",
      rating: 4.9,
      topics: ["Authentication", "Authorization", "Encryption", "Compliance"],
      href: "/user-guide/security",
      color: "bg-red-500",
    },
    {
      title: "Performance Optimization",
      description: "Optimize your application for maximum performance",
      icon: Zap,
      difficulty: "Advanced",
      duration: "35 min",
      rating: 4.6,
      topics: ["Caching", "Load Balancing", "Monitoring", "Scaling"],
      href: "/user-guide/performance",
      color: "bg-yellow-500",
    },
    {
      title: "Monitoring & Analytics",
      description: "Set up comprehensive monitoring and gain insights",
      icon: BarChart3,
      difficulty: "Advanced",
      duration: "40 min",
      rating: 4.7,
      topics: ["Metrics", "Logging", "Alerting", "Dashboards"],
      href: "/user-guide/monitoring",
      color: "bg-indigo-500",
    },
    {
      title: "Deployment Guide",
      description: "Deploy to production with confidence using our deployment strategies",
      icon: BookOpen,
      difficulty: "Advanced",
      duration: "50 min",
      rating: 4.8,
      topics: ["CI/CD", "Docker", "Kubernetes", "Blue-Green Deployment"],
      href: "/user-guide/deployment",
      color: "bg-cyan-500",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">User Guide</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive guides to help you master the GRA Core Platform, from basic setup to advanced deployment
          strategies
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {guides.map((guide, index) => (
          <Card
            key={guide.title}
            className="glass-strong hover:shadow-themed-lg transition-all duration-300 interactive animate-slide-up border-border group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${guide.color} flex items-center justify-center shadow-themed`}>
                  <guide.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{guide.rating}</span>
                </div>
              </div>

              <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-colors leading-tight">
                {guide.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                {guide.description}
              </CardDescription>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className={`text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                  {guide.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {guide.duration}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-card-foreground uppercase tracking-wide">Topics Covered:</h4>
                <div className="flex flex-wrap gap-1">
                  {guide.topics.slice(0, 3).map((topic, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-border text-muted-foreground">
                      {topic}
                    </Badge>
                  ))}
                  {guide.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                      +{guide.topics.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10 mt-4"
                asChild
              >
                <Link href={guide.href}>
                  Start Guide
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-12 text-center">
        <div className="glass rounded-lg p-8 shadow-themed">
          <h3 className="text-xl font-semibold text-foreground mb-3">Need More Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Check out our community resources, video tutorials, or get in touch with
            our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
              asChild
            >
              <Link href="/community">
                <User className="w-4 h-4 mr-2" />
                Join Community
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
              asChild
            >
              <Link href="/examples">
                <PlayCircle className="w-4 h-4 mr-2" />
                Video Tutorials
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
              asChild
            >
              <Link href="/support">
                <BookOpen className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
