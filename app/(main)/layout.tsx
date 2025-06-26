"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/core/Header"
import { Sidebar } from "@/components/core/Sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="max-w-3xl mx-auto px-8 py-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
