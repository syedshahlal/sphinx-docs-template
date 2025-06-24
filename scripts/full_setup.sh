#!/bin/bash

# Complete setup script for GRA Core Documentation
# This script runs all necessary setup steps in the correct order from scratch

set -e

echo "🚀 GRA Core Documentation - Complete Setup"
echo "=========================================="

# Configuration
VENV_NAME=".venv"
PYTHON_VERSION="3.9" # Or any other version you prefer

# Step 0: Create and activate virtual environment
echo "🌱 Step 0: Creating and activating virtual environment..."
if ! command -v python3 &> /dev/null
then
    echo "Error: python3 is required but not installed."
    exit 1
fi

if ! python3 -m venv --help &> /dev/null; then
    echo "Error: venv module is not available. Please install python3-venv or similar."
    exit 1
fi

if [ ! -d "$VENV_NAME" ]; then
    python3 -m venv "$VENV_NAME"
    echo "Virtual environment created."
else
    echo "Virtual environment already exists."
fi

source "$VENV_NAME/bin/activate"

echo "Virtual environment activated."

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
./scripts/install_dependencies.sh

# Step 2: Setup documentation structure
echo "📁 Step 2: Setting up documentation structure..."
./scripts/setup_docs_structure.sh

# Step 3: Validate setup
echo "🔍 Step 3: Validating setup..."
./scripts/validate_setup.sh

# Step 4: Generate auto-documentation
echo "📚 Step 4: Generating auto-documentation..."
./scripts/generate_autodocs.sh

# Step 5: Build documentation
echo "🔨 Step 5: Building documentation..."
./scripts/build_versioned_docs.sh

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📋 What was set up:"
echo "   ✅ Virtual environment created and activated"
echo "   ✅ Python dependencies installed"
echo "   ✅ Node.js dependencies installed"
echo "   ✅ Documentation structure created"
echo "   ✅ boa_theme configured"
echo "   ✅ Auto-documentation generated"
echo "   ✅ HTML documentation built"
echo ""
echo "🚀 Next steps:"
echo "   • View docs: ./scripts/serve_docs.sh -o"
echo "   • Development: make -C docs livehtml"
echo "   • Create version: ./scripts/create_version.sh -v 5.8"
echo ""
echo "📁 Documentation available at: docs/_build/html/"
