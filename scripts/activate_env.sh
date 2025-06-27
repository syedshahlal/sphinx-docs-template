#!/bin/bash

# Simple script to activate the virtual environment and provide helpful commands

echo "🐍 Activating GRA Core Documentation Environment..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run ./scripts/complete_setup.sh first."
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

echo "✅ Virtual environment activated!"
echo ""
echo "📋 Available Commands:"
echo "  sphinx-build . _build/html           # Build documentation"
echo "  sphinx-autobuild . _build/html       # Auto-rebuild on changes"
echo "  ./scripts/build_docs.sh              # Quick build"
echo "  ./scripts/serve_docs.sh              # Serve documentation"
echo "  deactivate                           # Exit virtual environment"
echo ""
echo "🚀 Quick Start:"
echo "  sphinx-autobuild . _build/html --host 0.0.0.0 --port 8000"
echo ""

# Start a new shell with the activated environment
exec "$SHELL"
