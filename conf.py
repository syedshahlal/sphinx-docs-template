# Configuration file for the Sphinx documentation builder.
import os
import sys
from datetime import datetime

# -- Path setup --------------------------------------------------------------
sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('_extensions'))

# -- Project information -----------------------------------------------------
project = 'GRA Core Platform'
copyright = f'{datetime.now().year}, Bank of America'
author = 'Bank of America Technology Team'

# Version info
version = '5.7'  # Short version
release = '5.7.0'  # Full version

# -- General configuration ---------------------------------------------------
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx_copybutton',
    'myst_parser',
    'react_sphinx_integration',  # Our React integration extension
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'node_modules']

# -- Source file configuration ----------------------------------------------
# Set the master document to our new homepage structure
master_doc = 'index'

# Include paths for modular components
source_suffix = {
    '.rst': None,
    '.md': 'myst_parser',
}

# -- Multiversion configuration ---------------------------------------------
smv_tag_whitelist = r'^v\d+\.\d+.*$'
smv_branch_whitelist = r'^(main|master|develop)$'
smv_remote_whitelist = None
smv_released_pattern = r'^tags/v.*$'
smv_outputdir_format = '{ref.name}'

# Version comparison settings
smv_prefer_remote_refs = False
smv_latest_version = 'v5.7'

# -- React Integration Configuration -----------------------------------------
react_components_path = 'components'
react_build_bundle = True

# -- MyST configuration ------------------------------------------------------
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

# -- HTML output options ----------------------------------------------------
html_theme = 'sphinx_rtd_theme'
html_theme_path = ['_themes']

html_title = f"{project} Documentation"
html_logo = "_static/images/gra-logo.svg"
html_favicon = "_static/images/favicon.ico"

# Bank of America inspired theme options
html_theme_options = {
    'collapse_navigation': True,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False
}

html_context = {
    "github_user": "bankofamerica",
    "github_repo": "gra-core",
    "github_version": "main",
    "doc_path": "docs",
    "default_mode": "light",
    
    # Component paths
    "component_paths": {
        "banner": "src/gcp_docs/homepage/components/banner.rst",
        "hero": "src/gcp_docs/homepage/components/hero.rst",
        "feature_cards": "src/gcp_docs/homepage/components/feature-cards.rst",
        "quick_links": "src/gcp_docs/homepage/components/quick-links.rst",
        "whats_new": "src/gcp_docs/homepage/components/whats-new.rst",
        "support": "src/gcp_docs/homepage/components/support.rst",
        "chatbot": "src/gcp_docs/homepage/components/chatbot.rst",
    },
    
    # Theme paths
    "theme_paths": {
        "styles": "src/gcp_docs/homepage/themes/styles.css",
        "animations": "src/gcp_docs/homepage/themes/animations.css",
        "chatbot_js": "src/gcp_docs/homepage/themes/js/chatbot.js",
        "interactions_js": "src/gcp_docs/homepage/themes/js/interactions.js",
    },
    
    # UI Component Context
    "current_version": version,
    "available_versions": [
        {"version": "v5.7.0", "status": "stable", "current": True},
        {"version": "v5.6.2", "status": "legacy", "current": False},
        {"version": "v5.5.4", "status": "legacy", "current": False},
        {"version": "v5.4.8", "status": "legacy", "current": False},
        {"version": "v5.8.0-beta", "status": "beta", "current": False},
        {"version": "v6.0.0-alpha", "status": "alpha", "current": False},
    ],
    
    # Feature Cards Configuration
    "feature_cards": [
        {
            "title": "Platform Overview",
            "description": "Get started with GRA Core Platform fundamentals and core concepts.",
            "icon": "🚀",
            "color": "blue",
            "link": "../../docs/v5.7/platform-overview/index.html",
            "topics": ["Architecture Overview", "Core Services", "Best Practices"]
        },
        {
            "title": "Getting Started",
            "description": "Quick setup guide and installation instructions to get you running.",
            "icon": "📖",
            "color": "green",
            "link": "../../docs/v5.7/getting-started/index.html",
            "topics": ["Installation Guide", "Quick Start", "Configuration"]
        },
        {
            "title": "Data Processing",
            "description": "Advanced data processing capabilities and pipeline management.",
            "icon": "⚡",
            "color": "purple",
            "link": "../../docs/v5.7/data-processing/index.html",
            "topics": ["Data Pipelines", "Stream Processing", "Batch Operations"]
        },
        {
            "title": "API Integration",
            "description": "Comprehensive API documentation with examples and authentication.",
            "icon": "🔌",
            "color": "orange",
            "link": "../../docs/v5.7/api-integration/index.html",
            "topics": ["REST APIs", "Authentication", "SDKs & Libraries"]
        },
        {
            "title": "Security & Compliance",
            "description": "Enterprise security features and compliance guidelines.",
            "icon": "🔒",
            "color": "teal",
            "link": "../../docs/v5.7/security-compliance/index.html",
            "topics": ["Security Policies", "Compliance Standards", "Audit Trails"]
        },
        {
            "title": "Monitoring & Analytics",
            "description": "Real-time monitoring, analytics, and performance insights.",
            "icon": "📊",
            "color": "indigo",
            "link": "../../docs/v5.7/monitoring-analytics/index.html",
            "topics": ["Real-time Metrics", "Custom Dashboards", "Alerting System"]
        }
    ],
    
    # Chatbot Configuration
    "chatbot_config": {
        "enabled": True,
        "title": "GRA Assistant",
        "icon": "🤖",
        "welcome_message": "Hello! I'm the GRA Assistant. How can I help you with the documentation today?",
        "placeholder": "Ask me anything about GRA Core Platform...",
        "position": "bottom-right"
    },
    
    # React integration context
    "react_components_enabled": True,
    "interactive_components": True,
}

