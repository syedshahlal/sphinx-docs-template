#!/bin/bash

# GRA Core Documentation - Complete End-to-End Setup Script
# This script creates a virtual environment, installs dependencies, and sets up the entire web app with Sphinx

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
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}========================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}========================================${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Start setup
print_header "GRA Core Documentation - Complete Setup"
echo -e "${CYAN}This script will set up everything from scratch:${NC}"
echo "  • Create Python virtual environment"
echo "  • Install all dependencies"
echo "  • Set up documentation structure"
echo "  • Configure Sphinx with modular components"
echo "  • Build the web application"
echo "  • Start the development server"
echo ""

# Check prerequisites
print_status "Checking prerequisites..."

if ! command_exists python3; then
    print_error "Python 3 is required but not installed. Please install Python 3.8 or higher."
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
print_success "Python $PYTHON_VERSION found"

if ! command_exists pip3; then
    print_error "pip3 is required but not installed. Please install pip."
    exit 1
fi

print_success "pip3 found"

# Step 1: Create and activate virtual environment
print_header "Step 1: Setting up Python Virtual Environment"

VENV_DIR="venv"
if [ -d "$VENV_DIR" ]; then
    print_warning "Virtual environment already exists. Removing old one..."
    rm -rf "$VENV_DIR"
fi

print_status "Creating virtual environment..."
python3 -m venv "$VENV_DIR"

print_status "Activating virtual environment..."
source "$VENV_DIR/bin/activate"

print_success "Virtual environment created and activated"

# Step 2: Upgrade pip and install wheel
print_header "Step 2: Upgrading pip and installing build tools"

print_status "Upgrading pip..."
pip install --upgrade pip

print_status "Installing build tools..."
pip install wheel setuptools

print_success "Build tools installed"

# Step 3: Install Python dependencies
print_header "Step 3: Installing Python Dependencies"

print_status "Creating requirements.txt..."
cat > requirements.txt << 'EOF'
# Core Sphinx
sphinx>=7.0.0
sphinx-autobuild>=2021.3.14

# Themes
pydata-sphinx-theme>=0.14.0
sphinx-book-theme>=1.0.0
furo>=2023.9.10

# Extensions
sphinx-copybutton>=0.5.2
sphinx-design>=0.5.0
sphinx-tabs>=3.4.1
sphinx-togglebutton>=0.3.2
sphinxext-opengraph>=0.8.2
sphinx-external-toc>=1.0.0
sphinx-inline-tabs>=2023.4.21
sphinx-tippy>=0.4.1

# Markdown support
myst-parser>=2.0.0
myst-nb>=1.0.0

# Development tools
pre-commit>=3.0.0
black>=23.0.0
isort>=5.12.0
flake8>=6.0.0

# Additional utilities
watchdog>=3.0.0
livereload>=2.6.3
EOF

print_status "Installing Python packages..."
pip install -r requirements.txt

print_success "Python dependencies installed"

# Step 4: Install Node.js dependencies (if needed)
print_header "Step 4: Setting up Node.js Dependencies"

if command_exists node && command_exists npm; then
    print_status "Node.js found. Setting up package.json..."
    
    cat > package.json << 'EOF'
{
  "name": "gra-core-docs",
  "version": "1.0.0",
  "description": "GRA Core Platform Documentation",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "docs:build": "./scripts/build_versioned_docs.sh",
    "docs:serve": "./scripts/serve_docs.sh",
    "docs:dev": "sphinx-autobuild docs docs/_build/html --host 0.0.0.0 --port 8000"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/node": "20.8.0",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "typescript": "5.2.2"
  }
}
EOF
    
    print_status "Installing Node.js packages..."
    npm install
    print_success "Node.js dependencies installed"
else
    print_warning "Node.js not found. Skipping Node.js dependencies."
fi

# Step 5: Create directory structure
print_header "Step 5: Creating Documentation Structure"

