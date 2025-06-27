"use client"

import { Zap, ShieldCheck, Database, Cloud, Code2, BarChart3, CheckCircle2, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Feature {
  icon: LucideIcon
  iconColor: string
  bgColor: string
  category: string
  title: string
  description: string
  benefits: string[]
  status: "Stable" | "Beta"
}

const features: Feature[] = [
  {
    icon: Zap,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    category: "Performance",
    title: "High Performance",
    description: "Built for speed with optimized algorithms and efficient resource management",
    benefits: ["Sub-millisecond response times", "Auto-scaling capabilities", "Optimized memory usage"],
    status: "Stable",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-red-500",
    bgColor: "bg-red-500/10",
    category: "Security",
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption and compliance standards",
    benefits: ["SOC 2 Type II certified", "Zero-trust architecture", "Advanced threat detection"],
    status: "Stable",
  },
  {
    icon: Database,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    category: "Data",
    title: "Data Management",
    description: "Comprehensive data handling with real-time processing and analytics",
    benefits: ["Real-time data sync", "Advanced querying", "Data lake integration"],
    status: "Stable",
  },
  {
    icon: Cloud,
    iconColor: "text-green-500",
    bgColor: "bg-green-500/10",
    category: "Infrastructure",
    title: "Cloud Native",
    description: "Designed for modern cloud infrastructure with Kubernetes support",
    benefits: ["Multi-cloud deployment", "Container orchestration", "Serverless functions"],
    status: "Stable",
  },
  {
    icon: Code2,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    category: "Developer Tools",
    title: "Developer Experience",
    description: "Intuitive APIs and comprehensive tooling for rapid development",
    benefits: ["Rich SDK libraries", "Interactive documentation", "Debug tools"],
    status: "Stable",
  },
  {
    icon: BarChart3,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10",
    category: "Observability",
    title: "Analytics & Monitoring",
    description: "Real-time insights with advanced monitoring and alerting capabilities",
    benefits: ["Custom dashboards", "Predictive analytics", "Smart alerting"],
    status: "Beta",
  },
]

const statusStyles = {
  Stable: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  Beta: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
}

export function PlatformFeatures() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Platform Features
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Discover the powerful capabilities that make GRA Core Platform the choice for modern applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg flex items-center justify-center ${feature.bgColor}`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} aria-hidden="true" />
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[feature.status]}`}>
                    {feature.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{feature.category}</p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{feature.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-sm">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto">
                <a
                  href="#"
                  className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group-hover:text-blue-700"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PlatformFeatures
