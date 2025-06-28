# Minimal Setup Guide

This guide lists the minimum files and setup needed to build this documentation web app locally.

## Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

## Quick Start

\`\`\`bash
# 1. Clone or create project directory
mkdir gra-core-docs && cd gra-core-docs

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
\`\`\`

## Minimum Required Files

### Root Configuration Files

1. **package.json** - Dependencies and scripts
2. **next.config.js** - Next.js configuration
3. **tailwind.config.ts** - Tailwind CSS configuration
4. **tsconfig.json** - TypeScript configuration

### App Structure (Required)

\`\`\`
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── globals.css        # Global styles
└── markdown-editor/
    └── page.tsx       # Markdown editor page
\`\`\`

### Essential Components

\`\`\`
components/
├── ui/                # shadcn/ui components (auto-generated)
├── theme-provider.tsx # Dark/light theme
├── header.tsx         # Site header
├── sidebar.tsx        # Navigation sidebar
└── markdown-editor/
    ├── MarkdownEditor.tsx    # Main editor
    ├── FileManager.tsx       # File management
    ├── PropertiesPanel.tsx   # Document properties
    └── types.ts              # TypeScript types
\`\`\`

### Utility Files

\`\`\`
lib/
├── utils.ts           # Utility functions
└── docs-navigation.ts # Navigation data
\`\`\`

## Step-by-Step Setup

### 1. Create package.json

\`\`\`json
{
  "name": "gra-core-docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.16",
    "react": "^18",
    "react-dom": "^18",
    "@tiptap/react": "latest",
    "@tiptap/starter-kit": "latest",
    "lucide-react": "latest",
    "tailwindcss": "^3.4.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "postcss": "^8.5",
    "autoprefixer": "^10.4.20"
  }
}
\`\`\`

### 2. Create next.config.js

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
\`\`\`

### 3. Create tailwind.config.ts

\`\`\`typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
    },
  },
  plugins: [],
}

export default config
\`\`\`

### 4. Create tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

### 5. Create app/globals.css

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --border: 214.3 31.8% 91.4%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}

* {
  border-color: hsl(var(--border));
}

body {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
}
\`\`\`

### 6. Create app/layout.tsx

\`\`\`tsx
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GRA Core Documentation",
  description: "Documentation platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
\`\`\`

### 7. Create app/page.tsx

\`\`\`tsx
export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">GRA Core Documentation</h1>
      <p className="text-lg mb-4">Welcome to the documentation platform.</p>
      <a 
        href="/markdown-editor" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Go to Markdown Editor
      </a>
    </div>
  )
}
\`\`\`

### 8. Create app/markdown-editor/page.tsx

\`\`\`tsx
export default function MarkdownEditorPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Markdown Editor</h1>
      <div className="border rounded-lg p-4">
        <p>Markdown editor will be implemented here.</p>
      </div>
    </div>
  )
}
\`\`\`

## Installation Commands

\`\`\`bash
# Install all dependencies
npm install

# Add shadcn/ui (optional, for better components)
npx shadcn@latest init
npx shadcn@latest add button card input

# Start development server
npm run dev
\`\`\`

## Build Commands

\`\`\`bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Type checking
npx tsc --noEmit
\`\`\`

## Environment Variables (Optional)

Create `.env.local` for any API keys:

\`\`\`
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
\`\`\`

## Folder Structure Summary

\`\`\`
gra-core-docs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── markdown-editor/
│       └── page.tsx
├── components/
│   └── ui/
├── lib/
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
\`\`\`

This minimal setup provides a working Next.js app with basic routing and styling. You can then incrementally add more features like the TipTap editor, file management, and GitHub integration.