# Static files configuration
html_static_path = [
    '_static',
    'src/gcp_docs/homepage/themes',
    'src/gcp_docs/shared/assets',
    'react'
]

# CSS files in order of loading
html_css_files = [
    'css/boa-theme.css',
    'styles.css',  # From src/gcp_docs/homepage/themes/
    'animations.css',  # From src/gcp_docs/homepage/themes/
    'css/custom.css',
    'css/components.css',
    'css/responsive.css',
    'css/react-integration.css',
    'react/styles.css',
    'react/tailwind.css',
]

# JavaScript files in order of loading
html_js_files = [
    'js/theme-switcher.js',
    'js/navigation.js',
    'js/search.js',
    'js/chatbot.js',  # From src/gcp_docs/homepage/themes/js/
    'js/interactions.js',  # From src/gcp_docs/homepage/themes/js/
    'js/custom.js',
    'js/react-integration.js',
    'react/components.js',
]

# -- Extension configuration -------------------------------------------------
intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'numpy': ('https://numpy.org/doc/stable/', None),
    'pandas': ('https://pandas.pydata.org/docs/', None),
}

# Copy button configuration
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True

# Todo configuration
todo_include_todos = True

# -- Custom configuration ---------------------------------------------------
# Chatbot configuration
chatbot_config = {
    "enabled": True,
    "model": "gpt-3.5-turbo",
    "max_tokens": 500,
    "temperature": 0.1,
    "system_prompt": "You are a helpful assistant for the GRA Core Platform documentation. Only answer questions based on the provided documentation content. If you don't know something from the docs, say so.",
    "index_path": "_build/chatbot_index",
    "chunk_size": 1000,
    "chunk_overlap": 200,
}

# Version comparison settings
version_compare_enabled = True
version_compare_base_url = "https://gra-core-docs.bankofamerica.com"

# Custom setup function
def setup(app):
    """Setup function for custom Sphinx configuration"""
    
    # Add custom CSS and JS files
    app.add_css_file('styles.css')
    app.add_css_file('animations.css')
    app.add_js_file('js/chatbot.js')
    app.add_js_file('js/interactions.js')
    app.add_css_file('css/react-integration.css')
    app.add_js_file('js/react-integration.js')
    
    # Add build hooks
    app.connect('build-finished', on_build_finished)
    app.connect('config-inited', on_config_inited)
    
    return {
        'version': '0.1',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }

# Build hooks
def on_build_finished(app, exc):
    """Custom build finished hook"""
    if exc is None:
        print("✅ GRA Core Platform documentation build completed successfully!")
        print("🎨 Modular components loaded and integrated")
        print("🚀 Web app layout ready for deployment")
    else:
        print(f"❌ Build failed with error: {exc}")

def on_config_inited(app, config):
    """Custom config initialization hook"""
    print("🔧 Initializing GRA Core Platform documentation...")
    print("📦 Loading modular components from src/gcp_docs/homepage/...")
    print("🎨 Applying Bank of America theme and styling...")
    print("⚡ Enabling interactive features and animations...")

# HTML output customization
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True

# Custom sidebar
html_sidebars = {
    '**': [
        'sidebar-nav-bs.html',
        'sidebar-ethical-ads.html',
    ]
}

# Language and locale
language = 'en'
locale_dirs = ['locale/']
gettext_compact = False
