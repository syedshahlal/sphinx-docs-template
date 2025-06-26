# GRA Core Platform - Complete Project Structure

This document outlines the complete folder structure for the GRA Core Platform documentation project, which combines Next.js frontend with Sphinx documentation.

## 📁 Root Directory Structure

\`\`\`
gra-core-platform/
├── 📄 README.md                           # Main project documentation
├── 📄 struct.md                           # This file - complete project structure
├── 📄 Makefile                            # Build automation and task management
├── 📄 requirements.txt                    # Python dependencies for Sphinx
├── 📄 .gitignore                          # Git ignore patterns
│
├── 📁 frontend/                           # Next.js React Application
│   ├── 📄 package.json                    # Node.js dependencies and scripts
│   ├── 📄 package-lock.json               # Locked dependency versions
│   ├── 📄 next.config.mjs                 # Next.js configuration
│   ├── 📄 tailwind.config.ts              # Tailwind CSS configuration
│   ├── 📄 tsconfig.json                   # TypeScript configuration
│   ├── 📄 tsconfig.node.json              # TypeScript config for Node.js
│   ├── 📄 postcss.config.js               # PostCSS configuration
│   ├── 📄 next-env.d.ts                   # Next.js TypeScript declarations
│   ├── 📄 SYSTEM_GUIDE.md                 # Documentation system usage guide
│   │
│   ├── 📁 public/                         # Static assets served by Next.js
│   │   ├── 📁 images/                     # Image assets
│   │   │   ├── 📁 docs/                   # Documentation-specific images
│   │   │   ├── 📄 bank-of-america-logo.png
│   │   │   └── 📄 header-design.png
│   │   ├── 📄 favicon.ico                 # Website favicon
│   │   └── 📄 robots.txt                  # Search engine crawling rules
│   │
│   ├── 📁 src/                            # Source code directory
│   │   ├── 📁 app/                        # Next.js App Router pages
│   │   │   ├── 📄 layout.tsx              # Root layout component
│   │   │   ├── 📄 page.tsx                # Homepage component
│   │   │   ├── 📄 globals.css             # Global CSS styles
│   │   │   ├── 📄 not-found.tsx           # 404 error page
│   │   │   │
│   │   │   └── 📁 docs/                   # Dynamic documentation routes
│   │   │       └── 📁 [...slug]/          # Catch-all dynamic route
│   │   │           └── 📄 page.tsx        # Dynamic doc page renderer
│   │   │
│   │   ├── 📁 components/                 # React components
│   │   │   ├── 📁 core/                   # Core reusable UI components
│   │   │   │   └── 📁 ui/                 # Basic UI elements (shadcn/ui style)
│   │   │   │       ├── 📄 button.tsx      # Button component
│   │   │   │       ├── 📄 card.tsx        # Card component
│   │   │   │       ├── 📄 input.tsx       # Input component
│   │   │   │       └── 📄 index.ts        # Component exports
│   │   │   │
│   │   │   ├── 📁 shared/                 # Composite UI components
│   │   │   │   ├── 📄 Navigation.tsx      # Main navigation component
│   │   │   │   ├── 📄 Footer.tsx          # Footer component
│   │   │   │   └── 📄 TableOfContents.tsx # TOC for documentation
│   │   │   │
│   │   │   ├── 📁 features/               # Feature-specific components
│   │   │   │   ├── 📄 FeatureCards.tsx    # Homepage feature cards
│   │   │   │   ├── 📄 Banner.tsx          # Site banner component
│   │   │   │   └── 📄 Header.tsx          # Site header component
│   │   │   │
│   │   │   ├── 📁 layout/                 # Layout components
│   │   │   │   ├── 📄 PageLayout.tsx      # Standard page layout
│   │   │   │   ├── 📄 Sidebar.tsx         # Documentation sidebar
│   │   │   │   └── 📄 Layout.tsx          # Main layout wrapper
│   │   │   │
│   │   │   └── 📁 markdown/               # Markdown-specific components
│   │   │       ├── 📄 MarkdownRenderer.tsx # Renders parsed markdown
│   │   │       └── 📄 CodeBlock.tsx       # Syntax highlighted code blocks
│   │   │
│   │   ├── 📁 lib/                        # Utility libraries and functions
│   │   │   ├── 📄 markdown.ts             # Markdown parsing and processing
│   │   │   ├── 📄 utils.ts                # General utility functions
│   │   │   └── 📄 docs-config.ts          # Documentation configuration
│   │   │
│   │   ├── 📁 styles/                     # Styling files
│   │   │   ├── 📄 globals.css             # Global CSS with Tailwind
│   │   │   └── 📄 markdown.css            # Markdown-specific styles
│   │   │
│   │   ├── 📁 types/                      # TypeScript type definitions
│   │   │   ├── 📄 index.ts                # Main type exports
│   │   │   ├── 📄 markdown.ts             # Markdown-related types
│   │   │   └── 📄 docs.ts                 # Documentation types
│   │   │
│   │   ├── 📁 hooks/                      # Custom React hooks
│   │   │   ├── 📄 useTheme.ts             # Theme management hook
│   │   │   ├── 📄 useMarkdownPages.ts     # Markdown pages hook
│   │   │   └── 📄 useComponentMount.ts    # Component mounting hook
│   │   │
│   │   ├── 📁 services/                   # API and external services
│   │   │   ├── 📄 api.ts                  # API client configuration
│   │   │   └── 📄 docs-service.ts         # Documentation service
│   │   │
│   │   └── 📁 utils/                      # Utility functions
│   │       ├── 📄 cn.ts                   # Class name utility (clsx)
│   │       ├── 📄 docs-utils.ts           # Documentation utilities
│   │       └── 📄 markdown-processor.ts   # Markdown processing utilities
│   │
│   └── 📁 content/                        # Markdown content files
│       └── 📁 docs/                       # Documentation content
│           ├── 📄 introduction.md         # Platform introduction
│           ├── 📄 api-reference.md        # API documentation
│           ├── 📄 getting-started.md      # Getting started guide
│           ├── 📄 user-guide.md           # User guide
│           ├── 📄 tutorials.md            # Tutorials
│           └── 📁 advanced/               # Advanced topics
│               ├── 📄 architecture.md     # Architecture documentation
│               └── 📄 deployment.md       # Deployment guide
│
├── 📁 docs/                               # Sphinx Documentation
│   ├── 📄 conf.py                         # Sphinx configuration
│   ├── 📄 index.rst                       # Sphinx main page
│   ├── 📄 requirements.txt                # Python dependencies for docs
│   ├── 📄 Makefile                        # Sphinx-specific Makefile
│   │
│   ├── 📁 _build/                         # Generated Sphinx output (ignored)
│   │   └── 📁 html/                       # HTML output directory
│   │
│   ├── 📁 _static/                        # Sphinx static assets
│   │   ├── 📁 css/                        # Custom CSS files
│   │   ├── 📁 js/                         # Custom JavaScript files
│   │   └── 📁 images/                     # Sphinx-specific images
│   │
│   ├── 📁 _templates/                     # Sphinx HTML templates
│   │   ├── 📄 layout.html                 # Base layout template
│   │   └── 📁 partials/                   # Template partials
│   │
│   ├── 📁 api/                            # API documentation
│   │   ├── 📄 index.rst                   # API index
│   │   └── 📄 reference.rst               # API reference
│   │
│   ├── 📁 user-guide/                     # User guide sections
│   │   ├── 📄 index.rst                   # User guide index
│   │   └── 📄 installation.rst            # Installation guide
│   │
│   └── 📁 gcp-5.7/                        # Version-specific documentation
│       └── 📁 0.1/                        # Patch version
│           ├── 📄 conf.py                 # Version-specific config
│           ├── 📄 index.rst               # Version index
│           └── 📄 requirements.txt        # Version dependencies
│
├── 📁 scripts/                            # Build and deployment scripts
│   ├── 📄 setup-docs.sh                   # Initial documentation setup
│   ├── 📄 build-docs.sh                   # Build documentation
│   ├── 📄 deploy.sh                       # Deployment script
│   ├── 📄 serve.py                        # Development server
│   ├── 📄 version_manager.py              # Version management
│   ├── 📄 documentation_builder.py        # Documentation builder
│   ├── 📄 component_extractor.py          # Component extraction
│   ├── 📄 validate_setup.sh               # Setup validation
│   ├── 📄 check_python.sh                 # Python environment check
│   ├── 📄 activate_env.sh                 # Environment activation
│   ├── 📄 quick_serve.sh                  # Quick development server
│   ├── 📄 interactive_setup.sh            # Interactive setup wizard
│   ├── 📄 manage_versions.sh              # Version management
│   ├── 📄 create_version.sh               # Version creation
│   ├── 📄 debug.sh                        # Debug utilities
│   ├── 📄 dev_nextjs.sh                   # Next.js development
│   ├── 📄 dev_nextjs.bat                  # Next.js development (Windows)
│   ├── 📄 setup_doc_links.sh              # Documentation linking
│   ├── 📄 01_check_prerequisites.sh       # Prerequisites check
│   ├── 📄 01_check_prerequisites.bat      # Prerequisites check (Windows)
│   ├── 📄 02_setup_environment.sh         # Environment setup
│   ├── 📄 02_setup_environment.bat        # Environment setup (Windows)
│   ├── 📄 03_extract_components.sh        # Component extraction
│   ├── 📄 04_build_docs.sh                # Documentation build
│   ├── 📄 04_build_docs.bat               # Documentation build (Windows)
│   ├── 📄 05_serve_docs.sh                # Documentation server
│   ├── 📄 06_dev_mode.sh                  # Development mode
│   ├── 📄 test.bat                        # Testing script (Windows)
│   └── 📄 README.md                       # Scripts documentation
│
├── 📁 _extensions/                        # Custom Sphinx extensions
│   ├── 📄 __init__.py                     # Python package init
│   ├── 📄 react_sphinx_integration.py    # React-Sphinx integration
│   └── 📄 chatbot_extension.py            # Chatbot extension
│
├── 📁 _static/                            # Global static assets
│   ├── 📁 css/                            # Global CSS files
│   │   ├── 📄 custom.css                  # Custom styles
│   │   ├── 📄 boa-theme.css               # Bank of America theme
│   │   ├── 📄 navigation.css              # Navigation styles
│   │   ├── 📄 sidebar.css                 # Sidebar styles
│   │   ├── 📄 content.css                 # Content styles
│   │   ├── 📄 components.css              # Component styles
│   │   ├── 📄 chatbot.css                 # Chatbot styles
│   │   └── 📄 react-integration.css       # React integration styles
│   │
│   ├── 📁 js/                             # Global JavaScript files
│   │   ├── 📄 custom.js                   # Custom JavaScript
│   │   ├── 📄 navigation.js               # Navigation functionality
│   │   ├── 📄 search.js                   # Search functionality
│   │   ├── 📄 chatbot.js                  # Chatbot functionality
│   │   ├── 📄 theme-switcher.js           # Theme switching
│   │   ├── 📄 version-compare.js          # Version comparison
│   │   └── 📄 react-integration.js        # React integration
│   │
│   └── 📁 images/                         # Global images
│       ├── 📄 gra-logo.svg                # GRA platform logo
│       ├── 📄 favicon.ico                 # Site favicon
│       └── 📄 bank-of-america-logo.png    # Bank of America logo
│
├── 📁 _templates/                         # Global Sphinx templates
│   ├── 📄 layout.html                     # Base layout template
│   └── 📁 partials/                       # Template components
│       ├── 📄 navbar.html                 # Navigation bar
│       ├── 📄 navbar-center.html          # Center navigation
│       ├── 📄 navbar-mobile.html          # Mobile navigation
│       ├── 📄 navbar-end.html             # End navigation
│       ├── 📄 sidebar.html                # Sidebar template
│       ├── 📄 nav-sections.html           # Navigation sections
│       ├── 📄 breadcrumbs.html            # Breadcrumb navigation
│       ├── 📄 version-warning.html        # Version warnings
│       ├── 📄 article-footer.html         # Article footer
│       ├── 📄 toc-sidebar.html            # Table of contents
│       ├── 📄 chatbot.html                # Chatbot widget
│       ├── 📄 version-compare-modal.html  # Version comparison
│       └── 📄 help-modal.html             # Help modal
│
├── 📁 _themes/                            # Custom Sphinx themes
│   ├── 📁 gra_theme/                      # GRA custom theme
│   │   ├── 📄 theme.conf                  # Theme configuration
│   │   └── 📄 layout.html                 # Theme layout
│   │
│   ├── 📁 gra_boa_theme/                  # Bank of America theme
│   │   └── 📄 layout.html                 # BOA theme layout
│   │
│   └── 📁 boa_theme/                      # Alternative BOA theme
│       ├── 📄 theme.conf                  # Theme configuration
│       ├── 📄 theme.toml                  # Theme TOML config
│       └── 📄 layout.html                 # Theme layout
│
└── 📁 .github/                            # GitHub configuration
    └── 📁 workflows/                      # GitHub Actions workflows
        └── 📄 documentation-workflow.yml  # Documentation CI/CD
\`\`\`

## 🏗️ Architecture Overview

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Typography plugin
- **Language**: TypeScript
- **Content**: Markdown files with frontmatter
- **Routing**: Dynamic catch-all routes for documentation
- **Components**: Organized by purpose (core, shared, features, layout)

### Documentation (Sphinx)
- **Generator**: Sphinx with reStructuredText
- **Theme**: Custom themes with Bank of America branding
- **Extensions**: Custom extensions for React integration
- **Versioning**: Support for multiple documentation versions
- **Output**: Static HTML with custom styling

### Integration Points
- **Build System**: Makefile orchestrates both systems
- **Shared Assets**: Common images and branding elements
- **Cross-linking**: Navigation between Next.js and Sphinx content
- **Deployment**: Unified deployment process for both systems

## 📋 Key Features

### Next.js Frontend
- ✅ Dynamic Markdown rendering
- ✅ Syntax highlighting with PrismJS
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ SEO optimization with Next.js metadata
- ✅ Custom components for documentation

### Sphinx Documentation
- ✅ API documentation generation
- ✅ Custom themes and styling
- ✅ Version management
- ✅ Search functionality
- ✅ Cross-references and linking
- ✅ Multiple output formats

### Development Workflow
- ✅ Hot reload for both systems
- ✅ Automated build processes
- ✅ Linting and code quality checks
- ✅ Cross-platform scripts (Unix/Windows)
- ✅ Environment validation
- ✅ Interactive setup wizards

## 🚀 Getting Started

1. **Install Dependencies**:
   \`\`\`bash
   # Frontend dependencies
   cd frontend && npm install
   
   # Python dependencies
   pip install -r requirements.txt
   \`\`\`

2. **Development**:
   \`\`\`bash
   # Start Next.js development server
   make dev-frontend
   
   # Start Sphinx auto-build
   make dev-docs
   \`\`\`

3. **Build**:
   \`\`\`bash
   # Build everything
   make build
   
   # Build frontend only
   make build-frontend
   
   # Build Sphinx docs only
   make build-sphinx
   \`\`\`

4. **Deploy**:
   \`\`\`bash
   # Deploy to configured platform
   make deploy
   \`\`\`

## 📚 Documentation

- **Frontend Guide**: `frontend/SYSTEM_GUIDE.md`
- **Scripts Documentation**: `scripts/README.md`
- **Main README**: `README.md`
- **This Structure**: `struct.md`

---

**Last Updated**: January 2024  
**Version**: 1.0.0  
**Maintainer**: GRA Core Platform Team
