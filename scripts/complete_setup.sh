#!/bin/bash

# GRA Core Documentation - Complete Setup Script
# This script creates everything from scratch: virtual environment, dependencies, and documentation

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis for better UX
SUCCESS="✅"
ERROR="❌"
INFO="ℹ️"
WARNING="⚠️"
ROCKET="🚀"
GEAR="⚙️"
BOOK="📚"
COMPONENT="🧩"

print_header() {
    echo -e "${PURPLE}========================================${NC}"
    echo -e "${PURPLE}🚀 GRA Core Documentation - Complete Setup${NC}"
    echo -e "${PURPLE}========================================${NC}"
    echo ""
}

print_step() {
    echo -e "${BLUE}${INFO} $1${NC}"
}

print_success() {
    echo -e "${GREEN}${SUCCESS} $1${NC}"
}

print_error() {
    echo -e "${RED}${ERROR} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

check_prerequisites() {
    print_step "Checking prerequisites..."
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.8+ first."
        echo "Visit: https://www.python.org/downloads/"
        exit 1
    fi
    
    # Check pip
    if ! command -v pip3 &> /dev/null; then
        print_error "pip3 is not installed. Please install pip first."
        exit 1
    fi
    
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1-2)
    print_success "Python $PYTHON_VERSION found"
    
    # Check Node.js (optional)
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js $NODE_VERSION found"
        HAS_NODE=true
    else
        print_warning "Node.js not found. Some features may be limited."
        HAS_NODE=false
    fi
}

create_virtual_environment() {
    print_step "Creating Python virtual environment..."
    
    if [ -d "venv" ]; then
        print_warning "Virtual environment already exists. Removing old one..."
        rm -rf venv
    fi
    
    python3 -m venv venv
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Upgrade pip and install build tools
    pip install --upgrade pip setuptools wheel
    
    print_success "Virtual environment created and activated"
}

install_dependencies() {
    print_step "Installing Python dependencies..."
    
    # Create comprehensive requirements.txt
    cat > requirements.txt << 'EOF'
# Sphinx and documentation tools
sphinx>=7.0.0
sphinx-rtd-theme>=1.3.0
sphinx-copybutton>=0.5.0
sphinx-design>=0.5.0
sphinx-multiversion>=0.2.4
myst-parser>=2.0.0

# Sphinx extensions
sphinxcontrib-mermaid>=0.9.0
sphinx-tabs>=3.4.0
sphinx-togglebutton>=0.3.0
sphinx-external-toc>=1.0.0

# Python tools for component extraction
beautifulsoup4>=4.12.0
lxml>=4.9.0
pyyaml>=6.0
jinja2>=3.1.0
markdown>=3.5.0

# Development and build tools
watchdog>=3.0.0
livereload>=2.6.0
python-dotenv>=1.0.0

# Optional: AI/ML for chatbot (if needed)
openai>=1.0.0
langchain>=0.1.0
tiktoken>=0.5.0

# Web server for development
flask>=2.3.0
gunicorn>=21.0.0
EOF

    pip install -r requirements.txt
    
    print_success "Python dependencies installed"
}

setup_project_structure() {
    print_step "Setting up project structure..."
    
    # Create main directories
    mkdir -p docs/{v5.7,v5.6,v5.5,v5.4,v5.3,v5.2,v5.1}
    mkdir -p src/gcp_docs/{homepage/{components,themes/{css,js}},extracted_components,interactive_examples}
    mkdir -p _static/{css,js,images}
    mkdir -p _templates/partials
    mkdir -p _themes/{boa_theme,gra_theme}
    mkdir -p _extensions
    mkdir -p scripts
    mkdir -p components/{ui,shared}
    mkdir -p app/{api,user-guide,examples}
    mkdir -p hooks
    mkdir -p public/images
    
    print_success "Project structure created"
}

create_sphinx_configuration() {
    print_step "Creating Sphinx configuration..."
    
    cat > conf.py << 'EOF'
# Configuration file for the Sphinx documentation builder with React integration
import os
import sys
from datetime import datetime

# Path setup
sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('_extensions'))
sys.path.insert(0, os.path.abspath('src'))

# Project information
project = 'GRA Core Platform'
copyright = f'{datetime.now().year}, Bank of America'
author = 'Bank of America Technology Team'

