Getting Started with GRA Core Platform v5.8
============================================

Welcome to GRA Core Platform v5.8 Beta! This guide will help you get up and running quickly with the latest features and improvements.

.. note::
   v5.8 is currently in **Beta**. For production deployments, consider using `v5.7 (Stable) <../../gcp-5.7/getting-started/index.html>`_.

.. toctree::
   :maxdepth: 2

   quickstart

Prerequisites
-------------

Before installing GRA Core Platform v5.8, ensure you have:

System Requirements
~~~~~~~~~~~~~~~~~~

* **Operating System**: Linux (Ubuntu 20.04+, RHEL 8+, CentOS 8+)
* **Memory**: Minimum 8GB RAM (16GB recommended)
* **Storage**: 50GB available disk space
* **Network**: Outbound internet access for package downloads

Software Dependencies
~~~~~~~~~~~~~~~~~~~~

* **Docker**: Version 20.10 or higher
* **Kubernetes**: Version 1.21+ (for container deployments)
* **Node.js**: Version 16+ (for SDK development)
* **Python**: Version 3.8+ (for automation scripts)

Installation
------------

Quick Installation
~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Install via pip
   pip install gra-core-platform==5.8.0-beta
   
   # Verify installation
   gra --version

Docker Installation (Recommended)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Pull the latest v5.8 beta image
   docker pull bankofamerica/gra-core-platform:5.8-beta

   # Run with default configuration
   docker run -d \
     --name gra-core-v58 \
     -p 8080:8080 \
     -p 8443:8443 \
     bankofamerica/gra-core-platform:5.8-beta

Kubernetes Installation
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Add our Helm repository
   helm repo add gra-core https://charts.gra-core.bankofamerica.com
   helm repo update

   # Install v5.8 beta
   helm install gra-core-v58 gra-core/gra-core-platform \
     --version 5.8.0-beta \
     --namespace gra-core \
     --create-namespace

Native Installation
~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Download the v5.8 beta installer
   wget https://releases.gra-core.bankofamerica.com/v5.8/gra-core-platform-5.8.0-beta.tar.gz

   # Extract and install
   tar -xzf gra-core-platform-5.8.0-beta.tar.gz
   cd gra-core-platform-5.8.0-beta
   sudo ./install.sh

Configuration
=============

Initial Configuration
--------------------

After installation, configure your instance:

Basic Configuration
~~~~~~~~~~~~~~~~~~

.. code-block:: yaml

   # config/gra-core.yaml
   version: "5.8"
   environment: "development"
   
   server:
     host: "0.0.0.0"
     port: 8080
     ssl_port: 8443
   
   database:
     type: "postgresql"
     host: "localhost"
     port: 5432
     name: "gra_core_v58"
   
   security:
     encryption: "aes-256"
     mfa_enabled: true
     jwt_secret: "your-secret-key"
   
   features:
     graphql_api: true
     realtime_analytics: true
     websocket_support: true

Advanced Configuration
~~~~~~~~~~~~~~~~~~~~~

For production deployments, configure additional settings:

.. code-block:: yaml

   # Advanced settings for v5.8
   performance:
     worker_processes: 4
     max_connections: 1000
     cache_size: "512MB"
   
   monitoring:
     metrics_enabled: true
     logging_level: "INFO"
     health_check_interval: 30
   
   integrations:
     kubernetes:
       enabled: true
       namespace: "gra-core"
     
     external_apis:
       timeout: 30
       retry_attempts: 3

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

   Open your browser and navigate to:
   
   * **HTTP**: http://localhost:8080/dashboard
   * **HTTPS**: https://localhost:8443/dashboard

5. **API Testing**

   Test the new GraphQL API:

   .. code-block:: bash

      curl -X POST http://localhost:8080/graphql \
        -H "Content-Type: application/json" \
        -d '{"query": "{ version platform { name status } }"}'

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

* :doc:`quickstart` - Complete a full tutorial
* :doc:`../api-reference/index` - Explore the API documentation
* :doc:`../user-guide/index` - Learn advanced features
* :doc:`../migration-guides/index` - Upgrade from v5.7

Beta Feedback
------------

As a beta user, your feedback is valuable:

* **Bug Reports**: `GitHub Issues <https://github.com/bank-of-america/gra-core-platform/issues>`_
* **Feature Requests**: `Feature Request Form <https://forms.gra-core.bankofamerica.com/features>`_
* **Community**: `Developer Forum <https://community.gra-core.bankofamerica.com>`_

.. toctree::
   :maxdepth: 2
   :hidden:

   quickstart
