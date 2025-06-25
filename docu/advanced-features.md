# Advanced Features

Explore the advanced capabilities of the documentation system.

## Table of Contents Generation

The system automatically generates table of contents from your markdown headings.

### How it works

1. Parses markdown content
2. Extracts headings (H1-H6)
3. Creates navigable links
4. Updates on content changes

## Search Functionality

Built-in search allows users to quickly find relevant documentation.

### Features

- Full-text search
- Category filtering
- Keyboard shortcuts
- Search highlighting

## Theme Support

The documentation supports both light and dark themes with automatic system detection.

### Customization

You can customize the theme colors and styling through the CSS variables in `globals.css`.

## File Organization

Organize your documentation using folders and subfolders:

\`\`\`
docu/
├── getting-started.md
├── api/
│   ├── authentication.md
│   └── endpoints.md
├── guides/
│   ├── installation.md
│   └── configuration.md
└── examples/
    └── code-samples.md
\`\`\`

## Live Updates

The documentation automatically updates when you modify files in the `docu` folder during development.
