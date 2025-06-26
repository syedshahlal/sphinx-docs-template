#!/bin/bash

# Setup script to reorganize documentation structure
# This moves conf.py and index.rst to docs folder and sets up auto-documentation

set -e

echo "🚀 Setting up documentation structure..."

# Create docs directory if it doesn't exist
mkdir -p docs

# Create source code directory for auto-documentation
mkdir -p src/gra_core

# Move conf.py to docs if it exists in root
if [ -f "conf.py" ]; then
    echo "📁 Moving conf.py to docs/"
    mv conf.py docs/
fi

# Move index.rst to docs if it exists in root
if [ -f "index.rst" ]; then
    echo "📁 Moving index.rst to docs/"
    mv index.rst docs/
fi

# Create main conf.py in docs if it doesn't exist
if [ ! -f "docs/conf.py" ]; then
    echo "📝 Creating docs/conf.py..."
    cat > docs/conf.py << 'EOF'
# Configuration file for the Sphinx documentation builder.
import os
import sys
from datetime import datetime

# Add the source code path for autodoc
sys.path.insert(0, os.path.abspath('../src'))
sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('../_extensions'))

# -- Project information -----------------------------------------------------
project = 'GRA Core Platform'
copyright = f'{datetime.now().year}, Bank of America'
author = 'Bank of America Technology Team'

# Version info
version = '5.7'
release = '5.7.0'

# -- General configuration ---------------------------------------------------
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.mathjax',
    'sphinx.ext.todo',
    'sphinx.ext.ifconfig',
    'sphinx.ext.autosummary',
    'sphinx.ext.doctest',
    'sphinx_copybutton',
    'sphinx_design',
    'myst_parser',
]

templates_path = ['_templates', '../_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------
html_theme = 'boa_theme'
html_theme_path = ['../_themes']

html_title = f"{project} Documentation"
html_logo = "../_static/images/boa-logo.svg"
html_favicon = "../_static/images/favicon.ico"

html_theme_options = {
    "repository_url": "https://github.com/bankofamerica/gra-core",
    "repository_branch": "main",
    "use_repository_button": True,
    "use_edit_page_button": True,
    "use_download_button": True,
    "path_to_docs": "docs",
    "show_navbar_depth": 2,
    "show_toc_level": 3,
    "collapse_navigation": False,
    "navigation_depth": 4,
    "footer_items": ["copyright", "sphinx-version", "last-updated"],
    "boa_theme": True,
    "show_version_warning": True,
    "chatbot_enabled": False,
}

html_context = {
    "github_user": "bankofamerica",
    "github_repo": "gra-core",
    "github_version": "main",
    "doc_path": "docs",
    "default_mode": "light",
}

html_static_path = ['_static', '../_static']
html_css_files = [
    'css/boa-theme.css',
    'css/custom.css',
    'css/components.css',
]

html_js_files = [
    'js/theme-switcher.js',
    'js/navigation.js',
    'js/custom.js',
]

# -- Extension configuration -------------------------------------------------
autodoc_default_options = {
    'members': True,
    'member-order': 'bysource',
    'special-members': '__init__',
    'undoc-members': True,
    'exclude-members': '__weakref__'
}

autosummary_generate = True
napoleon_google_docstring = True
napoleon_numpy_docstring = True

# Copy button configuration
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True

# Todo configuration
todo_include_todos = True
EOF
fi

# Create main index.rst in docs if it doesn't exist
if [ ! -f "docs/index.rst" ]; then
    echo "📝 Creating docs/index.rst..."
    cat > docs/index.rst << 'EOF'
GRA Core Platform Documentation
===============================

Welcome to the GRA Core Platform Documentation - Bank of America's enterprise-grade platform for building scalable, secure applications.

.. toctree::
   :maxdepth: 2
   :caption: Getting Started:

   getting-started/index

.. toctree::
   :maxdepth: 2
   :caption: User Guide:

   user-guide/index

.. toctree::
   :maxdepth: 2
   :caption: API Reference:

   api-reference/index

.. toctree::
   :maxdepth: 2
   :caption: Examples & Tutorials:

   examples/index

.. toctree::
   :maxdepth: 2
   :caption: Development:

   development/index

.. toctree::
   :maxdepth: 2
   :caption: Architecture:

   architecture/index

.. toctree::
   :maxdepth: 2
   :caption: API Documentation:

   api/modules

Platform Overview
-----------------

The GRA Core Platform provides:

* **Enterprise Security**: Bank-grade security and compliance
* **Scalable Architecture**: Auto-scaling cloud-native infrastructure  
* **Developer Experience**: Modern tools and streamlined workflows
* **Integration Ready**: Seamless integration with Bank of America systems

Quick Links
-----------

* :doc:`getting-started/quickstart` - Get started in 5 minutes
* :doc:`user-guide/installation` - Detailed installation guide
* :doc:`api-reference/authentication` - API authentication
* :doc:`examples/web-application` - Build your first app

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
EOF
fi

# Create directory structure with all the sections
echo "📁 Creating documentation sections..."
sections=("getting-started" "user-guide" "api-reference" "examples" "development" "architecture" "api")

for section in "${sections[@]}"; do
    mkdir -p "docs/$section"
done

# Create additional directories
mkdir -p docs/{_static,_templates}

# Create sample Python modules for auto-documentation
if [ ! -f "src/gra_core/__init__.py" ]; then
    echo "📝 Creating sample Python modules..."
    cat > src/gra_core/__init__.py << 'EOF'
"""
GRA Core Platform - Main Package

This is the main package for the GRA Core Platform.
"""

__version__ = "5.7.0"
__author__ = "Bank of America Technology Team"

from .core import CoreManager
from .utils import UtilityFunctions

__all__ = ['CoreManager', 'UtilityFunctions']
EOF

    cat > src/gra_core/core.py << 'EOF'
"""
Core functionality for GRA Core Platform.
"""

class CoreManager:
    """
    Main manager class for GRA Core Platform operations.
    
    This class handles the core functionality of the platform including
    data processing, API management, and system coordination.
    
    Attributes:
        version (str): The version of the core manager
        config (dict): Configuration settings
    """
    
    def __init__(self, config=None):
        """
        Initialize the CoreManager.
        
        Args:
            config (dict, optional): Configuration dictionary. Defaults to None.
        """
        self.version = "5.7.0"
        self.config = config or {}
    
    def initialize(self):
        """
        Initialize the core platform.
        
        Returns:
            bool: True if initialization successful, False otherwise.
        """
        return True
    
    def process_data(self, data):
        """
        Process incoming data through the platform.
        
        Args:
            data (dict): Input data to process
            
        Returns:
            dict: Processed data
            
        Raises:
            ValueError: If data format is invalid
        """
        if not isinstance(data, dict):
            raise ValueError("Data must be a dictionary")
        
        return {"processed": True, "data": data}
EOF

    cat > src/gra_core/utils.py << 'EOF'
"""
Utility functions for GRA Core Platform.
"""

import json
from typing import Dict, List, Any

class UtilityFunctions:
    """
    Collection of utility functions for the platform.
    """
    
    @staticmethod
    def validate_config(config: Dict[str, Any]) -> bool:
        """
        Validate configuration dictionary.
        
        Args:
            config (Dict[str, Any]): Configuration to validate
            
        Returns:
            bool: True if valid, False otherwise
        """
        required_keys = ['version', 'environment']
        return all(key in config for key in required_keys)
    
    @staticmethod
    def format_response(data: Any, status: str = "success") -> Dict[str, Any]:
        """
        Format API response.
        
        Args:
            data (Any): Response data
            status (str): Response status. Defaults to "success".
            
        Returns:
            Dict[str, Any]: Formatted response
        """
        return {
            "status": status,
            "data": data,
            "timestamp": "2024-01-01T00:00:00Z"
        }
    
    @staticmethod
    def parse_json_config(file_path: str) -> Dict[str, Any]:
        """
        Parse JSON configuration file.
        
        Args:
            file_path (str): Path to JSON file
            
        Returns:
            Dict[str, Any]: Parsed configuration
            
        Raises:
            FileNotFoundError: If file doesn't exist
            json.JSONDecodeError: If JSON is invalid
        """
        with open(file_path, 'r') as f:
            return json.load(f)
EOF
fi

# Create theme directories and copy theme files
echo "🎨 Setting up boa_theme..."
mkdir -p _themes/boa_theme
mkdir -p _static/{css,js,images}

# Copy theme files if they don't exist
if [ ! -f "_themes/boa_theme/theme.conf" ]; then
    cat > _themes/boa_theme/theme.conf << 'EOF'
[theme]
inherit = pydata_sphinx_theme
stylesheet = boa-theme.css

[options]
repository_url = https://github.com/bankofamerica/gra-core
use_edit_page_button = True
show_toc_level = 2
navbar_align = left
navbar_center = navbar-nav
navbar_end = navbar-icon-links,theme-switcher
footer_items = copyright,sphinx-version
announcement =
chatbot_enabled = False
EOF
fi

echo "✅ Documentation structure setup complete!"
echo "📁 Structure created:"
echo "   docs/"
echo "   ├── conf.py"
echo "   ├── index.rst"
echo "   ├── getting-started/"
echo "   ├── user-guide/"
echo "   ├── api-reference/"
echo "   ├── examples/"
echo "   ├── development/"
echo "   ├── architecture/"
echo "   └── api/"
echo "   src/gra_core/ (sample Python modules)"
echo ""
echo "🔧 Next steps:"
echo "   1. Run: ./scripts/generate_autodocs.sh"
echo "   2. Run: ./scripts/build_versioned_docs.sh"
echo "   3. Run: ./scripts/serve_docs.sh -o"
