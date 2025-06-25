#!/bin/bash

# Setup Sphinx with React Components
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Setting up Sphinx with React Components${NC}"
echo -e "${BLUE}=========================================${NC}"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "${GREEN}📦 Creating Python virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${GREEN}📦 Activating virtual environment...${NC}"
source venv/bin/activate

# Install dependencies
echo -e "${GREEN}📦 Installing Python dependencies...${NC}"
pip install -r requirements.txt

# Convert React components
echo -e "${GREEN}🔄 Converting React components...${NC}"
python scripts/convert_react_to_sphinx.py .

# Make scripts executable
echo -e "${GREEN}🔧 Making scripts executable...${NC}"
chmod +x scripts/*.sh

echo -e "${GREEN}✅ Setup completed!${NC}"
echo ""
echo -e "${BLUE}📋 Available commands:${NC}"
echo -e "${BLUE}  • Build: ./scripts/build_sphinx_with_react.sh${NC}"
echo -e "${BLUE}  • Serve: ./scripts/serve_sphinx_react.sh${NC}"
echo -e "${BLUE}  • Development: sphinx-autobuild . _build/html${NC}"
echo ""
echo -e "${YELLOW}💡 Quick start:${NC}"
echo -e "${YELLOW}  ./scripts/serve_sphinx_react.sh${NC}"
