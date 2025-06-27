# Configuration file for the Sphinx documentation builder.
# GRA Core Platform v5.8 Beta Documentation

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
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx.ext.ifconfig',
    'myst_parser',
    'sphinx_copybutton',
    'sphinx_tabs.tabs',
    'chatbot_extension',
    'react_sphinx_integration',
]

templates_path = ['../../_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output ------------------------------------------------
html_theme = 'gra_theme'
html_theme_path = ['../../_themes']

html_theme_options = {
    'logo_only': False,
    'display_version': True,
    'prev_next_buttons_location': 'bottom',
    'style_external_links': False,
    'vcs_pageview_mode': '',
    'style_nav_header_background': '#012169',
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False,
    'show_powered_by': False,
    'show_sphinx': False,
    'show_copyright': True,
    'show_last_updated': True,
    'canonical_url': '',
    'analytics_id': '',
    'analytics_anonymize_ip': False,
    'logo_url': '/',
    'display_github': True,
    'github_user': 'bankofamerica',
    'github_repo': 'gra-core-platform',
    'github_version': 'main',
    'conf_py_path': '/docs/',
    'source_suffix': {
        '.rst': None,
        '.md': 'myst_parser',
    },
    'version_dropdown': True,
    'version_info': {
        'v5.8': {
            'name': 'v5.8 (Beta)',
            'url': '/docs/gcp-5.8/',
            'preferred': False
        },
        'v5.7': {
            'name': 'v5.7 (Stable)',
            'url': '/docs/v5.7/',
            'preferred': True
        }
    }
}

html_context = {
    'display_github': True,
    'github_user': 'bankofamerica',
    'github_repo': 'gra-core-platform',
    'github_version': 'main',
    'conf_py_path': '/docs/',
    'source_suffix': '.rst',
    'is_beta': True,
    'version_warning': 'This is beta documentation for GRA Core Platform v5.8. For stable documentation, see <a href="/docs/v5.7/">v5.7</a>.',
}

html_static_path = ['../../_static']
html_css_files = [
    'css/boa-theme.css',
    'css/components.css',
    'css/navigation.css',
    'css/sidebar.css',
    'css/content.css',
    'css/chatbot.css',
    'css/react-integration.css',
    'custom.css',
]

html_js_files = [
    'js/custom.js',
    'js/navigation.js',
    'js/search.js',
    'js/theme-switcher.js',
    'js/version-compare.js',
    'js/chatbot.js',
    'js/react-integration.js',
    'custom.js',
]

html_title = f'{project} v{version} Documentation'
html_short_title = f'GRA Core v{version}'
html_logo = '../../_static/images/boa-logo.png'
html_favicon = '../../_static/images/favicon.ico'

# -- Extension configuration -------------------------------------------------
todo_include_todos = True
todo_emit_warnings = True

# Copybutton settings
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True
copybutton_only_copy_prompt_lines = True
copybutton_remove_prompts = True
copybutton_copy_empty_lines = False

# Tabs settings
sphinx_tabs_valid_builders = ['html']
sphinx_tabs_disable_tab_closing = True

# Custom settings for beta version
html_show_sourcelink = True
html_show_sphinx = False
html_show_copyright = True

# Search settings
html_search_language = 'en'
html_search_options = {'type': 'default'}
html_search_scorer = '../../_static/js/searchtools.js'

# Version warning for beta
if 'is_beta' in html_context and html_context['is_beta']:
    html_theme_options['announcement'] = html_context['version_warning']
