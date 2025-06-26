"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import { ThemeToggle } from "./ThemeToggle"
import { Plus, Menu } from "lucide-react"
import { CreateDocModal } from "../docs/CreateDocModal"
import { useState } from "react"

interface HeaderProps {
  onSidebarToggle?: () => void
}

export function Header({ onSidebarToggle }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {onSidebarToggle && (
          <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="mr-4 lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block">SaaS Docs</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </div>
      </div>
      <CreateDocModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </header>
  )
}
