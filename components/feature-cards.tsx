import { Zap, Smartphone, Palette, Code, Database, ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Built with Modern Stack",
    description: "Use Next.js, React, and TypeScript functionality in your platform.",
    color: "text-blue-600",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Platform sections will adapt and scale at different screen sizes.",
    color: "text-green-600",
  },
  {
    icon: Palette,
    title: "Light / Dark theme",
    description: "Users can toggle between light and dark themes interactively.",
    color: "text-purple-600",
  },
  {
    icon: Code,
    title: "Customizable UI and themes",
    description:
      "Customize colors and branding with CSS variables, and build custom UIs with modern design components.",
    color: "text-orange-600",
  },
  {
    icon: Database,
    title: "Supports Data and Analytics",
    description: "Full support for data visualization, analytics dashboards, and real-time data processing.",
    color: "text-teal-600",
  },
  {
    icon: ImageIcon,
    title: "Example Gallery",
    description: "See our showcase of projects that use this platform.",
    color: "text-pink-600",
  },
]

export function FeatureCards() {
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <IconComponent className={`h-5 w-5 ${feature.color}`} />
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
