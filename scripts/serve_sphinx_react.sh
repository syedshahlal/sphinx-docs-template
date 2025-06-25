#!/bin/bash

# Serve Sphinx documentation with React integration

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🌐 Starting Sphinx Documentation Server with React Integration${NC}"
echo -e "${BLUE}============================================================${NC}"

# Check if build exists
if [ ! -d "_build/html" ]; then
    echo -e "${YELLOW}⚠️  No build found. Building documentation first...${NC}"
    ./scripts/build_sphinx_react.sh
fi

# Start server
PORT=${1:-8000}

echo -e "${GREEN}🚀 Starting server on port ${PORT}...${NC}"
echo -e "${GREEN}📖 Documentation: ${YELLOW}http://localhost:${PORT}${NC}"
echo -e "${GREEN}🎯 Press Ctrl+C to stop${NC}"
echo ""

# Start Python HTTP server
cd _build/html
python3 -m http.server $PORT
