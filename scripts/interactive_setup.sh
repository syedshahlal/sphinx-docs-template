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

# Enhanced function to check Python installation
check_python_installation() {
    local python_cmd=""
    local python_version=""
    
    print_info "Checking for Python installation..."
    
    # Check for different Python commands
    if command -v python3 >/dev/null 2>&1; then
        python_cmd="python3"
        python_version=$(python3 --version 2>&1)
    elif command -v python >/dev/null 2>&1; then
        python_cmd="python"
        python_version=$(python --version 2>&1)
        # Check if it's Python 3
        if ! python -c "import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)" 2>/dev/null; then
            print_warning "Found Python 2. Python 3.8+ is required."
            python_cmd=""
        fi
    elif command -v py >/dev/null 2>&1; then
        python_cmd="py"
        python_version=$(py --version 2>&1)
    fi
    
    if [ -n "$python_cmd" ]; then
        print_success "Found Python: $python_version"
        echo "export PYTHON_CMD=$python_cmd" > .python_config
        return 0
    else
        return 1
    fi
}

# Function to provide Python installation instructions
show_python_installation_guide() {
    print_header "Python Installation Required"
    
    print_error "Python 3.8+ was not found on your system."
    echo ""
    print_info "GRA Core Documentation requires Python 3.8 or higher with pip."
    echo ""
    
    # Detect operating system and provide specific instructions
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        print_info "📱 macOS Installation Options:"
        echo ""
        echo "Option 1 - Using Homebrew (Recommended):"
        echo "  brew install python3"
        echo ""
        echo "Option 2 - Download from python.org:"
        echo "  Visit: https://www.python.org/downloads/macos/"
        echo ""
        echo "Option 3 - Using pyenv:"
        echo "  brew install pyenv"
        echo "  pyenv install 3.11.0"
        echo "  pyenv global 3.11.0"
        
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        print_info "🐧 Linux Installation Options:"
        echo ""
        
        # Check for specific distributions
        if command -v apt-get >/dev/null 2>&1; then
            echo "Ubuntu/Debian:"
            echo "  sudo apt update"
            echo "  sudo apt install python3 python3-pip python3-venv"
        elif command -v yum >/dev/null 2>&1; then
            echo "CentOS/RHEL/Fedora:"
            echo "  sudo yum install python3 python3-pip"
            echo "  # or for newer versions:"
            echo "  sudo dnf install python3 python3-pip"
        elif command -v pacman >/dev/null 2>&1; then
            echo "Arch Linux:"
            echo "  sudo pacman -S python python-pip"
        else
            echo "Generic Linux:"
            echo "  Use your distribution's package manager to install python3"
        fi
        
        echo ""
        echo "Alternative - Download from python.org:"
        echo "  Visit: https://www.python.org/downloads/source/"
        
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows
        print_info "🪟 Windows Installation Options:"
        echo ""
        echo "Option 1 - Download from python.org (Recommended):"
        echo "  Visit: https://www.python.org/downloads/windows/"
        echo "  Download Python 3.11+ installer"
        echo "  ⚠️  Make sure to check 'Add Python to PATH' during installation"
        echo ""
        echo "Option 2 - Using Windows Store:"
        echo "  Search for 'Python 3.11' in Microsoft Store"
        echo ""
        echo "Option 3 - Using Chocolatey:"
        echo "  choco install python3"
        echo ""
        echo "Option 4 - Using Scoop:"
        echo "  scoop install python"
        
    else
        print_info "🖥️  General Installation:"
        echo ""
        echo "Visit: https://www.python.org/downloads/"
        echo "Download and install Python 3.8 or higher"
    fi
    
    echo ""
    print_info "📋 After Installation:"
    echo "1. Close and reopen your terminal"
    echo "2. Verify installation: python3 --version"
    echo "3. Verify pip: python3 -m pip --version"
    echo "4. Run this setup script again"
    echo ""
}

# Function to offer alternative setup without Python
offer_alternative_setup() {
    print_header "Alternative Setup Options"
    
    print_info "Since Python is not available, here are your options:"
    echo ""
    
    echo "1. 📦 Install Python first (Recommended)"
    echo "   - Follow the installation guide above"
    echo "   - Then run this setup again"
    echo ""
    
    echo "2. 🌐 Static Documentation Setup"
    echo "   - Set up basic HTML/CSS/JS structure"
    echo "   - No Sphinx documentation generation"
    echo "   - Manual content management"
    echo ""
    
    echo "3. 📋 Generate Installation Script"
    echo "   - Create a script with all the commands"
    echo "   - Run after installing Python"
    echo ""
    
    if ask_yes_no "Would you like to see the Python installation guide?" "y"; then
        show_python_installation_guide
    fi
    
    echo ""
    if ask_yes_no "Would you like to set up static documentation (without Sphinx)?" "n"; then
        setup_static_documentation
        return 0
    fi
    
    if ask_yes_no "Would you like to generate an installation script for later?" "y"; then
        generate_installation_script
        return 0
    fi
    
    print_info "Setup cancelled. Please install Python and run this script again."
    return 1
}

