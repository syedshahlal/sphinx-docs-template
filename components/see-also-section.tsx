import { Info } from "lucide-react"

export function SeeAlsoSection() {
  return (
    <section className="py-8">
      <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-800 mb-2">See also</h3>
            <p className="text-green-700 text-sm leading-relaxed">
              If you are looking for a platform that puts all of its sub-modules in the sidebar, the{" "}
              <a href="#" className="text-green-800 underline hover:text-green-900">
                GRA Enterprise Platform
              </a>{" "}
              has a similar look and feel, and{" "}
              <a href="#" className="text-green-800 underline hover:text-green-900">
                GRA Lite
              </a>{" "}
              is another excellent choice. You can also see the{" "}
              <a href="#" className="text-green-800 underline hover:text-green-900">
                GRA Platforms Gallery
              </a>{" "}
              for more ideas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
