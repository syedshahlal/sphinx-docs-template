#!/bin/bash

# Ensure script doesn't close immediately
set -e
trap 'echo "Script failed at line $LINENO. Press any key to exit..."; read -n 1' ERR

# Add debug mode
if [[ "${1}" == "--debug" ]]; then
    set -x
fi

# Build Documentation - Generate static HTML with Sphinx
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📚 Building Documentation${NC}"
echo "========================="

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
    echo -e "${GREEN}📦 Virtual environment activated${NC}"
else
    echo -e "${RED}❌ Virtual environment not found. Run 02_setup_environment.sh first${NC}"
    exit 1
fi

# Clean previous build
if [ -d "_build" ]; then
    echo -e "${GREEN}🧹 Cleaning previous build...${NC}"
    rm -rf _build
fi

# Check if we have a current version symlink
if [ -L "docs/current" ]; then
    CURRENT_VERSION_DIR=$(readlink docs/current)
    echo -e "${GREEN}📚 Building current version: $CURRENT_VERSION_DIR${NC}"
    
    # Update conf.py to point to current version
    if [ -f "conf.py" ]; then
        sed -i.bak "s|master_doc = 'src/gcp_docs/docs/gcp_[^']*'|master_doc = '${CURRENT_VERSION_DIR}/index'|" conf.py
        rm -f conf.py.bak
    fi
else
    echo -e "${YELLOW}⚠️  No current version set. Using default structure.${NC}"
fi

# Check if conf.py exists
if [ ! -f "conf.py" ]; then
    echo -e "${YELLOW}⚠️  conf.py not found. Creating basic configuration...${NC}"
    cat > conf.py << 'EOF'
import os
import sys
sys.path.insert(0, os.path.abspath('_extensions'))

project = 'GRA Core Platform'
copyright = '2024, Bank of America'
author = 'Bank of America Technology Team'

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx_copybutton',
    'sphinx_design',
    'myst_parser',
    'react_sphinx_integration',
]

templates_path = ['_templates']
html_static_path = ['_static']
html_theme = 'sphinx_rtd_theme'

html_css_files = [
    'css/react-integration.css',
]

html_js_files = [
    'js/react-integration.js',
]
EOF
fi

# Check if index.rst exists
if [ ! -f "index.rst" ]; then
    echo -e "${YELLOW}⚠️  index.rst not found. Creating basic index...${NC}"
    cat > index.rst << 'EOF'
GRA Core Platform Documentation
===============================

Welcome to the GRA Core Platform Documentation with React Integration.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   getting-started/index

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
EOF
fi

# Build documentation
echo -e "${GREEN}🔨 Building Sphinx documentation...${NC}"
sphinx-build -b html . _build/html

# Verify build
if [ -f "_build/html/index.html" ]; then
    echo -e "${GREEN}✅ Documentation built successfully!${NC}"
    echo -e "${GREEN}📁 Output: _build/html/${NC}"
else
    echo -e "${RED}❌ Build failed. Check the output above.${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Build completed!${NC}"
echo ""
echo "Press any key to continue..."
read -n 1 -s
