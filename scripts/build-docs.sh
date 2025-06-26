#!/bin/bash

# GRA Core Platform Documentation Build Script
# Builds both React frontend and Sphinx documentation

set -e

# Default values
SERVE=false
WATCH=false
CLEAN=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --serve)
            SERVE=true
            shift
            ;;
        --watch)
            WATCH=true
            shift
            ;;
        --clean)
            CLEAN=true
            shift
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

echo "🔨 Building GRA Core Platform Documentation..."

# Clean build directories if requested
if [ "$CLEAN" = true ]; then
    echo "🧹 Cleaning build directories..."
    rm -rf frontend/dist
    rm -rf docs/gcp-5.7/0.1/_build
    rm -rf docs/_shared_static/react-build
fi

# Activate Python virtual environment
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    echo "❌ Virtual environment not found. Run ./scripts/setup-docs.sh first."
    exit 1
fi

# Build React frontend
echo "⚛️  Building React components..."
cd frontend
npm run build
cd ..

# Copy React build to Sphinx static directory
echo "📁 Copying React build to Sphinx..."
mkdir -p docs/_shared_static/react-build
cp -r frontend/dist/* docs/_shared_static/react-build/

# Build Sphinx documentation
echo "📚 Building Sphinx documentation..."
cd docs/gcp-5.7/0.1

if [ "$WATCH" = true ]; then
    echo "👀 Starting Sphinx auto-build (watching for changes)..."
    sphinx-autobuild . _build/html --host 0.0.0.0 --port 8000
elif [ "$SERVE" = true ]; then
    sphinx-build -b html . _build/html
    echo "🌐 Starting local server..."
    cd _build/html
    python -m http.server 8000
else
    sphinx-build -b html . _build/html
    echo "✅ Documentation built successfully!"
    echo "📂 Output directory: docs/gcp-5.7/0.1/_build/html"
fi
