"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BookOpen,
  Play,
  Settings,
  Lightbulb,
  HelpCircle,
  CheckCircle,
  Clock,
  Users,
  Star,
  Download,
  Code,
} from "lucide-react"

export function UserGuideSection() {
  const guides = [
    {
      icon: Play,
      title: "Quick Start Guide",
      description: "Get up and running in under 5 minutes with our streamlined setup process",
      href: "/user-guide/getting-started",
      duration: "5 min",
      difficulty: "Beginner",
      badge: "Popular",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    {
      icon: Settings,
      title: "Configuration",
      description: "Learn how to configure and customize the platform for your specific needs",
      href: "/user-guide/configuration",
      duration: "15 min",
      difficulty: "Intermediate",
      badge: "Essential",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      icon: Lightbulb,
      title: "Best Practices",
      description: "Industry best practices and recommended patterns for optimal development",
      href: "/user-guide/best-practices",
      duration: "20 min",
      difficulty: "Advanced",
      badge: "Recommended",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Common issues and their solutions to help you resolve problems quickly",
      href: "/user-guide/troubleshooting",
      duration: "10 min",
      difficulty: "All Levels",
      badge: "Helpful",
      badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    },
  ]

  const quickActions = [
    {
      icon: Download,
      title: "Installation",
      description: "Download and install the platform",
      href: "/user-guide/installation",
    },
    {
      icon: Code,
      title: "API Keys",
      description: "Generate and manage API keys",
      href: "/user-guide/api-keys",
    },
    {
      icon: Users,
      title: "Team Setup",
      description: "Configure team access and permissions",
      href: "/user-guide/team-setup",
    },
  ]

  const stats = [
    { icon: BookOpen, label: "Guides", value: "50+" },
    { icon: Users, label: "Community", value: "10K+" },
    { icon: Star, label: "Rating", value: "4.9/5" },
  ]

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">User Guide & Documentation</h2>
        <p className="text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Comprehensive guides and tutorials to help you master the GRA Core Platform. From quick starts to advanced
          configurations, we've got you covered.
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-8 p-6 bg-surface-variant/50 rounded-2xl border border-outline-variant">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-on-surface">{stat.value}</div>
              <div className="text-sm text-on-surface-variant">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Guides */}
      <div>
        <h3 className="text-2xl font-bold text-on-surface mb-8 text-center">Essential Guides</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide, index) => (
            <Card key={index} className="card-elevated group hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <guide.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className={guide.badgeColor}>{guide.badge}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{guide.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-base mb-4 leading-relaxed">{guide.description}</CardDescription>

                <div className="flex items-center gap-4 mb-4 text-sm text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {guide.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {guide.difficulty}
                  </div>
                </div>

                <Button variant="ghost" size="sm" asChild className="group/btn p-0 h-auto">
                  <Link href={guide.href} className="flex items-center text-primary hover:text-primary/80">
                    Start reading
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-2xl font-bold text-on-surface mb-8 text-center">Quick Actions</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href} className="group">
              <Card className="card hover:card-elevated transition-all duration-200 h-full">
                <CardContent className="p-6 text-center">
                  <action.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-on-surface mb-2">{action.title}</h4>
                  <p className="text-sm text-on-surface-variant mb-4">{action.description}</p>
                  <ArrowRight className="w-4 h-4 text-on-surface-variant mx-auto group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="glass border-2 border-primary/20 p-8 max-w-3xl mx-auto">
          <CardContent className="p-0">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-on-surface mb-4">Need More Help?</h3>
            <p className="text-on-surface-variant mb-6 text-lg">
              Can't find what you're looking for? Our community and support team are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="btn-primary" asChild>
                <Link href="/community">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/support">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserGuideSection
