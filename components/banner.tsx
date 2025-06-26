export function Banner() {
  return (
    <div className="bg-purple-200 text-purple-800 py-3 px-4 text-center text-sm">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            <span className="font-semibold text-purple-900">New Release</span>
          </div>
          <span>
            GRA Core Platform v5.7.0 is now available with enhanced security features and improved performance.
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-purple-700 underline hover:text-purple-900 font-medium">
            View Release Notes
          </a>
          <button className="text-purple-600 hover:text-purple-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