# Version info
version = '5.7'
release = '5.7.0'

# Extensions
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.mathjax',
    'sphinx.ext.todo',
    'sphinx_copybutton',
    'sphinx_design',
    'myst_parser',
    'sphinx_multiversion',
    'react_components',  # React component integration
    'chatbot_extension',  # Custom chatbot extension
]

# Templates and static files
templates_path = ['_templates', 'src/gcp_docs/homepage/templates']
html_static_path = ['_static', 'src/gcp_docs/homepage/themes']

# Master document
master_doc = 'src/gcp_docs/homepage/index'

# Source file suffixes
source_suffix = {
    '.rst': None,
    '.md': 'myst_parser',
}

# HTML theme
html_theme = 'sphinx_rtd_theme'
html_title = f"{project} Documentation"

# HTML theme options
html_theme_options = {
    'repository_url': 'https://github.com/bankofamerica/gra-core',
    'use_repository_button': True,
    'use_edit_page_button': True,
    'use_download_button': True,
    'path_to_docs': 'docs',
    'show_navbar_depth': 2,
    'collapse_navigation': False,
    'navigation_depth': 4,
    'show_toc_level': 3,
}

# HTML context for React components
html_context = {
    'github_user': 'bankofamerica',
    'github_repo': 'gra-core',
    'github_version': 'main',
    'doc_path': 'docs',
    'default_mode': 'light',
    'current_version': version,
    'enable_component_gallery': True,
    'enable_react_integration': True,
    'component_base_path': 'src/gcp_docs/extracted_components',
}

# CSS and JS files
html_css_files = [
    'css/custom.css',
    'css/components.css',
    'css/component-gallery.css',
    'css/boa-theme.css',
]

html_js_files = [
    'js/custom.js',
    'js/component-interactions.js',
    'js/component-preview.js',
    'js/chatbot.js',
]

# React Components Configuration
react_components_config = {
    'enable_component_gallery': True,
    'enable_interactive_examples': True,
    'component_base_path': 'src/gcp_docs/extracted_components',
    'show_component_source': True,
    'enable_component_search': True,
}

# Chatbot configuration
chatbot_config = {
    'enabled': True,
    'model': 'gpt-3.5-turbo',
    'max_tokens': 500,
    'temperature': 0.1,
    'system_prompt': 'You are a helpful assistant for the GRA Core Platform documentation.',
    'index_path': '_build/chatbot_index',
    'chunk_size': 1000,
    'chunk_overlap': 200,
}

# Exclude patterns
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'node_modules', '.git']

# Language and locale
language = 'en'

# Copy button configuration
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True

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

def setup(app):
    """Setup function for custom Sphinx configuration"""
    app.add_css_file('css/react-components.css')
    app.add_js_file('js/react-integration.js')
    
    return {
        'version': '0.1',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
EOF

    print_success "Sphinx configuration created"
}

extract_react_components() {
    print_step "Extracting React components for Sphinx integration..."
    
    # Run component extraction
    if [ -f "scripts/component_extractor.py" ]; then
        python scripts/component_extractor.py .
        print_success "React components extracted"
    else
        print_warning "Component extractor not found. Skipping component extraction."
    fi
    
    # Run Sphinx-React bridge
    if [ -f "scripts/sphinx_react_bridge.py" ]; then
        python scripts/sphinx_react_bridge.py .
        print_success "Sphinx-React integration completed"
    else
        print_warning "Sphinx-React bridge not found. Skipping integration."
    fi
}

