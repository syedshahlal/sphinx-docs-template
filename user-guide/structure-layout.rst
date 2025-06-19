Platform Structure and Layout
==============================

Understanding the GRA Core Platform's structure and layout system.

Directory Structure
-------------------

The GRA Core Platform follows a modular structure:

.. code-block:: text

   gra-core/
   ├── src/
   │   ├── components/
   │   ├── modules/
   │   ├── themes/
   │   └── utils/
   ├── docs/
   ├── tests/
   ├── config/
   └── static/

Component Architecture
----------------------

The platform uses a component-based architecture:

.. mermaid::

   graph TD
       A[Core Platform] --> B[Authentication Module]
       A --> C[Data Processing Module]
       A --> D[UI Components]
       A --> E[API Gateway]
       
       B --> F[User Management]
       B --> G[Permissions]
       
       C --> H[Analytics Engine]
       C --> I[Data Connectors]
       
       D --> J[Dashboard Components]
       D --> K[Form Components]

Layout System
-------------

The platform provides a flexible layout system:

.. grid:: 1 2 2 2

    .. grid-item-card:: Header Layout
        
        Fixed navigation with branding and user controls.

    .. grid-item-card:: Sidebar Layout
        
        Collapsible navigation for deep content hierarchies.

    .. grid-item-card:: Content Layout
        
        Main content area with responsive grid system.

    .. grid-item-card:: Footer Layout
        
        Site information and additional navigation.

Customization
-------------

You can customize the layout by:

1. **CSS Variables** - Override theme variables
2. **Component Templates** - Create custom component templates  
3. **Layout Overrides** - Override default layouts
4. **Plugin System** - Add custom functionality

Example customization:

.. code-block:: css

   :root {
     --gra-primary-color: #your-color;
     --gra-sidebar-width: 280px;
     --gra-header-height: 64px;
   }
