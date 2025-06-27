# Configuration file for the Sphinx documentation builder.
# GRA Core Platform v5.8 Documentation

import os
import sys
sys.path.insert(0, os.path.abspath('.'))

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
    'sphinx.ext.todo',
    'sphinx_rtd_theme',
    'myst_parser',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output ------------------------------------------------
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
html_css_files = ['custom.css']
html_js_files = ['custom.js']

# -- Extension configuration -------------------------------------------------
todo_include_todos = True
napoleon_google_docstring = True
napoleon_numpy_docstring = True

# -- Custom configuration for v5.8 ------------------------------------------
html_theme_options = {
    'canonical_url': '',
    'analytics_id': '',
    'logo_only': False,
    'display_version': True,
    'prev_next_buttons_location': 'bottom',
    'style_external_links': False,
    'vcs_pageview_mode': '',
    'style_nav_header_background': '#2980B9',
    'collapse_navigation': True,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False
}

# Version-specific settings
html_context = {
    'display_github': True,
    'github_user': 'bank-of-america',
    'github_repo': 'gra-core-platform',
    'github_version': 'main',
    'conf_py_path': '/docs/gcp-5.8/',
    'version_info': {
        'current': '5.8',
        'stable': '5.7',
        'beta': '5.8',
        'versions': ['5.8', '5.7', '5.6', '5.5']
    }
}
