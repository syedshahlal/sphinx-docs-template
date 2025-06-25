#!/bin/bash

# Development Mode - Auto-rebuild on file changes
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🔄 Starting Development Mode${NC}"
echo "============================"

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Check if sphinx-autobuild is installed
if ! command -v sphinx-autobuild &> /dev/null; then
    echo -e "${YELLOW}📦 Installing sphinx-autobuild...${NC}"
    pip install sphinx-autobuild
fi

# Get port (default 8000)
PORT=${1:-8000}

echo -e "${GREEN}🚀 Starting auto-reload server on port ${PORT}...${NC}"
echo -e "${GREEN}📖 Documentation: ${YELLOW}http://localhost:${PORT}${NC}"
echo -e "${GREEN}🔄 Auto-reload enabled - edit files and see changes instantly${NC}"
echo -e "${GREEN}🎯 Press Ctrl+C to stop${NC}"
echo ""

# Start auto-build server
sphinx-autobuild . _build/html --host 0.0.0.0 --port $PORT
