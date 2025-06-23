import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Smartphone, Palette, Code, Database, ImageIcon } from "lucide-react"

type Feature = {
  icon: React.ElementType
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Built with Modern Stack",
    description: "Use Next.js, React, and TypeScript functionality in your platform.",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Platform sections will adapt and scale at different screen sizes.",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: Palette,
    title: "Light / Dark theme",
    description: "Users can toggle between light and dark themes interactively.",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Code,
    title: "Customizable UI and themes",
    description:
      "Customize colors and branding with CSS variables, and build custom UIs with modern design components.",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: Database,
    title: "Supports Data and Analytics",
    description: "Full support for data visualization, analytics dashboards, and real-time data processing.",
    color: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: ImageIcon,
    title: "Example Gallery",
    description: "See our showcase of projects that use this platform.",
    color: "text-pink-600 dark:text-pink-400",
  },
]

export function FeatureCards() {
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description, color }) => (
          <Card key={title} className="border border-border bg-card transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Icon className={`h-5 w-5 ${color}`} />
                <span>{title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

/* Allow both:
   import { FeatureCards } from "@/components/feature-cards";
   import FeatureCards from "@/components/feature-cards";
*/
export default FeatureCards
