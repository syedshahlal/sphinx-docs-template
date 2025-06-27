# Configuration file for the Sphinx documentation builder.
# GRA Core Platform v5.8 Beta Documentation

import os
import sys
sys.path.insert(0, os.path.abspath('.'))

# -- Project information -----------------------------------------------------
project = 'GRA Core Platform'
copyright = '2024, Bank of America'
author = 'GRA Development Team'
version = '5.8.0-beta'
release = '5.8.0-beta'

# -- General configuration ---------------------------------------------------
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx.ext.mathjax',
    'sphinx.ext.ifconfig',
    'sphinx.ext.githubpages',
    'myst_parser',
    'sphinx_rtd_theme',
    'sphinx_copybutton',
    'sphinx_tabs.tabs',
    'sphinx_design',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output ------------------------------------------------
html_theme = 'sphinx_rtd_theme'
html_theme_options = {
    'analytics_id': 'G-XXXXXXXXXX',
    'analytics_anonymize_ip': False,
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

html_static_path = ['_static']
html_css_files = [
    'css/custom.css',
    'css/beta-theme.css',
]

html_js_files = [
    'js/custom.js',
    'js/beta-features.js',
]

# -- Extension configuration -------------------------------------------------
todo_include_todos = True
napoleon_google_docstring = True
napoleon_numpy_docstring = True
napoleon_include_init_with_doc = False
napoleon_include_private_with_doc = False

# Beta version configuration
html_context = {
    'display_github': True,
    'github_user': 'bankofamerica',
    'github_repo': 'gra-core-platform',
    'github_version': 'main',
    'conf_py_path': '/docs/gcp-5.8/',
    'version_warning': True,
    'version_type': 'beta',
    'stable_version': '5.7.0',
}

# Intersphinx mapping
intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'numpy': ('https://numpy.org/doc/stable/', None),
    'pandas': ('https://pandas.pydata.org/docs/', None),
}
