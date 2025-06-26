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
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/50 dark:from-green-950/20 dark:via-emerald-950/10 dark:to-teal-950/20 border border-green-200/50 dark:border-green-800/30">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10 p-8 md:p-12 bg-slate-300">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0 p-3 bg-green-500/10 dark:bg-green-400/10 rounded-xl border border-green-200/50 dark:border-green-700/50">
                <Info className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                  See Also
                  <Sparkles className="w-5 h-5 text-green-500 animate-pulse" />
                </h3>
                <p className="text-green-700/80 dark:text-green-300/80 text-lg leading-relaxed">
                  Explore our GCP UI to meet different needs and use cases.
                </p>
              </div>
            </div>

            {/* Platform Cards */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {relatedPlatforms.map((platform, index) => (
                <div
                  key={platform.name}
                  className={`group relative p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-green-200/50 dark:border-green-700/30 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                    hoveredPlatform === index ? "scale-105" : ""
                  }`}
                  onMouseEnter={() => setHoveredPlatform(index)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
                  />

                  {/* Badge */}
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${platform.color} text-white mb-4`}
                  >
                    {platform.badge}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">
                      {platform.name}
                    </h4>
                    <p className="text-sm text-green-700/70 dark:text-green-300/70 mb-4 group-hover:text-green-600 dark:group-hover:text-green-200 transition-colors">
                      {platform.description}
                    </p>

                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 group-hover:text-green-500 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-full"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Text */}
            <div className="text-center">
              <p className="text-green-700/80 dark:text-green-300/80 mb-6">
                Each platform is designed with specific use cases in mind, ensuring you get the perfect fit for your
                project.
              </p>

              <button className="group inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span>Compare All Platforms</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeeAlsoSection
