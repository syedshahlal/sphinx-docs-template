#!/bin/bash

# Integrated Build Script
# Builds both Next.js app and Sphinx documentation

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔨 Building GRA Core Documentation - Integrated Build${NC}"
echo -e "${BLUE}====================================================${NC}"

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Extract React components for Sphinx
echo -e "${GREEN}🧩 Extracting React components...${NC}"
if [ -f "scripts/component_extractor.py" ]; then
    python scripts/component_extractor.py .
fi

# Build Next.js app
echo -e "${GREEN}⚛️  Building Next.js application...${NC}"
npm run build

# Build Sphinx documentation
echo -e "${GREEN}📚 Building Sphinx documentation...${NC}"
if [ -f "docs/Makefile" ]; then
    cd docs && make html && cd ..
else
    sphinx-build . _build/html
fi

echo -e "${GREEN}✅ Integrated build completed successfully!${NC}"
echo -e "${BLUE}📁 Output locations:${NC}"
echo -e "${BLUE}   • Next.js: .next/ and out/${NC}"
echo -e "${BLUE}   • Sphinx: _build/html/${NC}"
