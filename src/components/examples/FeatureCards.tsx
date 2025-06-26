import type React from "react"
import { ArrowRight, Zap, Shield, Globe, Code, Users, Rocket } from "lucide-react"

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  link?: string
}

interface FeatureCardsProps {
  features?: Feature[]
  title?: string
  subtitle?: string
}

const defaultFeatures: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for performance with modern web technologies and optimized for speed.",
    link: "/performance",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security features built-in from the ground up.",
    link: "/security",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy anywhere with our global infrastructure and CDN network.",
    link: "/deployment",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Comprehensive APIs, SDKs, and documentation for seamless integration.",
    link: "/api-reference",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built-in tools for team management, permissions, and collaborative workflows.",
    link: "/collaboration",
  },
  {
    icon: Rocket,
    title: "Easy Deployment",
    description: "One-click deployments with automatic scaling and zero-downtime updates.",
    link: "/deployment",
  },
]

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  features = defaultFeatures,
  title = "Platform Features",
  subtitle = "Everything you need to build, deploy, and scale your applications.",
}) => {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <div
              key={index}
              className="
                group relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300
                hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-600
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                  flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg
                  flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50
                  transition-colors duration-300
                "
                >
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>

                  {feature.link && (
                    <a
                      href={feature.link}
                      className="
                        inline-flex items-center gap-1 mt-3 text-sm font-medium text-blue-600 dark:text-blue-400
                        hover:text-blue-700 dark:hover:text-blue-300 transition-colors
                      "
                    >
                      Learn more
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
