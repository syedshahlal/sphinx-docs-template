#!/bin/bash

# Script to create the initial documentation structure
# Usage: ./scripts/create_documentation_structure.sh

set -e

echo "🚀 Creating GRA Core Platform Documentation Structure..."

# Create main documentation directory
mkdir -p documentation

# Create initial version v1.0.0
VERSION="v1.0.0"
VERSION_DIR="documentation/$VERSION"

echo "📁 Creating version directory: $VERSION_DIR"
mkdir -p "$VERSION_DIR"

# Create main sections
SECTIONS=(
    "user-guide"
    "api-reference"
    "examples"
    "tutorials"
    "contributing"
    "migration"
    "troubleshooting"
)

for section in "${SECTIONS[@]}"; do
    echo "📄 Creating section: $section"
    mkdir -p "$VERSION_DIR/$section"
    
    # Create index.rst for each section
    cat > "$VERSION_DIR/$section/index.rst" << EOF
$(echo "$section" | sed 's/-/ /g' | sed 's/\b\w/\U&/g')
$(printf '=%.0s' $(seq 1 ${#section}))

Welcome to the $(echo "$section" | sed 's/-/ /g') section.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   getting-started
   configuration
   advanced-topics

Overview
--------

This section provides comprehensive information about $(echo "$section" | sed 's/-/ /g').

.. note::
   This documentation is version-controlled. You're viewing version $VERSION.

Getting Started
---------------

Quick start guide for $(echo "$section" | sed 's/-/ /g').

Configuration
-------------

Configuration options and settings.

Advanced Topics
---------------

Advanced usage and customization.

EOF

    # Create some sample content files
    cat > "$VERSION_DIR/$section/getting-started.rst" << EOF
Getting Started
===============

This guide will help you get started with $(echo "$section" | sed 's/-/ /g').

Prerequisites
-------------

Before you begin, ensure you have:

* Python 3.8 or higher
* Node.js 16 or higher
* Git

Installation
------------

.. code-block:: bash

   pip install gra-core-platform

Quick Setup
-----------

1. Initialize your project
2. Configure settings
3. Start development

.. code-block:: python

   from gra_core import Platform
   
   platform = Platform()
   platform.initialize()

Next Steps
----------

* :doc:\`configuration\` - Configure your setup
* :doc:\`advanced-topics\` - Learn advanced features

EOF

    cat > "$VERSION_DIR/$section/configuration.rst" << EOF
Configuration
=============

Configuration options for $(echo "$section" | sed 's/-/ /g').

Basic Configuration
-------------------

.. code-block:: yaml

   # config.yaml
   platform:
     name: "GRA Core Platform"
     version: "$VERSION"
     debug: false

Advanced Configuration
----------------------

Advanced configuration options and settings.

Environment Variables
---------------------

Available environment variables:

* \`GRA_DEBUG\` - Enable debug mode
* \`GRA_LOG_LEVEL\` - Set logging level
* \`GRA_CONFIG_PATH\` - Custom config file path

EOF

    cat > "$VERSION_DIR/$section/advanced-topics.rst" << EOF
Advanced Topics
===============

Advanced usage and customization for $(echo "$section" | sed 's/-/ /g').

Custom Extensions
-----------------

How to create custom extensions.

Performance Optimization
------------------------

Tips for optimizing performance.

Troubleshooting
---------------

Common issues and solutions.

EOF

done

# Create main index.rst
cat > "$VERSION_DIR/index.rst" << EOF
GRA Core Platform Documentation - $VERSION
$(printf '=%.0s' $(seq 1 $((40 + ${#VERSION}))))

Welcome to the GRA Core Platform Documentation.

.. toctree::
   :maxdepth: 2
   :caption: Documentation Sections:

   user-guide/index
   api-reference/index
   examples/index
   tutorials/index
   contributing/index
   migration/index
   troubleshooting/index

Quick Links
-----------

* :doc:\`user-guide/getting-started\` - Get started quickly
* :doc:\`api-reference/index\` - Core API documentation
* :doc:\`examples/index\` - Example implementations

Version Information
-------------------

You are currently viewing documentation for **$VERSION**.

* Release Date: $(date +%Y-%m-%d)
* Status: Active
* Documentation Structure: Versioned

Features
--------

.. grid:: 1 2 2 3
    :gutter: 3

    .. grid-item-card:: 🚀 Quick Start
        :link: user-guide/getting-started
        :link-type: doc

        Get up and running in minutes with our quick start guide.

    .. grid-item-card:: 📚 User Guide
        :link: user-guide/index
        :link-type: doc

        Comprehensive guides for all platform features.

    .. grid-item-card:: 🔧 API Reference
        :link: api-reference/index
        :link-type: doc

        Complete API documentation with examples.

    .. grid-item-card:: 💡 Examples
        :link: examples/index
        :link-type: doc

        Real-world examples and tutorials.

    .. grid-item-card:: 🎯 Tutorials
        :link: tutorials/index
        :link-type: doc

        Step-by-step tutorials for common tasks.

    .. grid-item-card:: 🤝 Contributing
        :link: contributing/index
        :link-type: doc

        Learn how to contribute to the project.

EOF

# Create current_version.txt
echo "$VERSION" > documentation/current_version.txt

# Create version management files
mkdir -p _static

cat > _static/versions.json << EOF
{
  "current": "$VERSION",
  "latest": "$VERSION",
  "versions": [
    {
      "version": "$VERSION",
      "title": "$VERSION (current)",
      "url": "/documentation/$VERSION/",
      "is_current": true,
      "date": "$(date -Iseconds)",
      "status": "active"
    }
  ]
}
EOF

cat > _static/switcher.json << EOF
[
  {
    "version": "$VERSION",
    "url": "https://gra-core-docs.readthedocs.io/documentation/$VERSION/",
    "preferred": true
  }
]
EOF

# Create .gitignore for documentation
cat > documentation/.gitignore << EOF
# Build outputs
_build/
.doctrees/

# Temporary files
*.tmp
*.temp
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Python cache
__pycache__/
*.pyc
*.pyo
EOF

# Create README for documentation
cat > documentation/README.md << EOF
# GRA Core Platform Documentation

This directory contains versioned documentation for the GRA Core Platform.

## Structure

\`\`\`
documentation/
├── v1.0.0/                 # Version 1.0.0 documentation
│   ├── user-guide/
│   ├── api-reference/
│   ├── examples/
│   ├── tutorials/
│   ├── contributing/
│   ├── migration/
│   ├── troubleshooting/
│   └── index.rst
├── v1.1.0/                 # Version 1.1.0 documentation (future)
├── current_version.txt     # Current active version
└── README.md              # This file
\`\`\`

## Version Management

Use the version management script to create and manage documentation versions:

\`\`\`bash
# Create a new version
python scripts/version_manager.py create 1.1.0 --message "Added new features"

# List all versions
python scripts/version_manager.py list

# Switch current version
python scripts/version_manager.py switch 1.1.0

# Validate documentation
python scripts/version_manager.py validate
\`\`\`

## Building Documentation

Build documentation for all versions:

\`\`\`bash
python scripts/documentation_builder.py --all
\`\`\`

Build specific version:

\`\`\`bash
python scripts/documentation_builder.py --version v1.0.0
\`\`\`

## Adding New Content

1. Navigate to the current version directory
2. Add your .rst or .md files
3. Update the appropriate index.rst files
4. When ready for a new version, use the version manager

## File Formats

- Primary: RestructuredText (.rst)
- Secondary: Markdown (.md) with MyST parser
- Configuration: YAML, JSON
- Code examples: Any language with syntax highlighting

EOF

echo "✅ Documentation structure created successfully!"
echo "📁 Main directory: documentation/"
echo "📄 Current version: $VERSION"
echo "🔧 Use 'python scripts/version_manager.py --help' for version management"
echo "🏗️ Use 'python scripts/documentation_builder.py --help' for building docs"