create_main_documentation() {
    print_step "Creating main documentation files..."
    
    # Create main index file
    cat > src/gcp_docs/homepage/index.rst << 'EOF'
GRA Core Platform Documentation
===============================

Welcome to the GRA Core Platform Documentation - integrating React components with Sphinx.

.. include:: components/banner.rst

.. include:: components/hero.rst

.. include:: components/feature-cards.rst

Component Integration
--------------------

This documentation includes:

* **React Component Gallery** - Interactive showcase of all UI components
* **Component API Reference** - Detailed documentation for each component
* **Usage Examples** - Real-world implementation examples
* **Custom Hooks Documentation** - Documentation for all custom React hooks

.. toctree::
   :maxdepth: 2
   :caption: React Components:

   ../../extracted_components/index
   ../../component_gallery
   ../../component_showcase
   ../../component_api

.. toctree::
   :maxdepth: 2
   :caption: Platform Documentation:

   ../../../docs/v5.7/platform-overview/index
   ../../../docs/v5.7/getting-started/index
   ../../../docs/v5.7/api-reference/index

.. include:: components/support.rst

.. include:: components/chatbot.rst

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
EOF

    # Create component files
    mkdir -p src/gcp_docs/homepage/components
    
    # Banner component
    cat > src/gcp_docs/homepage/components/banner.rst << 'EOF'
.. raw:: html

   <div class="banner bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4">
     <div class="container mx-auto flex items-center justify-between">
       <div class="flex items-center space-x-3">
         <span class="font-medium">🎉 GRA Core Platform v5.7.0 with React Integration!</span>
       </div>
       <div class="flex items-center space-x-4">
         <a href="../../component_gallery.html" class="text-white hover:text-blue-200 text-sm font-medium underline">
           View Components →
         </a>
       </div>
     </div>
   </div>
EOF

    # Hero component
    cat > src/gcp_docs/homepage/components/hero.rst << 'EOF'
.. raw:: html

   <div class="hero-section py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
     <div class="container mx-auto text-center">
       <h1 class="text-5xl md:text-6xl font-bold mb-6">
         <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
           GRA Core Platform
         </span>
       </h1>
       <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
         Enterprise-grade platform with integrated React components, comprehensive documentation, 
         and interactive examples. Built for scale, designed for developers.
       </p>
       <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
         <a href="../../component_gallery.html" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
           🧩 Explore Components
         </a>
         <a href="../../../docs/v5.7/api-reference/index.html" class="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
           📚 API Reference
         </a>
       </div>
     </div>
   </div>
EOF

    print_success "Main documentation files created"
}

create_styling() {
    print_step "Creating custom styling..."
    
    # Create custom CSS
    cat > _static/css/custom.css << 'EOF'
/* GRA Core Platform Custom Styles */

/* Component Gallery Styles */
.component-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.component-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.component-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 2rem;
    text-align: center;
}

/* Banner */
.banner {
    background: linear-gradient(135deg, #4299e1 0%, #667eea 100%);
    color: white;
    padding: 1rem;
    text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
    .gallery-grid {
        grid-template-columns: 1fr;
    }
    
    .hero-section {
        padding: 2rem 1rem;
    }
    
    .hero-section h1 {
        font-size: 2.5rem !important;
    }
}

/* Component Integration Styles */
.react-component {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    background: #f7fafc;
}

.react-hook {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    background: #f0fff4;
}

/* Interactive Elements */
.btn-primary {
    background: #4299e1;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary:hover {
    background: #3182ce;
    transform: translateY(-1px);
}

/* Code Blocks */
.highlight {
    border-radius: 8px;
    overflow: hidden;
}

/* Tables */
.docutils {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
}

.docutils th,
.docutils td {
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    text-align: left;
}

.docutils th {
    background: #f7fafc;
    font-weight: 600;
}
EOF

    # Create component-specific CSS
    cat > _static/css/components.css << 'EOF'
/* React Component Specific Styles */

.component-showcase {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
    overflow: hidden;
}

.component-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 1.5rem;
    font-weight: 600;
}

.component-body {
    padding: 1.5rem;
}

.component-props {
    margin-top: 1rem;
}

.prop-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e8f0;
}

.prop-name {
    font-weight: 600;
    color: #2d3748;
}

.prop-type {
    background: #edf2f7;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    color: #4a5568;
}

.component-example {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
}

.example-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2d3748;
}

/* Interactive Examples */
.interactive-example {
    border: 2px dashed #cbd5e0;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    margin: 1rem 0;
    background: #f9f9f9;
}

.interactive-example:hover {
    border-color: #4299e1;
    background: #f0f8ff;
}

/* Hook Documentation */
.hook-signature {
    background: #2d3748;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    margin: 1rem 0;
}

.hook-returns {
    background: #f0fff4;
    border-left: 4px solid #48bb78;
    padding: 1rem;
    margin: 1rem 0;
}

/* Component Status Indicators */
.status-stable {
    background: #48bb78;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
}

