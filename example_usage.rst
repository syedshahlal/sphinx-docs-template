React Dashboard Integration Example
===================================

This document demonstrates how to integrate the React dashboard and components into Sphinx documentation.

Full Dashboard
--------------

Embed the complete React dashboard:

.. react-dashboard::
   :height: 800px
   :theme: auto
   :class: my-dashboard

Individual Components
---------------------

Feature Cards Component
~~~~~~~~~~~~~~~~~~~~~~~

.. react-component:: FeatureCards
   :props: {"title": "Platform Features", "subtitle": "Everything you need to build amazing applications"}
   :height: 600px

Chart Component
~~~~~~~~~~~~~~~

.. react-component:: Chart
   :props: {"data": [{"label": "Jan", "value": 65}, {"label": "Feb", "value": 78}, {"label": "Mar", "value": 90}], "type": "bar", "title": "Monthly Usage"}
   :height: 400px

User Guide Section
~~~~~~~~~~~~~~~~~~

.. react-component:: UserGuideSection
   :props: {"title": "Getting Started Guide", "subtitle": "Learn the basics in just a few steps"}
   :height: 500px

Traditional Sphinx Content
--------------------------

This is regular Sphinx content that works alongside React components.

Code Example
~~~~~~~~~~~~

.. code-block:: python

   def hello_world():
       print("Hello from Sphinx!")

Tables
~~~~~~

.. list-table:: Feature Comparison
   :header-rows: 1

   * - Feature
     - Basic
     - Pro
   * - React Components
     - ✓
     - ✓
   * - Dark Mode
     - ✓
     - ✓
   * - Custom Themes
     - ✗
     - ✓

Mixed Content Example
---------------------

You can mix traditional Sphinx content with React components seamlessly:

1. **Installation**: Follow the setup guide
2. **Configuration**: Set up your preferences
3. **Interactive Demo**: Try the features below

.. react-component:: FeatureCards
   :props: {"features": [{"icon": "Zap", "title": "Fast", "description": "Lightning fast performance"}, {"icon": "Shield", "title": "Secure", "description": "Enterprise security"}]}

4. **Next Steps**: Continue with the advanced guide

This approach gives you the best of both worlds - the power of Sphinx for documentation structure and the interactivity of modern React components.
