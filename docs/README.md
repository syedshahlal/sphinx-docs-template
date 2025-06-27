# GRA Core Platform Documentation

Welcome to the GRA Core Platform documentation repository built with Sphinx.

## Available Versions

| Version | Status | Support Level | Documentation |
|---------|--------|---------------|---------------|
| [v5.7](v5.7/) | ✅ Current | Full Support | Complete |
| [v5.6](v5.6/) | ⚠️ Deprecated | Security Only | Limited |
| [v5.5](v5.5/) | ❌ End of Life | None | Archive |
| [v5.4](v5.4/) | ❌ End of Life | None | Archive |
| [v5.3](v5.3/) | ❌ End of Life | None | Archive |
| [v5.2](v5.2/) | ❌ End of Life | None | Archive |
| [v5.1](v5.1/) | ❌ End of Life | None | Archive |

## Quick Start

For the latest documentation, visit [v5.7](v5.7/).

## Building Documentation

\`\`\`bash
# Install dependencies
pip install -r requirements.txt

# Build current version
make html

# Build all versions
python scripts/documentation_builder.py --all

# Serve locally
python scripts/serve.py
\`\`\`

## Structure

This documentation follows Sphinx conventions with versioned content organized by feature areas matching the homepage tiles.
