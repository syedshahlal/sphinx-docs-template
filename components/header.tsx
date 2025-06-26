"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          My Docs
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Create Doc Button */}
          <Link
            href="/markdown-editor"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Doc
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
          aria-label="Toggle Menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="bg-gray-50 py-2 px-4">
          {/* Mobile Create Doc Button */}
          <Link
            href="/markdown-editor"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Create Doc
          </Link>
          <Link href="/about" className="block py-2 text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="block py-2 text-gray-600 hover:text-gray-800">
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
