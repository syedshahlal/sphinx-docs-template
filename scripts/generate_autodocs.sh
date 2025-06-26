#!/bin/bash

# Generate auto-documentation using sphinx-apidoc
# This script creates API documentation from Python source code

set -e

echo "🔧 Generating auto-documentation..."

# Change to docs directory
cd docs

# Remove existing API documentation
if [ -d "api" ]; then
    echo "🧹 Cleaning existing API documentation..."
    rm -rf api/*
fi

# Create api directory if it doesn't exist
mkdir -p api

# Generate API documentation from source code
echo "📚 Running sphinx-apidoc..."
sphinx-apidoc -o api ../src/gra_core --force --separate --module-first

# Update the modules.rst to have a better title
if [ -f "api/modules.rst" ]; then
    echo "📝 Updating API documentation titles..."
    sed -i.bak '1s/.*/API Reference/' api/modules.rst
    sed -i.bak '2s/.*/=============/' api/modules.rst
    rm -f api/modules.rst.bak
fi

# Create a comprehensive API index
cat > api/index.rst << 'EOF'
API Documentation
=================

This section contains the complete API reference for the GRA Core Platform.

Core Modules
------------

.. toctree::
   :maxdepth: 2

   modules

Module Index
------------

.. autosummary::
   :toctree: _autosummary
   :recursive:

   gra_core

Search
------

* :ref:`genindex`
* :ref:`modindex`
EOF

echo "✅ Auto-documentation generated successfully!"
echo "📁 Generated files in docs/api/:"
ls -la api/

cd ..