print_status "Creating directory structure..."
mkdir -p {docs,_build,_static/{css,js,images},_templates,_themes/boa_theme,src/gcp_docs/{homepage/{components,themes/{js}},shared/{components,assets}},scripts}

print_success "Directory structure created"

# Step 6: Create Sphinx configuration
print_header "Step 6: Setting up Sphinx Configuration"

print_status "Creating Sphinx configuration..."
cat > conf.py << 'EOF'
# Configuration file for the Sphinx documentation builder.

import os
import sys

# -- Project information -----------------------------------------------------
project = 'GRA Core Platform'
copyright = '2024, Bank of America'
author = 'GRA Core Team'
version = '5.7'
release = '5.7.0'

# -- General configuration ---------------------------------------------------
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx_copybutton',
    'sphinx_design',
    'sphinx_tabs.tabs',
    'sphinx_togglebutton',
    'sphinxext.opengraph',
    'myst_parser',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'venv']

# -- Options for HTML output ------------------------------------------------
html_theme = 'pydata_sphinx_theme'
html_static_path = ['_static']

html_theme_options = {
    "logo": {
        "text": "GRA Core Platform",
        "image_light": "_static/images/bank-of-america-logo.png",
        "image_dark": "_static/images/bank-of-america-logo.png",
    },
    "navbar_start": ["navbar-logo"],
    "navbar_center": ["navbar-nav"],
    "navbar_end": ["navbar-icon-links", "theme-switcher"],
    "navbar_persistent": ["search-button"],
    "footer_start": ["copyright"],
    "footer_end": ["sphinx-version"],
    "show_prev_next": False,
    "use_edit_page_button": True,
    "icon_links": [
        {
            "name": "GitHub",
            "url": "https://github.com/your-org/gra-core-docs",
            "icon": "fab fa-github-square",
        },
    ],
}

html_context = {
    "github_user": "your-org",
    "github_repo": "gra-core-docs",
    "github_version": "main",
    "doc_path": "docs",
}

html_css_files = [
    'css/custom.css',
    'css/components.css',
    'css/animations.css',
]

html_js_files = [
    'js/custom.js',
    'js/chatbot.js',
    'js/interactions.js',
]

# MyST configuration
myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "html_admonition",
    "html_image",
    "linkify",
    "replacements",
    "smartquotes",
    "substitution",
    "tasklist",
]

# Copy button configuration
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True
EOF

print_success "Sphinx configuration created"

# Step 7: Create main index file
print_header "Step 7: Creating Main Documentation Files"

print_status "Creating main index.rst..."
cat > index.rst << 'EOF'
GRA Core Platform Documentation
===============================

Welcome to the GRA Core Platform Documentation - your comprehensive guide to building, deploying, and managing applications on Bank of America's enterprise platform.

.. include:: src/gcp_docs/homepage/index.rst

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: Documentation

   docs/v5.7/index
   src/gcp_docs/homepage/components/feature-cards
   src/gcp_docs/homepage/components/quick-links

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Resources

   src/gcp_docs/homepage/components/whats-new
   src/gcp_docs/homepage/components/support
EOF

print_success "Main index file created"

# Step 8: Copy CSS and JS files from existing structure
print_header "Step 8: Setting up Static Assets"

print_status "Creating CSS files..."
cat > _static/css/custom.css << 'EOF'
/* GRA Core Platform Custom Styles */
:root {
  --gra-primary: #0066cc;
  --gra-secondary: #004499;
  --gra-accent: #ff6b35;
  --gra-success: #28a745;
  --gra-warning: #ffc107;
  --gra-danger: #dc3545;
  --gra-light: #f8f9fa;
  --gra-dark: #343a40;
}

.gra-banner {
  background: linear-gradient(135deg, var(--gra-primary), var(--gra-secondary));
  color: white;
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem;
}

