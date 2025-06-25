#!/bin/bash

# Ensure script doesn't close immediately
set -e
trap 'echo "Script failed at line $LINENO. Press any key to exit..."; read -n 1' ERR

# Add debug mode
if [[ "${1}" == "--debug" ]]; then
    set -x
fi

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🧩 Extracting React Components for Sphinx${NC}"
echo "=============================================="

# Check if virtual environment exists and activate it
if [ -d "venv" ]; then
    echo -e "${GREEN}📦 Activating virtual environment...${NC}"
    source venv/Scripts/activate
else
    echo -e "${YELLOW}⚠️  Virtual environment not found. Creating one...${NC}"
    python -m venv venv
    source venv/Scripts/activate
fi

# Create necessary directories
echo -e "${GREEN}📁 Creating directories...${NC}"
mkdir -p _static/react-components
mkdir -p _static/css
mkdir -p _static/js
mkdir -p _build

# Extract React components if they exist
if [ -d "components" ]; then
    echo -e "${GREEN}🔄 Copying React components...${NC}"
    cp -r components/* _static/react-components/ 2>/dev/null || true
    echo "✅ React components copied to _static/react-components/"
else
    echo -e "${YELLOW}⚠️  No components directory found. Creating placeholder...${NC}"
    mkdir -p components
    cat > components/example-component.tsx << 'EOF'
import React from 'react';

interface ExampleProps {
  title: string;
  description?: string;
}

export default function ExampleComponent({ title, description }: ExampleProps) {
  return (
    <div className="example-component">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
EOF
    echo "✅ Created example component"
fi

# Extract CSS files if they exist
if [ -d "app" ] && [ -f "app/globals.css" ]; then
    echo -e "${GREEN}🎨 Copying CSS files...${NC}"
    cp app/globals.css _static/css/ 2>/dev/null || true
    echo "✅ CSS files copied"
fi

# Extract Next.js components if they exist
if [ -d "app" ]; then
    echo -e "${GREEN}📱 Processing Next.js app files...${NC}"
    find app -name "*.tsx" -type f | while read -r file; do
        filename=$(basename "$file")
        cp "$file" "_static/react-components/$filename" 2>/dev/null || true
    done
    echo "✅ Next.js components processed"
fi

# Create component registry
echo -e "${GREEN}📋 Creating component registry...${NC}"
cat > _static/react-components/registry.json << 'EOF'
{
  "components": [
    {
      "name": "ExampleComponent",
      "file": "example-component.tsx",
      "props": {
        "title": "string",
        "description": "string (optional)"
      }
    }
  ],
  "extracted_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "version": "1.0.0"
}
EOF

# Run component extractor if it exists
if [ -f "scripts/component_extractor.py" ]; then
    echo -e "${GREEN}🔄 Running Python component extractor...${NC}"
    python scripts/component_extractor.py . || echo -e "${YELLOW}⚠️  Component extractor had issues but continuing...${NC}"
else
    echo -e "${YELLOW}⚠️  Python component extractor not found. Skipping...${NC}"
fi

# Create integration files
echo -e "${GREEN}🔗 Creating integration files...${NC}"

# Create CSS integration file
cat > _static/css/react-integration.css << 'EOF'
/* React Component Integration Styles */
.react-component-container {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    background-color: #f6f8fa;
}

.react-component-preview {
    background: white;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.react-component-error {
    color: #d73a49;
    background-color: #ffeef0;
    border: 1px solid #fdaeb7;
    padding: 0.75rem;
    border-radius: 4px;
}

.example-component {
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    text-align: center;
}

.example-component h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
}

.example-component p {
    margin: 0;
    opacity: 0.9;
}
EOF

# Create JavaScript integration file
cat > _static/js/react-integration.js << 'EOF'
// React Component Integration JavaScript
console.log('React integration loaded');

// Function to render React components in Sphinx
function renderReactComponent(elementId, componentName, props) {
    console.log('Rendering component:', componentName, 'with props:', props);
    
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Element not found:', elementId);
        return;
    }
    
    // For now, create a placeholder
    element.innerHTML = `
        <div class="react-component-container">
            <div class="react-component-preview">
                <h4>React Component: ${componentName}</h4>
                <p>Props: ${JSON.stringify(props, null, 2)}</p>
                <p><em>Component rendering will be implemented when React is fully integrated.</em></p>
            </div>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('React integration initialized');
    
    // Find all react-component elements and render them
    const reactElements = document.querySelectorAll('[data-react-component]');
    reactElements.forEach(function(element) {
        const componentName = element.getAttribute('data-react-component');
        const propsStr = element.getAttribute('data-react-props');
        let props = {};
        
        try {
            props = propsStr ? JSON.parse(propsStr) : {};
        } catch (e) {
            console.error('Error parsing props:', e);
        }
        
        renderReactComponent(element.id, componentName, props);
    });
});
EOF

echo -e "${GREEN}🎉 Component extraction completed successfully!${NC}"
echo ""
echo -e "${BLUE}📊 Summary:${NC}"
echo "✅ React components extracted to _static/react-components/"
echo "✅ CSS integration created in _static/css/"
echo "✅ JavaScript integration created in _static/js/"
echo "✅ Component registry created"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Run ./scripts/04_build_docs.sh to build documentation"
echo "2. Run ./scripts/05_serve_docs.sh to serve documentation"
echo ""
echo "Press any key to continue..."
read -n 1 -s
