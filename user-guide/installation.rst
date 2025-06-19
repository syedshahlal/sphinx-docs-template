Installation
============

This guide will help you install and set up the GRA Core Platform.

Requirements
------------

Before installing the GRA Core Platform, ensure you have the following:

* Python 3.8 or higher
* Node.js 16 or higher
* Git

Quick Installation
------------------

Install the GRA Core Platform using pip:

.. code-block:: bash

   pip install gra-core-platform

Or install from source:

.. code-block:: bash

   git clone https://github.com/gra-community/gra-core.git
   cd gra-core
   pip install -e .

Docker Installation
-------------------

You can also run the platform using Docker:

.. code-block:: bash

   docker pull gra-community/gra-core:latest
   docker run -p 8000:8000 gra-community/gra-core:latest

Configuration
-------------

After installation, create a configuration file:

.. code-block:: python

   # config.py
   GRA_CORE_SETTINGS = {
       'DEBUG': False,
       'DATABASE_URL': 'postgresql://user:pass@localhost/gracore',
       'SECRET_KEY': 'your-secret-key-here',
   }

Next Steps
----------

* :doc:`structure-layout` - Learn about the platform structure
* :doc:`configuration` - Configure your installation
* :doc:`../examples/quickstart` - Try the quickstart tutorial
