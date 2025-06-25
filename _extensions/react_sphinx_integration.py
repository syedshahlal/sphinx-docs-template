"""
React-Sphinx Integration Extension
Embeds React components directly into Sphinx documentation
"""
import os
import json
import subprocess
from pathlib import Path
from typing import Dict, List, Any, Optional
from docutils import nodes
from docutils.parsers.rst import Directive, directives
from sphinx.application import Sphinx
from sphinx.util import logging
from sphinx.util.docutils import SphinxDirective

logger = logging.getLogger(__name__)

class ReactComponentDirective(SphinxDirective):
    """
    Directive to embed React components in Sphinx documentation
    
    Usage:
    .. react-component:: ComponentName
       :props: {"title": "Hello", "variant": "primary"}
       :height: 400px
       :interactive: true
    """
    
    has_content = True
    required_arguments = 1  # Component name
    optional_arguments = 0
    option_spec = {
        'props': directives.unchanged,
        'height': directives.unchanged,
        'width': directives.unchanged,
        'interactive': directives.flag,
        'preview': directives.flag,
        'source': directives.flag,
    }
    
    def run(self):
        component_name = self.arguments[0]
        props = self.options.get('props', '{}')
        height = self.options.get('height', '300px')
        width = self.options.get('width', '100%')
        interactive = 'interactive' in self.options
        show_preview = 'preview' in self.options
        show_source = 'source' in self.options
        
        # Generate unique ID for this component instance
        component_id = f"react-{component_name.lower()}-{hash(str(self.options))}"
        
        # Create container for the React component
        container = nodes.container()
        container['classes'].extend(['react-component-container', f'component-{component_name.lower()}'])
        
        # Add component title
        if show_preview or show_source:
            title = nodes.paragraph()
            title += nodes.strong(text=f"{component_name} Component")
            container += title
        
        # Create the React component embed
        if interactive or show_preview:
            react_html = self._generate_react_embed(
                component_name, props, component_id, height, width, interactive
            )
            
            raw_node = nodes.raw('', react_html, format='html')
            container += raw_node
        
        # Add source code if requested
        if show_source:
            source_code = self._get_component_source(component_name)
            if source_code:
                source_container = nodes.container()
                source_container['classes'].append('component-source')
                
                source_title = nodes.paragraph()
                source_title += nodes.strong(text="Source Code:")
                source_container += source_title
                
                code_block = nodes.literal_block(source_code, source_code)
                code_block['language'] = 'typescript'
                source_container += code_block
                
                container += source_container
        
        return [container]
    
    def _generate_react_embed(self, component_name: str, props: str, component_id: str, 
                            height: str, width: str, interactive: bool) -> str:
        """Generate HTML to embed React component"""
        
        # Parse props safely
        try:
            props_obj = json.loads(props) if props.strip() else {}
        except json.JSONDecodeError:
            props_obj = {}
        
        props_json = json.dumps(props_obj)
        
        html = f'''
        <div class="react-component-embed" id="{component_id}" 
             style="width: {width}; height: {height}; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div class="react-component-header" style="background: #f8fafc; padding: 0.5rem 1rem; border-bottom: 1px solid #e2e8f0; font-size: 0.875rem; color: #64748b;">
                <span>⚛️ {component_name}</span>
                {f'<span style="float: right;">🎮 Interactive</span>' if interactive else ''}
            </div>
            <div class="react-component-content" id="{component_id}-content" 
                 style="height: calc(100% - 40px); padding: 1rem; background: white;">
                <div class="react-loading" style="display: flex; align-items: center; justify-content: center; height: 100%; color: #64748b;">
                    Loading {component_name}...
                </div>
            </div>
        </div>
        
        <script type="text/javascript">
            // Queue component for rendering
            if (typeof window.reactComponentQueue === 'undefined') {{
                window.reactComponentQueue = [];
            }}
            window.reactComponentQueue.push({{
                name: '{component_name}',
                props: {props_json},
                containerId: '{component_id}-content',
                interactive: {str(interactive).lower()}
            }});
        </script>
        '''
        
        return html
    
    def _get_component_source(self, component_name: str) -> Optional[str]:
        """Get source code for a component"""
        # Look for component file in common locations
        possible_paths = [
            f"components/{component_name}.tsx",
            f"components/{component_name.lower()}.tsx",
            f"components/ui/{component_name.lower()}.tsx",
            f"app/components/{component_name}.tsx",
        ]
        
        for path in possible_paths:
            if os.path.exists(path):
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        return f.read()
                except Exception as e:
                    logger.warning(f"Could not read component source {path}: {e}")
        
        return None

