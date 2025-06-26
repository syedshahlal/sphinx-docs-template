#!/bin/bash

# Complete Setup - Run all setup scripts in order
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 GRA Core Documentation - Complete Setup${NC}"
echo "==========================================="

# Make all scripts executable
chmod +x scripts/*.sh

echo -e "${GREEN}Running complete setup process...${NC}"
echo ""

# Step 1: Check prerequisites
echo -e "${BLUE}Step 1/4: Checking prerequisites...${NC}"
./scripts/01_check_prerequisites.sh
echo ""

# Step 2: Setup environment
echo -e "${BLUE}Step 2/4: Setting up environment...${NC}"
./scripts/02_setup_environment.sh
echo ""

# Step 3: Extract components
echo -e "${BLUE}Step 3/4: Extracting components...${NC}"
./scripts/03_extract_components.sh
echo ""

# Step 4: Build documentation
echo -e "${BLUE}Step 4/4: Building documentation...${NC}"
./scripts/04_build_docs.sh
echo ""

echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "${YELLOW}  • Serve docs: ./scripts/05_serve_docs.sh${NC}"
echo -e "${YELLOW}  • Dev mode:   ./scripts/06_dev_mode.sh${NC}"
echo -e "${YELLOW}  • Rebuild:    ./scripts/04_build_docs.sh${NC}"
echo ""