.status-beta {
    background: #ed8936;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
}

.status-deprecated {
    background: #e53e3e;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
}
EOF

    print_success "Custom styling created"
}

create_javascript() {
    print_step "Creating JavaScript functionality..."
    
    # Create component interaction JavaScript
    cat > _static/js/component-interactions.js << 'EOF'
// React Component Integration JavaScript

// Component Gallery Functions
function showComponentPreview(componentName) {
    console.log(`Showing preview for ${componentName}`);
    
    // Create modal or update preview area
    const modal = document.getElementById('component-preview-modal');
    if (modal) {
        const title = document.getElementById('preview-title');
        const content = document.getElementById('preview-content');
        
        if (title) title.textContent = `${componentName} Preview`;
        if (content) {
            content.innerHTML = `
                <div class="preview-placeholder">
                    <h4>🎯 ${componentName} Component</h4>
                    <p>Interactive preview will be rendered here.</p>
                    <div class="preview-actions">
                        <button onclick="copyComponentCode('${componentName}')" class="btn-copy">📋 Copy Code</button>
                        <button onclick="openComponentDocs('${componentName}')" class="btn-docs">📖 View Docs</button>
                    </div>
                </div>
            `;
        }
        
        modal.style.display = 'flex';
    }
}

function closePreviewModal() {
    const modal = document.getElementById('component-preview-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function copyComponentCode(componentName) {
    const code = `import { ${componentName} } from '@/components/${componentName.toLowerCase()}'

export default function MyPage() {
  return (
    <div>
      <${componentName} />
    </div>
  )
}`;
    
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Code copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy code', 'error');
    });
}

function openComponentDocs(componentName) {
    const docsUrl = `extracted_components/${componentName.toLowerCase()}.html`;
    window.open(docsUrl, '_blank');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#48bb78';
    } else if (type === 'error') {
        notification.style.background = '#e53e3e';
    } else {
        notification.style.background = '#4299e1';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Hook Documentation Functions
function showHookCode(hookName) {
    console.log(`Showing code for ${hookName}`);
    
    const modal = document.getElementById('component-preview-modal');
    if (modal) {
        const title = document.getElementById('preview-title');
        const content = document.getElementById('preview-content');
        
        if (title) title.textContent = `${hookName} Usage`;
        if (content) {
            content.innerHTML = `
                <div class="hook-code-example">
                    <h4>🪝 ${hookName} Hook</h4>
                    <pre><code>import { ${hookName} } from '@/hooks/${hookName.replace('use', '').toLowerCase()}'

function MyComponent() {
  const result = ${hookName}()
  
  return (
    <div>
      {/* Use the hook result */}
    </div>
  )
}</code></pre>
                    <div class="hook-actions">
                        <button onclick="copyHookCode('${hookName}')" class="btn-copy">📋 Copy Code</button>
                        <button onclick="openHookDocs('${hookName}')" class="btn-docs">📖 View Docs</button>
                    </div>
                </div>
            `;
        }
        
        modal.style.display = 'flex';
    }
}

function copyHookCode(hookName) {
    const code = `import { ${hookName} } from '@/hooks/${hookName.replace('use', '').toLowerCase()}'

function MyComponent() {
  const result = ${hookName}()
  
  return (
    <div>
      {/* Use the hook result */}
    </div>
  )
}`;
    
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Hook code copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy code', 'error');
    });
}

function openHookDocs(hookName) {
    const docsUrl = `extracted_components/${hookName.toLowerCase()}.html`;
    window.open(docsUrl, '_blank');
}

