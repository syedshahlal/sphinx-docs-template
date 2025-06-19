#!/bin/bash

# GRA Core Platform Documentation - Development Environment Setup
# This script sets up everything needed for local development

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

echo "🚀 Setting up GRA Core Platform Documentation Development Environment"
echo "=================================================================="

# Check if Python is installed
log_step "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    log_error "Python 3 is not installed. Please install Python 3.8 or higher."
    echo "Visit: https://www.python.org/downloads/"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
log_info "Found Python $PYTHON_VERSION"

# Check Python version (minimum 3.8)
PYTHON_MAJOR=$(echo $PYTHON_VERSION | cut -d'.' -f1)
PYTHON_MINOR=$(echo $PYTHON_VERSION | cut -d'.' -f2)

if [ "$PYTHON_MAJOR" -lt 3 ] || ([ "$PYTHON_MAJOR" -eq 3 ] && [ "$PYTHON_MINOR" -lt 8 ]); then
    log_error "Python 3.8 or higher is required. Found: $PYTHON_VERSION"
    exit 1
fi

# Check if pip is installed
log_step "Checking pip installation..."
if ! command -v pip3 &> /dev/null; then
    log_error "pip3 is not installed. Please install pip."
    exit 1
fi

log_info "Found pip $(pip3 --version | cut -d' ' -f2)"

# Check if Git is installed
log_step "Checking Git installation..."
if ! command -v git &> /dev/null; then
    log_error "Git is not installed. Please install Git."
    echo "Visit: https://git-scm.com/downloads"
    exit 1
fi

log_info "Found Git $(git --version | cut -d' ' -f3)"

# Create virtual environment
log_step "Creating Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    log_info "Created virtual environment in ./venv"
else
    log_info "Virtual environment already exists"
fi

# Activate virtual environment
log_step "Activating virtual environment..."
source venv/bin/activate
log_info "Virtual environment activated"

# Upgrade pip
log_step "Upgrading pip..."
pip install --upgrade pip
log_info "pip upgraded to $(pip --version | cut -d' ' -f2)"

# Install dependencies
log_step "Installing Python dependencies..."
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    log_info "Dependencies installed from requirements.txt"
else
    log_warn "requirements.txt not found, installing basic dependencies..."
    pip install sphinx pydata-sphinx-theme sphinx-design sphinx-copybutton myst-parser
fi

# Install development dependencies
log_step "Installing development dependencies..."
pip install sphinx-autobuild pre-commit black flake8 isort

# Check if Node.js is installed (optional, for advanced features)
log_step "Checking Node.js installation (optional)..."
if command -v node &> /dev/null; then
    log_info "Found Node.js $(node --version)"
    if command -v npm &> /dev/null; then
        log_info "Found npm $(npm --version)"
    fi
else
    log_warn "Node.js not found. Some advanced features may not work."
    log_warn "Install from: https://nodejs.org/"
fi

# Create necessary directories
log_step "Creating project directories..."
mkdir -p _build
mkdir -p _static/images
mkdir -p _static/css
mkdir -p _static/js
mkdir -p _templates
log_info "Project directories created"

# Set up pre-commit hooks (if .pre-commit-config.yaml exists)
if [ -f ".pre-commit-config.yaml" ]; then
    log_step "Setting up pre-commit hooks..."
    pre-commit install
    log_info "Pre-commit hooks installed"
fi

# Test the installation
log_step "Testing installation..."
if sphinx-build --version &> /dev/null; then
    SPHINX_VERSION=$(sphinx-build --version | cut -d' ' -f2)
    log_info "Sphinx $SPHINX_VERSION is working correctly"
else
    log_error "Sphinx installation test failed"
    exit 1
fi

# Create a simple test build
log_step "Running test build..."
if [ -f "conf.py" ]; then
    sphinx-build -b html . _build/html -q
    if [ $? -eq 0 ]; then
        log_info "Test build successful"
    else
        log_warn "Test build had warnings or errors"
    fi
else
    log_warn "No conf.py found, skipping test build"
fi

echo ""
echo "🎉 Development environment setup complete!"
echo "=================================================================="
echo ""
echo "Next steps:"
echo "1. Activate the virtual environment: source venv/bin/activate"
echo "2. Start development server: make livehtml"
echo "3. Open http://localhost:8000 in your browser"
echo ""
echo "Available commands:"
echo "  make html          - Build documentation"
echo "  make livehtml      - Start development server with auto-reload"
echo "  make clean         - Clean build directory"
echo "  make lint          - Check for broken links"
echo ""
echo "Happy documenting! 📚"
