"use client"

import { useState, useMemo } from "react"
import { Info, ExternalLink, ArrowRight, Sparkles } from "lucide-react"

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
    
  )
}

export default SeeAlsoSection
