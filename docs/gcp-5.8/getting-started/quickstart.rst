Quickstart Tutorial
===================

This tutorial will guide you through creating your first GRA Core Platform v5.8 application.

Step 1: Initialize Project
==========================

.. code-block:: bash

   # Create a new project
   gra-cli init my-project --version=5.8
   cd my-project

Step 2: Configure Database
==========================

.. code-block:: bash

   # Setup database
   gra-cli db:setup --env=development

Step 3: Create Your First Service
==================================

.. code-block:: python

   # services/hello_service.py
   from gra_core import Service, route

   class HelloService(Service):
       @route('/hello')
       def hello_world(self):
           return {"message": "Hello from GRA Core Platform v5.8!"}

Step 4: Run the Application
===========================

.. code-block:: bash

   # Start the development server
   gra-cli serve --port=8080

Your application is now running at http://localhost:8080

Step 5: Test the API
====================

.. code-block:: bash

   # Test the hello endpoint
   curl http://localhost:8080/hello

Expected response:

.. code-block:: json

   {
     "message": "Hello from GRA Core Platform v5.8!",
     "version": "5.8.0",
     "timestamp": "2024-01-15T10:30:00Z"
   }

Next Steps
==========

* :doc:`../platform-overview/index` - Learn about platform architecture
* :doc:`../user-guide/index` - Explore advanced features
* :doc:`../api-reference/index` - Browse the complete API reference
