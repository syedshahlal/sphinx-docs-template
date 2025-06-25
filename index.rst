GRA Core Platform Documentation
===============================================

Welcome to the GRA Core Platform Documentation with integrated React components!

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   example_usage

Interactive Dashboard
---------------------

.. react-dashboard::
   :height: 600px
   :theme: auto

Platform Overview
------------------

The GRA Core Platform provides enterprise-grade solutions for data processing, API integration, and secure cloud operations.

.. react-component:: FeatureCards
   :height: 400px

Quick Start
-----------

.. react-component:: UserGuideSection
   :height: 500px

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

Usage Metrics
-------------

.. react-component:: Chart
   :props: {"title": "Platform Usage", "type": "bar"}
   :height: 350px

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
