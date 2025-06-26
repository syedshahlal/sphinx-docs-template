# Documentation System Guide (Next.js + Markdown)

This guide explains how to create, manage, and customize documentation using the Next.js and Markdown setup in the `frontend` application.

## Overview

The system uses Markdown files stored in `frontend/content/docs/` for documentation content. These files are dynamically routed and rendered as React pages.

## Creating New Documentation Pages

1.  **Create a Markdown File**:
    *   Add a new `.md` file inside the `frontend/content/docs/` directory.
    *   You can create subdirectories for organization (e.g., `frontend/content/docs/user-guide/getting-started.md`). The URL will reflect this structure (e.g., `/docs/user-guide/getting-started`).

2.  **Add Frontmatter**:
    *   At the top of your Markdown file, include YAML frontmatter for metadata.
    *   **Required**: `title` (string) - The main title of the document.
    *   **Optional**:
        *   `date` (string, YYYY-MM-DD format) - Publication date.
        *   `description` (string) - A short summary for SEO and previews.
        *   Any other custom fields you might want to use.

    Example Frontmatter:
    \`\`\`yaml
    ---
    title: "My Awesome Document"
    date: "2024-01-15"
    description: "A guide to doing awesome things."
    tags: ["guide", "awesome"]
    ---
    \`\`\`

3.  **Write Content**:
    *   Use standard Markdown syntax for your content.
    *   Code blocks will be automatically syntax-highlighted using PrismJS. Specify the language after the opening backticks (e.g., \`\`\`python).

## Linking Between Pages

-   Use standard Markdown links.
-   For internal documentation pages, use root-relative paths starting with `/docs/`.
    Example: `[Link to Introduction](/docs/introduction)`
    Example: `[Link to a nested page](/docs/category/sub-page)`

## Adding Images

1.  Place your images in the `frontend/public/images/docs/` directory (or any subdirectory within `public`).
2.  Link them in Markdown using a path relative to the `public` folder:
    `![Alt text for image](/images/docs/my-image.png)`

## Syntax Highlighting

-   Code blocks are highlighted using PrismJS.
-   Supported languages are pre-configured in `frontend/src/components/markdown/MarkdownRenderer.tsx`. You can add more by importing them from `prismjs/components/`.
-   Example:
    \`\`\`javascript
    function hello() {
      console.log("Hello, world!");
    }
    \`\`\`

## Customizing Styling

-   **Tailwind Typography**: Base styling is provided by the `@tailwindcss/typography` plugin (prose classes) applied in `MarkdownRenderer.tsx`.
-   **Custom CSS**: Further customizations can be made in `frontend/src/styles/markdown.css`. This file allows you to override or extend prose styles.
-   **Global Styles**: Global styles are in `frontend/src/styles/globals.css`.

## Layout

-   Documentation pages use the `PageLayout` component (`frontend/src/components/layout/PageLayout.tsx`). You can modify this component to change the overall structure (e.g., add a sidebar).

## Advanced: Using React Components in Markdown (MDX)

Currently, this setup renders plain HTML from Markdown. If you need to embed interactive React components directly within your Markdown content, you should consider migrating to **MDX**.

MDX allows you to write JSX in your Markdown files. This would involve:
1.  Renaming `.md` files to `.mdx`.
2.  Updating the Markdown processing logic in `frontend/src/lib/markdown.ts` to use an MDX parser (like `@next/mdx` or `next-mdx-remote`).
3.  Potentially adjusting the `MarkdownRenderer` component.

This is a more advanced setup but offers greater flexibility for rich content.

## Deployment

-   The Next.js application can be deployed to platforms like Vercel, Netlify, or any Node.js hosting.
-   If using static export (`output: 'export'` in `next.config.mjs`), ensure all doc pages are generated via `generateStaticParams` in `frontend/src/app/docs/[...slug]/page.tsx`.

## Best Practices

-   **Organize Content**: Use subdirectories in `frontend/content/docs/` for logical grouping.
-   **Consistent Frontmatter**: Use consistent frontmatter fields across documents.
-   **Descriptive Slugs**: File names (which become URL slugs) should be descriptive.
-   **Optimize Images**: Compress images before adding them to `public/`.
-   **Accessible Content**: Write clear, well-structured Markdown. Use alt text for images.
\`\`\`

  {/* --- Sphinx Documentation Placeholder Structure --- */}
  {/* These are illustrative; your actual Sphinx structure might be more complex or versioned. */}
  {/* Many of these might already exist from your initial project setup. */}

```plaintext file="docs/conf.py"
# Sphinx configuration file
import os
import sys
sys.path.insert(0, os.path.abspath('../_extensions')) # If you have custom extensions

project = 'GRA Core Platform (Sphinx)'
copyright = '2024, Your Company'
author = 'Your Company'
release = '1.0'

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.viewcode',
    'sphinx_rtd_theme',
    # 'myst_parser', # If using MyST for Markdown in Sphinx
    # Add your custom extensions here if any
]

templates_path = ['../_templates'] # Relative to conf.py location
html_static_path = ['../_static'] # Relative to conf.py location

html_theme = 'sphinx_rtd_theme'

# Example intersphinx mapping
intersphinx_mapping = {'python': ('https://docs.python.org/3', None)}

# MyST Parser configuration (if using Markdown directly in Sphinx)
# source_suffix = {
#     '.rst': 'restructuredtext',
#     '.txt': 'markdown',
#     '.md': 'markdown',
# }

# Exclude patterns
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']
