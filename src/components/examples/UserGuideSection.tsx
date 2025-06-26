"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronRight, Book, Video, Code, Download } from "lucide-react"

interface GuideItem {
  id: string
  title: string
  description: string
  type: "tutorial" | "video" | "code" | "download"
  duration?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
  link: string
}

interface UserGuideSectionProps {
  title?: string
  subtitle?: string
  items?: GuideItem[]
}

const defaultItems: GuideItem[] = [
  {
    id: "getting-started",
    title: "Getting Started Guide",
    description: "Learn the basics and set up your first project in minutes.",
    type: "tutorial",
    duration: "10 min",
    difficulty: "beginner",
    link: "/getting-started",
  },
  {
    id: "video-overview",
    title: "Platform Overview Video",
    description: "Watch a comprehensive overview of all platform features.",
    type: "video",
    duration: "15 min",
    difficulty: "beginner",
    link: "/videos/overview",
  },
  {
    id: "api-examples",
    title: "API Code Examples",
    description: "Ready-to-use code snippets for common API operations.",
    type: "code",
    duration: "5 min",
    difficulty: "intermediate",
    link: "/examples/api",
  },
  {
    id: "advanced-config",
    title: "Advanced Configuration",
    description: "Deep dive into advanced configuration options and best practices.",
    type: "tutorial",
    duration: "25 min",
    difficulty: "advanced",
    link: "/advanced/configuration",
  },
  {
    id: "sdk-download",
    title: "Download SDK",
    description: "Get the latest SDK for your preferred programming language.",
    type: "download",
    difficulty: "beginner",
    link: "/downloads/sdk",
  },
]

const getIcon = (type: GuideItem["type"]) => {
  switch (type) {
    case "tutorial":
      return Book
    case "video":
      return Video
    case "code":
      return Code
    case "download":
      return Download
    default:
      return Book
  }
}

const getDifficultyColor = (difficulty: GuideItem["difficulty"]) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export const UserGuideSection: React.FC<UserGuideSectionProps> = ({
  title = "User Guide",
  subtitle = "Everything you need to get started and become an expert.",
  items = defaultItems,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.difficulty!]) {
        acc[item.difficulty!] = []
      }
      acc[item.difficulty!].push(item)
      return acc
    },
    {} as Record<string, GuideItem[]>,
  )

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedItems).map(([difficulty, difficultyItems]) => (
          <div key={difficulty} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{difficulty} Level</h3>

            <div className="grid gap-4">
              {difficultyItems.map((item) => {
                const Icon = getIcon(item.type)
                const isExpanded = expandedItems.has(item.id)

                return (
                  <div
                    key={item.id}
                    className="
                      bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700
                      hover:shadow-md transition-shadow duration-200
                    "
                  >
                    <div className="p-4 cursor-pointer" onClick={() => toggleExpanded(item.id)}>
                      <div className="flex items-start gap-4">
                        <div
                          className="
                          flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg
                          flex items-center justify-center
                        "
                        >
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h4>
                            {item.duration && (
                              <span className="text-sm text-gray-500 dark:text-gray-400">• {item.duration}</span>
                            )}
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.description}</p>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(item.difficulty)}`}>
                              {item.difficulty}
                            </span>
                            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full capitalize">
                              {item.type}
                            </span>
                          </div>
                        </div>

                        <button className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="pt-4">
                          <a
                            href={item.link}
                            className="
                              inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700
                              text-white text-sm font-medium rounded-lg transition-colors
                            "
                          >
                            {item.type === "download" ? "Download" : "Start Learning"}
                            <Icon className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
