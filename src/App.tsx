"use client"

import { useState, useEffect } from "react"
import { Layout } from "./components/layout/Layout"
import { useComponentMount } from "./hooks/useComponentMount"
import { useTheme } from "./hooks/useTheme"
import type { SphinxContent } from "./types"
import "./styles/globals.css"

// Mock content - in real implementation, this would come from Sphinx
const mockContent: SphinxContent = {
  title: "Getting Started",
  content: `
    <div class="sphinx-content">
      <h2 id="introduction">Introduction</h2>
      <p>Welcome to our documentation platform. This guide will help you get started quickly.</p>
      
      <div data-component="FeatureCards" data-props='{"title": "Platform Features", "subtitle": "Everything you need to build amazing applications"}' class="react-mount"></div>
      
      <h2 id="installation">Installation</h2>
      <p>Follow these steps to install the platform:</p>
      
      <div data-component="Chart" data-props='{"data": [{"label": "Jan", "value": 65}, {"label": "Feb", "value": 78}, {"label": "Mar", "value": 90}], "type": "bar", "title": "Monthly Usage"}' class="react-mount"></div>
      
      <h2 id="user-guide">User Guide</h2>
      <p>Learn how to use all the features:</p>
      
      <div data-component="UserGuideSection" class="react-mount"></div>
      
      <h2 id="next-steps">Next Steps</h2>
      <p>Now that you're set up, here's what you can do next:</p>
      <ul>
        <li>Explore the API documentation</li>
        <li>Check out our examples</li>
        <li>Join our community</li>
      </ul>
    </div>
  `,
  toc: [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "installation", title: "Installation", level: 2 },
    { id: "user-guide", title: "User Guide", level: 2 },
    { id: "next-steps", title: "Next Steps", level: 2 },
  ],
  metadata: {
    description: "Get started with our platform in just a few minutes.",
    author: "Documentation Team",
    lastModified: "2024-01-15",
  },
}

function App() {
  const [currentPath, setCurrentPath] = useState("/getting-started")
  const [content, setContent] = useState<SphinxContent>(mockContent)
  const { theme } = useTheme()

  // Initialize component mounting
  useComponentMount()

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    // In real implementation, fetch content based on path
    console.log("Navigating to:", path)
  }

  useEffect(() => {
    // Apply theme class to body
    document.body.className = theme.mode === "dark" ? "dark" : ""
  }, [theme.mode])

  return <Layout content={content} currentPath={currentPath} onNavigate={handleNavigate} />
}

export default App
