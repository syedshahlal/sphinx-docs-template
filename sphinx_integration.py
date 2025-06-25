"""
Sphinx extension for React dashboard integration
"""
import os
import json
from pathlib import Path
from docutils import nodes
from docutils.parsers.rst import Directive, directives
from sphinx.application import Sphinx

class ReactDashboardDirective(Directive):
    """
    Directive to embed the React dashboard
    
    Usage:
    .. react-dashboard::
       :height: 600px
       :theme: auto
    """
    
    has_content = False
    required_arguments = 0
    optional_arguments = 0
    option_spec = {
        'height': str,
        'theme': str,
    }
    
    def run(self):
        height = self.options.get('height', '800px')
        theme = self.options.get('theme', 'auto')
        
        html = f'''
        <div id="react-dashboard-root" style="height: {height};" data-theme="{theme}">
            <div class="loading-spinner">Loading dashboard...</div>
        </div>
        <script>
            if (window.mountReactDashboard) {{
                window.mountReactDashboard('react-dashboard-root', {{
                    height: '{height}',
                    theme: '{theme}'
                }});
            }}
        </script>
        '''
        
        return [nodes.raw('', html, format='html')]

class ReactComponentDirective(Directive):
    """
    Directive to embed individual React components
    
    Usage:
    .. react-component:: FeatureCards
       :props: {"title": "Features", "subtitle": "Amazing features"}
       :height: 400px
    """
    
    has_content = False
    required_arguments = 1  # Component name
    optional_arguments = 0
    option_spec = {
        'props': str,
        'height': str,
    }
    
    def run(self):
        component_name = self.arguments[0]
        props = self.options.get('props', '{}')
        height = self.options.get('height', 'auto')
        
        # Generate unique ID for this component instance
        import uuid
        component_id = f"react-component-{uuid.uuid4().hex[:8]}"
        
        html = f'''
        <div id="{component_id}" 
             data-component="{component_name}" 
             data-props='{props}'
             class="react-mount"
             style="min-height: {height};">
            <div class="loading-spinner">Loading {component_name}...</div>
        </div>
        '''
        
        return [nodes.raw('', html, format='html')]

def copy_react_assets(app, exception):
    """Copy React build assets to Sphinx _static directory"""
    if exception is not None:
        return
    
    react_build_dir = os.path.join(app.srcdir, '_static', 'react-dashboard')
    sphinx_static_dir = os.path.join(app.outdir, '_static')
    
    if os.path.exists(react_build_dir):
        import shutil
        dest_dir = os.path.join(sphinx_static_dir, 'react-dashboard')
        if os.path.exists(dest_dir):
            shutil.rmtree(dest_dir)
        shutil.copytree(react_build_dir, dest_dir)

def add_react_assets(app, pagename, templatename, context, doctree):
    """Add React assets to HTML pages"""
    if templatename != 'page.html':
        return
    
    # Add React dashboard CSS and JS
    react_css = '_static/react-dashboard/assets/index.css'
    react_js = '_static/react-dashboard/assets/index.js'
    
    if 'css_files' not in context:
        context['css_files'] = []
    if 'script_files' not in context:
        context['script_files'] = []
    
    context['css_files'].append(react_css)
    context['script_files'].append(react_js)

def setup(app: Sphinx):
    """Setup the extension"""
    
    # Add directives
    app.add_directive('react-dashboard', ReactDashboardDirective)
    app.add_directive('react-component', ReactComponentDirective)
    
    # Add event handlers
    app.connect('build-finished', copy_react_assets)
    app.connect('html-page-context', add_react_assets)
    
    # Add CSS for loading spinners
    app.add_css_file('react-integration.css')
    
    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
