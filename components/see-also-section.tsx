"use client"

import { useState, useMemo } from "react"
import { Info, ExternalLink } from "lucide-react"

export function SeeAlsoSection() {
  const [hoveredPlatform, setHoveredPlatform] = useState<number | null>(null)

  // ensure the array is always in-scope but created only once
  const relatedPlatforms = useMemo(
    () => [
      {
        key: "dev",
        name: "GRA Core Platform · Dev Lane",
        description: "Full-featured enterprise lane with advanced sidebar navigation.",
        color: "from-blue-500 to-cyan-500",
        badge: "Tech Lower Lanes",
        href: "https://gra.example.com/dev/overview",
      },
      {
        key: "sbx",
        name: "GRA Core Platform · SBX Dev Lane",
        description: "Lightweight lane, ideal for small-to-medium projects.",
        color: "from-green-500 to-emerald-500",
        badge: "GRA DEV Lane",
        href: "https://gra.example.com/sbx/overview",
      },
      {
        key: "uat",
        name: "GRA Core Platform · SDX UAT Lane",
        description: "User-acceptance test lane that showcases upcoming releases.",
        color: "from-purple-500 to-pink-500",
        badge: "GRA UAT Lane",
        href: "https://gra.example.com/uat/overview",
      },
      {
        key: "beta",
        name: "GRA Core Platform · SDX Beta Lane",
        description: "Early-access beta features for power users.",
        color: "from-purple-500 to-pink-500",
        badge: "GRA LLE",
        href: "https://gra.example.com/beta/overview",
      },
      {
        key: "prod",
        name: "GRA Core Platform · Prod Lane",
        description: "Official production environment for all customers.",
        color: "from-purple-500 to-pink-500",
        badge: "Production",
        href: "https://gra.example.com/prod/overview",
      },
    ],
    [],
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {relatedPlatforms.map((platform) => (
        <div
          key={platform.key}
          className={`bg-gradient-to-r ${platform.color} p-4 rounded-lg flex items-center space-x-4 hover:opacity-80`}
          onMouseEnter={() => setHoveredPlatform(Number.parseInt(platform.key))}
          onMouseLeave={() => setHoveredPlatform(null)}
        >
          <Info className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-semibold">{platform.name}</h3>
            <p className="text-gray-600">{platform.description}</p>
          </div>
          <div className="ml-auto">
            <span className="bg-white text-black px-2 py-1 rounded-full text-sm">{platform.badge}</span>
            <ExternalLink className="w-6 h-6 ml-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
