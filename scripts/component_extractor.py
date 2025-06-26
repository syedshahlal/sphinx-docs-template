"""
Component Extractor - Converts React/Next.js components to Sphinx documentation
"""
import os
import re
import json
import ast
from pathlib import Path
from typing import Dict, List, Any, Optional
import yaml

class ComponentExtractor:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.components_dir = self.project_root / "components"
        self.app_dir = self.project_root / "app"
        self.hooks_dir = self.project_root / "hooks"
        self.output_dir = self.project_root / "src" / "gcp_docs" / "extracted_components"
        
    def extract_all_components(self):
        """Extract all React components and convert to Sphinx format"""
        print("🔄 Extracting React components for Sphinx integration...")
        
        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Extract different types of components
        ui_components = self.extract_ui_components()
        page_components = self.extract_page_components()
        hook_components = self.extract_hooks()
        
        # Generate component registry
        self.generate_component_registry(ui_components, page_components, hook_components)
        
        # Generate Sphinx directives
        self.generate_sphinx_directives()
        
        print("✅ Component extraction completed!")
        
    def extract_ui_components(self) -> List[Dict]:
        """Extract UI components from components/ui/"""
        components = []
        ui_dir = self.components_dir / "ui"
        
        if not ui_dir.exists():
            return components
            
        for tsx_file in ui_dir.glob("*.tsx"):
            component_info = self.parse_tsx_component(tsx_file)
            if component_info:
                component_info['type'] = 'ui'
                components.append(component_info)
                self.generate_component_rst(component_info)
                
        return components
    
    def extract_page_components(self) -> List[Dict]:
        """Extract page components from app/ and components/"""
        components = []
        
        # Extract from components/
        for tsx_file in self.components_dir.glob("*.tsx"):
            component_info = self.parse_tsx_component(tsx_file)
            if component_info:
                component_info['type'] = 'page'
                components.append(component_info)
                self.generate_component_rst(component_info)
        
        # Extract from app/
        if self.app_dir.exists():
            for tsx_file in self.app_dir.rglob("*.tsx"):
                component_info = self.parse_tsx_component(tsx_file)
                if component_info:
                    component_info['type'] = 'app'
                    components.append(component_info)
                    self.generate_component_rst(component_info)
                    
        return components
    
    def extract_hooks(self) -> List[Dict]:
        """Extract custom hooks"""
        hooks = []
        
        if not self.hooks_dir.exists():
            return hooks
            
        for tsx_file in self.hooks_dir.glob("*.tsx"):
            hook_info = self.parse_hook(tsx_file)
            if hook_info:
                hooks.append(hook_info)
                self.generate_hook_rst(hook_info)
                
        return hooks
    
    def parse_tsx_component(self, file_path: Path) -> Optional[Dict]:
        """Parse a TSX component file and extract metadata"""
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Extract component name
            component_name = self.extract_component_name(content, file_path.stem)
            
            # Extract props interface
            props = self.extract_props_interface(content)
            
            # Extract imports
            imports = self.extract_imports(content)
            
            # Extract JSX structure
            jsx_structure = self.extract_jsx_structure(content)
            
            # Extract styling classes
            styling = self.extract_styling_classes(content)
            
            return {
                'name': component_name,
                'file_path': str(file_path.relative_to(self.project_root)),
                'props': props,
                'imports': imports,
                'jsx_structure': jsx_structure,
                'styling': styling,
                'description': self.extract_description(content)
            }
            
        except Exception as e:
            print(f"⚠️ Error parsing {file_path}: {e}")
            return None
    
    def parse_hook(self, file_path: Path) -> Optional[Dict]:
        """Parse a custom hook file"""
        try:
            content = file_path.read_text(encoding='utf-8')
            
            hook_name = self.extract_hook_name(content, file_path.stem)
            parameters = self.extract_hook_parameters(content)
            return_type = self.extract_hook_return_type(content)
            
            return {
                'name': hook_name,
                'file_path': str(file_path.relative_to(self.project_root)),
                'parameters': parameters,
                'return_type': return_type,
                'description': self.extract_description(content)
            }
            
        except Exception as e:
            print(f"⚠️ Error parsing hook {file_path}: {e}")
            return None
    
    def extract_component_name(self, content: str, fallback: str) -> str:
        """Extract component name from export statement"""
        # Look for export default function ComponentName
        match = re.search(r'export\s+default\s+function\s+(\w+)', content)
        if match:
            return match.group(1)
        
        # Look for export function ComponentName
        match = re.search(r'export\s+function\s+(\w+)', content)
        if match:
            return match.group(1)
            
        # Look for const ComponentName = 
        match = re.search(r'const\s+(\w+)\s*=.*?=>', content)
        if match:
            return match.group(1)
            
        return fallback.replace('-', '').title()
    
    def extract_props_interface(self, content: str) -> List[Dict]:
        """Extract props interface definition"""
        props = []
        
        # Look for interface definitions
        interface_matches = re.finditer(r'interface\s+(\w+Props?)\s*{([^}]+)}', content, re.DOTALL)
        
        for match in interface_matches:
            interface_body = match.group(2)
            prop_matches = re.finditer(r'(\w+)(\??):\s*([^;\n]+)', interface_body)
            
            for prop_match in prop_matches:
                props.append({
                    'name': prop_match.group(1),
                    'optional': bool(prop_match.group(2)),
                    'type': prop_match.group(3).strip(),
                })
                
        return props
    
    def extract_imports(self, content: str) -> List[Dict]:
        """Extract import statements"""
        imports = []
        import_matches = re.finditer(r'import\s+(?:{([^}]+)}|\*\s+as\s+(\w+)|(\w+))\s+from\s+["\']([^"\']+)["\']', content)
        
        for match in import_matches:
            if match.group(1):  # Named imports
                named_imports = [imp.strip() for imp in match.group(1).split(',')]
                imports.append({
                    'type': 'named',
                    'imports': named_imports,
                    'from': match.group(4)
                })
            elif match.group(2):  # Namespace import
                imports.append({
                    'type': 'namespace',
                    'import': match.group(2),
                    'from': match.group(4)
                })
            elif match.group(3):  # Default import
                imports.append({
                    'type': 'default',
                    'import': match.group(3),
                    'from': match.group(4)
                })
                
        return imports
    
    def extract_jsx_structure(self, content: str) -> Dict:
        """Extract JSX structure and elements"""
        # This is a simplified JSX parser - in production, you'd use a proper AST parser
        jsx_elements = re.findall(r'<(\w+)(?:\s+[^>]*)?(?:/>|>.*?</\1>)', content, re.DOTALL)
        
        return {
            'elements': list(set(jsx_elements)),
            'has_conditional_rendering': '?' in content and ':' in content,
            'has_mapping': '.map(' in content,
            'has_state': 'useState' in content,
            'has_effects': 'useEffect' in content
        }
    
    def extract_styling_classes(self, content: str) -> List[str]:
        """Extract Tailwind/CSS classes"""
        class_matches = re.findall(r'className=["\']([^"\']+)["\']', content)
        all_classes = []
        
        for class_string in class_matches:
            classes = class_string.split()
            all_classes.extend(classes)
            
        return list(set(all_classes))
    
    def extract_description(self, content: str) -> str:
        """Extract component description from comments"""
        # Look for JSDoc comments
        jsdoc_match = re.search(r'/\*\*\s*\n\s*\*\s*([^\n]+)', content)
        if jsdoc_match:
            return jsdoc_match.group(1).strip()
        
        # Look for single line comments at the top
        comment_match = re.search(r'//\s*([^\n]+)', content)
        if comment_match:
            return comment_match.group(1).strip()
            
        return ""
    
    def extract_hook_name(self, content: str, fallback: str) -> str:
        """Extract hook name"""
        match = re.search(r'export\s+function\s+(use\w+)', content)
        if match:
            return match.group(1)
        return fallback
    
    def extract_hook_parameters(self, content: str) -> List[Dict]:
        """Extract hook parameters"""
        # Simplified parameter extraction
        match = re.search(r'function\s+use\w+\s*$$([^)]*)$$', content)
        if match:
            params_str = match.group(1)
            if params_str.strip():
                return [{'name': p.strip(), 'type': 'any'} for p in params_str.split(',')]
        return []
    
    def extract_hook_return_type(self, content: str) -> str:
        """Extract hook return type"""
        # Look for return statement
        return_match = re.search(r'return\s+({[^}]+}|\w+)', content)
        if return_match:
            return return_match.group(1)
        return "unknown"
    
    def generate_component_rst(self, component_info: Dict):
        """Generate RST file for a component"""
        rst_content = f"""
{component_info['name']}
{'=' * len(component_info['name'])}

{component_info.get('description', f"The {component_info['name']} component.")}

.. component:: {component_info['name']}
   :file: {component_info['file_path']}
   :type: {component_info.get('type', 'component')}

"""

        if component_info.get('props'):
            rst_content += """
Props
-----

.. list-table::
   :header-rows: 1
   :widths: 20 20 10 50

   * - Name
     - Type
     - Required
     - Description
"""
            for prop in component_info['props']:
                required = "No" if prop['optional'] else "Yes"
                rst_content += f"""   * - {prop['name']}
     - {prop['type']}
     - {required}
     - 
"""

        if component_info.get('styling'):
            rst_content += f"""
Styling Classes
---------------

This component uses the following CSS classes:

.. code-block:: css

   {' '.join(component_info['styling'][:10])}  # Show first 10 classes

"""

        if component_info.get('jsx_structure'):
            jsx = component_info['jsx_structure']
            rst_content += f"""
Component Features
------------------

* **Elements Used**: {', '.join(jsx.get('elements', [])[:5])}
* **Has State**: {'Yes' if jsx.get('has_state') else 'No'}
* **Has Effects**: {'Yes' if jsx.get('has_effects') else 'No'}
* **Has Conditional Rendering**: {'Yes' if jsx.get('has_conditional_rendering') else 'No'}
* **Has List Rendering**: {'Yes' if jsx.get('has_mapping') else 'No'}

"""

        rst_content += f"""
Usage Example
-------------

.. code-block:: typescript

   import {{ {component_info['name']} }} from '{component_info['file_path'].replace('.tsx', '')}'

   export default function MyPage() {{
     return (
       <{component_info['name']} />
     )
   }}

File Location
-------------

:File: ``{component_info['file_path']}``
:Type: {component_info.get('type', 'component').title()} Component

"""

        # Write RST file
        output_file = self.output_dir / f"{component_info['name'].lower()}.rst"
        output_file.write_text(rst_content, encoding='utf-8')
        print(f"📝 Generated RST for {component_info['name']}")
    
    def generate_hook_rst(self, hook_info: Dict):
        """Generate RST file for a hook"""
        rst_content = f"""
{hook_info['name']}
{'=' * len(hook_info['name'])}

{hook_info.get('description', f"The {hook_info['name']} custom hook.")}

.. hook:: {hook_info['name']}
   :file: {hook_info['file_path']}

"""

        if hook_info.get('parameters'):
            rst_content += """
Parameters
----------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Parameter
     - Type
"""
            for param in hook_info['parameters']:
                rst_content += f"""   * - {param['name']}
     - {param['type']}
"""

        rst_content += f"""
Returns
-------

{hook_info.get('return_type', 'unknown')}

Usage Example
-------------

.. code-block:: typescript

   import {{ {hook_info['name']} }} from '{hook_info['file_path'].replace('.tsx', '')}'

   export default function MyComponent() {{
     const result = {hook_info['name']}()
     
     return (
       <div>{{/* Use the hook result */}}</div>
     )
   }}

File Location
-------------

:File: ``{hook_info['file_path']}``
:Type: Custom Hook

"""

        # Write RST file
        output_file = self.output_dir / f"{hook_info['name'].lower()}.rst"
        output_file.write_text(rst_content, encoding='utf-8')
        print(f"🪝 Generated RST for {hook_info['name']}")
    
    def generate_component_registry(self, ui_components: List[Dict], page_components: List[Dict], hook_components: List[Dict]):
        """Generate a registry of all components"""
        registry = {
            'ui_components': ui_components,
            'page_components': page_components,
            'hooks': hook_components,
            'total_components': len(ui_components) + len(page_components),
            'total_hooks': len(hook_components)
        }
        
        # Save as JSON
        registry_file = self.output_dir / "component_registry.json"
        with open(registry_file, 'w', encoding='utf-8') as f:
            json.dump(registry, f, indent=2)
        
        # Generate RST index
        self.generate_component_index_rst(registry)
        
        print(f"📋 Generated component registry with {registry['total_components']} components and {registry['total_hooks']} hooks")
    
    def generate_component_index_rst(self, registry: Dict):
        """Generate main component index RST file"""
        rst_content = """
Component Documentation
=======================

This section contains documentation for all React components and hooks extracted from the Next.js application.

"""

        if registry['ui_components']:
            rst_content += """
UI Components
-------------

.. toctree::
   :maxdepth: 1

"""
            for component in registry['ui_components']:
                rst_content += f"   {component['name'].lower()}\n"

        if registry['page_components']:
            rst_content += """
Page Components
---------------

.. toctree::
   :maxdepth: 1

"""
            for component in registry['page_components']:
                rst_content += f"   {component['name'].lower()}\n"

        if registry['hooks']:
            rst_content += """
Custom Hooks
------------

.. toctree::
   :maxdepth: 1

"""
            for hook in registry['hooks']:
                rst_content += f"   {hook['name'].lower()}\n"

        rst_content += f"""
Component Statistics
--------------------

:Total Components: {registry['total_components']}
:UI Components: {len(registry['ui_components'])}
:Page Components: {len(registry['page_components'])}
:Custom Hooks: {len(registry['hooks'])}

"""

        # Write index file
        index_file = self.output_dir / "index.rst"
        index_file.write_text(rst_content, encoding='utf-8')
        print("📚 Generated component index")
    
    def generate_sphinx_directives(self):
        """Generate custom Sphinx directives for components"""
        directive_content = '''"""
Custom Sphinx directives for React components
"""
from docutils import nodes
from docutils.parsers.rst import Directive, directives
from sphinx.util.docutils import SphinxDirective
import json
import os

class ComponentDirective(SphinxDirective):
    """Directive to document React components"""
    
    has_content = True
    required_arguments = 1
    optional_arguments = 0
    option_spec = {
        'file': directives.unchanged,
        'type': directives.unchanged,
        'props': directives.unchanged,
    }
    
    def run(self):
        component_name = self.arguments[0]
        file_path = self.options.get('file', '')
        component_type = self.options.get('type', 'component')
        
        # Create component documentation node
        container = nodes.container()
        container['classes'].append('react-component')
        
        # Add component header
        header = nodes.paragraph()
        header += nodes.strong(text=f"{component_name} ({component_type})")
        container += header
        
        # Add file path
        if file_path:
            file_para = nodes.paragraph()
            file_para += nodes.emphasis(text=f"File: {file_path}")
            container += file_para
        
        # Add content
        if self.content:
            content_node = nodes.paragraph()
            content_node += nodes.Text('\\n'.join(self.content))
            container += content_node
        
        return [container]

class HookDirective(SphinxDirective):
    """Directive to document React hooks"""
    
    has_content = True
    required_arguments = 1
    optional_arguments = 0
    option_spec = {
        'file': directives.unchanged,
        'parameters': directives.unchanged,
        'returns': directives.unchanged,
    }
    
    def run(self):
        hook_name = self.arguments[0]
        file_path = self.options.get('file', '')
        
        # Create hook documentation node
        container = nodes.container()
        container['classes'].append('react-hook')
        
        # Add hook header
        header = nodes.paragraph()
        header += nodes.strong(text=f"{hook_name} (Custom Hook)")
        container += header
        
        # Add file path
        if file_path:
            file_para = nodes.paragraph()
            file_para += nodes.emphasis(text=f"File: {file_path}")
            container += file_para
        
        return [container]

def setup(app):
    """Setup the extension"""
    app.add_directive('component', ComponentDirective)
    app.add_directive('hook', HookDirective)
    
    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
'''
        
        directive_file = self.project_root / "_extensions" / "react_components.py"
        directive_file.parent.mkdir(exist_ok=True)
        directive_file.write_text(directive_content, encoding='utf-8')
        print("🔧 Generated Sphinx directives for React components")

if __name__ == "__main__":
    import sys
    project_root = sys.argv[1] if len(sys.argv) > 1 else "."
    
    extractor = ComponentExtractor(project_root)
    extractor.extract_all_components()
