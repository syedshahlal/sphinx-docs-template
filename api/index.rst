API Reference
=============

Complete API documentation for the GRA Core Platform.

.. toctree::
   :maxdepth: 2
   :caption: API Modules

   core
   authentication
   data-access
   integrations

API Overview
------------

The GRA Core Platform provides a comprehensive REST API for all platform functionality. The API is organized into several modules:

Core API
--------

The :doc:`core` module provides fundamental platform operations including:

* System information and health checks
* Configuration management
* User and session management
* Basic CRUD operations

Authentication API
------------------

The :doc:`authentication` module handles all authentication and authorization:

* User login and logout
* Token management
* Role-based access control
* OAuth integration

Data Access API
---------------

The :doc:`data-access` module provides data management capabilities:

* Database operations
* File storage and retrieval
* Data validation and transformation
* Backup and restore operations

Integrations API
----------------

The :doc:`integrations` module enables third-party integrations:

* Webhook management
* External service connections
* Data synchronization
* Plugin architecture

Getting Started
---------------

To get started with the API:

1. Obtain an API key from the platform dashboard
2. Review the authentication documentation
3. Try the examples in our :doc:`../examples/index`
4. Use the interactive API explorer (coming soon)

Base URL
--------

All API endpoints are relative to the base URL:

.. code-block:: text

   https://api.gra-platform.org/v1/

Authentication
--------------

All API requests require authentication. See :doc:`authentication` for details.

Rate Limiting
-------------

API requests are rate limited to 1000 requests per hour per API key.

Support
-------

For API support:

* Check the documentation first
* Use the AI chatbot for quick questions  
* Submit issues on GitHub
* Contact API support: api-support@gra-platform.org
