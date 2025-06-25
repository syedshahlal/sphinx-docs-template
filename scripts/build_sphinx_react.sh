#!/bin/bash

# Build script for Sphinx documentation with React integration

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔨 Building Sphinx Documentation with React Integration${NC}"
echo -e "${BLUE}=====================================================${NC}"

# Check prerequisites
check_prerequisites() {
    echo -e "${GREEN}🔍 Checking prerequisites...${NC}"
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}❌ Python 3 is required but not installed.${NC}"
        exit 1
    fi
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is required but not installed.${NC}"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm is required but not installed.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Prerequisites check passed${NC}"
}

# Setup Python environment
setup_python_env() {
    echo -e "${GREEN}🐍 Setting up Python environment...${NC}"
    
    # Activate virtual environment if it exists
    if [ -d "venv" ]; then
        source venv/bin/activate
        echo -e "${GREEN}📦 Activated existing virtual environment${NC}"
    elif [ -d ".venv" ]; then
        source .venv/bin/activate
        echo -e "${GREEN}📦 Activated existing virtual environment${NC}"
    else
        echo -e "${YELLOW}⚠️  No virtual environment found. Creating one...${NC}"
        python3 -m venv venv
        source venv/bin/activate
        echo -e "${GREEN}📦 Created and activated new virtual environment${NC}"
    fi
    
    # Install/upgrade Sphinx and dependencies
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    else
        pip install sphinx sphinx-rtd-theme sphinx-copybutton sphinx-design myst-parser
    fi
    
    echo -e "${GREEN}✅ Python environment ready${NC}"
}

# Setup Node.js environment
setup_node_env() {
    echo -e "${GREEN}📦 Setting up Node.js environment...${NC}"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
        npm install
        echo -e "${GREEN}📦 Installed Node.js dependencies${NC}"
    else
        echo -e "${GREEN}✅ Node.js dependencies already installed${NC}"
    fi
}

# Extract React components
extract_components() {
    echo -e "${GREEN}🧩 Extracting React components...${NC}"
    
    if [ -f "scripts/component_extractor.py" ]; then
        python scripts/component_extractor.py .
        echo -e "${GREEN}✅ Components extracted successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Component extractor not found. Skipping component extraction.${NC}"
    fi
}

# Build React bundle
build_react_bundle() {
    echo -e "${GREEN}⚛️  Building React components bundle...${NC}"
    
    # This will be handled by the Sphinx extension
    # But we can pre-build some assets here if needed
    
    # Copy component files to _static if they exist
    if [ -d "components" ]; then
        mkdir -p _static/react-src
        cp -r components _static/react-src/ 2>/dev/null || true
        echo -e "${GREEN}📁 Copied component source files${NC}"
    fi
    
    if [ -d "app" ]; then
        mkdir -p _static/react-src
        cp -r app _static/react-src/ 2>/dev/null || true
        echo -e "${GREEN}📁 Copied app source files${NC}"
    fi
}

# Build Sphinx documentation
build_sphinx() {
    echo -e "${GREEN}📚 Building Sphinx documentation...${NC}"
    
    # Clean previous build
    if [ -d "_build" ]; then
        rm -rf _build
        echo -e "${GREEN}🧹 Cleaned previous build${NC}"
    fi
    
    # Build documentation
    if [ -f "docs/Makefile" ]; then
        cd docs
        make html
        cd ..
        echo -e "${GREEN}✅ Sphinx documentation built successfully${NC}"
    else
        sphinx-build -b html . _build/html
        echo -e "${GREEN}✅ Sphinx documentation built successfully${NC}"
    fi
}

# Post-build optimizations
post_build_optimizations() {
    echo -e "${GREEN}⚡ Running post-build optimizations...${NC}"
    
    # Optimize images if they exist
    if command -v optipng &> /dev/null; then
        find _build/html -name "*.png" -exec optipng -quiet {} \; 2>/dev/null || true
        echo -e "${GREEN}🖼️  Optimized PNG images${NC}"
    fi
    
    # Minify CSS if possible
    if command -v cleancss &> /dev/null; then
        find _build/html/_static -name "*.css" -exec cleancss -o {} {} \; 2>/dev/null || true
        echo -e "${GREEN}🎨 Minified CSS files${NC}"
    fi
    
    # Create sitemap if possible
    if [ -f "_build/html/index.html" ]; then
        echo -e "${GREEN}🗺️  Documentation ready for deployment${NC}"
    fi
}

# Verify build
verify_build() {
    echo -e "${GREEN}🔍 Verifying build...${NC}"
    
    if [ ! -f "_build/html/index.html" ]; then
        echo -e "${RED}❌ Build verification failed: index.html not found${NC}"
        exit 1
    fi
    
    # Check for React integration files
    if [ -f "_build/html/_static/react/components.js" ]; then
        echo -e "${GREEN}✅ React components bundle found${NC}"
    else
        echo -e "${YELLOW}⚠️  React components bundle not found${NC}"
    fi
    
    # Check for CSS files
    if [ -f "_build/html/_static/css/react-integration.css" ]; then
        echo -e "${GREEN}✅ React integration CSS found${NC}"
    else
        echo -e "${YELLOW}⚠️  React integration CSS not found${NC}"
    fi
    
    echo -e "${GREEN}✅ Build verification completed${NC}"
}

# Main build process
main() {
    echo -e "${BLUE}Starting integrated build process...${NC}"
    
    check_prerequisites
    setup_python_env
    setup_node_env
    extract_components
    build_react_bundle
    build_sphinx
    post_build_optimizations
    verify_build
    
    echo ""
    echo -e "${GREEN}🎉 Build completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}📁 Output location: ${YELLOW}_build/html/${NC}"
    echo -e "${BLUE}🌐 Open: ${YELLOW}_build/html/index.html${NC}"
    echo ""
    echo -e "${GREEN}🚀 To serve the documentation:${NC}"
    echo -e "${YELLOW}   python -m http.server 8000 --directory _build/html${NC}"
    echo -e "${YELLOW}   # Then open http://localhost:8000${NC}"
    echo ""
}

# Run main function
main "$@"
