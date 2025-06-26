GRA Core Platform Documentation v5.7
=====================================

Welcome to the GRA Core Platform Documentation with integrated React components!

.. react-component:: Banner
   :props: {"message": "🎉 GRA Core Platform v5.7.0 is now available!", "type": "info"}
   :interactive: true

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

API Reference
-------------

Complete API documentation with interactive examples.

.. react-component:: ApiReference
   :props: {"endpoint": "/api/v1/data", "method": "GET"}
   :interactive: true
   :height: 500px

.. toctree::
   :maxdepth: 2
   :caption: Documentation:

   getting-started/index
   api-reference/index

Indices and tables
==================

* :ref:`genindex`
* :ref:`search`