.gra-hero {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.gra-feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.gra-feature-card {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.gra-feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.gra-chatbot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

@media (max-width: 768px) {
  .gra-feature-grid {
    grid-template-columns: 1fr;
  }
}
EOF

cat > _static/js/custom.js << 'EOF'
// GRA Core Platform Custom JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot
    initializeChatbot();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function initializeChatbot() {
    const chatbot = document.querySelector('.gra-chatbot');
    if (chatbot) {
        chatbot.addEventListener('click', function() {
            alert('Chatbot functionality coming soon!');
        });
    }
}
EOF

print_success "Static assets created"

# Step 9: Make scripts executable
print_header "Step 9: Setting up Build Scripts"

print_status "Making scripts executable..."
chmod +x scripts/*.sh

# Create a simple build script
cat > scripts/build_docs.sh << 'EOF'
#!/bin/bash
echo "Building Sphinx documentation..."
sphinx-build -b html . _build/html
echo "Documentation built successfully!"
echo "Open _build/html/index.html in your browser to view."
EOF

chmod +x scripts/build_docs.sh

# Create a serve script
cat > scripts/serve_docs.sh << 'EOF'
#!/bin/bash
echo "Starting documentation server..."
cd _build/html && python3 -m http.server 8000
EOF

chmod +x scripts/serve_docs.sh

print_success "Build scripts created"

# Step 10: Build the documentation
print_header "Step 10: Building Documentation"

print_status "Building Sphinx documentation..."
sphinx-build -b html . _build/html

if [ $? -eq 0 ]; then
    print_success "Documentation built successfully!"
else
    print_error "Documentation build failed. Check the output above for errors."
    exit 1
fi

# Step 11: Final setup and instructions
print_header "Setup Complete!"

print_success "GRA Core Documentation has been set up successfully!"
echo ""
echo -e "${CYAN}📁 Project Structure:${NC}"
echo "  ├── venv/                     # Python virtual environment"
echo "  ├── docs/                     # Documentation source"
echo "  ├── src/gcp_docs/            # Modular web app components"
echo "  ├── _build/html/              # Generated HTML documentation"
echo "  ├── _static/                  # CSS, JS, and images"
echo "  ├── _templates/               # HTML templates"
echo "  ├── scripts/                  # Build and utility scripts"
echo "  ├── conf.py                   # Sphinx configuration"
echo "  └── index.rst                 # Main documentation file"
echo ""
echo -e "${CYAN}🚀 Next Steps:${NC}"
echo ""
echo -e "${GREEN}1. View Documentation:${NC}"
echo "   ./scripts/serve_docs.sh"
echo "   Then open: http://localhost:8000"
echo ""
echo -e "${GREEN}2. Development Mode (auto-rebuild):${NC}"
echo "   source venv/bin/activate"
echo "   sphinx-autobuild . _build/html --host 0.0.0.0 --port 8000"
echo ""
echo -e "${GREEN}3. Rebuild Documentation:${NC}"
echo "   source venv/bin/activate"
echo "   ./scripts/build_docs.sh"
echo ""
echo -e "${GREEN}4. Activate Virtual Environment (for future sessions):${NC}"
echo "   source venv/bin/activate"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "  • Edit src/gcp_docs/ files to modify web app components"
echo "  • Modify _static/css/custom.css for styling changes"
echo "  • Add new pages by creating .rst files and updating index.rst"
echo "  • Use 'deactivate' to exit the virtual environment"
echo ""

# Ask if user wants to start the server
echo -e "${BLUE}Would you like to start the documentation server now? (y/n):${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    print_status "Starting documentation server..."
    echo -e "${GREEN}Opening http://localhost:8000 in your browser...${NC}"
    
    # Try to open browser (works on most systems)
    if command_exists xdg-open; then
        xdg-open http://localhost:8000 &
    elif command_exists open; then
        open http://localhost:8000 &
    fi
    
    cd _build/html && python3 -m http.server 8000
fi

print_success "Setup script completed successfully!"
