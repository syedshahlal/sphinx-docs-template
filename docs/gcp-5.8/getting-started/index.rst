Getting Started with GRA Core Platform v5.8
============================================

Welcome to GRA Core Platform v5.8! This guide will help you get up and running quickly with the latest features and improvements.

.. toctree::
   :maxdepth: 2

   quickstart

Prerequisites
-------------

Before installing GRA Core Platform v5.8, ensure you have:

* Python 3.8 or higher
* Node.js 16 or higher
* Docker (optional, for containerized deployment)
* Kubernetes cluster (optional, for production deployment)

Installation
------------

Quick Installation
~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Install via pip
   pip install gra-core-platform==5.8.0
   
   # Verify installation
   gra --version

Docker Installation
~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Pull the official Docker image
   docker pull gra-core-platform:5.8.0
   
   # Run the container
   docker run -p 8080:8080 gra-core-platform:5.8.0

Kubernetes Installation
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Add the GRA Helm repository
   helm repo add gra https://charts.gra-core-platform.com
   
   # Install GRA Core Platform v5.8
   helm install gra-platform gra/gra-core-platform --version 5.8.0

Configuration
=============

Basic Configuration
-------------------

Create a configuration file ``config.yaml``:

.. code-block:: yaml

   # config.yaml
   version: "5.8"
   environment: "development"
   database:
     type: "postgresql"
     host: "localhost"
     port: 5432
   security:
     encryption: "aes-256"
     mfa_enabled: true

Environment Variables
---------------------

Set the following environment variables:

.. code-block:: bash

   export GRA_VERSION=5.8
   export GRA_ENV=production
   export GRA_LOG_LEVEL=info

First Steps
-----------

1. **Initialize Your Project**

   .. code-block:: bash

      gra init my-project --version=5.8
      cd my-project

2. **Configure Your Environment**

   .. code-block:: yaml

      # config.yaml
      version: "5.8"
      environment: "development"
      database:
        type: "postgresql"
        host: "localhost"
        port: 5432
      security:
        encryption: "aes-256"
        mfa_enabled: true

3. **Start the Development Server**

   .. code-block:: bash

      gra serve --port=8080 --debug

4. **Access the Dashboard**

   Open your browser and navigate to ``http://localhost:8080``

What's New in v5.8
------------------

Enhanced Security
~~~~~~~~~~~~~~~~~

* AES-256 encryption for all data at rest
* Multi-factor authentication (MFA) support
* OAuth 2.0 and SAML integration
* Role-based access control (RBAC) improvements

Performance Improvements
~~~~~~~~~~~~~~~~~~~~~~~~

* 40% faster processing compared to v5.7
* Optimized database queries
* Improved caching mechanisms
* Reduced memory footprint

New GraphQL API
~~~~~~~~~~~~~~~

* Complete GraphQL schema alongside REST APIs
* Real-time subscriptions
* Advanced filtering and pagination
* Type-safe queries

Real-time Analytics
~~~~~~~~~~~~~~~~~~~

* Live dashboard with streaming data
* Custom metrics and KPIs
* Alert notifications
* Historical data analysis

Next Steps
==========

* :doc:`quickstart` - Complete the quickstart tutorial
* :doc:`../platform-overview/index` - Learn about the platform architecture
* :doc:`../api-reference/index` - Explore the API documentation
* :doc:`../migration-guides/index` - Migrate from previous versions
