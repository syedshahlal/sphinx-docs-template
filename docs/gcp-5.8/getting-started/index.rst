Getting Started with GRA Core Platform v5.8
============================================

Welcome to GRA Core Platform v5.8! This guide will help you get up and running quickly.

.. toctree::
   :maxdepth: 2

   quickstart

Prerequisites
=============

Before installing GRA Core Platform v5.8, ensure you have:

* Python 3.9 or higher
* Node.js 18 or higher
* Docker (optional, for containerized deployment)
* At least 8GB RAM and 20GB disk space

Installation
============

Quick Installation
------------------

.. code-block:: bash

   # Install via pip
   pip install gra-core-platform==5.8.0

   # Or install via npm
   npm install @boa/gra-core-platform@5.8.0

Docker Installation
-------------------

.. code-block:: bash

   # Pull the Docker image
   docker pull boa/gra-core-platform:5.8.0

   # Run the container
   docker run -p 8080:8080 boa/gra-core-platform:5.8.0

Configuration
=============

Basic Configuration
-------------------

Create a configuration file ``config.yaml``:

.. code-block:: yaml

   version: "5.8"
   database:
     host: localhost
     port: 5432
     name: gra_core
   security:
     encryption: AES-256
     mfa_enabled: true
   performance:
     cache_size: 1024MB
     worker_threads: 8

Environment Variables
---------------------

Set the following environment variables:

.. code-block:: bash

   export GRA_VERSION=5.8
   export GRA_ENV=production
   export GRA_LOG_LEVEL=info

Next Steps
==========

1. :doc:`quickstart` - Complete the quickstart tutorial
2. :doc:`../platform-overview/index` - Learn about the platform architecture
3. :doc:`../user-guide/index` - Explore advanced features
