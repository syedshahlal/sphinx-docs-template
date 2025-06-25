.. raw:: html

   <!-- Banner Component -->
   <div class="banner-container">
     <div class="banner bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4">
       <div class="container mx-auto flex items-center justify-between">
         <div class="flex items-center space-x-3">
           <div class="flex items-center space-x-2">
             <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
               <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
             </svg>
             <span class="font-medium">🎉 GRA Core Platform v5.7.0 is now available!</span>
           </div>
         </div>
         <div class="flex items-center space-x-4">
           <a href="changelog.html" class="text-white hover:text-blue-200 text-sm font-medium underline">
             View Release Notes →
           </a>
           <button class="text-white hover:text-blue-200" onclick="this.parentElement.parentElement.parentElement.style.display='none'">
             <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
               <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
             </svg>
           </button>
         </div>
       </div>
     </div>
   </div>

GRA Core Platform Documentation v5.7
=====================================

Welcome to the GRA Core Platform Documentation - now with integrated React components!

.. react-component:: Banner
   :props: {"message": "🎉 GRA Core Platform v5.7.0 is now available!", "type": "info"}
   :interactive: true

.. raw:: html

   <div style="margin: 2rem 0;">

.. react-page:: HomePage
   :route: /
   :layout: DefaultLayout
   :height: 800px

.. raw:: html

   </div>

Platform Overview
------------------

The GRA Core Platform provides enterprise-grade solutions for data processing, API integration, and secure cloud operations.

.. react-component:: FeatureCards
   :interactive: true
   :height: 600px

Getting Started
---------------

Quick setup guide to get you running with GRA Core Platform.

.. react-component:: Button
   :props: {"children": "Get Started", "variant": "primary", "size": "lg"}
   :preview:
   :source:

Installation
~~~~~~~~~~~~

.. code-block:: bash

   npm install @gra/core-platform
   # or
   pip install gra-core-platform

.. react-component:: CodeBlock
   :props: {"language": "bash", "code": "npm install @gra/core-platform"}
   :interactive: true

API Reference
-------------

Complete API documentation with interactive examples.

.. react-component:: ApiReference
   :props: {"endpoint": "/api/v1/data", "method": "GET"}
   :interactive: true
   :height: 500px

Component Gallery
-----------------

Explore all available UI components:

.. react-component:: ComponentGallery
   :interactive: true
   :height: 700px

What's New in v5.7
-------------------

.. react-component:: WhatsNew
   :props: {"version": "5.7.0", "features": ["Enhanced Data Processing", "Improved API Framework", "Advanced Security", "Real-time Analytics"]}
   :interactive: true

Support and Community
---------------------

.. react-component:: SupportSection
   :interactive: true

.. toctree::
   :maxdepth: 2
   :caption: Documentation:

   platform-overview/index
   getting-started/index
   data-processing/index
   api-integration/index
   security-compliance/index
   monitoring-analytics/index

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
