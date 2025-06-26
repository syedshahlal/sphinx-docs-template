"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, FileText, Settings, ChevronDown, ChevronRight, Folder } from "lucide-react"
import { useState } from "react"
import { Logo } from "./Logo"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Documentation",
    icon: FileText,
    children: [
      {
        name: "Getting Started",
        href: "/docs/getting-started",
        icon: Folder,
        children: [
          { name: "Introduction", href: "/docs/getting-started/introduction" },
          { name: "Installation", href: "/docs/getting-started/installation" },
        ],
      },
      {
        name: "API Reference",
        href: "/docs/api-reference",
        icon: Folder,
        children: [
          { name: "Authentication", href: "/docs/api-reference/auth" },
          { name: "Users", href: "/docs/api-reference/users" },
        ],
      },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

interface NavItemProps {
  item: any
  level?: number
}

const NavItem: React.FC<NavItemProps> = ({ item, level = 0 }) => {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(pathname.startsWith(item.href))

  const isActive = pathname === item.href

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          style={{ paddingLeft: `${level * 1 + 0.75}rem` }}
        >
          <div className="flex items-center gap-3">
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.name}</span>
          </div>
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-1 space-y-1">
                {item.children.map((child: any) => (
                  <NavItem key={child.name} item={child} level={level + 1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
      )}
      style={{ paddingLeft: `${level * 1 + 0.75}rem` }}
    >
      {item.icon && <item.icon className="h-4 w-4" />}
      <span>{item.name}</span>
    </Link>
  )
}

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed lg:relative z-40 w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col"
          >
            <div className="flex items-center justify-center h-16 border-b border-slate-200 dark:border-slate-800 px-4">
              <Link href="/" className="flex items-center gap-2">
                <Logo />
                <span className="font-bold text-lg">SaaS Docs</span>
              </Link>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 z-30 lg:hidden" />}
    </>
  )
}
