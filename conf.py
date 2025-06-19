# Configuration file for the Sphinx documentation builder.
import os
import sys
from datetime import datetime

# -- Path setup --------------------------------------------------------------
sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('_extensions'))

# -- Project information -----------------------------------------------------
project = 'GRA Core Platform'
copyright = f'{datetime.now().year}, GRA Community'
author = 'GRA Community'

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
html_theme = 'gra_boa_theme'
html_theme_path = ['_themes']

html_title = f"{project} Documentation"
html_logo = "_static/images/gra-logo.png"
html_favicon = "_static/images/favicon.ico"

# Bank of America inspired theme options
html_theme_options = {
    "repository_url": "https://github.com/gra-community/gra-core",
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
        "json_url": "https://gra-core-docs.readthedocs.io/en/latest/_static/switcher.json",
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
}

html_context = {
    "github_user": "gra-community",
    "github_repo": "gra-core",
    "github_version": "main",
    "doc_path": "docs",
    "default_mode": "light",
}

html_static_path = ['_static']
html_css_files = [
    'css/boa-theme.css',
    'css/custom.css',
    'css/chatbot.css',
]

html_js_files = [
    'js/theme-switcher.js',
    'js/version-compare.js',
    'js/chatbot.js',
    'js/custom.js',
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
version_compare_base_url = "https://gra-core-docs.readthedocs.io"
