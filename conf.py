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
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.mathjax',
    'sphinx.ext.todo',
    'sphinx.ext.ifconfig',
    'sphinx_copybutton',
    'sphinx_design',
    'myst_parser',
    'sphinx_multiversion',
    'sphinx_search.extension',
    'chatbot_extension',  # Custom extension for LLM chatbot
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'README.md']

# -- Multiversion configuration ---------------------------------------------
smv_tag_whitelist = r'^v\d+\.\d+.*$'
smv_branch_whitelist = r'^(main|master|develop)$'
smv_remote_whitelist = None
smv_released_pattern = r'^tags/v.*$'
smv_outputdir_format = '{ref.name}'

# Version comparison settings
smv_prefer_remote_refs = False
smv_latest_version = 'v5.7'

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
html_theme = 'boa_theme'
html_theme_path = ['_themes']

html_title = f"{project} Documentation"
html_logo = "_static/images/boa-logo.svg"
html_favicon = "_static/images/favicon.ico"

# Bank of America inspired theme options
html_theme_options = {
    "repository_url": "https://github.com/bankofamerica/gra-core",
    "repository_branch": "main",
    "use_repository_button": True,
    "use_edit_page_button": True,
    "use_download_button": True,
    "use_fullscreen_button": True,
    "path_to_docs": "docs",
    
    # Navigation
    "navbar_align": "left",
    "navbar_center": ["navbar-nav"],
    "navbar_end": ["version-switcher", "theme-switcher", "navbar-icon-links"],
    "navbar_persistent": ["search-button"],
    
    # Sidebar
    "show_navbar_depth": 2,
    "show_toc_level": 3,
    "collapse_navigation": False,
    "navigation_depth": 4,
    
    # Footer
    "footer_items": ["copyright", "sphinx-version", "last-updated"],
    
    # Version switcher
    "switcher": {
        "json_url": "https://gra-core-docs.bankofamerica.com/en/latest/_static/switcher.json",
        "version_match": version,
    },
    
    # Bank of America colors
    "primary_sidebar_end": ["version-switcher.html", "edit-this-page.html"],
    "article_header_start": ["breadcrumbs.html"],
    "article_header_end": ["edit-this-page.html"],
    "article_footer_items": ["prev-next.html"],
    
    # Custom BoA styling
    "boa_theme": True,
    "show_version_warning": True,
    "chatbot_enabled": True,
    
    # UI Components Integration
    "enable_banner": True,
    "enable_header_search": True,
    "enable_version_dropdown": True,
    "enable_theme_toggle": True,
    "enable_mobile_nav": True,
    "enable_chatbot": True,
    "enable_feature_cards": True,
    "enable_user_guide_section": True,
    "enable_see_also_section": True,
    "enable_help_section": True,
    
    # Interactive Features
    "enable_search_shortcuts": True,
    "enable_keyboard_navigation": True,
    "enable_animations": True,
    "enable_hover_effects": True,
    
    # Responsive Design
    "enable_responsive_design": True,
    "mobile_breakpoint": "768px",
    "tablet_breakpoint": "1024px",
    
    # Accessibility
    "enable_high_contrast": True,
    "enable_reduced_motion": True,
    "enable_focus_indicators": True,
    "enable_screen_reader": True,
}

