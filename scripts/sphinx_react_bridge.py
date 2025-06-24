"""
Sphinx-React Bridge - Integrates React components with Sphinx documentation
"""
import os
import json
import shutil
from pathlib import Path
from typing import Dict, List, Any
import subprocess

class SphinxReactBridge:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.docs_dir = self.project_root / "docs"
        self.src_dir = self.project_root / "src"
        self.components_dir = self.project_root / "components"
        self.app_dir = self.project_root / "app"
        
    def integrate_components(self):
        """Main integration process"""
        print("🔄 Starting Sphinx-React integration...")
        
        # Step 1: Extract components
        self.extract_components()
        
        # Step 2: Generate component documentation
        self.generate_component_docs()
        
        # Step 3: Update Sphinx configuration
        self.update_sphinx_config()
        
        # Step 4: Create component showcase pages
        self.create_component_showcase()
        
        # Step 5: Generate interactive examples
        self.generate_interactive_examples()
        
        print("✅ Sphinx-React integration completed!")
    
    def extract_components(self):
        """Extract React components using the component extractor"""
        from component_extractor import ComponentExtractor
        
        extractor = ComponentExtractor(str(self.project_root))
        extractor.extract_all_components()
    
    def generate_component_docs(self):
        """Generate comprehensive component documentation"""
        extracted_dir = self.src_dir / "gcp_docs" / "extracted_components"
        
        if not extracted_dir.exists():
            print("⚠️ No extracted components found. Run component extraction first.")
            return
        
        # Load component registry
        registry_file = extracted_dir / "component_registry.json"
        if registry_file.exists():
            with open(registry_file, 'r') as f:
                registry = json.load(f)
            
            self.create_component_gallery(registry)
            self.create_component_api_docs(registry)
            self.create_component_examples(registry)
    
    def create_component_gallery(self, registry: Dict):
        """Create a visual component gallery"""
        gallery_content = """
Component Gallery
=================

Visual showcase of all React components in the GRA Core Platform documentation.

.. raw:: html

   <div class="component-gallery">
     <div class="gallery-header">
       <h2>🎨 Interactive Component Gallery</h2>
       <p>Explore all available components with live examples and documentation.</p>
     </div>
     
     <div class="gallery-grid">
"""

        # Add UI Components
        if registry.get('ui_components'):
            gallery_content += """
       <div class="gallery-section">
         <h3>🧩 UI Components</h3>
         <div class="component-grid">
"""
            for component in registry['ui_components']:
                gallery_content += f"""
           <div class="component-card" data-component="{component['name']}">
             <div class="component-preview">
               <div class="component-icon">🎯</div>
               <h4>{component['name']}</h4>
               <p>{component.get('description', 'UI Component')}</p>
             </div>
             <div class="component-actions">
               <a href="extracted_components/{component['name'].lower()}.html" class="btn-docs">📖 Docs</a>
               <button class="btn-preview" onclick="showComponentPreview('{component['name']}')">👁️ Preview</button>
             </div>
           </div>
"""
            gallery_content += """
         </div>
       </div>
"""

        # Add Page Components
        if registry.get('page_components'):
            gallery_content += """
       <div class="gallery-section">
         <h3>📄 Page Components</h3>
         <div class="component-grid">
"""
            for component in registry['page_components']:
                gallery_content += f"""
           <div class="component-card" data-component="{component['name']}">
             <div class="component-preview">
               <div class="component-icon">📄</div>
               <h4>{component['name']}</h4>
               <p>{component.get('description', 'Page Component')}</p>
             </div>
             <div class="component-actions">
               <a href="extracted_components/{component['name'].lower()}.html" class="btn-docs">📖 Docs</a>
               <button class="btn-preview" onclick="showComponentPreview('{component['name']}')">👁️ Preview</button>
             </div>
           </div>
"""
            gallery_content += """
         </div>
       </div>
"""

        # Add Custom Hooks
        if registry.get('hooks'):
            gallery_content += """
       <div class="gallery-section">
         <h3>🪝 Custom Hooks</h3>
         <div class="component-grid">
"""
            for hook in registry['hooks']:
                gallery_content += f"""
           <div class="component-card" data-component="{hook['name']}">
             <div class="component-preview">
               <div class="component-icon">🪝</div>
               <h4>{hook['name']}</h4>
               <p>{hook.get('description', 'Custom Hook')}</p>
             </div>
             <div class="component-actions">
               <a href="extracted_components/{hook['name'].lower()}.html" class="btn-docs">📖 Docs</a>
               <button class="btn-code" onclick="showHookCode('{hook['name']}')">💻 Code</button>
             </div>
           </div>
"""
            gallery_content += """
         </div>
       </div>
"""

        gallery_content += """
     </div>
   </div>

   <!-- Component Preview Modal -->
   <div id="component-preview-modal" class="modal" style="display: none;">
     <div class="modal-content">
       <div class="modal-header">
         <h3 id="preview-title">Component Preview</h3>
         <button class="modal-close" onclick="closePreviewModal()">×</button>
       </div>
       <div class="modal-body">
         <div id="preview-content">
           <!-- Component preview will be loaded here -->
         </div>
       </div>
     </div>
   </div>

   <style>
   .component-gallery {
     max-width: 1200px;
     margin: 0 auto;
     padding: 2rem;
   }
   
   .gallery-header {
     text-align: center;
     margin-bottom: 3rem;
   }
   
   .gallery-header h2 {
     font-size: 2.5rem;
     margin-bottom: 1rem;
     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
   }
   
   .gallery-section {
     margin-bottom: 3rem;
   }
   
   .gallery-section h3 {
     font-size: 1.8rem;
     margin-bottom: 1.5rem;
     color: #2d3748;
   }
   
   .component-grid {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
     gap: 1.5rem;
   }
   
   .component-card {
     background: white;
     border-radius: 12px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
     overflow: hidden;
     transition: transform 0.3s ease, box-shadow 0.3s ease;
   }
   
   .component-card:hover {
     transform: translateY(-4px);
     box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
   }
   
   .component-preview {
     padding: 1.5rem;
     text-align: center;
   }
   
   .component-icon {
     font-size: 2.5rem;
     margin-bottom: 1rem;
   }
   
   .component-preview h4 {
     font-size: 1.25rem;
     font-weight: 600;
     margin-bottom: 0.5rem;
     color: #2d3748;
   }
   
   .component-preview p {
     color: #718096;
     font-size: 0.9rem;
   }
   
   .component-actions {
     padding: 1rem 1.5rem;
     background: #f7fafc;
     display: flex;
     gap: 0.5rem;
   }
   
   .btn-docs, .btn-preview, .btn-code {
     flex: 1;
     padding: 0.5rem 1rem;
     border-radius: 6px;
     text-decoration: none;
     text-align: center;
     font-size: 0.875rem;
     font-weight: 500;
     transition: all 0.2s ease;
   }
   
   .btn-docs {
     background: #4299e1;
     color: white;
   }
   
   .btn-preview, .btn-code {
     background: #48bb78;
     color: white;
     border: none;
     cursor: pointer;
   }
   
   .btn-docs:hover, .btn-preview:hover, .btn-code:hover {
     transform: translateY(-1px);
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
   }
   
   .modal {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: rgba(0, 0, 0, 0.5);
     z-index: 1000;
     display: flex;
     align-items: center;
     justify-content: center;
   }
   
   .modal-content {
     background: white;
     border-radius: 12px;
     max-width: 90vw;
     max-height: 90vh;
     overflow: hidden;
   }
   
   .modal-header {
     padding: 1rem 1.5rem;
     border-bottom: 1px solid #e2e8f0;
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
   
   .modal-close {
     background: none;
     border: none;
     font-size: 1.5rem;
     cursor: pointer;
     color: #718096;
   }
   
   .modal-body {
     padding: 1.5rem;
     max-height: 70vh;
     overflow-y: auto;
   }
   </style>

   <script>
   function showComponentPreview(componentName) {
     document.getElementById('preview-title').textContent = componentName + ' Preview';
     document.getElementById('preview-content').innerHTML = `
       <div style="text-align: center; padding: 2rem;">
         <h4>🚧 Component Preview</h4>
         <p>Interactive preview for <strong>${componentName}</strong> will be available soon.</p>
         <p>This feature will show a live rendering of the React component.</p>
       </div>
     `;
     document.getElementById('component-preview-modal').style.display = 'flex';
   }
   
   function showHookCode(hookName) {
     document.getElementById('preview-title').textContent = hookName + ' Code';
     document.getElementById('preview-content').innerHTML = `
       <div style="text-align: center; padding: 2rem;">
         <h4>💻 Hook Code</h4>
         <p>Code example for <strong>${hookName}</strong> will be displayed here.</p>
         <p>This will show usage examples and implementation details.</p>
       </div>
     `;
     document.getElementById('component-preview-modal').style.display = 'flex';
   }
   
   function closePreviewModal() {
     document.getElementById('component-preview-modal').style.display = 'none';
   }
   
   // Close modal when clicking outside
   document.getElementById('component-preview-modal').addEventListener('click', function(e) {
     if (e.target === this) {
       closePreviewModal();
     }
   });
   </script>

Component Statistics
--------------------

:Total Components: {registry.get('total_components', 0)}
:UI Components: {len(registry.get('ui_components', []))}
:Page Components: {len(registry.get('page_components', []))}
:Custom Hooks: {len(registry.get('hooks', []))}

.. toctree::
   :maxdepth: 2
   :caption: Component Documentation:

   extracted_components/index

"""

        # Write gallery file
        gallery_file = self.src_dir / "gcp_docs" / "component_gallery.rst"
        gallery_file.parent.mkdir(parents=True, exist_ok=True)
        gallery_file.write_text(gallery_content, encoding='utf-8')
        print("🎨 Generated component gallery")
    
    def create_component_api_docs(self, registry: Dict):
        """Create API documentation for components"""
        api_content = """
Component API Reference
=======================

Complete API reference for all React components and hooks.

"""

        # Add sections for each component type
        for component_type in ['ui_components', 'page_components']:
            components = registry.get(component_type, [])
            if components:
                section_title = component_type.replace('_', ' ').title()
                api_content += f"""
{section_title}
{'-' * len(section_title)}

.. toctree::
   :maxdepth: 1

"""
                for component in components:
                    api_content += f"   extracted_components/{component['name'].lower()}\n"

        # Add hooks section
        hooks = registry.get('hooks', [])
        if hooks:
            api_content += """
Custom Hooks
------------

.. toctree::
   :maxdepth: 1

"""
            for hook in hooks:
                api_content += f"   extracted_components/{hook['name'].lower()}\n"

        # Write API docs file
        api_file = self.src_dir / "gcp_docs" / "component_api.rst"
        api_file.write_text(api_content, encoding='utf-8')
        print("📚 Generated component API documentation")
    
    def create_component_examples(self, registry: Dict):
        """Create usage examples for components"""
        examples_content = """
Component Usage Examples
========================

Real-world usage examples for React components and hooks.

.. raw:: html

   <div class="examples-container">
     <div class="examples-header">
       <h2>💡 Component Usage Examples</h2>
       <p>Learn how to use components with practical examples.</p>
     </div>
   </div>

"""

        # Add example sections
        all_components = []
        all_components.extend(registry.get('ui_components', []))
        all_components.extend(registry.get('page_components', []))

        for component in all_components[:5]:  # Show first 5 components
            examples_content += f"""
{component['name']} Example
{'-' * (len(component['name']) + 8)}

Basic Usage
~~~~~~~~~~~

.. code-block:: typescript

   import {{ {component['name']} }} from '{component['file_path'].replace('.tsx', '')}'

   export default function ExamplePage() {{
     return (
       <div>
         <{component['name']} />
       </div>
     )
   }}

"""

            # Add props example if available
            if component.get('props'):
                examples_content += f"""
With Props
~~~~~~~~~~

.. code-block:: typescript

   <{component['name']}
"""
                for prop in component['props'][:3]:  # Show first 3 props
                    if prop['type'] == 'string':
                        examples_content += f'     {prop["name"]}="example value"\n'
                    elif prop['type'] == 'boolean':
                        examples_content += f'     {prop["name"]}={{true}}\n'
                    else:
                        examples_content += f'     {prop["name"]}={{/* {prop["type"]} value */}}\n'
                
                examples_content += f"   />\n\n"

        # Write examples file
        examples_file = self.src_dir / "gcp_docs" / "component_examples.rst"
        examples_file.write_text(examples_content, encoding='utf-8')
        print("💡 Generated component usage examples")
    
    def update_sphinx_config(self):
        """Update Sphinx configuration to include React components"""
        conf_file = self.project_root / "conf.py"
        
        if not conf_file.exists():
            print("⚠️ conf.py not found. Creating basic configuration.")
            self.create_basic_sphinx_config()
            return
        
        # Read existing config
        with open(conf_file, 'r', encoding='utf-8') as f:
            config_content = f.read()
        
        # Add React components extension if not present
        if 'react_components' not in config_content:
            # Find extensions list and add our extension
            if "extensions = [" in config_content:
                config_content = config_content.replace(
                    "extensions = [",
                    "extensions = [\n    'react_components',  # React component integration"
                )
            else:
                # Add extensions list
                config_content += "\n\n# React Components Integration\nextensions.append('react_components')\n"
        
        # Add component-specific configuration
        component_config = """

# React Components Configuration
react_components_config = {
    'enable_component_gallery': True,
    'enable_interactive_examples': True,
    'component_base_path': 'src/gcp_docs/extracted_components',
    'show_component_source': True,
    'enable_component_search': True,
}

# Add component gallery to HTML context
html_context.update({
    'enable_component_gallery': True,
    'component_gallery_path': 'src/gcp_docs/component_gallery.rst',
})

# Add component-specific CSS and JS
html_css_files.extend([
    'css/components.css',
    'css/component-gallery.css',
])

html_js_files.extend([
    'js/component-interactions.js',
    'js/component-preview.js',
])
"""

        if 'react_components_config' not in config_content:
            config_content += component_config
        
        # Write updated config
        with open(conf_file, 'w', encoding='utf-8') as f:
            f.write(config_content)
        
        print("⚙️ Updated Sphinx configuration for React components")
    
    def create_component_showcase(self):
        """Create interactive component showcase"""
        showcase_content = """
Interactive Component Showcase
==============================

.. raw:: html

   <div id="component-showcase" class="showcase-container">
     <div class="showcase-header">
       <h2>🎭 Interactive Component Showcase</h2>
       <p>Experience components in action with live examples and customization options.</p>
     </div>
     
     <div class="showcase-tabs">
       <button class="tab-button active" onclick="showTab('ui-components')">UI Components</button>
       <button class="tab-button" onclick="showTab('page-components')">Page Components</button>
       <button class="tab-button" onclick="showTab('hooks')">Custom Hooks</button>
     </div>
     
     <div id="ui-components" class="tab-content active">
       <div class="component-showcase-grid">
         <!-- UI Components will be populated here -->
         <div class="showcase-item">
           <h3>🎯 Button Component</h3>
           <div class="showcase-preview">
             <button class="btn-primary">Primary Button</button>
             <button class="btn-secondary">Secondary Button</button>
           </div>
           <div class="showcase-code">
             <pre><code>&lt;Button variant="primary"&gt;Click me&lt;/Button&gt;</code></pre>
           </div>
         </div>
         
         <div class="showcase-item">
           <h3>📋 Card Component</h3>
           <div class="showcase-preview">
             <div class="card-example">
               <h4>Card Title</h4>
               <p>Card content goes here...</p>
             </div>
           </div>
           <div class="showcase-code">
             <pre><code>&lt;Card title="Card Title"&gt;Content&lt;/Card&gt;</code></pre>
           </div>
         </div>
       </div>
     </div>
     
     <div id="page-components" class="tab-content">
       <div class="component-showcase-grid">
         <div class="showcase-item">
           <h3>🏠 Header Component</h3>
           <div class="showcase-preview">
             <div class="header-example">
               <div class="logo">GRA</div>
               <nav>
                 <a href="#">Home</a>
                 <a href="#">Docs</a>
                 <a href="#">API</a>
               </nav>
             </div>
           </div>
         </div>
         
         <div class="showcase-item">
           <h3>🎨 Banner Component</h3>
           <div class="showcase-preview">
             <div class="banner-example">
               🎉 New version available! <a href="#">Learn more</a>
             </div>
           </div>
         </div>
       </div>
     </div>
     
     <div id="hooks" class="tab-content">
       <div class="hooks-showcase">
         <div class="hook-item">
           <h3>🪝 useStopwatch</h3>
           <div class="hook-demo">
             <div id="stopwatch-demo">00:00.00</div>
             <button onclick="toggleStopwatch()">Start/Stop</button>
             <button onclick="resetStopwatch()">Reset</button>
           </div>
           <div class="hook-code">
             <pre><code>const { time, isRunning, start, pause, reset } = useStopwatch()</code></pre>
           </div>
         </div>
       </div>
     </div>
   </div>

   <style>
   .showcase-container {
     max-width: 1200px;
     margin: 0 auto;
     padding: 2rem;
   }
   
   .showcase-header {
     text-align: center;
     margin-bottom: 2rem;
   }
   
   .showcase-tabs {
     display: flex;
     border-bottom: 2px solid #e2e8f0;
     margin-bottom: 2rem;
   }
   
   .tab-button {
     padding: 1rem 2rem;
     background: none;
     border: none;
     cursor: pointer;
     font-weight: 500;
     color: #718096;
     border-bottom: 2px solid transparent;
     transition: all 0.3s ease;
   }
   
   .tab-button.active {
     color: #4299e1;
     border-bottom-color: #4299e1;
   }
   
   .tab-content {
     display: none;
   }
   
   .tab-content.active {
     display: block;
   }
   
   .component-showcase-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
     gap: 2rem;
   }
   
   .showcase-item {
     background: white;
     border-radius: 12px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
     overflow: hidden;
   }
   
   .showcase-item h3 {
     padding: 1rem 1.5rem;
     margin: 0;
     background: #f7fafc;
     border-bottom: 1px solid #e2e8f0;
   }
   
   .showcase-preview {
     padding: 2rem 1.5rem;
     background: #fafafa;
     border-bottom: 1px solid #e2e8f0;
   }
   
   .showcase-code {
     padding: 1rem 1.5rem;
   }
   
   .showcase-code pre {
     margin: 0;
     background: #2d3748;
     color: #e2e8f0;
     padding: 1rem;
     border-radius: 6px;
     overflow-x: auto;
   }
   
   /* Example component styles */
   .btn-primary {
     background: #4299e1;
     color: white;
     padding: 0.5rem 1rem;
     border: none;
     border-radius: 6px;
     margin-right: 0.5rem;
     cursor: pointer;
   }
   
   .btn-secondary {
     background: #718096;
     color: white;
     padding: 0.5rem 1rem;
     border: none;
     border-radius: 6px;
     cursor: pointer;
   }
   
   .card-example {
     background: white;
     padding: 1.5rem;
     border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   
   .header-example {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 1rem;
     background: #2d3748;
     color: white;
     border-radius: 6px;
   }
   
   .header-example .logo {
     font-weight: bold;
     font-size: 1.25rem;
   }
   
   .header-example nav a {
     color: white;
     text-decoration: none;
     margin-left: 1rem;
   }
   
   .banner-example {
     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
     color: white;
     padding: 1rem;
     border-radius: 6px;
     text-align: center;
   }
   
   .banner-example a {
     color: white;
     text-decoration: underline;
   }
   
   .hook-item {
     background: white;
     border-radius: 12px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
     overflow: hidden;
     margin-bottom: 2rem;
   }
   
   .hook-demo {
     padding: 2rem;
     text-align: center;
     background: #f7fafc;
   }
   
   #stopwatch-demo {
     font-size: 2rem;
     font-weight: bold;
     margin-bottom: 1rem;
     font-family: monospace;
   }
   
   .hook-demo button {
     margin: 0 0.5rem;
     padding: 0.5rem 1rem;
     background: #4299e1;
     color: white;
     border: none;
     border-radius: 6px;
     cursor: pointer;
   }
   
   .hook-code {
     padding: 1rem 1.5rem;
   }
   </style>

   <script>
   function showTab(tabName) {
     // Hide all tab contents
     const tabContents = document.querySelectorAll('.tab-content');
     tabContents.forEach(content => content.classList.remove('active'));
     
     // Remove active class from all buttons
     const tabButtons = document.querySelectorAll('.tab-button');
     tabButtons.forEach(button => button.classList.remove('active'));
     
     // Show selected tab
     document.getElementById(tabName).classList.add('active');
     
     // Add active class to clicked button
     event.target.classList.add('active');
   }
   
   // Stopwatch demo functionality
   let stopwatchTime = 0;
   let stopwatchInterval = null;
   let isStopwatchRunning = false;
   
   function toggleStopwatch() {
     if (isStopwatchRunning) {
       clearInterval(stopwatchInterval);
       isStopwatchRunning = false;
     } else {
       stopwatchInterval = setInterval(() => {
         stopwatchTime += 10;
         updateStopwatchDisplay();
       }, 10);
       isStopwatchRunning = true;
     }
   }
   
   function resetStopwatch() {
     clearInterval(stopwatchInterval);
     stopwatchTime = 0;
     isStopwatchRunning = false;
     updateStopwatchDisplay();
   }
   
   function updateStopwatchDisplay() {
     const minutes = Math.floor(stopwatchTime / 60000);
     const seconds = Math.floor((stopwatchTime % 60000) / 1000);
     const milliseconds = Math.floor((stopwatchTime % 1000) / 10);
     
     const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
     document.getElementById('stopwatch-demo').textContent = display;
   }
   </script>

"""

        # Write showcase file
        showcase_file = self.src_dir / "gcp_docs" / "component_showcase.rst"
        showcase_file.write_text(showcase_content, encoding='utf-8')
        print("🎭 Generated interactive component showcase")
    
    def generate_interactive_examples(self):
        """Generate interactive examples for components"""
        # This would generate actual interactive examples
        # For now, we'll create placeholder content
        
        examples_dir = self.src_dir / "gcp_docs" / "interactive_examples"
        examples_dir.mkdir(parents=True, exist_ok=True)
        
        # Create example HTML files that could be embedded
        button_example = """
<!DOCTYPE html>
<html>
<head>
    <title>Button Component Example</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 2rem; }
        .btn { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; margin: 0.5rem; }
        .btn-primary { background: #4299e1; color: white; }
        .btn-secondary { background: #718096; color: white; }
        .btn:hover { opacity: 0.8; }
    </style>
</head>
<body>
    <h3>Button Component Interactive Example</h3>
    <button class="btn btn-primary" onclick="alert('Primary button clicked!')">Primary Button</button>
    <button class="btn btn-secondary" onclick="alert('Secondary button clicked!')">Secondary Button</button>
</body>
</html>
"""
        
        (examples_dir / "button_example.html").write_text(button_example, encoding='utf-8')
        
        print("🎮 Generated interactive examples")
    
    def create_basic_sphinx_config(self):
        """Create a basic Sphinx configuration if none exists"""
        basic_config = '''
# Basic Sphinx configuration for React component integration
import os
import sys
from datetime import datetime

# Add extensions path
sys.path.insert(0, os.path.abspath('_extensions'))

# Project information
project = 'GRA Core Platform with React Components'
copyright = f'{datetime.now().year}, Bank of America'
author = 'Bank of America Technology Team'

# Version info
version = '5.7'
release = '5.7.0'

# Extensions
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'react_components',  # React component integration
]

# Templates and static files
templates_path = ['_templates']
html_static_path = ['_static']

# HTML theme
html_theme = 'sphinx_rtd_theme'
html_title = f"{project} Documentation"

# Master document
master_doc = 'index'

# Source file suffixes
source_suffix = {
    '.rst': None,
    '.md': 'myst_parser',
}

# Exclude patterns
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# HTML context for React components
html_context = {
    'enable_component_gallery': True,
}

# CSS and JS files
html_css_files = [
    'css/custom.css',
    'css/components.css',
]

html_js_files = [
    'js/custom.js',
    'js/component-interactions.js',
]
'''
        
        conf_file = self.project_root / "conf.py"
        conf_file.write_text(basic_config, encoding='utf-8')
        print("⚙️ Created basic Sphinx configuration")

if __name__ == "__main__":
    import sys
    project_root = sys.argv[1] if len(sys.argv) > 1 else "."
    
    bridge = SphinxReactBridge(project_root)
    bridge.integrate_components()
