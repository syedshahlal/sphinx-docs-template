Getting Started with GRA Core Platform
=======================================

This guide will help you get up and running with GRA Core Platform quickly.

.. react-component:: Header
   :props: {"title": "Getting Started Guide", "subtitle": "Your journey begins here"}

Prerequisites
-------------

Before you begin, ensure you have the following installed:

.. react-component:: PrerequisitesList
   :props: {"items": ["Node.js 18+", "Python 3.8+", "Docker", "Git"]}
   :interactive: true

Installation Steps
------------------

Follow these steps to install GRA Core Platform:

Step 1: Install Dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. react-component:: InstallationStep
   :props: {"step": 1, "title": "Install Dependencies", "command": "npm install @gra/core-platform"}
   :interactive: true

.. code-block:: bash

   npm install @gra/core-platform

Step 2: Configure Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. react-component:: InstallationStep
   :props: {"step": 2, "title": "Configure Environment", "description": "Set up your environment variables"}
   :interactive: true

Create a `.env` file:

.. react-component:: CodeEditor
   :props: {"language": "bash", "content": "GRA_API_KEY=your_api_key\nGRA_ENVIRONMENT=development"}
   :interactive: true
   :height: 200px

Step 3: Initialize Project
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. react-component:: InstallationStep
   :props: {"step": 3, "title": "Initialize Project", "command": "npx gra init"}
   :interactive: true

Quick Start Example
-------------------

Here's a simple example to get you started:

.. react-component:: QuickStartExample
   :interactive: true
   :height: 400px

Next Steps
----------

.. react-component:: NextSteps
   :props: {"steps": ["Explore the API Reference", "Check out Examples", "Join the Community"]}
   :interactive: true

Need Help?
----------

.. react-component:: HelpSection
   :interactive: true
