"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, BookOpen, Code, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GuideStep {
  title: string
  description: string
  code?: string
  type: "setup" | "code" | "config"
}

interface UserGuideSectionProps {
  title?: string
  description?: string
  steps?: GuideStep[]
}

const defaultSteps: GuideStep[] = [
  {
    title: "Installation",
    description: "Install the GRA Core Platform using your preferred package manager.",
    code: "npm install @gra/core-platform\n# or\npip install gra-core-platform",
    type: "setup",
  },
  {
    title: "Basic Configuration",
    description: "Set up your basic configuration file to get started.",
    code: `// gra.config.js
export default {
  apiKey: process.env.GRA_API_KEY,
  environment: 'development',
  features: ['auth', 'analytics']
};`,
    type: "config",
  },
  {
    title: "First API Call",
    description: "Make your first API call to verify everything is working.",
    code: `import { GRAClient } from '@gra/core-platform';

const client = new GRAClient();
const result = await client.ping();
console.log('Platform status:', result.status);`,
    type: "code",
  },
]

const typeIcons = {
  setup: BookOpen,
  code: Code,
  config: Settings,
}

const typeBadges = {
  setup: "Setup",
  code: "Code",
  config: "Config",
}

export function UserGuideSection({
  title = "Getting Started Guide",
  description = "Follow these steps to get up and running with the GRA Core Platform.",
  steps = defaultSteps,
}: UserGuideSectionProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([0]))

  const toggleStep = (index: number) => {
    const newExpanded = new Set(expandedSteps)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSteps(newExpanded)
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isExpanded = expandedSteps.has(index)
          const IconComponent = typeIcons[step.type]

          return (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleStep(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <Badge variant="outline">{typeBadges[step.type]}</Badge>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <CardDescription className="mb-4">{step.description}</CardDescription>

                  {step.code && (
                    <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{step.code}</pre>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
