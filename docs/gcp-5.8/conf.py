# Configuration file for the Sphinx documentation builder.
# GRA Core Platform v5.8 (Beta) Documentation

import os
import sys
sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('../../_extensions'))

# -- Project information -----------------------------------------------------
project = 'GRA Core Platform'
copyright = '2024, Bank of America'
author = 'GRA Core Platform Team'
version = '5.8'
release = '5.8.0-beta'

# -- General configuration ---------------------------------------------------
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'myst_parser',
    'react_sphinx_integration',
    'chatbot_extension'
]

templates_path = ['../../_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output ------------------------------------------------
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
    'custom.css'
]

html_js_files = [
    'js/custom.js',
    'js/navigation.js',
    'js/search.js',
    'js/theme-switcher.js',
    'js/version-compare.js',
    'js/react-integration.js',
    'js/chatbot.js',
    'custom.js'
]

# Beta version configuration
html_theme_options = {
    'version_warning': True,
    'version_type': 'beta',
    'stable_version': '5.7.0',
    'show_version_banner': True,
    'enable_beta_features': True,
    'chatbot_enabled': True,
    'react_components': True
}

# Source file suffixes
source_suffix = {
    '.rst': None,
    '.md': 'myst_parser',
}

# Master document
master_doc = 'index'

# Internationalization
language = 'en'

# Beta warning configuration
rst_prolog = """
.. warning::
   This is **BETA** documentation for GRA Core Platform v5.8. 
   Features may change before the stable release. 
   For production use, please refer to the `stable v5.7 documentation <../gcp-5.7/index.html>`_.
"""
