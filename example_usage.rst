React Dashboard Integration Examples
====================================

This document demonstrates how to integrate React components into Sphinx documentation.

Full Dashboard
--------------

Embed the complete React dashboard:

.. react-dashboard::
   :height: 800px
   :theme: auto

Individual Components
---------------------

Feature Cards
~~~~~~~~~~~~~

.. react-component:: FeatureCards
   :props: {"title": "Platform Capabilities", "subtitle": "Core features of the GRA platform"}
   :height: 400px

Interactive Chart
~~~~~~~~~~~~~~~~~

.. react-component:: Chart
   :props: {"title": "Usage Statistics", "type": "bar", "width": 500, "height": 300}
   :height: 350px

User Guide Section
~~~~~~~~~~~~~~~~~~

.. react-component:: UserGuideSection
   :props: {"title": "Quick Start Guide", "description": "Get started with the platform in minutes"}
   :height: 600px

Dynamic Content Areas
---------------------

You can also use HTML with data attributes for dynamic mounting:

.. raw:: html

   <div data-component="FeatureCards" 
        data-props='{"title": "Dynamic Features", "subtitle": "Loaded via data attributes"}'
        class="react-mount"
        style="min-height: 400px;">
   </div>

Custom Props Example
--------------------

.. react-component:: Chart
   :props: {
     "data": [
       {"label": "Documentation Views", "value": 2500},
       {"label": "API Calls", "value": 1800},
       {"label": "Active Users", "value": 950},
       {"label": "Support Tickets", "value": 45}
     ],
     "title": "Platform Metrics Dashboard",
     "type": "bar",
     "width": 600,
     "height": 350
   }
   :height: 400px

Best Practices
--------------

1. **Always specify height** for components to prevent layout shifts
2. **Use valid JSON** for props - escape quotes properly
3. **Test components** in both light and dark themes
4. **Keep props simple** - complex objects should be handled in component defaults
5. **Use semantic component names** that clearly indicate their purpose

Troubleshooting
---------------

If components don't render:

1. Check browser console for JavaScript errors
2. Verify component names match the registry
3. Ensure props are valid JSON
4. Confirm React assets are built and copied to ``_static/``

Use the browser developer tools to inspect the generated HTML and verify that:

- ``data-component`` attributes are present
- ``data-props`` contains valid JSON
- React scripts are loaded
- No console errors are present
