#!/bin/bash

# Ensure script doesn't close immediately
set -e
trap 'echo "Script failed at line $LINENO. Press any key to exit..."; read -n 1' ERR

# Add debug mode
if [[ "${1}" == "--debug" ]]; then
    set -x
fi

# Extract Components - Convert React components for Sphinx
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🧩 Extracting React Components${NC}"
echo "=============================="

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Run component extraction if extractor exists
if [ -f "scripts/component_extractor.py" ]; then
    echo -e "${GREEN}🔄 Running component extractor...${NC}"
    python scripts/component_extractor.py .
else
    echo -e "${YELLOW}⚠️  Component extractor not found. Creating basic extraction...${NC}"
    
    # Create basic component mapping
    mkdir -p _static/react-components
    
    # Copy component files if they exist
    if [ -d "components" ]; then
        echo -e "${GREEN}📁 Copying components to _static...${NC}"
        cp -r components _static/react-components/ 2>/dev/null || true
    fi
    
    if [ -d "app" ]; then
        echo -e "${GREEN}📁 Copying app files to _static...${NC}"
        cp -r app _static/react-components/ 2>/dev/null || true
    fi
fi

echo -e "${GREEN}🎉 Component extraction completed!${NC}"
echo ""
echo "Press any key to continue..."
read -n 1 -s
