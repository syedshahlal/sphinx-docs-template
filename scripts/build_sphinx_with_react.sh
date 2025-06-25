#!/bin/bash

# Build Sphinx Documentation with Converted React Components
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔨 Building Sphinx Documentation with React Components${NC}"
echo -e "${BLUE}====================================================${NC}"

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo -e "${GREEN}📦 Activating Python virtual environment...${NC}"
    source venv/bin/activate
elif [ -d ".venv" ]; then
    echo -e "${GREEN}📦 Activating Python virtual environment...${NC}"
    source .venv/bin/activate
fi

# Step 1: Convert React components to Sphinx templates
echo -e "${GREEN}🔄 Converting React components to Sphinx templates...${NC}"
if [ -f "scripts/convert_react_to_sphinx.py" ]; then
    python scripts/convert_react_to_sphinx.py .
else
    echo -e "${YELLOW}⚠️ React converter not found, skipping conversion...${NC}"
fi

# Step 2: Clean previous build
echo -e "${GREEN}🧹 Cleaning previous build...${NC}"
rm -rf _build/

# Step 3: Build Sphinx documentation
echo -e "${GREEN}📚 Building Sphinx documentation...${NC}"
sphinx-build -b html . _build/html

# Step 4: Copy additional assets
echo -e "${GREEN}📁 Copying additional assets...${NC}"
if [ -d "public" ]; then
    cp -r public/* _build/html/ 2>/dev/null || true
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo -e "${BLUE}📁 Output: _build/html/${NC}"
echo -e "${BLUE}🌐 Open: _build/html/index.html${NC}"
