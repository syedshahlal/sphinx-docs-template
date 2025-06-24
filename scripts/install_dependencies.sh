#!/bin/bash

# Install all required dependencies for the documentation system
# This script ensures all Python and Node.js dependencies are properly installed

set -e

echo "📦 Installing GRA Core Documentation Dependencies..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install Python dependencies
echo "🐍 Installing Python dependencies..."

# Check if pip is available
if command_exists pip3; then
    PIP_CMD="pip3"
elif command_exists pip; then
    PIP_CMD="pip"
else
    echo "❌ pip not found. Please install Python and pip first."
    exit 1
fi

# Create requirements.txt if it doesn't exist
if [ ! -f "requirements.txt" ]; then
    echo "📝 Creating requirements.txt..."
    cat > requirements.txt << 'EOF'
# Sphinx and extensions
sphinx>=7.0.0
sphinx-copybutton>=0.5.2
sphinx-design>=0.5.0
myst-parser>=2.0.0
pydata-sphinx-theme>=0.14.0
sphinx-autobuild>=2021.3.14

# Additional useful extensions
sphinx-tabs>=3.4.1
sphinx-togglebutton>=0.3.2
sphinxext-opengraph>=0.8.2

# Development tools
pre-commit>=3.0.0
black>=23.0.0
isort>=5.12.0
flake8>=6.0.0
EOF
fi

# Install Python packages
echo "📦 Installing Python packages..."
$PIP_CMD install -r requirements.txt

# Install Node.js dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "📦 Installing Node.js dependencies..."
    
    if command_exists npm; then
        npm install
    elif command_exists yarn; then
        yarn install
    else
        echo "⚠️  Neither npm nor yarn found. Skipping Node.js dependencies."
    fi
else
    echo "📝 Creating package.json..."
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
    "lucide-react": "^0.294.0",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "20.8.0",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "autoprefixer": "10.4.16",
    "eslint": "8.51.0",
    "eslint-config-next": "14.0.0",
    "postcss": "8.4.31",
    "tailwindcss": "3.3.5",
    "typescript": "5.2.2"
  }
}
EOF
    
    if command_exists npm; then
        npm install
    fi
fi

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x scripts/*.sh

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p {docs,_themes/boa_theme,_static/{css,js,images},_templates,src/gra_core,scripts}

echo "✅ Dependencies installation complete!"
echo ""
echo "📋 Installed:"
echo "   - Sphinx and extensions"
echo "   - Python documentation tools"
if [ -f "package.json" ]; then
    echo "   - Next.js and React components"
fi
echo ""
echo "🚀 Next steps:"
echo "   1. Run: ./scripts/validate_setup.sh"
echo "   2. Run: ./scripts/setup_docs_structure.sh"
echo "   3. Run: ./scripts/build_versioned_docs.sh"
