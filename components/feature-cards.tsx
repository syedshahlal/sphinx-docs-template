"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Zap,
  Shield,
  Database,
  Cloud,
  Code,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Layers,
  Globe,
  Lock,
  Cpu,
} from "lucide-react"
import Link from "next/link"

export function FeatureCards() {
  const features = [
    {
      title: "High Performance",
      description: "Built for speed with optimized algorithms and efficient resource management",
      icon: Zap,
      category: "Performance",
      categoryColor: "bg-yellow-500",
      benefits: ["Sub-millisecond response times", "Auto-scaling capabilities", "Optimized memory usage"],
      href: "/user-guide/performance",
      status: "stable",
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance standards",
      icon: Shield,
      category: "Security",
      categoryColor: "bg-red-500",
      benefits: ["SOC 2 Type II certified", "Zero-trust architecture", "Advanced threat detection"],
      href: "/user-guide/security",
      status: "stable",
    },
    {
      title: "Data Management",
      description: "Comprehensive data handling with real-time processing and analytics",
      icon: Database,
      category: "Data",
      categoryColor: "bg-blue-500",
      benefits: ["Real-time data sync", "Advanced querying", "Data lake integration"],
      href: "/user-guide/data-management",
      status: "stable",
    },
    {
      title: "Cloud Native",
      description: "Designed for modern cloud infrastructure with Kubernetes support",
      icon: Cloud,
      category: "Infrastructure",
      categoryColor: "bg-green-500",
      benefits: ["Multi-cloud deployment", "Container orchestration", "Serverless functions"],
      href: "/user-guide/deployment",
      status: "stable",
    },
    {
      title: "Developer Experience",
      description: "Intuitive APIs and comprehensive tooling for rapid development",
      icon: Code,
      category: "Developer Tools",
      categoryColor: "bg-purple-500",
      benefits: ["Rich SDK libraries", "Interactive documentation", "Debug tools"],
      href: "/api-reference",
      status: "stable",
    },
    {
      title: "Analytics & Monitoring",
      description: "Real-time insights with advanced monitoring and alerting capabilities",
      icon: BarChart3,
      category: "Observability",
      categoryColor: "bg-orange-500",
      benefits: ["Custom dashboards", "Predictive analytics", "Smart alerting"],
      href: "/user-guide/monitoring",
      status: "beta",
    },
    {
      title: "Microservices Architecture",
      description: "Modular design enabling independent scaling and deployment",
      icon: Layers,
      category: "Architecture",
      categoryColor: "bg-indigo-500",
      benefits: ["Service mesh integration", "Circuit breakers", "Load balancing"],
      href: "/user-guide/architecture",
      status: "stable",
    },
    {
      title: "Global CDN",
      description: "Worldwide content delivery with edge computing capabilities",
      icon: Globe,
      category: "Performance",
      categoryColor: "bg-cyan-500",
      benefits: ["150+ edge locations", "Smart routing", "Edge computing"],
      href: "/user-guide/cdn",
      status: "stable",
    },
    {
      title: "Advanced Authentication",
      description: "Multi-factor authentication with SSO and identity management",
      icon: Lock,
      category: "Security",
      categoryColor: "bg-pink-500",
      benefits: ["OAuth 2.0/OIDC", "SAML integration", "Biometric auth"],
      href: "/user-guide/authentication",
      status: "stable",
    },
    {
      title: "AI/ML Integration",
      description: "Built-in machine learning capabilities with pre-trained models",
      icon: Cpu,
      category: "AI/ML",
      categoryColor: "bg-emerald-500",
      benefits: ["Pre-trained models", "Custom ML pipelines", "AutoML features"],
      href: "/user-guide/ai-ml",
      status: "preview",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "stable":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Stable
          </Badge>
        )
      case "beta":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Beta
          </Badge>
        )
      case "preview":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Preview
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card
          key={feature.title}
          className="glass-strong hover:shadow-themed-lg transition-all duration-300 interactive animate-fade-in border-border group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-12 h-12 rounded-lg ${feature.categoryColor} flex items-center justify-center shadow-themed`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              {getStatusBadge(feature.status)}
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="text-xs font-medium border-border text-muted-foreground">
                {feature.category}
              </Badge>
              <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <CardDescription className="text-muted-foreground leading-relaxed">{feature.description}</CardDescription>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-card-foreground">Key Benefits:</h4>
              <ul className="space-y-1">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10 mt-4"
              asChild
            >
              <Link href={feature.href}>
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
