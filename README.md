# GRA Core Platform - Documentation Project

This project contains the source for the GRA Core Platform documentation,
combining a Next.js frontend for dynamic content and Sphinx for static/API documentation.

## Project Structure

- **/frontend**: Next.js application. Handles dynamic pages, Markdown rendering, and UI components.
- **/docs**: Sphinx documentation source files (.rst, conf.py, etc.).
- **/scripts**: Utility scripts for build, deployment, etc.
- **/Makefile**: Helper for common development and build tasks.
- **/_extensions**: Custom Sphinx extensions.
- **/_static**: Global static assets for Sphinx.
- **/_templates**: Global HTML templates for Sphinx.

## Setup

Refer to `frontend/SYSTEM_GUIDE.md` for setting up and using the Next.js/Markdown part.
Refer to Sphinx documentation for setting up the Python/Sphinx environment.

\`\`\`bash
# General setup steps (example)
pip install -r requirements.txt # For Sphinx dependencies
make install-frontend
\`\`\`

## Development

\`\`\`bash
make dev # Example: might need to run frontend and sphinx dev servers separately
# Or:
# cd frontend && npm run dev
# sphinx-autobuild docs docs/_build/html --port 8001
\`\`\`

## Building

\`\`\`bash
make build-frontend
make build-sphinx
\`\`\`
\`\`\`

  {/* Root requirements.txt for Sphinx (or it might be in docs/requirements.txt) */}
```plaintext file="requirements.txt"
# Sphinx and common extensions
sphinx>=4.0
sphinx-rtd-theme
sphinx-autobuild
# Add other Python dependencies for Sphinx, like myst-parser if using Markdown in Sphinx directly
# myst-parser
# Example: if you have custom extensions with dependencies