class ReactPageDirective(SphinxDirective):
    """
    Directive to embed an entire React page/layout
    
    Usage:
    .. react-page:: HomePage
       :route: /
       :layout: DefaultLayout
    """
    
    has_content = False
    required_arguments = 1  # Page component name
    optional_arguments = 0
    option_spec = {
        'route': directives.unchanged,
        'layout': directives.unchanged,
        'height': directives.unchanged,
    }
    
    def run(self):
        page_name = self.arguments[0]
        route = self.options.get('route', '/')
        layout = self.options.get('layout', 'DefaultLayout')
        height = self.options.get('height', '600px')
        
        page_id = f"react-page-{page_name.lower()}"
        
        html = f'''
        <div class="react-page-embed" id="{page_id}" 
             style="width: 100%; height: {height}; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div class="react-page-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.75rem 1rem; font-weight: 600;">
                <span>📄 {page_name} Page</span>
                <span style="float: right; font-size: 0.875rem; opacity: 0.9;">{route}</span>
            </div>
            <div class="react-page-content" id="{page_id}-content" 
                 style="height: calc(100% - 50px); background: white;">
                <div class="react-loading" style="display: flex; align-items: center; justify-content: center; height: 100%; color: #64748b;">
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">⚛️</div>
                        <div>Loading {page_name} page...</div>
                    </div>
                </div>
            </div>
        </div>
        
        <script type="text/javascript">
            if (typeof window.reactPageQueue === 'undefined') {{
                window.reactPageQueue = [];
            }}
            window.reactPageQueue.push({{
                name: '{page_name}',
                route: '{route}',
                layout: '{layout}',
                containerId: '{page_id}-content'
            }});
        </script>
        '''
        
        container = nodes.container()
        container['classes'].append('react-page-container')
        
        raw_node = nodes.raw('', html, format='html')
        container += raw_node
        
        return [container]

def setup_react_build(app: Sphinx):
    """Setup React build process for Sphinx"""
    
    # Create React bundle for Sphinx
    react_bundle_dir = Path(app.outdir) / '_static' / 'react'
    react_bundle_dir.mkdir(parents=True, exist_ok=True)
    
    # Copy React components and build bundle
    build_react_bundle(app, react_bundle_dir)
    
    # Add React runtime to HTML
    add_react_runtime(app)

def build_react_bundle(app: Sphinx, output_dir: Path):
    """Build React components bundle for Sphinx"""
    
    # Create a temporary Next.js build for components
    logger.info("Building React components bundle...")
    
    # Create component registry
    components = discover_components()
    
    # Generate React bundle entry point
    bundle_entry = generate_bundle_entry(components)
    
    # Write bundle files
    (output_dir / 'components.js').write_text(bundle_entry, encoding='utf-8')
    
    # Copy component styles
    copy_component_styles(output_dir)
    
    logger.info(f"React bundle created with {len(components)} components")

def discover_components() -> List[Dict]:
    """Discover all React components in the project"""
    components = []
    
    # Scan component directories
    component_dirs = ['components', 'app/components', 'components/ui']
    
    for dir_path in component_dirs:
        if os.path.exists(dir_path):
            for file_path in Path(dir_path).rglob('*.tsx'):
                if not file_path.name.startswith('_'):
                    component_info = extract_component_info(file_path)
                    if component_info:
                        components.append(component_info)
    
    return components

def extract_component_info(file_path: Path) -> Optional[Dict]:
    """Extract component information from TSX file"""
    try:
        content = file_path.read_text(encoding='utf-8')
        
        # Extract component name
        import re
        
        # Look for export default function ComponentName
        match = re.search(r'export\s+default\s+function\s+(\w+)', content)
        if not match:
            # Look for export function ComponentName
            match = re.search(r'export\s+function\s+(\w+)', content)
        if not match:
            # Look for const ComponentName = 
            match = re.search(r'const\s+(\w+)\s*=.*?=>', content)
        
        if match:
            component_name = match.group(1)
            return {
                'name': component_name,
                'path': str(file_path),
                'relative_path': str(file_path.relative_to(Path.cwd())),
                'has_props': 'interface' in content or 'type' in content,
                'has_state': 'useState' in content,
                'has_effects': 'useEffect' in content,
            }
    
    except Exception as e:
        logger.warning(f"Could not extract component info from {file_path}: {e}")
    
    return None