# Function to set up static documentation
setup_static_documentation() {
    print_header "Static Documentation Setup"
    
    print_info "Setting up basic HTML/CSS/JS structure..."
    
    # Create basic directory structure
    mkdir -p {static_docs/{css,js,images},templates,content}
    
    # Create basic HTML template
    cat > static_docs/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GRA Core Platform Documentation</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>GRA Core Platform</h1>
            <nav>
                <a href="#overview">Overview</a>
                <a href="#getting-started">Getting Started</a>
                <a href="#api">API Reference</a>
            </nav>
        </div>
    </header>
    
    <main class="main">
        <section class="hero">
            <div class="container">
                <h2>Welcome to GRA Core Platform</h2>
                <p>Your comprehensive guide to building enterprise applications</p>
            </div>
        </section>
        
        <section class="features">
            <div class="container">
                <div class="feature-grid">
                    <div class="feature-card">
                        <h3>Platform Overview</h3>
                        <p>Learn about the core platform capabilities</p>
                    </div>
                    <div class="feature-card">
                        <h3>Getting Started</h3>
                        <p>Quick start guide and tutorials</p>
                    </div>
                    <div class="feature-card">
                        <h3>API Reference</h3>
                        <p>Complete API documentation</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Bank of America. All rights reserved.</p>
        </div>
    </footer>
    
    <script src="js/main.js"></script>
</body>
</html>
EOF

    # Create basic CSS
    cat > static_docs/css/styles.css << 'EOF'
/* GRA Core Platform Static Documentation Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: #0066cc;
    color: white;
    padding: 1rem 0;
}

.header h1 {
    display: inline-block;
    margin-right: 2rem;
}

.header nav a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background 0.2s;
}

.header nav a:hover {
    background: rgba(255,255,255,0.1);
}

.hero {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 4rem 0;
    text-align: center;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #0066cc;
}

.features {
    padding: 4rem 0;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.feature-card {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.footer {
    background: #343a40;
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: 4rem;
}

@media (max-width: 768px) {
    .header h1 {
        display: block;
        margin-bottom: 1rem;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
}
EOF

    # Create basic JavaScript
    cat > static_docs/js/main.js << 'EOF'
// GRA Core Platform Static Documentation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('GRA Core Documentation loaded');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add interactive features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            alert('Feature documentation coming soon!');
        });
    });
});
EOF

    # Create README for static setup
    cat > static_docs/README.md << 'EOF'
# GRA Core Platform - Static Documentation

This is a basic static HTML documentation setup created because Python/Sphinx was not available.

## Structure
- `index.html` - Main documentation page
- `css/styles.css` - Styling
- `js/main.js` - Interactive features
- `images/` - Image assets

## Usage
1. Open `index.html` in a web browser
2. Or serve with any web server:
   \`\`\`bash
   # Python (if available later)
   python3 -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   \`\`\`

## Next Steps
1. Install Python 3.8+
2. Run the full setup script for Sphinx documentation
3. Migrate content from this static version
EOF

    print_success "Static documentation setup complete!"
    print_info "Created in: static_docs/"
    print_info "Open static_docs/index.html in your browser to view"
    
    if ask_yes_no "Would you like to open the documentation now?" "y"; then
        if command -v xdg-open >/dev/null 2>&1; then
            xdg-open "static_docs/index.html"
        elif command -v open >/dev/null 2>&1; then
            open "static_docs/index.html"
        else
            print_info "Please open static_docs/index.html in your web browser"
        fi
    fi
}

# Function to generate installation script
generate_installation_script() {
    print_header "Generating Installation Script"
    
    cat > install_after_python.sh << 'EOF'
#!/bin/bash

# GRA Core Documentation - Install After Python Setup
# Run this script after installing Python 3.8+

echo "🚀 GRA Core Documentation - Post-Python Installation"
echo "=================================================="

# Check Python again
if ! command -v python3 >/dev/null 2>&1; then
    echo "❌ Python 3 still not found. Please install Python first."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Run the complete setup
if [ -f "scripts/complete_setup.sh" ]; then
    echo "🔄 Running complete setup..."
    chmod +x scripts/complete_setup.sh
    ./scripts/complete_setup.sh
else
    echo "❌ complete_setup.sh not found!"
    echo "Please make sure you're in the project root directory."
    exit 1
fi
EOF

    chmod +x install_after_python.sh
    
    print_success "Installation script created: install_after_python.sh"
    print_info "After installing Python, run: ./install_after_python.sh"
}

# Main function
main() {
    print_header "GRA Core Documentation - Interactive Setup"
    
    echo -e "${CYAN}Welcome to the GRA Core Documentation Interactive Setup!${NC}"
    echo ""
    
    # Enhanced Python checking
    if ! check_python_installation; then
        offer_alternative_setup
        return $?
    fi
    
    # Continue with original setup if Python is found
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
