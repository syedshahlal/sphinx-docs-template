"""
Sphinx extension for React dashboard integration
"""
import os
import json
from pathlib import Path
from docutils import nodes
from docutils.parsers.rst import Directive, directives
from sphinx.application import Sphinx
from sphinx.util.docutils import SphinxDirective

class ReactDashboardDirective(SphinxDirective):
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
        'height': directives.unchanged,
        'theme': directives.unchanged,
        'class': directives.unchanged,
    }
    
    def run(self):
        height = self.options.get('height', '100vh')
        theme = self.options.get('theme', 'auto')
        css_class = self.options.get('class', '')
        
        dashboard_id = f"react-dashboard-{hash(str(self.options))}"
        
        html = f'''
        <div id="{dashboard_id}" class="react-dashboard-container {css_class}" 
             style="height: {height}; width: 100%;">
            <div class="react-dashboard-loading" style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                height: 100%; 
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
            ">
                <div style="text-align: center; color: #64748b;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📚</div>
                    <div>Loading Documentation Dashboard...</div>
                </div>
            </div>
        </div>
        
        <script type="text/javascript">
            document.addEventListener('DOMContentLoaded', function() {{
                if (window.SphinxReactApp) {{
                    const container = document.getElementById('{dashboard_id}');
                    if (container) {{
                        container.innerHTML = '';
                        window.SphinxReactApp.mount(container);
                    }}
                }}
            }});
        </script>
        '''
        
        container = nodes.container()
        container['classes'].append('react-dashboard-embed')
        raw_node = nodes.raw('', html, format='html')
        container += raw_node
        
        return [container]

class ReactComponentDirective(SphinxDirective):
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
        'props': directives.unchanged,
        'height': directives.unchanged,
        'class': directives.unchanged,
    }
    
    def run(self):
        component_name = self.arguments[0]
        props = self.options.get('props', '{}')
        height = self.options.get('height', '400px')
        css_class = self.options.get('class', '')
        
        component_id = f"react-component-{component_name.lower()}-{hash(str(self.options))}"
        
        try:
            props_obj = json.loads(props) if props.strip() else {}
        except json.JSONDecodeError:
            props_obj = {}
        
        props_json = json.dumps(props_obj)
        
        html = f'''
        <div class="react-component-embed {css_class}" style="margin: 2rem 0;">
            <div class="react-component-header" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 0.75rem 1rem;
                font-weight: 600;
                border-radius: 8px 8px 0 0;
                font-size: 0.875rem;
            ">
                ⚛️ {component_name} Component
            </div>
            <div id="{component_id}" 
                 data-component="{component_name}" 
                 data-props='{props_json}'
                 class="react-mount"
                 style="
                     min-height: {height};
                     border: 1px solid #e2e8f0;
                     border-top: none;
                     border-radius: 0 0 8px 8px;
                     background: white;
                 ">
                <div class="react-loading" style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: {height};
                    color: #64748b;
                ">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚛️</div>
                        <div>Loading {component_name}...</div>
                    </div>
                </div>
            </div>
        </div>
        '''
        
        container = nodes.container()
        container['classes'].append('react-component-container')
        raw_node = nodes.raw('', html, format='html')
        container += raw_node
        
        return [container]

def copy_react_assets(app: Sphinx, exception):
    """Copy React dashboard assets to Sphinx output directory"""
    if exception is not None:
        return
    
    react_build_dir = Path(__file__).parent / '_static' / 'react-dashboard'
    sphinx_static_dir = Path(app.outdir) / '_static' / 'react-dashboard'
    
    if react_build_dir.exists():
        import shutil
        if sphinx_static_dir.exists():
            shutil.rmtree(sphinx_static_dir)
        shutil.copytree(react_build_dir, sphinx_static_dir)
        
        # Add assets to HTML
        app.add_js_file('react-dashboard/assets/index.js')
        app.add_css_file('react-dashboard/assets/index.css')

def setup(app: Sphinx):
    """Setup the extension"""
    
    # Add directives
    app.add_directive('react-dashboard', ReactDashboardDirective)
    app.add_directive('react-component', ReactComponentDirective)
    
    # Add configuration values
    app.add_config_value('react_dashboard_theme', 'auto', 'html')
    app.add_config_value('react_dashboard_height', '100vh', 'html')
    
    # Connect to build events
    app.connect('build-finished', copy_react_assets)
    
    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': False,
    }
