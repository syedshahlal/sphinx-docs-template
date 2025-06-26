#!/bin/bash

# Validation script to ensure everything is properly set up
# This script checks all components before building documentation

set -e

echo "🔍 Validating GRA Core Documentation Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Validation results
ERRORS=0
WARNINGS=0

# Function to print status
print_status() {
    local status=$1
    local message=$2
    
    case $status in
        "OK")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ((WARNINGS++))
            ;;
        "ERROR")
            echo -e "${RED}❌ $message${NC}"
            ((ERRORS++))
            ;;
    esac
}

# Check Python and pip
echo "📋 Checking Python environment..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    print_status "OK" "Python found: $PYTHON_VERSION"
else
    print_status "ERROR" "Python3 not found"
fi

if command -v pip &> /dev/null || command -v pip3 &> /dev/null; then
    print_status "OK" "pip found"
else
    print_status "ERROR" "pip not found"
fi

# Check Node.js and npm
echo "📋 Checking Node.js environment..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "OK" "Node.js found: $NODE_VERSION"
else
    print_status "WARNING" "Node.js not found (needed for Next.js components)"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "OK" "npm found: $NPM_VERSION"
else
    print_status "WARNING" "npm not found (needed for Next.js components)"
fi

# Check Sphinx installation
echo "📋 Checking Sphinx installation..."
if command -v sphinx-build &> /dev/null; then
    SPHINX_VERSION=$(sphinx-build --version)
    print_status "OK" "Sphinx found: $SPHINX_VERSION"
else
    print_status "ERROR" "sphinx-build not found"
fi

if command -v sphinx-apidoc &> /dev/null; then
    print_status "OK" "sphinx-apidoc found"
else
    print_status "ERROR" "sphinx-apidoc not found"
fi

# Check required Python packages
echo "📋 Checking Python packages..."
REQUIRED_PACKAGES=(
    "sphinx"
    "sphinx_copybutton"
    "sphinx_design"
    "myst_parser"
    "pydata_sphinx_theme"
)

for package in "${REQUIRED_PACKAGES[@]}"; do
    if python3 -c "import $package" 2>/dev/null; then
        print_status "OK" "Python package '$package' installed"
    else
        print_status "ERROR" "Python package '$package' not installed"
    fi
done

# Check directory structure
echo "📋 Checking directory structure..."
REQUIRED_DIRS=(
    "docs"
    "_themes"
    "_static"
    "_templates"
    "scripts"
    "src"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        print_status "OK" "Directory '$dir' exists"
    else
        print_status "WARNING" "Directory '$dir' missing"
    fi
done

# Check required files
echo "📋 Checking required files..."
REQUIRED_FILES=(
    "docs/conf.py"
    "docs/index.rst"
    "_themes/boa_theme/theme.conf"
    "_static/css/boa-theme.css"
    "requirements.txt"
    "package.json"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status "OK" "File '$file' exists"
    else
        print_status "ERROR" "File '$file' missing"
    fi
done

# Check theme configuration
echo "📋 Checking theme configuration..."
if [ -f "docs/conf.py" ]; then
    if grep -q "html_theme = 'boa_theme'" docs/conf.py; then
        print_status "OK" "boa_theme configured in conf.py"
    else
        print_status "ERROR" "boa_theme not configured in conf.py"
    fi
    
    if grep -q "html_theme_path = \['../_themes'\]" docs/conf.py; then
        print_status "OK" "Theme path configured correctly"
    else
        print_status "ERROR" "Theme path not configured correctly"
    fi
fi

# Check if scripts are executable
echo "📋 Checking script permissions..."
SCRIPTS=(
    "scripts/setup_docs_structure.sh"
    "scripts/generate_autodocs.sh"
    "scripts/build_versioned_docs.sh"
    "scripts/serve_docs.sh"
    "scripts/create_version.sh"
)

for script in "${SCRIPTS[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            print_status "OK" "Script '$script' is executable"
        else
            print_status "WARNING" "Script '$script' is not executable"
            chmod +x "$script" 2>/dev/null && print_status "OK" "Made '$script' executable"
        fi
    else
        print_status "ERROR" "Script '$script' missing"
    fi
done

# Test basic Sphinx build
echo "📋 Testing basic Sphinx functionality..."
if [ -f "docs/conf.py" ] && [ -f "docs/index.rst" ]; then
    cd docs
    if sphinx-build -b html -q . _build/test 2>/dev/null; then
        print_status "OK" "Basic Sphinx build test passed"
        rm -rf _build/test
    else
        print_status "ERROR" "Basic Sphinx build test failed"
    fi
    cd ..
else
    print_status "ERROR" "Cannot test Sphinx build - missing conf.py or index.rst"
fi

# Check Next.js setup
echo "📋 Checking Next.js setup..."
if [ -f "package.json" ]; then
    if [ -f "app/layout.tsx" ] && [ -f "app/page.tsx" ]; then
        print_status "OK" "Next.js app structure found"
    else
        print_status "WARNING" "Next.js app structure incomplete"
    fi
    
    if [ -d "node_modules" ]; then
        print_status "OK" "Node modules installed"
    else
        print_status "WARNING" "Node modules not installed - run 'npm install'"
    fi
else
    print_status "WARNING" "package.json not found"
fi

# Summary
echo ""
echo "📊 Validation Summary:"
echo "======================"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    print_status "OK" "All checks passed! Setup is ready."
    echo ""
    echo "🚀 You can now run:"
    echo "   ./scripts/generate_autodocs.sh"
    echo "   ./scripts/build_versioned_docs.sh"
    echo "   ./scripts/serve_docs.sh"
elif [ $ERRORS -eq 0 ]; then
    print_status "WARNING" "$WARNINGS warnings found, but setup should work"
    echo ""
    echo "🔧 Consider addressing the warnings above"
    echo "🚀 You can try running the build scripts"
else
    print_status "ERROR" "$ERRORS errors and $WARNINGS warnings found"
    echo ""
    echo "🔧 Please fix the errors above before proceeding"
    echo ""
    echo "Quick fixes:"
    echo "  - Install missing Python packages: pip install -r requirements.txt"
    echo "  - Install Sphinx: pip install sphinx sphinx-copybutton sphinx-design myst-parser pydata-sphinx-theme"
    echo "  - Run setup script: ./scripts/setup_docs_structure.sh"
    exit 1
fi
