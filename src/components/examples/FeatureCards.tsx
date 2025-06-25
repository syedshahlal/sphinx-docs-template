import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Code, Globe } from "lucide-react"

interface FeatureCardsProps {
  title?: string
  subtitle?: string
  features?: Array<{
    title: string
    description: string
    icon: string
    badge?: string
  }>
}

const defaultFeatures = [
  {
    title: "High Performance",
    description: "Built for speed with optimized algorithms and efficient data structures.",
    icon: "Zap",
    badge: "Fast",
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security with encryption, audit trails, and compliance features.",
    icon: "Shield",
    badge: "Secure",
  },
  {
    title: "Developer Friendly",
    description: "Clean APIs, comprehensive documentation, and excellent tooling support.",
    icon: "Code",
    badge: "DX",
  },
  {
    title: "Global Scale",
    description: "Deploy anywhere with multi-region support and edge optimization.",
    icon: "Globe",
    badge: "Scale",
  },
]

const iconMap = {
  Zap,
  Shield,
  Code,
  Globe,
}

export function FeatureCards({
  title = "Platform Features",
  subtitle = "Everything you need to build amazing applications",
  features = defaultFeatures,
}: FeatureCardsProps) {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Code

          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <IconComponent className="h-8 w-8 text-primary" />
                  {feature.badge && <Badge variant="secondary">{feature.badge}</Badge>}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
