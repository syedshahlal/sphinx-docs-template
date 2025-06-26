#!/bin/bash

# Serve documentation locally with proper version handling
# This script serves the built documentation from docs/_build

set -e

# Configuration
BUILD_DIR="docs/_build/html"
DEFAULT_PORT=8000
DEFAULT_VERSION="v5.7"

# Parse command line arguments
PORT=$DEFAULT_PORT
VERSION=""
OPEN_BROWSER=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -o|--open)
            OPEN_BROWSER=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -p, --port PORT         Port to serve on (default: 8000)"
            echo "  -v, --version VERSION   Serve specific version"
            echo "  -o, --open              Open browser automatically"
            echo "  -h, --help              Show this help"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build directory not found: $BUILD_DIR"
    echo "🔧 Please run: ./scripts/build_versioned_docs.sh first"
    exit 1
fi

# Determine what to serve
if [ -n "$VERSION" ]; then
    # Serve specific version
    VERSION_DIR="$BUILD_DIR/$VERSION"
    if [ ! -d "$VERSION_DIR" ]; then
        echo "❌ Version $VERSION not found in $BUILD_DIR"
        echo "📋 Available versions:"
        ls -1 "$BUILD_DIR" | grep -E '^v[0-9]+\.[0-9]+' || echo "   No versions found"
        exit 1
    fi
    SERVE_DIR="$VERSION_DIR"
    URL="http://localhost:$PORT"
    echo "🚀 Serving documentation for version $VERSION..."
else
    # Serve version index
    SERVE_DIR="$BUILD_DIR"
    URL="http://localhost:$PORT"
    echo "🚀 Serving documentation index with all versions..."
fi

echo "📁 Serving from: $SERVE_DIR"
echo "🌐 URL: $URL"

# Function to open browser
open_browser() {
    sleep 2
    if command -v xdg-open > /dev/null; then
        xdg-open "$URL"
    elif command -v open > /dev/null; then
        open "$URL"
    elif command -v start > /dev/null; then
        start "$URL"
    else
        echo "🌐 Please open $URL in your browser"
    fi
}

# Open browser if requested
if [ "$OPEN_BROWSER" = true ]; then
    open_browser &
fi

# Start server
echo "🔄 Starting server on port $PORT..."
echo "📖 Press Ctrl+C to stop"

cd "$SERVE_DIR"

# Try different Python HTTP servers
if command -v python3 > /dev/null; then
    python3 -m http.server "$PORT"
elif command -v python > /dev/null; then
    python -m http.server "$PORT"
else
    echo "❌ Python not found. Please install Python to serve documentation."
    exit 1
fi