def generate_bundle_entry(components: List[Dict]) -> str:
    """Generate React bundle entry point"""
    
    imports = []
    component_map = {}
    
    for comp in components:
        # Generate import statement
        import_path = comp['relative_path'].replace('.tsx', '').replace('\\', '/')
        if not import_path.startswith('./'):
            import_path = './' + import_path
        
        imports.append(f"import {comp['name']} from '{import_path}';")
        component_map[comp['name']] = comp['name']
    
    imports_str = '\n'.join(imports)
    component_map_str = json.dumps(component_map, indent=2)
    
    bundle_code = f'''
// React Components Bundle for Sphinx Documentation
import React from 'react';
import ReactDOM from 'react-dom/client';

// Component imports
{imports_str}

// Component registry
const COMPONENTS = {component_map_str.replace('"', '')};

// Render component in container
function renderComponent(componentName, props, containerId, interactive = false) {{
    const Component = COMPONENTS[componentName];
    if (!Component) {{
        console.error(`Component ${{componentName}} not found`);
        return;
    }}
    
    const container = document.getElementById(containerId);
    if (!container) {{
        console.error(`Container ${{containerId}} not found`);
        return;
    }}
    
    try {{
        const root = ReactDOM.createRoot(container);
        
        if (interactive) {{
            // Render with full interactivity
            root.render(React.createElement(Component, props));
        }} else {{
            // Render as static preview
            root.render(
                React.createElement('div', {{ 
                    style: {{ pointerEvents: 'none', opacity: 0.9 }} 
                }}, React.createElement(Component, props))
            );
        }}
    }} catch (error) {{
        console.error(`Error rendering ${{componentName}}:`, error);
        container.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #ef4444;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚠️</div>
                <div>Error rendering ${{componentName}}</div>
                <div style="font-size: 0.875rem; margin-top: 0.5rem; opacity: 0.7;">
                    ${{error.message}}
                </div>
            </div>
        `;
    }}
}}

// Render page component
function renderPage(pageName, route, layout, containerId) {{
    const PageComponent = COMPONENTS[pageName];
    const LayoutComponent = COMPONENTS[layout] || React.Fragment;
    
    if (!PageComponent) {{
        console.error(`Page component ${{pageName}} not found`);
        return;
    }}
    
    const container = document.getElementById(containerId);
    if (!container) {{
        console.error(`Container ${{containerId}} not found`);
        return;
    }}
    
    try {{
        const root = ReactDOM.createRoot(container);
        root.render(
            React.createElement(LayoutComponent, {{}}, 
                React.createElement(PageComponent, {{}})
            )
        );
    }} catch (error) {{
        console.error(`Error rendering page ${{pageName}}:`, error);
        container.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #ef4444;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚠️</div>
                <div>Error rendering page ${{pageName}}</div>
            </div>
        `;
    }}
}}

// Process component queue when DOM is ready
function processComponentQueue() {{
    if (window.reactComponentQueue) {{
        window.reactComponentQueue.forEach(item => {{
            renderComponent(item.name, item.props, item.containerId, item.interactive);
        }});
        window.reactComponentQueue = [];
    }}
    
    if (window.reactPageQueue) {{
        window.reactPageQueue.forEach(item => {{
            renderPage(item.name, item.route, item.layout, item.containerId);
        }});
        window.reactPageQueue = [];
    }}
}}

// Auto-process queue when DOM is ready
if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', processComponentQueue);
}} else {{
    processComponentQueue();
}}

// Export for manual usage
window.SphinxReact = {{
    renderComponent,
    renderPage,
    processQueue: processComponentQueue,
    components: COMPONENTS
}};
'''
    
    return bundle_code

def copy_component_styles(output_dir: Path):
    """Copy component styles to Sphinx output"""
    
    # Copy global CSS
    css_files = ['app/globals.css', 'styles/globals.css']
    
    for css_file in css_files:
        if os.path.exists(css_file):
            content = Path(css_file).read_text(encoding='utf-8')
            (output_dir / 'styles.css').write_text(content, encoding='utf-8')
            break
    
    # Copy Tailwind config if exists
    if os.path.exists('tailwind.config.js'):
        # Extract Tailwind classes used in components
        extract_tailwind_classes(output_dir)

def extract_tailwind_classes(output_dir: Path):
    """Extract and generate Tailwind CSS for used classes"""
    
    # This would ideally run Tailwind CSS to generate only used classes
    # For now, we'll include a basic Tailwind CSS file
    
    tailwind_css = '''
/* Tailwind CSS base styles for Sphinx documentation */
@import url('https://cdn.tailwindcss.com/3.3.0');

/* Custom component styles */
.react-component-container {
    margin: 1.5rem 0;
}

.react-component-embed {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.react-page-container {
    margin: 2rem 0;
}

.component-source {
    margin-top: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

/* Responsive design */
@media (max-width: 768px) {
    .react-component-embed,
    .react-page-embed {
        height: 300px !important;
    }
}
'''
    
    (output_dir / 'tailwind.css').write_text(tailwind_css, encoding='utf-8')

def add_react_runtime(app: Sphinx):
    """Add React runtime to Sphinx HTML output"""
    
    # Add React CDN links
    react_scripts = [
        'https://unpkg.com/react@18/umd/react.production.min.js',
        'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    ]
    
    for script in react_scripts:
        app.add_js_file(script)
    
    # Add our component bundle
    app.add_js_file('react/components.js')
    app.add_css_file('react/styles.css')
    app.add_css_file('react/tailwind.css')

def setup(app: Sphinx) -> Dict[str, Any]:
    """Setup the extension"""
    
    # Add directives
    app.add_directive('react-component', ReactComponentDirective)
    app.add_directive('react-page', ReactPageDirective)
    
    # Add configuration values
    app.add_config_value('react_components_path', 'components', 'html')
    app.add_config_value('react_build_bundle', True, 'html')
    
    # Connect to build events
    app.connect('builder-inited', setup_react_build)
    
    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': False,  # React build process
    }
