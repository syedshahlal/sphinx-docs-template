import type React from "react"

interface FeatureCardProps {
  id: string
  title: string
  description: string
  path: string
  icon: string
  color: string
  gradient: string
  topics: string[]
  status: "available" | "coming-soon" | "experimental"
  badge?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  title,
  description,
  path,
  icon,
  color,
  gradient,
  topics,
  status,
  badge,
}) => {
  return (
    <a
      href={path}
      className="group relative flex flex-col gap-4 rounded-2xl p-6 shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-2xl text-white bg-gradient-to-br ${gradient}`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold">
          {title}
          {badge && (
            <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">{badge}</span>
          )}
        </h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2 flex gap-2">
        {topics.map((topic) => (
          <span key={topic} className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
            {topic}
          </span>
        ))}
      </div>
      {status !== "available" && (
        <div className="absolute top-0 right-0 rounded-br-2xl rounded-tl-2xl bg-yellow-500 px-3 py-1 text-xs font-medium text-white">
          {status}
        </div>
      )}
    </a>
  )
}

interface FeatureCardsProps {
  sections: FeatureCardProps[]
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ sections }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section) => (
        <FeatureCard key={section.id} {...section} />
      ))}
    </div>
  )
}

export default FeatureCards

export const features = [
  {
    id: "create-doc",
    title: "Visual Document Creator",
    description:
      "Create beautiful markdown documents with our drag-and-drop visual editor. No markdown knowledge required!",
    path: "/markdown-editor",
    icon: "✨",
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/20",
    topics: ["Visual Editor", "Drag & Drop", "Real-time Preview", "Export Options"],
    status: "available" as const,
    badge: "New",
  },
  {
    id: "ai-suggestions",
    title: "AI-Powered Suggestions",
    description:
      "Get smart suggestions for improving your writing, powered by AI. Enhance clarity, grammar, and style effortlessly.",
    path: "/ai-suggestions",
    icon: "🤖",
    color: "blue",
    gradient: "from-blue-500/20 to-cyan-500/20",
    topics: ["AI Writing Assistant", "Grammar Check", "Style Improvement", "Content Suggestions"],
    status: "coming-soon" as const,
  },
  {
    id: "realtime-collab",
    title: "Real-time Collaboration",
    description: "Collaborate with your team in real-time. See changes as they happen and work together seamlessly.",
    path: "/realtime-collab",
    icon: "🤝",
    color: "green",
    gradient: "from-green-500/20 to-lime-500/20",
    topics: ["Multi-user Editing", "Shared Documents", "Version History", "Commenting"],
    status: "available" as const,
  },
  {
    id: "custom-templates",
    title: "Customizable Templates",
    description:
      "Create and use custom templates to streamline your document creation process. Save time and maintain consistency.",
    path: "/custom-templates",
    icon: "🎨",
    color: "yellow",
    gradient: "from-yellow-500/20 to-orange-500/20",
    topics: ["Template Editor", "Reusable Components", "Personalized Styles", "Template Library"],
    status: "available" as const,
  },
  {
    id: "export-options",
    title: "Versatile Export Options",
    description: "Export your documents in various formats, including PDF, Word, and HTML. Share your work with ease.",
    path: "/export-options",
    icon: "📤",
    color: "red",
    gradient: "from-red-500/20 to-pink-500/20",
    topics: ["PDF Export", "Word Export", "HTML Export", "Markdown Export"],
    status: "available" as const,
  },
  {
    id: "offline-access",
    title: "Offline Access",
    description: "Access and edit your documents even when you're offline. Stay productive wherever you are.",
    path: "/offline-access",
    icon: "📴",
    color: "gray",
    gradient: "from-gray-500/20 to-zinc-500/20",
    topics: ["Offline Editing", "Local Storage", "Automatic Sync", "Data Security"],
    status: "experimental" as const,
  },
]
