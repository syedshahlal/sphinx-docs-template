# React Integration Example

This document demonstrates how to integrate React components into Sphinx documentation.

## Basic Component Usage

Here's how to embed a simple React component:

\`\`\`rst
.. react-component:: Button
   :props: {"children": "Click me!", "variant": "primary"}
   :preview:
\`\`\`

This renders as:

.. react-component:: Button
   :props: {"children": "Click me!", "variant": "primary"}
   :preview:

## Interactive Components

For interactive components, add the `:interactive:` flag:

\`\`\`rst
.. react-component:: Counter
   :props: {"initialValue": 0}
   :interactive: true
   :height: 200px
\`\`\`

.. react-component:: Counter
   :props: {"initialValue": 0}
   :interactive: true
   :height: 200px

## Full Page Components

You can embed entire page layouts:

\`\`\`rst
.. react-page:: HomePage
   :route: /
   :layout: DefaultLayout
   :height: 600px
\`\`\`

.. react-page:: HomePage
   :route: /
   :layout: DefaultLayout
   :height: 600px

## Component with Source Code

Show both the component and its source:

\`\`\`rst
.. react-component:: Card
   :props: {"title": "Example Card", "content": "This is an example card component."}
   :preview:
   :source:
\`\`\`

.. react-component:: Card
   :props: {"title": "Example Card", "content": "This is an example card component."}
   :preview:
   :source:

## Complex Props

You can pass complex props as JSON:

\`\`\`rst
.. react-component:: DataTable
   :props: {
     "data": [
       {"id": 1, "name": "John", "email": "john@example.com"},
       {"id": 2, "name": "Jane", "email": "jane@example.com"}
     ],
     "columns": ["name", "email"],
     "sortable": true
   }
   :interactive: true
   :height: 400px
\`\`\`

## Best Practices

1. **Use `:preview:` for static demonstrations**
2. **Use `:interactive:` for functional examples**
3. **Always specify `:height:` for complex components**
4. **Include `:source:` when showing implementation details**
5. **Keep props JSON valid and properly escaped**

## Troubleshooting

If components don't render:

1. Check browser console for errors
2. Verify component exists in your React app
3. Ensure props are valid JSON
4. Check that the React bundle built successfully

Use `window.debugSphinxReact()` in browser console for debug info.
\`\`\`

Perfect! Now you have a complete integration system. Here's how to use it:

## 🎯 **Complete Integration System**

### **📋 What This Provides:**

1. **✅ Keep Your Next.js App** - All your React components, TypeScript, and UI components stay exactly as they are
2. **✅ Sphinx Documentation** - Build docs with `sphinx-build` from .md/.rst files  
3. **✅ Embedded React Components** - Include your actual React components in documentation
4. **✅ Same Design System** - Documentation uses your app's styling and components
5. **✅ Interactive Elements** - Components work interactively in the docs

### **🚀 Usage:**

\`\`\`bash
# Build everything (React + Sphinx integration)
./scripts/build_sphinx_react.sh

# Serve the documentation
./scripts/serve_sphinx_react.sh

# View at http://localhost:8000
\`\`\`

### **📝 Writing Documentation:**

In your `.rst` files, you can now use:

\`\`\`rst
# Embed any React component from your app
.. react-component:: FeatureCards
   :interactive: true
   :height: 600px

# Embed entire pages
.. react-page:: HomePage
   :route: /
   :height: 800px

# Show component with source code
.. react-component:: Button
   :props: {"variant": "primary", "children": "Get Started"}
   :preview:
   :source:
\`\`\`

### **🎨 Design Consistency:**

- **✅ Same Tailwind CSS** - Your app's styling is preserved
- **✅ Same Components** - Actual React components, not recreations
- **✅ Same Interactions** - Components work exactly like in your app
- **✅ Responsive Design** - Mobile-friendly documentation

### **🔧 How It Works:**

1. **Component Extraction** - Scans your React components automatically
2. **Bundle Generation** - Creates a React bundle for Sphinx
3. **Custom Directives** - New RST directives for embedding components
4. **Style Integration** - Copies your app's CSS to documentation
5. **Interactive Rendering** - Components render with full functionality

This gives you professional Sphinx documentation that looks and behaves exactly like your React application! 🎉
