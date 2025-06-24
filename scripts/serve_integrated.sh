#!/bin/bash

# Integrated Serve Script
# Serves the built documentation with both Next.js and Sphinx outputs

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌐 Starting GRA Core Documentation - Production Serve Mode${NC}"
echo -e "${BLUE}============================================================${NC}"

# Check if builds exist
if [ ! -d "_build/html" ] && [ ! -d ".next" ]; then
    echo -e "${YELLOW}⚠️  No builds found. Building now...${NC}"
    ./scripts/build_integrated.sh
fi

# Create a function to cleanup background processes
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    jobs -p | xargs -r kill
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Serve Next.js build if it exists
if [ -d ".next" ]; then
    echo -e "${GREEN}🚀 Starting Next.js production server on port 3000...${NC}"
    npm run start &
    NEXTJS_PID=$!
fi

# Serve Sphinx build if it exists
if [ -d "_build/html" ]; then
    echo -e "${GREEN}📚 Starting Sphinx documentation server on port 8000...${NC}"
    cd _build/html && python3 -m http.server 8000 &
    SPHINX_PID=$!
    cd ../..
fi

echo ""
echo -e "${GREEN}✅ Production servers started successfully!${NC}"
echo -e "${BLUE}📋 Available URLs:${NC}"
echo -e "${BLUE}   • Next.js App:        http://localhost:3000${NC}"
echo -e "${BLUE}   • Sphinx Docs:        http://localhost:8000${NC}"
echo -e "${BLUE}   • Component Gallery:  http://localhost:8000/component_gallery.html${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"

# Wait for background processes
wait
