Quick Start Guide
=================

This guide will get you up and running with GRA Core Platform v5.6 in under 5 minutes.

Installation
------------

Install GRA Core Platform using pip:

.. code-block:: bash

   pip install gra-core-platform==5.6.0

Verify the installation:

.. code-block:: bash

   gra-core --version

Create Your First Project
--------------------------

1. Initialize a new project:

   .. code-block:: bash

      gra-core init hello-world
      cd hello-world

2. Start the development server:

   .. code-block:: bash

      gra-core serve

3. Open your browser to http://localhost:8000

You should see the GRA Core Platform welcome page!

Basic Configuration
-------------------

Create a ``config.yaml`` file:

.. code-block:: yaml

   project:
     name: "Hello World"
     version: "1.0.0"
   
   server:
     host: "localhost"
     port: 8000
   
   database:
     type: "sqlite"
     path: "data.db"

Next Steps
----------

* :doc:`../user-guide/index` - Learn more about using the platform
* :doc:`../api-reference/index` - Explore the API
* :doc:`../tutorials/index` - Follow detailed tutorials
