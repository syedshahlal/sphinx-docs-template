# -*- coding: utf-8 -*-
"""
GRA Core Platform v5.7.0 Documentation Configuration
"""

import os
import sys

# Import shared configuration
sys.path.insert(0, os.path.abspath('../../_shared_conf'))
from base_conf import *

# -- Project specific configuration ------------------------------------------
version = '5.7.0'
release = '5.7.0'

# HTML theme options specific to this version
html_theme_options.update({
    'display_version': True,
    'version_selector': True,
})

# Version-specific static files
html_static_path = ['_static', '../../_shared_static']

# Custom context for templates
html_context = {
    'version': version,
    'release': release,
    'is_latest': True,
    'versions': [
        ('5.7.0', '/docs/gcp-5.7/0.1/'),
        ('5.6.2', '/docs/gcp-5.6/0.2/'),
        ('5.5.4', '/docs/gcp-5.5/0.4/'),
    ]
}

# Custom CSS for this version
html_css_files.extend([
    'css/version-5.7.css',
])
