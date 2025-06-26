import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Zap, BookOpen, Code, Share2 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Optimized for performance with Next.js 14 and server components.",
  },
  {
    icon: BookOpen,
    title: "Rich Content",
    description: "Tiptap-powered block editor for beautiful, structured documentation.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Syntax highlighting, API references, and easy customization.",
  },
  {
    icon: Share2,
    title: "Team Collaboration",
    description: "Built for teams to create, review, and publish documentation together.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Everything you need to get started</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            A powerful and flexible foundation for your SaaS documentation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
