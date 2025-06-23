API Reference
=============

Complete API reference for the GRA Core Platform v5.7.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   core
   data-processing
   security
   monitoring
   development
   deployment

Overview
--------

The GRA Core Platform provides comprehensive APIs for:

* **Core Platform APIs**: Basic platform functionality
* **Data Processing APIs**: Stream and batch processing
* **Security APIs**: Authentication and authorization
* **Monitoring APIs**: Metrics and logging
* **Development APIs**: Development tools and utilities
* **Deployment APIs**: Deployment and infrastructure management

Authentication
--------------

All API endpoints require authentication unless otherwise specified.

**Bearer Token Authentication:**

.. code-block:: http

   GET /api/v1/customers HTTP/1.1
   Host: api.gra-core.bankofamerica.com
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

**API Key Authentication:**

.. code-block:: http

   GET /api/v1/customers HTTP/1.1
   Host: api.gra-core.bankofamerica.com
   X-API-Key: gra_core_api_key_123456789

Base URLs
---------

* **Production**: ``https://api.gra-core.bankofamerica.com``
* **Staging**: ``https://api-staging.gra-core.bankofamerica.com``
* **Development**: ``https://api-dev.gra-core.bankofamerica.com``

Rate Limits
-----------

API rate limits apply to all endpoints:

* **Authenticated requests**: 1000 requests per hour
* **Unauthenticated requests**: 100 requests per hour
* **Burst limit**: 50 requests per minute

Response Format
---------------

All API responses follow a consistent format:

.. code-block:: json

   {
       "success": true,
       "data": {
           "id": "123",
           "name": "Example"
       },
       "meta": {
           "timestamp": "2024-01-15T10:30:00Z",
           "version": "5.7.0"
       }
   }

Error responses:

.. code-block:: json

   {
       "success": false,
       "error": {
           "code": "VALIDATION_ERROR",
           "message": "Invalid input data",
           "details": {
               "field": "email",
               "reason": "Invalid email format"
           }
       },
       "meta": {
           "timestamp": "2024-01-15T10:30:00Z",
           "version": "5.7.0"
       }
   }

Next Steps
----------

* Explore :doc:`core` for basic platform APIs
* Review :doc:`data-processing` for data APIs
* Check :doc:`security` for authentication APIs
* See :doc:`monitoring` for observability APIs
