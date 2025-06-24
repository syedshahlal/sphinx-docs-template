#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Info, Warning, Error prefixes
INFO="[INFO] "
WARNING="[WARNING] "
ERROR="[ERROR] "

# Function to print error messages
print_error() {
    echo -e "${RED}${ERROR}$1${NC}"
}

# Function to print warning messages
print_warning() {
    echo -e "${YELLOW}${WARNING}$1${NC}"
}

# Function to print info messages
print_info() {
    echo -e "${BLUE}${INFO}$1${NC}"
}

# Function to run a script and handle errors
run_script() {
    script_path="$1"
    description="$2"

    print_info "Running: $description"
    if [ -x "$script_path" ]; then
        "$script_path"
        if [ $? -ne 0 ]; then
            print_error "Script '$script_path' failed. Check the output above."
            exit 1
        fi
    else
        print_error "Script '$script_path' not found or not executable."
        exit 1
    fi
}

# Function to display the main menu
show_main_menu() {
    echo ""
    echo -e "${BLUE}📋 Available setup options:${NC}"
    echo -e "${GREEN}  1. 🚀 Complete Setup (Recommended for first-time users)${NC}"
    echo -e "${GREEN}  2. 🧩 React + Sphinx Integration (New!)${NC}"
    echo -e "${GREEN}  3. 🔧 Step-by-step Setup${NC}"
    echo -e "${GREEN}  4. 🛠️ Utility Scripts${NC}"
    echo -e "${GREEN}  5. ❌ Exit${NC}"
    echo ""
}

# Function to display the step-by-step menu
show_step_by_step_menu() {
    echo ""
    echo -e "${BLUE}🔧 Step-by-step Setup Options:${NC}"
    echo -e "${GREEN}  1. 📦 Install Dependencies${NC}"
    echo -e "${GREEN}  2. ⚙️ Configure Sphinx${NC}"
    echo -e "${GREEN}  3. 🎨 Customize Theme${NC}"
    echo -e "${GREEN}  4. ⬅️ Back to Main Menu${NC}"
    echo ""

    read -p "Choose an option (1-4): " step_choice

    case $step_choice in
        1)
            run_script "scripts/install_dependencies.sh" "Installing dependencies"
            ;;
        2)
            run_script "scripts/configure_sphinx.sh" "Configuring Sphinx"
            ;;
        3)
            run_script "scripts/customize_theme.sh" "Customizing the theme"
            ;;
        4)
            show_main_menu
            ;;
        *)
            print_error "Invalid option. Please choose 1-4."
            show_step_by_step_menu
            ;;
    esac
}

# Function to display the utility menu
show_utility_menu() {
    echo ""
    echo -e "${BLUE}🛠️ Utility Scripts:${NC}"
    echo -e "${GREEN}  1. 🧹 Clean Build Directory${NC}"
    echo -e "${GREEN}  2. 🔄 Update Dependencies${NC}"
    echo -e "${GREEN}  3. ⬅️ Back to Main Menu${NC}"
    echo ""

    read -p "Choose an option (1-3): " utility_choice

    case $utility_choice in
        1)
            run_script "scripts/clean_build.sh" "Cleaning the build directory"
            ;;
        2)
            run_script "scripts/update_dependencies.sh" "Updating dependencies"
            ;;
        3)
            show_main_menu
            ;;
        *)
            print_error "Invalid option. Please choose 1-3."
            show_utility_menu
            ;;
    esac
}

# Function to handle the main menu choice
handle_menu_choice() {
    case $1 in
        1)
            echo -e "${BLUE}${INFO} Running complete setup...${NC}"
            run_script "scripts/complete_setup.sh" "Complete automated setup with virtual environment"
            ;;
        2)
            echo -e "${BLUE}${INFO} Running React + Sphinx integration setup...${NC}"
            if [ -f "scripts/complete_setup.sh" ]; then
                ./scripts/complete_setup.sh
            else
                print_error "React integration script not found"
            fi
            ;;
        3)
            show_step_by_step_menu
            ;;
        4)
            show_utility_menu
            ;;
        5)
            echo -e "${YELLOW}Goodbye! 👋${NC}"
            exit 0
            ;;
        *)
            print_error "Invalid option. Please choose 1-5."
            ;;
    esac
}

# Main script execution
while true; do
    show_main_menu
    read -p "Choose an option (1-5): " choice

    handle_menu_choice "$choice"
done
