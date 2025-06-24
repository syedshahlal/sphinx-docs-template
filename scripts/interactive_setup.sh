#!/bin/bash

# Interactive Setup Script for GRA Core Documentation
# This script presents a menu of all available scripts and asks user to run each one

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_header() {
    echo -e "${PURPLE}========================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}========================================${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_question() {
    echo -e "${CYAN}❓ $1${NC}"
}

# Function to ask yes/no question
ask_yes_no() {
    local question="$1"
    local default="${2:-n}"
    
    if [ "$default" = "y" ]; then
        prompt="[Y/n]"
    else
        prompt="[y/N]"
    fi
    
    while true; do
        print_question "$question $prompt: "
        read -r response
        
        # Use default if no response
        if [ -z "$response" ]; then
            response="$default"
        fi
        
        case "$response" in
            [yY]|[yY][eE][sS])
                return 0
                ;;
            [nN]|[nN][oO])
                return 1
                ;;
            *)
                print_warning "Please answer yes (y) or no (n)."
                ;;
        esac
    done
}

# Function to run a script with error handling
run_script() {
    local script_path="$1"
    local script_name="$2"
    local description="$3"
    
    if [ ! -f "$script_path" ]; then
        print_error "Script not found: $script_path"
        return 1
    fi
    
    if [ ! -x "$script_path" ]; then
        print_info "Making script executable: $script_path"
        chmod +x "$script_path"
    fi
    
    echo ""
    print_info "Running: $script_name"
    print_info "Description: $description"
    echo ""
    
    if bash "$script_path"; then
        print_success "$script_name completed successfully!"
        return 0
    else
        print_error "$script_name failed!"
        if ask_yes_no "Continue with remaining scripts despite this failure?" "n"; then
            return 0
        else
            print_error "Setup aborted by user."
            exit 1
        fi
    fi
}

# Function to check script availability
check_script() {
    local script_path="$1"
    if [ -f "$script_path" ]; then
        return 0
    else
        return 1
    fi
}

# Main function
main() {
    print_header "GRA Core Documentation - Interactive Setup"
    
    echo -e "${CYAN}Welcome to the GRA Core Documentation Interactive Setup!${NC}"
    echo ""
    echo "This script will guide you through setting up the documentation system."
    echo "You can choose which components to install and configure."
    echo ""
    echo -e "${YELLOW}Available setup options:${NC}"
    echo "  🚀 Complete Setup - Full automated setup (recommended for new users)"
    echo "  🔧 Step-by-step Setup - Choose individual components"
    echo "  🛠️  Utility Scripts - Additional tools and maintenance"
    echo ""
    
    if ask_yes_no "Do you want to see the interactive menu?" "y"; then
        show_interactive_menu
    else
        print_info "Setup cancelled by user."
        exit 0
    fi
}

show_interactive_menu() {
    local scripts_run=0
    local scripts_skipped=0
    local scripts_failed=0
    
    echo ""
    print_header "Setup Options"
    
    # Option 1: Complete Setup (Recommended)
    echo ""
    print_info "🚀 OPTION 1: Complete Setup (Recommended for first-time users)"
    echo "   This will create virtual environment, install dependencies, and set up everything."
    echo ""
    
    if ask_yes_no "Run complete setup? This is the easiest option" "y"; then
        if check_script "scripts/complete_setup.sh"; then
            run_script "scripts/complete_setup.sh" "Complete Setup" "Full automated setup with virtual environment"
            ((scripts_run++))
            
            print_success "Complete setup finished! Your documentation system is ready."
            
            if ask_yes_no "Would you like to start the development server now?" "y"; then
                if check_script "scripts/quick_serve.sh"; then
                    run_script "scripts/quick_serve.sh" "Development Server" "Start auto-reloading development server"
                fi
            fi
            
            show_completion_summary $scripts_run $scripts_skipped $scripts_failed
            return
        else
            print_error "Complete setup script not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    # Option 2: Step-by-step Setup
    echo ""
    print_info "🔧 OPTION 2: Step-by-step Setup"
    echo "   Choose individual components to install and configure."
    echo ""
    
    if ask_yes_no "Do you want step-by-step setup instead?" "n"; then
        run_step_by_step_setup
        return
    else
        ((scripts_skipped++))
    fi
    
    # Option 3: Utility Scripts
    echo ""
    print_info "🛠️  OPTION 3: Utility Scripts"
    echo "   Run maintenance and utility scripts."
    echo ""
    
    if ask_yes_no "Do you want to run utility scripts?" "n"; then
        run_utility_scripts
        return
    else
        ((scripts_skipped++))
    fi
    
    show_completion_summary $scripts_run $scripts_skipped $scripts_failed
}

