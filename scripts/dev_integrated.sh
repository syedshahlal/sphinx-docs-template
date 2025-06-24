#!/bin/bash

# Integrated Development Script
# Runs both Next.js dev server and Sphinx auto-build in parallel

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting GRA Core Documentation - Integrated Development Mode${NC}"
echo -e "${BLUE}================================================================${NC}"

# Check if virtual environment exists and activate it
if [ -d "venv" ]; then
    echo -e "${GREEN}📦 Activating Python virtual environment...${NC}"
    source venv/bin/activate
elif [ -d ".venv" ]; then
    echo -e "${GREEN}📦 Activating Python virtual environment...${NC}"
    source .venv/bin/activate
else
    echo -e "${YELLOW}⚠️  No virtual environment found. Creating one...${NC}"
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi

# Install Node.js dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${GREEN}📦 Installing Node.js dependencies...${NC}"
    npm install
fi

# Create a function to cleanup background processes
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down development servers...${NC}"
    jobs -p | xargs -r kill
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

echo -e "${GREEN}🌐 Starting Next.js development server on port 3000...${NC}"
npm run dev &
NEXTJS_PID=$!

echo -e "${GREEN}📚 Starting Sphinx auto-build on port 8000...${NC}"
if [ -f "docs/Makefile" ]; then
    cd docs && make livehtml &
    SPHINX_PID=$!
    cd ..
else
    sphinx-autobuild . _build/html --host 0.0.0.0 --port 8000 &
    SPHINX_PID=$!
fi

echo ""
echo -e "${GREEN}✅ Development servers started successfully!${NC}"
echo -e "${BLUE}📋 Available URLs:${NC}"
echo -e "${BLUE}   • Next.js App:        http://localhost:3000${NC}"
echo -e "${BLUE}   • Sphinx Docs:        http://localhost:8000${NC}"
echo -e "${BLUE}   • Component Gallery:  http://localhost:8000/component_gallery.html${NC}"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo -e "${YELLOW}   • Edit React components in components/ or app/${NC}"
echo -e "${YELLOW}   • Edit documentation in src/gcp_docs/${NC}"
echo -e "${YELLOW}   • Both servers auto-reload on file changes${NC}"
echo -e "${YELLOW}   • Press Ctrl+C to stop both servers${NC}"
echo ""

# Wait for background processes
wait $NEXTJS_PID $SPHINX_PID
