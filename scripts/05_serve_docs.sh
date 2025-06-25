#!/bin/bash

# Serve Documentation - Start development server
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🌐 Starting Documentation Server${NC}"
echo "================================"

# Check if build exists
if [ ! -d "_build/html" ]; then
    echo -e "${YELLOW}⚠️  No build found. Building documentation first...${NC}"
    ./scripts/04_build_docs.sh
fi

# Get port (default 8000)
PORT=${1:-8000}

echo -e "${GREEN}🚀 Starting server on port ${PORT}...${NC}"
echo -e "${GREEN}📖 Documentation: ${YELLOW}http://localhost:${PORT}${NC}"
echo -e "${GREEN}🎯 Press Ctrl+C to stop${NC}"
echo ""

# Start server
cd _build/html
python3 -m http.server $PORT
