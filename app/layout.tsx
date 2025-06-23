import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GRA Core Platform Documentation",
  description: "A comprehensive, modern platform built for the GRA community.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen transition-colors duration-300`}
        style={{
          backgroundColor: "rgb(var(--background))",
          color: "rgb(var(--foreground))",
        }}
      >
        <div
          className="min-h-screen transition-colors duration-300"
          style={{
            backgroundColor: "rgb(var(--background))",
            color: "rgb(var(--foreground))",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