run_step_by_step_setup() {
    local scripts_run=0
    local scripts_skipped=0
    local scripts_failed=0
    
    print_header "Step-by-Step Setup"
    
    # Step 1: Install Dependencies
    echo ""
    print_info "📦 Step 1: Install Dependencies"
    echo "   Installs Python packages, Node.js dependencies, and build tools."
    
    if ask_yes_no "Install dependencies?" "y"; then
        if check_script "scripts/install_dependencies.sh"; then
            if run_script "scripts/install_dependencies.sh" "Install Dependencies" "Install Python and Node.js packages"; then
                ((scripts_run++))
            else
                ((scripts_failed++))
            fi
        else
            print_error "install_dependencies.sh not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    # Step 2: Setup Documentation Structure
    echo ""
    print_info "📁 Step 2: Setup Documentation Structure"
    echo "   Creates folder structure, configuration files, and templates."
    
    if ask_yes_no "Setup documentation structure?" "y"; then
        if check_script "scripts/setup_docs_structure.sh"; then
            if run_script "scripts/setup_docs_structure.sh" "Setup Structure" "Create documentation folder structure"; then
                ((scripts_run++))
            else
                ((scripts_failed++))
            fi
        else
            print_error "setup_docs_structure.sh not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    # Step 3: Validate Setup
    echo ""
    print_info "🔍 Step 3: Validate Setup"
    echo "   Checks that all components are properly installed and configured."
    
    if ask_yes_no "Validate setup?" "y"; then
        if check_script "scripts/validate_setup.sh"; then
            if run_script "scripts/validate_setup.sh" "Validate Setup" "Check installation and configuration"; then
                ((scripts_run++))
            else
                ((scripts_failed++))
            fi
        else
            print_error "validate_setup.sh not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    # Step 4: Generate Auto-documentation
    echo ""
    print_info "📚 Step 4: Generate Auto-documentation"
    echo "   Creates API documentation from Python source code."
    
    if ask_yes_no "Generate auto-documentation?" "y"; then
        if check_script "scripts/generate_autodocs.sh"; then
            if run_script "scripts/generate_autodocs.sh" "Generate Autodocs" "Create API documentation from source"; then
                ((scripts_run++))
            else
                ((scripts_failed++))
            fi
        else
            print_error "generate_autodocs.sh not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    # Step 5: Build Documentation
    echo ""
    print_info "🔨 Step 5: Build Documentation"
    echo "   Builds HTML documentation from source files."
    
    if ask_yes_no "Build documentation?" "y"; then
        if check_script "scripts/build_versioned_docs.sh"; then
            if run_script "scripts/build_versioned_docs.sh" "Build Documentation" "Build HTML from documentation source"; then
                ((scripts_run++))
            else
                ((scripts_failed++))
            fi
        else
            print_error "build_versioned_docs.sh not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    # Step 6: Serve Documentation
    echo ""
    print_info "🌐 Step 6: Serve Documentation"
    echo "   Starts a local web server to view the documentation."
    
    if ask_yes_no "Start documentation server?" "n"; then
        if check_script "scripts/serve_docs.sh"; then
            if run_script "scripts/serve_docs.sh" "Serve Documentation" "Start local web server"; then
                ((scripts_run++))
            else
                ((scripts_failed++))
            fi
        else
            print_error "serve_docs.sh not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    show_completion_summary $scripts_run $scripts_skipped $scripts_failed
}