// Tab functionality for component showcase
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Search functionality for components
function searchComponents() {
    const searchTerm = document.getElementById('component-search').value.toLowerCase();
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach(card => {
        const componentName = card.dataset.component.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (componentName.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter components by type
function filterComponents(type) {
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.filter === type) {
            button.classList.add('active');
        }
    });
}

// Initialize component interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧩 React Component Integration initialized');
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .preview-placeholder {
            text-align: center;
            padding: 2rem;
        }
        
        .preview-actions, .hook-actions {
            margin-top: 1rem;
            display: flex;
            gap: 0.5rem;
            justify-content: center;
        }
        
        .btn-copy, .btn-docs {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .btn-copy {
            background: #4299e1;
            color: white;
        }
        
        .btn-docs {
            background: #48bb78;
            color: white;
        }
        
        .btn-copy:hover, .btn-docs:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .hook-code-example pre {
            background: #2d3748;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            text-align: left;
        }
    `;
    document.head.appendChild(style);
    
    // Close modal when clicking outside
    const modal = document.getElementById('component-preview-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePreviewModal();
            }
        });
    }
    
    // Add search functionality if search input exists
    const searchInput = document.getElementById('component-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchComponents);
    }
});
EOF

    print_success "JavaScript functionality created"
}

build_documentation() {
    print_step "Building documentation..."
    
    # Extract React components first
    extract_react_components
    
    # Build Sphinx documentation
    if command -v sphinx-build &> /dev/null; then
        sphinx-build -b html . _build/html
        print_success "Documentation built successfully"
    else
        print_error "sphinx-build command not found"
        return 1
    fi
}

create_development_scripts() {
    print_step "Creating development scripts..."
    
    # Create serve script
    cat > scripts/serve_integrated.sh << 'EOF'
#!/bin/bash
# Serve the integrated documentation with React components

echo "🚀 Starting GRA Core Documentation with React Integration..."

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
    echo "✅ Virtual environment activated"
else
    echo "⚠️ Virtual environment not found. Please run complete_setup.sh first."
    exit 1
fi

# Extract components if needed
if [ ! -d "src/gcp_docs/extracted_components" ]; then
    echo "🧩 Extracting React components..."
    python scripts/component_extractor.py .
    python scripts/sphinx_react_bridge.py .
fi

# Build documentation
echo "📚 Building documentation..."
sphinx-build -b html . _build/html

# Start development server
echo "🌐 Starting development server..."
cd _build/html

# Try different Python HTTP servers
if command -v python3 &> /dev/null; then
    echo "📡 Server running at: http://localhost:8000"
    echo "🧩 Component Gallery: http://localhost:8000/component_gallery.html"
    echo "🎭 Component Showcase: http://localhost:8000/component_showcase.html"
    echo ""
    echo "Press Ctrl+C to stop the server"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "📡 Server running at: http://localhost:8000"
    python -m http.server 8000
else
    echo "❌ Python not found. Cannot start development server."
    exit 1
fi
EOF

    chmod +x scripts/serve_integrated.sh
    
    # Create build script
    cat > scripts/build_integrated.sh << 'EOF'
#!/bin/bash
# Build the integrated documentation

echo "🔨 Building GRA Core Documentation with React Integration..."

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "⚠️ Virtual environment not found. Please run complete_setup.sh first."
    exit 1
fi

# Extract React components
echo "🧩 Extracting React components..."
python scripts/component_extractor.py .

# Run Sphinx-React bridge
echo "🌉 Running Sphinx-React integration..."
python scripts/sphinx_react_bridge.py .

# Build documentation
echo "📚 Building Sphinx documentation..."
sphinx-build -b html . _build/html

echo "✅ Build completed!"
echo "📁 Output directory: _build/html"
echo "🌐 Open _build/html/index.html in your browser"
EOF

    chmod +x scripts/build_integrated.sh
    
    print_success "Development scripts created"
}

finalize_setup() {
    print_step "Finalizing setup..."
    
    # Create .gitignore
    cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/

# Sphinx
_build/
.doctrees/

# Node.js
node_modules/
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Temporary files
*.tmp
*.bak
EOF

    # Create README for the integrated setup
    cat > README_INTEGRATION.md << 'EOF'
# GRA Core Platform - React + Sphinx Integration

This project integrates React components with Sphinx documentation, providing a comprehensive documentation system with interactive component galleries.

## Features

- 🧩 **React Component Integration** - Automatic extraction and documentation of React components
- 📚 **Interactive Component Gallery** - Visual showcase of all components
- 🎭 **Component Showcase** - Live examples and interactive demos
- 📖 **API Documentation** - Comprehensive component and hook documentation
- 🔍 **Component Search** - Search and filter components
- 📱 **Responsive Design** - Mobile-friendly documentation

## Quick Start

1. **Complete Setup** (Recommended for first-time users):
   ```bash
   ./scripts/complete_setup.sh
