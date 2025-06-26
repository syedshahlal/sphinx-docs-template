Quick Start Guide
=================

Get up and running with GRA Core Platform in just 5 minutes!

Prerequisites
-------------

Before you begin, ensure you have:

* Python 3.8 or higher
* Node.js 16 or higher
* Git
* Access to Bank of America internal networks

Step 1: Installation
--------------------

Install the GRA Core Platform CLI:

.. code-block:: bash

   pip install gra-core-cli
   
   # Verify installation
   gra-core --version

Step 2: Initialize Project
--------------------------

Create your first GRA Core project:

.. code-block:: bash

   # Create new project
   gra-core init my-first-project
   
   # Navigate to project directory
   cd my-first-project

Step 3: Configuration
---------------------

Configure your development environment:

.. code-block:: bash

   # Set up environment
   gra-core config setup
   
   # Configure authentication
   gra-core auth login

Step 4: Run Your First Application
----------------------------------

Start the development server:

.. code-block:: bash

   # Start development server
   gra-core dev
   
   # Your application will be available at:
   # http://localhost:3000

Step 5: Deploy
--------------

Deploy your application to the development environment:

.. code-block:: bash

   # Build for deployment
   gra-core build
   
   # Deploy to dev environment
   gra-core deploy --env dev

🎉 Congratulations!
-------------------

You've successfully created and deployed your first GRA Core Platform application!

Next Steps
----------

* :doc:`../user-guide/index` - Learn more about platform features
* :doc:`../examples/index` - Explore example applications
* :doc:`../api-reference/index` - Dive into the API documentation

Common Issues
-------------

**Authentication Failed**
   Make sure you're connected to the Bank of America VPN and have valid credentials.

**Port Already in Use**
   Use ``gra-core dev --port 3001`` to run on a different port.

**Build Errors**
   Check the :doc:`../user-guide/troubleshooting` guide for common solutions.
