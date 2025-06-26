#!/bin/bash

# GRA Core Platform Documentation Setup Script
# This script sets up the complete documentation environment

set -e

echo "🚀 Setting up GRA Core Platform Documentation..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is required but not installed."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is required but not installed."
    exit 1
fi

# Create virtual environment for Python dependencies
print_status "Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r docs/gcp-5.7/0.1/requirements.txt

# Setup frontend dependencies
print_status "Setting up frontend dependencies..."
cd frontend
npm install
cd ..

# Create necessary directories
print_status "Creating directory structure..."
mkdir -p docs/_shared_static/react-build
mkdir -p docs/gcp-5.7/0.1/_build
mkdir -p docs/gcp-5.7/0.1/_static/css
mkdir -p docs/gcp-5.7/0.1/_static/js
mkdir -p docs/gcp-5.7/0.1/_static/images

# Copy shared assets
print_status "Setting up shared assets..."
if [ -f "frontend/public/images/gra-logo.png" ]; then
    cp frontend/public/images/gra-logo.png docs/gcp-5.7/0.1/_static/images/
fi

# Build frontend components
print_status "Building React components..."
cd frontend
npm run build
cd ..

# Initial Sphinx build
print_status "Building initial documentation..."
cd docs/gcp-5.7/0.1
sphinx-build -b html . _build/html
cd ../../..

print_status "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Activate the virtual environment: source venv/bin/activate"
echo "2. Start the development server: ./scripts/build-docs.sh --serve"
echo "3. Open http://localhost:8000 in your browser"
echo ""
echo "For development:"
echo "- Frontend dev server: cd frontend && npm run dev"
echo "- Sphinx auto-build: cd docs/gcp-5.7/0.1 && sphinx-autobuild . _build/html"
