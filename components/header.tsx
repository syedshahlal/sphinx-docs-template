"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Search, Moon, Sun, Menu, Bell, User, Settings, HelpCircle } from "lucide-react"
import { useTheme } from "next-themes"

// Version configuration
const AVAILABLE_VERSIONS = [
  { version: "5.7.0", label: "v5.7.0", status: "stable", category: "current" },
  { version: "5.6.2", label: "v5.6.2", status: "legacy", category: "previous" },
  { version: "5.5.4", label: "v5.5.4", status: "legacy", category: "previous" },
  { version: "5.4.8", label: "v5.4.8", status: "legacy", category: "previous" },
  { version: "5.3.6", label: "v5.3.6", status: "legacy", category: "previous" },
  { version: "5.2.3", label: "v5.2.3", status: "legacy", category: "previous" },
  { version: "5.1.9", label: "v5.1.9", status: "legacy", category: "previous" },
  { version: "5.8.0-beta", label: "v5.8.0-beta", status: "beta", category: "development" },
  { version: "6.0.0-alpha", label: "v6.0.0-alpha", status: "alpha", category: "development" },
]

const DEFAULT_VERSION = "5.7.0" // Stable version as default

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [currentVersion, setCurrentVersion] = useState(DEFAULT_VERSION)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Extract version from pathname
  const extractVersionFromPath = (path: string): string => {
    const match = path.match(/\/docs\/gcp-(\d+\.\d+(?:\.\d+)?(?:-\w+)?)/)
    return match ? match[1] : DEFAULT_VERSION
  }

  // Update current version based on pathname
  useEffect(() => {
    const versionFromPath = extractVersionFromPath(pathname)
    setCurrentVersion(versionFromPath)
  }, [pathname])

  // Handle version switching
  const switchVersion = (newVersion: string) => {
    const currentPath = pathname
    const newPath = currentPath.replace(/\/docs\/gcp-[\d.\-\w]+/, `/docs/gcp-${newVersion}`)
    router.push(newPath)
  }

  // Get current version info
  const currentVersionInfo = AVAILABLE_VERSIONS.find((v) => v.version === currentVersion) || AVAILABLE_VERSIONS[0]

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "stable":
        return "default"
      case "beta":
        return "secondary"
      case "alpha":
        return "outline"
      case "legacy":
        return "outline"
      default:
        return "default"
    }
  }

  // Group versions by category
  const groupedVersions = AVAILABLE_VERSIONS.reduce(
    (acc, version) => {
      if (!acc[version.category]) {
        acc[version.category] = []
      }
      acc[version.category].push(version)
      return acc
    },
    {} as Record<string, typeof AVAILABLE_VERSIONS>,
  )

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center px-0 mx-0 bg-[rgba(1,33,105,1)] bg-[rgba(0,17,34,1)]">
        <div className="flex items-center h-16 w-full">
          {/* Logo and Title - Extreme Left */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/placeholder.svg?height=32&width=32&text=BOA" alt="Bank of America Logo" className="h-8 w-8" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground leading-tight">GRA Core Platform</span>
                <span className="text-xs text-muted-foreground leading-tight">Documentation</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Left Side */}
          <nav className="hidden md:flex items-center gap-6 ml-8">
            <Link
              href="/user-guide"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              User Guide
            </Link>
            <Link
              href="/api-reference"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              API Reference
            </Link>
            <Link
              href="/examples"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Examples
            </Link>
            <Link
              href="/changelog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Changelog
            </Link>
          </nav>

          {/* Center Section - Search and Version */}
          <div className="flex items-center gap-4 mx-auto">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-64 bg-background border-input"
              />
            </div>

            {/* Version Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 bg-background border-input hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{currentVersionInfo.label}</span>
                    {currentVersionInfo.status && (
                      <Badge variant={getStatusVariant(currentVersionInfo.status)} className="text-xs px-1.5 py-0.5">
                        {currentVersionInfo.status}
                      </Badge>
                    )}
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 max-h-96 overflow-y-auto bg-popover border-border">
                {/* Current Version */}
                {groupedVersions.current && (
                  <>
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Current
                    </DropdownMenuLabel>
                    {groupedVersions.current.map((version) => (
                      <DropdownMenuItem
                        key={version.version}
                        onClick={() => switchVersion(version.version)}
                        className="flex items-center justify-between cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="font-medium">{version.label}</span>
                        <Badge variant={getStatusVariant(version.status)} className="text-xs">
                          {version.status}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-border" />
                  </>
                )}

                {/* Previous Versions */}
                {groupedVersions.previous && (
                  <>
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Previous Versions
                    </DropdownMenuLabel>
                    {groupedVersions.previous.map((version) => (
                      <DropdownMenuItem
                        key={version.version}
                        onClick={() => switchVersion(version.version)}
                        className="flex items-center justify-between cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      >
                        <span>{version.label}</span>
                        <Badge variant={getStatusVariant(version.status)} className="text-xs">
                          {version.status}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-border" />
                  </>
                )}

                {/* Development Versions */}
                {groupedVersions.development && (
                  <>
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Development
                    </DropdownMenuLabel>
                    {groupedVersions.development.map((version) => (
                      <DropdownMenuItem
                        key={version.version}
                        onClick={() => switchVersion(version.version)}
                        className="flex items-center justify-between cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      >
                        <span>{version.label}</span>
                        <Badge variant={getStatusVariant(version.status)} className="text-xs">
                          {version.status}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-border" />
                  </>
                )}

                {/* Compare Versions */}
                <DropdownMenuItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                  <span className="text-sm font-medium">Compare Versions</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Help */}
            <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border">
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">Profile</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent hover:text-accent-foreground">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
