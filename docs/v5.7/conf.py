# Configuration file for GRA Core Platform Documentation v5.7

import os
import sys
from datetime import datetime

# Path setup
sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('../..'))
sys.path.insert(0, os.path.abspath('../../_extensions'))

# Project information
project = 'GRA Core Platform'
copyright = f'{datetime.now().year}, Bank of America'
author = 'Bank of America Technology Team'
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
    'sphinx.ext.ifconfig',
    'sphinx_copybutton',
    'sphinx_design',
    'myst_parser',
    'sphinx_multiversion',
    'sphinx_search.extension',
    'chatbot_extension',
]

# Templates and static files
templates_path = ['../../_templates']
html_static_path = ['../../_static']

# Exclude patterns
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'README.md']

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

# HTML theme
html_theme = 'pydata_sphinx_theme'
html_title = f"{project} Documentation v{version}"
html_logo = "../../_static/images/boa-logo.svg"
html_favicon = "../../_static/images/favicon.ico"

# Theme options
html_theme_options = {
    "repository_url": "https://github.com/bankofamerica/gra-core",
    "repository_branch": "main",
    "use_repository_button": True,
    "use_edit_page_button": True,
    "use_download_button": True,
    "use_fullscreen_button": True,
    "path_to_docs": f"docs/v{version}",
    
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
    
    # Version switcher
    "switcher": {
        "json_url": "https://gra-core-docs.bankofamerica.com/_static/switcher.json",
        "version_match": f"v{version}",
    },
    
    # Footer
    "footer_items": ["copyright", "sphinx-version", "last-updated"],
    
    # Custom styling
    "primary_sidebar_end": ["version-switcher.html", "edit-this-page.html"],
    "article_header_start": ["breadcrumbs.html"],
    "article_header_end": ["edit-this-page.html"],
    "article_footer_items": ["prev-next.html"],
}

# HTML context
html_context = {
    "github_user": "bankofamerica",
    "github_repo": "gra-core",
    "github_version": "main",
    "doc_path": f"docs/v{version}",
    "default_mode": "light",
    "version": f"v{version}",
    "is_current_version": True,
}

# CSS and JS files
html_css_files = [
    'css/boa-theme.css',
    'css/custom.css',
    'css/chatbot.css',
    'css/components.css',
]

html_js_files = [
    'js/theme-switcher.js',
    'js/version-compare.js',
    'js/chatbot.js',
    'js/navigation.js',
    'js/search.js',
    'js/custom.js',
]

# Extension configuration
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

# Master document
master_doc = 'index'

# Chatbot configuration
chatbot_config = {
    "enabled": True,
    "model": "gpt-3.5-turbo",
    "max_tokens": 500,
    "temperature": 0.1,
    "system_prompt": "You are a helpful assistant for the GRA Core Platform documentation. Only answer questions based on the provided documentation content.",
    "index_path": "_build/chatbot_index",
    "chunk_size": 1000,
    "chunk_overlap": 200,
}