html_context = {
    "github_user": "bankofamerica",
    "github_repo": "gra-core",
    "github_version": "main",
    "doc_path": "docs",
    "default_mode": "light",
    
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
            "title": "GRA Core Platform Introduction",
            "description": "Get started with GRA Core Platform fundamentals and core concepts.",
            "icon": "🚀",
            "color": "blue",
            "link": "getting-started/index.html",
            "topics": ["Core Services", "Getting Started", "Best Practices", "Architecture Overview"]
        },
        {
            "title": "User Guide",
            "description": "Complete guide to using GRA Core Platform with step-by-step instructions.",
            "icon": "👥",
            "color": "green",
            "link": "user-guide/index.html",
            "topics": ["Installation", "Configuration", "User Management", "Troubleshooting"]
        },
        {
            "title": "API Reference",
            "description": "Comprehensive API documentation with examples and authentication guides.",
            "icon": "🔧",
            "color": "purple",
            "link": "api-reference/index.html",
            "topics": ["REST APIs", "Authentication", "SDKs", "Rate Limits"]
        },
        {
            "title": "Examples & Tutorials",
            "description": "Real-world examples and step-by-step tutorials for common use cases.",
            "icon": "💡",
            "color": "orange",
            "link": "examples/index.html",
            "topics": ["Quick Start", "Advanced Examples", "Best Practices", "Code Samples"]
        },
        {
            "title": "Development Guide",
            "description": "Development workflows, contribution guidelines, and advanced topics.",
            "icon": "🛠️",
            "color": "teal",
            "link": "development/index.html",
            "topics": ["Development Setup", "Contributing", "Testing", "Deployment"]
        },
        {
            "title": "Platform Architecture",
            "description": "Deep dive into GRA Core Platform architecture and infrastructure.",
            "icon": "🏗️",
            "color": "indigo",
            "link": "architecture/index.html",
            "topics": ["System Design", "Components", "Scalability", "Security"]
        }
    ],
    
    # Navigation Items
    "nav_items": [
        {"label": "User Guide", "href": "user-guide/index.html", "icon": "👥"},
        {"label": "API Reference", "href": "api-reference/index.html", "icon": "🔧"},
        {"label": "Examples", "href": "examples/index.html", "icon": "💡"},
        {"label": "Changelog", "href": "changelog.html", "icon": "📋"},
    ],
    
    # Help Section Configuration
    "help_items": [
        {
            "title": "AI Assistant",
            "description": "Use the chatbot in the bottom-right corner for instant help",
            "icon": "🤖",
            "action": "openChatbot()",
            "button_text": "Open Chatbot"
        },
        {
            "title": "Documentation",
            "description": "Browse our comprehensive guides and API reference",
            "icon": "📖",
            "link": "user-guide/index.html",
            "button_text": "Browse Docs"
        },
        {
            "title": "Community",
            "description": "Join our community forum for discussions and support",
            "icon": "💬",
            "link": "https://community.bankofamerica.com/gra",
            "button_text": "Join Community",
            "external": True
        },
        {
            "title": "Issues",
            "description": "Report bugs and request features on GitHub",
            "icon": "🐛",
            "link": "https://github.com/bankofamerica/gra-core/issues",
            "button_text": "Report Issue",
            "external": True
        },
        {
            "title": "Support",
            "description": "Contact our support team for assistance",
            "icon": "📧",
            "link": "mailto:gra-support@bankofamerica.com",
            "button_text": "Contact Support"
        },
        {
            "title": "Training",
            "description": "Access training materials and certification programs",
            "icon": "📚",
            "link": "examples/index.html",
            "button_text": "View Training"
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
    
    # Theme Configuration
    "theme_config": {
        "default_theme": "light",
        "enable_auto_theme": True,
        "theme_storage_key": "gra-docs-theme"
    },
    
    # Search Configuration
    "search_config": {
        "enabled": True,
        "placeholder": "Search docs...",
        "shortcut": "⌘K",
        "min_chars": 2
    }
}

html_static_path = ['_static']
html_css_files = [
    'css/boa-theme.css',
    'css/custom.css',
    'css/chatbot.css',
    'css/components.css',
    'css/navigation.css',
    'css/sidebar.css',
    'css/content.css',
]

html_js_files = [
    'js/theme-switcher.js',
    'js/version-compare.js',
    'js/chatbot.js',
    'js/navigation.js',
    'js/search.js',
    'js/custom.js',
    'js/ui-components.js',
    'js/interactions.js',
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

# UI Components Configuration
ui_components = {
    "banner": {
        "enabled": True,
        "type": "announcement",
        "dismissible": True,
        "content": "GRA Core Platform v5.7.0 is now available with enhanced security features and improved performance.",
        "link": "changelog.html",
        "link_text": "View Release Notes"
    },
    "header": {
        "enabled": True,
        "logo": "GRA",
        "title": "GRA Core Platform Docs",
        "search": True,
        "version_dropdown": True,
        "theme_toggle": True,
        "mobile_menu": True
    },
    "navigation": {
        "enabled": True,
        "items": html_context["nav_items"],
        "mobile_responsive": True
    },
    "feature_cards": {
        "enabled": True,
        "cards": html_context["feature_cards"],
        "grid_columns": 3,
        "hover_effects": True
    },
    "chatbot": {
        "enabled": True,
        "config": html_context["chatbot_config"]
    },
    "help_section": {
        "enabled": True,
        "items": html_context["help_items"],
        "grid_columns": 3
    }
}

# Custom CSS and JS injection
def setup(app):
    """Setup function for custom Sphinx configuration"""
    
    # Add custom CSS classes
    app.add_css_file('css/ui-components.css')
    app.add_js_file('js/ui-components.js')
    
    # Add custom directives if needed
    # app.add_directive('feature-card', FeatureCardDirective)
    
    # Add custom roles if needed
    # app.add_role('version', version_role)
    
    return {
        'version': '0.1',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }

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

# Source file suffixes
source_suffix = {
    '.rst': None,
    '.md': 'myst_parser',
}

# Master document
master_doc = 'index'

# Exclude patterns for build
exclude_patterns.extend([
    '_build',
    'Thumbs.db',
    '.DS_Store',
    'node_modules',
    '.git',
    '.github',
    'scripts',
    '*.tmp',
    '*.bak',
])

# HTML theme options for responsive design
html_theme_options.update({
    "use_edit_page_button": True,
    "use_repository_button": True,
    "use_issues_button": True,
    "use_download_button": True,
    "navigation_with_keys": True,
    "show_toc_level": 2,
    "announcement": "🎉 GRA Core Platform v5.7.0 is now available! <a href='changelog.html'>See what's new</a>",
})

# Add custom build hooks
def on_build_finished(app, exc):
    """Custom build finished hook"""
    if exc is None:
        print("✅ Documentation build completed successfully!")
        print("🚀 All UI components have been integrated!")
    else:
        print(f"❌ Build failed with error: {exc}")

def on_config_inited(app, config):
    """Custom config initialization hook"""
    print("🔧 Initializing GRA Core Platform documentation...")
    print("📦 Loading UI components...")
    print("🎨 Applying Bank of America theme...")

# Connect the hooks
def setup_hooks(app):
    app.connect('build-finished', on_build_finished)
    app.connect('config-inited', on_config_inited)

# Final setup call
if __name__ == '__main__':
    setup_hooks(None)
