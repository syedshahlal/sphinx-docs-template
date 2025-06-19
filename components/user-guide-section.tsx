import { ChevronRight } from "lucide-react"

const guideLinks = [
  { title: "Installation", href: "#" },
  { title: "Platform Structure and Layout", href: "#" },
  { title: "Navigation depth and collapsing sidebars", href: "#" },
  { title: "Page Table of Contents", href: "#" },
  { title: "Configuration Options", href: "#" },
  { title: "Customization Guide", href: "#" },
  { title: "API Integration", href: "#" },
  { title: "Deployment", href: "#" },
]

export function UserGuideSection() {
  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">User Guide</h2>
        <p className="text-gray-600">Information about using, configuration, and customizing this platform.</p>
      </div>

      <div className="space-y-3">
        <div className="mb-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-lg underline">
            User Guide
          </a>
        </div>

        <div className="ml-6 space-y-2">
          {guideLinks.map((link, index) => (
            <div key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
              <a href={link.href} className="text-blue-600 hover:text-blue-800 underline">
                {link.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
