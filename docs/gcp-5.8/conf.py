# Configuration file for the Sphinx documentation builder.
# GRA Core Platform v5.8 Documentation

import os
import sys
sys.path.insert(0, os.path.abspath('../../_extensions'))

# -- Project information -----------------------------------------------------
project = 'GRA Core Platform'
copyright = '2024, Bank of America'
author = 'GRA Core Platform Team'
version = '5.8'
release = '5.8.0'

# -- General configuration ---------------------------------------------------
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'myst_parser',
    'react_sphinx_integration',
    'chatbot_extension',
]

templates_path = ['../../_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------
html_theme = 'gra_theme'
html_theme_path = ['../../_themes']
html_static_path = ['../../_static']
html_css_files = [
    'css/boa-theme.css',
    'css/components.css',
    'css/content.css',
    'css/navigation.css',
    'css/sidebar.css',
    'css/react-integration.css',
    'css/chatbot.css',
    'custom.css',
]

html_js_files = [
    'js/custom.js',
    'js/navigation.js',
    'js/search.js',
    'js/theme-switcher.js',
    'js/version-compare.js',
    'js/react-integration.js',
    'js/chatbot.js',
    'custom.js',
]

# -- Theme options -----------------------------------------------------------
html_theme_options = {
    'logo': 'images/gra-logo.png',
    'github_url': 'https://github.com/gra-core-platform',
    'version_dropdown': True,
    'current_version': '5.8',
    'available_versions': ['5.8', '5.7', '5.6', '5.5'],
    'show_powered_by': False,
    'navigation_depth': 3,
    'collapse_navigation': False,
    'sticky_navigation': True,
    'includehidden': True,
    'titles_only': False,
}

# -- Extension configuration -------------------------------------------------
napoleon_google_docstring = True
napoleon_numpy_docstring = True
napoleon_include_init_with_doc = False
napoleon_include_private_with_doc = False

# Intersphinx mapping
intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}

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
