API Reference
=============

Complete API documentation for the GRA Core Platform.

.. toctree::
   :maxdepth: 2
   :caption: API Reference:

   authentication
   core-apis
   data-apis
   integration-apis
   webhooks
   sdks

API Overview
------------

The GRA Core Platform provides comprehensive APIs for:

* **Authentication & Authorization**: Secure access control
* **Data Management**: CRUD operations and data processing
* **Integration**: Connect with external systems
* **Monitoring**: Application and system metrics
* **Deployment**: Application lifecycle management

Authentication
--------------

All API requests require authentication using JWT tokens:

.. code-block:: http

   GET /api/v1/users
   Authorization: Bearer <your-jwt-token>
   Content-Type: application/json

Base URLs
---------

* **Development**: ``https://api-dev.gra-core.bankofamerica.com``
* **Staging**: ``https://api-staging.gra-core.bankofamerica.com``
* **Production**: ``https://api.gra-core.bankofamerica.com``

Rate Limits
-----------

* **Standard**: 1000 requests per hour
* **Premium**: 10000 requests per hour
* **Enterprise**: Unlimited (with fair use policy)

Response Format
---------------

All API responses follow this standard format:

.. code-block:: json

   {
     "status": "success|error",
     "data": {},
     "message": "Human readable message",
     "timestamp": "2024-01-01T00:00:00Z",
     "request_id": "uuid"
   }

Error Codes
-----------

* ``400`` - Bad Request
* ``401`` - Unauthorized
* ``403`` - Forbidden
* ``404`` - Not Found
* ``429`` - Rate Limited
* ``500`` - Internal Server Error

SDKs
----

Official SDKs are available for:

* **Python**: ``pip install gra-core-sdk``
* **JavaScript/Node.js**: ``npm install @boa/gra-core-sdk``
* **Java**: Maven/Gradle dependency available
* **C#**: NuGet package available
