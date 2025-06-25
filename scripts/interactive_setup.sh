#!/bin/bash

# Interactive Setup - Choose what to run
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

show_main_menu() {
    echo ""
    echo -e "${BLUE}🚀 GRA Core Documentation Setup${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
    echo -e "${GREEN}  1. 🎯 Complete Setup (Recommended)${NC}"
    echo -e "${GREEN}  2. 🔍 Check Prerequisites Only${NC}"
    echo -e "${GREEN}  3. 🛠️  Setup Environment Only${NC}"
    echo -e "${GREEN}  4. 🧩 Extract Components Only${NC}"
    echo -e "${GREEN}  5. 📚 Build Documentation Only${NC}"
    echo -e "${GREEN}  6. 🌐 Serve Documentation${NC}"
    echo -e "${GREEN}  7. 🔄 Development Mode (Auto-reload)${NC}"
    echo -e "${GREEN}  8. ❌ Exit${NC}"
    echo ""
}

handle_choice() {
    case $1 in
        1)
            echo -e "${BLUE}Running complete setup...${NC}"
            ./scripts/setup_all.sh
            ;;
        2)
            echo -e "${BLUE}Checking prerequisites...${NC}"
            ./scripts/01_check_prerequisites.sh
            ;;
        3)
            echo -e "${BLUE}Setting up environment...${NC}"
            ./scripts/02_setup_environment.sh
            ;;
        4)
            echo -e "${BLUE}Extracting components...${NC}"
            ./scripts/03_extract_components.sh
            ;;
        5)
            echo -e "${BLUE}Building documentation...${NC}"
            ./scripts/04_build_docs.sh
            ;;
        6)
            echo -e "${BLUE}Serving documentation...${NC}"
            ./scripts/05_serve_docs.sh
            ;;
        7)
            echo -e "${BLUE}Starting development mode...${NC}"
            ./scripts/06_dev_mode.sh
            ;;
        8)
            echo -e "${YELLOW}Goodbye! 👋${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Invalid option. Please choose 1-8.${NC}"
            ;;
    esac
}

# Make scripts executable
chmod +x scripts/*.sh

# Main loop
while true; do
    show_main_menu
    read -p "Choose an option (1-8): " choice
    handle_choice "$choice"
    echo ""
    read -p "Press Enter to continue..."
done
