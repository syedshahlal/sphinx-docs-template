#!/bin/bash

# Quick script to activate environment and start development server

echo "🚀 Starting GRA Core Documentation Development Server..."

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
    echo "✅ Virtual environment activated"
else
    echo "❌ Virtual environment not found. Run ./scripts/complete_setup.sh first."
    exit 1
fi

# Build and serve with auto-reload
echo "🔨 Building and serving documentation with auto-reload..."
echo "📱 Server will be available at: http://localhost:8000"
echo "🔄 Documentation will auto-rebuild when files change"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

sphinx-autobuild . _build/html --host 0.0.0.0 --port 8000 --open-browser
