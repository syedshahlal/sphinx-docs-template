// Assuming this file exists from previous steps and is correctly located at frontend/src/components/features/FeatureCards.tsx
// No changes needed to this file itself based on the current request, but its path is confirmed.
// Example content (if it needs to be created or shown):
"use client"
import Link from "next/link"
import { Lightbulb, BookOpen, Code } from "lucide-react" // Example icons

const features = [
  {
    title: "Platform Overview",
    description: "Understand the core architecture and capabilities of GRA Core Platform.",
    href: "/docs/introduction", // Updated to internal Markdown link
    icon: Lightbulb,
  },
  {
    title: "User Guides",
    description: "Step-by-step guides to help you get the most out of our platform.",
    href: "/docs/user-guide", // Placeholder, create user-guide.md
    icon: BookOpen,
  },
  {
    title: "API Reference",
    description: "Detailed documentation for our APIs and SDKs.",
    href: "/docs/api-reference", // Updated to internal Markdown link
    icon: Code,
  },
]

export function FeatureCards() {
  return (
    <section className="py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link
            href={feature.href}
            key={feature.title}
            className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
          >
            <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
            <p className="text-gray-700 text-sm">{feature.description}</p>
            <div className="mt-4 text-blue-500 font-medium group-hover:underline">Learn More &rarr;</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
