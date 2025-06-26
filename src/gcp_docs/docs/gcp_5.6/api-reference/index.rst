API Reference
=============

Complete API reference for GRA Core Platform v5.6.

.. toctree::
   :maxdepth: 2

   authentication
   core-apis
   data-apis
   monitoring-apis
   webhooks

Base URL
--------

All API requests should be made to:

.. code-block:: text

   https://api.gra-core.bankofamerica.com/v5.6

Authentication
--------------

All API requests require authentication using Bearer tokens:

.. code-block:: http

   GET /api/v5.6/users
   Authorization: Bearer YOUR_ACCESS_TOKEN
   Content-Type: application/json

Rate Limiting
-------------

API requests are rate limited:

* **Standard**: 1000 requests per hour
* **Premium**: 10000 requests per hour

Response Format
---------------

All responses follow this format:

.. code-block:: json

   {
     "status": "success|error",
     "data": {},
     "message": "Optional message",
     "timestamp": "2024-01-01T00:00:00Z"
   }

Error Codes
-----------

* ``400`` - Bad Request
* ``401`` - Unauthorized
* ``403`` - Forbidden
* ``404`` - Not Found
* ``429`` - Rate Limited
* ``500`` - Internal Server Error