run_utility_scripts() {
    local scripts_run=0
    local scripts_skipped=0
    local scripts_failed=0
    
    print_header "Utility Scripts"
    
    # Create New Version
    echo ""
    print_info "📋 Create New Documentation Version"
    echo "   Creates a new version of the documentation."
    
    if ask_yes_no "Create new documentation version?" "n"; then
        print_question "Enter version number (e.g., 5.8): "
        read -r version_number
        
        if [ -n "$version_number" ]; then
            if check_script "scripts/create_version.sh"; then
                if bash "scripts/create_version.sh" -v "$version_number"; then
                    ((scripts_run++))
                    print_success "Version $version_number created!"
                else
                    ((scripts_failed++))
                fi
            else
                print_error "create_version.sh not found!"
                ((scripts_failed++))
            fi
        else
            print_warning "No version number provided, skipping."
            ((scripts_skipped++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    # Version Manager
    echo ""
    print_info "🏷️  Version Manager"
    echo "   Manage documentation versions (list, switch, delete)."
    
    if ask_yes_no "Run version manager?" "n"; then
        if check_script "scripts/version_manager.py"; then
            echo ""
            print_info "Version Manager Options:"
            echo "  list    - List all versions"
            echo "  switch  - Switch current version"
            echo "  delete  - Delete a version"
            echo ""
            print_question "Enter command (list/switch/delete): "
            read -r vm_command
            
            case "$vm_command" in
                list)
                    if python3 "scripts/version_manager.py" list; then
                        ((scripts_run++))
                    else
                        ((scripts_failed++))
                    fi
                    ;;
                switch)
                    print_question "Enter version to switch to: "
                    read -r switch_version
                    if [ -n "$switch_version" ]; then
                        if python3 "scripts/version_manager.py" switch "$switch_version"; then
                            ((scripts_run++))
                        else
                            ((scripts_failed++))
                        fi
                    else
                        print_warning "No version provided."
                        ((scripts_skipped++))
                    fi
                    ;;
                delete)
                    print_question "Enter version to delete: "
                    read -r delete_version
                    if [ -n "$delete_version" ]; then
                        if python3 "scripts/version_manager.py" delete "$delete_version"; then
                            ((scripts_run++))
                        else
                            ((scripts_failed++))
                        fi
                    else
                        print_warning "No version provided."
                        ((scripts_skipped++))
                    fi
                    ;;
                *)
                    print_warning "Invalid command."
                    ((scripts_skipped++))
                    ;;
            esac
        else
            print_error "version_manager.py not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    # Deploy Documentation
    echo ""
    print_info "🚀 Deploy Documentation"
    echo "   Deploy documentation to GitHub Pages or other hosting."
    
    if ask_yes_no "Deploy documentation?" "n"; then
        if check_script "scripts/deploy.sh"; then
            if run_script "scripts/deploy.sh" "Deploy Documentation" "Deploy to hosting platform"; then
                ((scripts_run++))
            else
                ((scripts_failed++))
            fi
        else
            print_error "deploy.sh not found!"
            ((scripts_failed++))
        fi
    else
        ((scripts_skipped++))
    fi
    
    show_completion_summary $scripts_run $scripts_skipped $scripts_failed
}

show_completion_summary() {
    local scripts_run=$1
    local scripts_skipped=$2
    local scripts_failed=$3
    
    echo ""
    print_header "Setup Summary"
    
    print_success "Scripts run successfully: $scripts_run"
    print_warning "Scripts skipped: $scripts_skipped"
    
    if [ $scripts_failed -gt 0 ]; then
        print_error "Scripts failed: $scripts_failed"
    fi
    
    echo ""
    
    if [ $scripts_run -gt 0 ]; then
        print_info "🎉 Setup completed with $scripts_run successful operations!"
        echo ""
        print_info "📋 Next Steps:"
        echo "  • Activate environment: source venv/bin/activate"
        echo "  • Start dev server: ./scripts/quick_serve.sh"
        echo "  • View documentation: open http://localhost:8000"
        echo "  • Edit content: modify files in src/gcp_docs/"
        echo ""
        print_info "🛠️  Useful Commands:"
        echo "  • Build docs: sphinx-build . _build/html"
        echo "  • Auto-rebuild: sphinx-autobuild . _build/html"
        echo "  • Validate setup: ./scripts/validate_setup.sh"
        echo ""
    else
        print_warning "No scripts were run. You may want to run this setup again."
    fi
    
    if ask_yes_no "Would you like to view the project structure?" "n"; then
        show_project_structure
    fi
}

show_project_structure() {
    echo ""
    print_info "📁 Project Structure:"
    echo ""
    
    if command -v tree >/dev/null 2>&1; then
        tree -L 3 -I 'venv|node_modules|_build|__pycache__'
    else
        echo "Project Root/"
        echo "├── venv/                     # Python virtual environment"
        echo "├── scripts/                  # Setup and build scripts"
        echo "├── src/gcp_docs/            # Modular documentation components"
        echo "│   └── homepage/            # Homepage components"
        echo "├── docs/                     # Documentation source files"
        echo "├── _build/                   # Generated HTML output"
        echo "├── _static/                  # CSS, JS, images"
        echo "├── _templates/               # HTML templates"
        echo "├── _themes/                  # Custom themes"
        echo "├── conf.py                   # Sphinx configuration"
        echo "├── index.rst                 # Main documentation file"
        echo "├── requirements.txt          # Python dependencies"
        echo "└── package.json             # Node.js dependencies"
    fi
}

# Check if running as main script
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    # Make sure we're in the right directory
    if [ ! -d "scripts" ]; then
        print_error "Please run this script from the project root directory."
        print_info "Expected directory structure with 'scripts/' folder."
        exit 1
    fi
    
    # Make this script executable
    chmod +x "$0"
    
    # Run main function
    main "$@"
fi
