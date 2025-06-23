export function Banner() {
  return (
    <div className="bg-purple-200 text-purple-800 py-3 px-4 text-center text-sm">
      <div className="w-full max-w-7xl mx-auto">
        This is a community-supported platform. If you'd like to contribute,{" "}
        <a href="#" className="text-purple-700 underline hover:text-purple-900">
          check out our GitHub repository
        </a>
        . Your contributions are welcome!
      </div>
    </div>
  )
}
