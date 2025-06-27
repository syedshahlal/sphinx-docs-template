# GRA Core Platform - Main Application Structure

This document outlines the essential folder and file structure for the Next.js frontend application. It focuses on the core files required for the application's functionality and preview generation, excluding auxiliary build scripts and Sphinx-related directories.

\`\`\`
frontend/
├── content/
│   └── docs/
│       ├── introduction.md         # Markdown content for the introduction page
│       └── ...                     # Other Markdown documentation files
│
├── public/
│   ├── images/                     # Static image assets
│   └── ...                         # Other static assets like favicons
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout for the entire application
│   │   ├── page.tsx                # Homepage component
│   │   └── docs/
│   │       └── [...slug]/
│   │           └── page.tsx        # Dynamic route handler for rendering Markdown pages
│   │
│   ├── components/
│   │   ├── features/
│   │   │   └── FeatureCards.tsx    # UI component for the feature cards on the homepage
│   │   │
│   │   ├── layout/
│   │   │   └── PageLayout.tsx      # Layout component for individual documentation pages
│   │   │
│   │   └── markdown/
│   │       └── MarkdownRenderer.tsx # Component to render HTML from Markdown and apply styles
│   │
│   ├── lib/
│   │   └── markdown.ts             # Core logic for reading and parsing Markdown files
│   │
│   └── styles/
│       ├── globals.css             # Global application styles
│       └── markdown.css            # Specific styles for rendered Markdown content
│
├── next.config.mjs                 # Next.js configuration file
├── package.json                    # Project dependencies and scripts
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
\`\`\`

### Directory and File Descriptions

*   **`frontend/`**: The root directory for the entire Next.js web application.
    *   **`content/docs/`**: Contains all the Markdown (`.md`) files that serve as the content for your documentation pages. Each file here corresponds to a page on the website.
    *   **`public/`**: Holds static assets like images, fonts, and favicons that are served directly.
    *   **`src/`**: The main source code directory for the application.
        *   **`app/`**: The core of the Next.js App Router.
            *   `layout.tsx`: Defines the main HTML shell and layout for all pages.
            *   `page.tsx`: The entry point for the homepage (`/`).
            *   `docs/[...slug]/page.tsx`: A dynamic route that catches all paths under `/docs/` and renders the corresponding Markdown file.
        *   **`components/`**: Contains all reusable React components, organized by their function.
            *   `features/`: Components that represent specific features of a page (e.g., `FeatureCards`).
            *   `layout/`: Components that define the structure of pages (e.g., `PageLayout`).
            *   `markdown/`: Components specifically for handling Markdown rendering.
        *   **`lib/`**: Utility functions and core logic that are not React components. `markdown.ts` is crucial for processing the content files.
        *   **`styles/`**: Contains all styling files, including global styles and specific component/feature styles.
    *   **Configuration Files**:
        *   `next.config.mjs`: Configures the behavior of the Next.js framework.
        *   `package.json`: Manages Node.js dependencies and defines project scripts.
        *   `tailwind.config.ts`: Configures the Tailwind CSS utility classes and theme.
        *   `tsconfig.json`: Configures the TypeScript compiler options for the project.
