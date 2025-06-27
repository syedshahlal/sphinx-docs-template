"""
Custom Sphinx extensions for GRA Core Platform Documentation
"""

def setup(app):
    """Setup function for Sphinx extension"""
    app.add_config_value('gra_version', '5.7.0', 'env')
    app.add_config_value('gra_react_components', True, 'env')
    
    return {
        'version': '1.0.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
