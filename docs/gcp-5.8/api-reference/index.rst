API Reference
=============

GRA Core Platform v5.8 provides comprehensive APIs for building modern applications. This version introduces GraphQL support alongside our existing REST APIs, plus enhanced WebSocket capabilities for real-time applications.

API Overview
------------

Available APIs
~~~~~~~~~~~~~~

* **REST API**: Traditional HTTP-based API with JSON responses
* **GraphQL API**: Type-safe queries with real-time subscriptions
* **WebSocket API**: Real-time bidirectional communication
* **Webhook API**: Event-driven integrations

Base URLs
~~~~~~~~~

.. code-block:: text

   REST API:      https://api.gra-platform.com/v5.8/
   GraphQL API:   https://api.gra-platform.com/v5.8/graphql
   WebSocket API: wss://api.gra-platform.com/v5.8/ws
   Webhook API:   https://webhooks.gra-platform.com/v5.8/

Authentication
--------------

API Key Authentication
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   curl -H "Authorization: Bearer YOUR_API_KEY" \
        https://api.gra-platform.com/v5.8/users

OAuth 2.0
~~~~~~~~~~

.. code-block:: bash

   # Get access token
   curl -X POST https://auth.gra-platform.com/oauth/token \
        -H "Content-Type: application/json" \
        -d '{
          "grant_type": "client_credentials",
          "client_id": "your_client_id",
          "client_secret": "your_client_secret"
        }'

JWT Authentication
~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        https://api.gra-platform.com/v5.8/users

REST API
--------

Users API
~~~~~~~~~

Get Users
^^^^^^^^^

.. code-block:: http

   GET /v5.8/users HTTP/1.1
   Host: api.gra-platform.com
   Authorization: Bearer YOUR_API_KEY

Response:

.. code-block:: json

   {
     "data": [
       {
         "id": "user_123",
         "name": "John Doe",
         "email": "john@example.com",
         "created_at": "2024-01-15T10:30:00Z",
         "updated_at": "2024-01-15T10:30:00Z"
       }
     ],
     "pagination": {
       "page": 1,
       "per_page": 20,
       "total": 150,
       "total_pages": 8
     }
   }

Create User
^^^^^^^^^^^

.. code-block:: http

   POST /v5.8/users HTTP/1.1
   Host: api.gra-platform.com
   Authorization: Bearer YOUR_API_KEY
   Content-Type: application/json

   {
     "name": "Jane Smith",
     "email": "jane@example.com",
     "role": "user"
   }

Response:

.. code-block:: json

   {
     "id": "user_124",
     "name": "Jane Smith",
     "email": "jane@example.com",
     "role": "user",
     "created_at": "2024-12-27T10:30:00Z"
   }

Data API
~~~~~~~~

Process Data
^^^^^^^^^^^^

.. code-block:: http

   POST /v5.8/data/process HTTP/1.1
   Host: api.gra-platform.com
   Authorization: Bearer YOUR_API_KEY
   Content-Type: application/json

   {
     "data": [
       {"id": 1, "value": "sample data"},
       {"id": 2, "value": "more data"}
     ],
     "processing_type": "transform",
     "options": {
       "format": "json",
       "validation": true
     }
   }

GraphQL API
-----------

Schema Overview
~~~~~~~~~~~~~~~

.. code-block:: graphql

   type User {
     id: ID!
     name: String!
     email: String!
     role: Role!
     createdAt: DateTime!
     updatedAt: DateTime!
   }

   type Query {
     users(first: Int, after: String): UserConnection!
     user(id: ID!): User
     me: User
   }

   type Mutation {
     createUser(input: CreateUserInput!): User!
     updateUser(id: ID!, input: UpdateUserInput!): User!
     deleteUser(id: ID!): Boolean!
   }

   type Subscription {
     userCreated: User!
     userUpdated(id: ID): User!
     userDeleted: ID!
   }

Example Queries
~~~~~~~~~~~~~~~

Get Users
^^^^^^^^^

.. code-block:: graphql

   query GetUsers($first: Int, $after: String) {
     users(first: $first, after: $after) {
       edges {
         node {
           id
           name
           email
           role
           createdAt
         }
       }
       pageInfo {
         hasNextPage
         endCursor
       }
     }
   }

Create User
^^^^^^^^^^^

.. code-block:: graphql

   mutation CreateUser($input: CreateUserInput!) {
     createUser(input: $input) {
       id
       name
       email
       role
       createdAt
     }
   }

Real-time Subscription
^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: graphql

   subscription UserUpdates {
     userCreated {
       id
       name
       email
     }
     userUpdated {
       id
       name
       email
     }
   }

WebSocket API
-------------

Connection
~~~~~~~~~~

.. code-block:: javascript

   const ws = new WebSocket('wss://api.gra-platform.com/v5.8/ws');
   
   ws.onopen = function(event) {
     // Send authentication
     ws.send(JSON.stringify({
       type: 'auth',
       token: 'YOUR_API_KEY'
     }));
   };

Real-time Events
~~~~~~~~~~~~~~~~

.. code-block:: javascript

   // Subscribe to user events
   ws.send(JSON.stringify({
     type: 'subscribe',
     channel: 'users',
     events: ['created', 'updated', 'deleted']
   }));
   
   ws.onmessage = function(event) {
     const data = JSON.parse(event.data);
     console.log('Received:', data);
   };

Webhook API
-----------

Configuration
~~~~~~~~~~~~~

.. code-block:: http

   POST /v5.8/webhooks HTTP/1.1
   Host: api.gra-platform.com
   Authorization: Bearer YOUR_API_KEY
   Content-Type: application/json

   {
     "url": "https://your-app.com/webhooks/gra",
     "events": ["user.created", "user.updated", "data.processed"],
     "secret": "your_webhook_secret"
   }

Event Payload
~~~~~~~~~~~~~

.. code-block:: json

   {
     "id": "evt_123456789",
     "type": "user.created",
     "created": 1640995200,
     "data": {
       "object": {
         "id": "user_124",
         "name": "Jane Smith",
         "email": "jane@example.com"
       }
     }
   }

Rate Limits
-----------

Default Limits
~~~~~~~~~~~~~~

* **REST API**: 1000 requests per minute
* **GraphQL API**: 500 queries per minute
* **WebSocket API**: 100 connections per account
* **Webhook API**: 10,000 events per hour

Headers
~~~~~~~

.. code-block:: http

   X-RateLimit-Limit: 1000
   X-RateLimit-Remaining: 999
   X-RateLimit-Reset: 1640995200

Error Handling
--------------

Error Response Format
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json

   {
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "Invalid email format",
       "details": {
         "field": "email",
         "value": "invalid-email"
       }
     }
   }

Common Error Codes
~~~~~~~~~~~~~~~~~~

* ``AUTHENTICATION_ERROR``: Invalid or missing authentication
* ``AUTHORIZATION_ERROR``: Insufficient permissions
* ``VALIDATION_ERROR``: Invalid request data
* ``RATE_LIMIT_ERROR``: Rate limit exceeded
* ``INTERNAL_ERROR``: Server error

SDKs and Libraries
------------------

Official SDKs
~~~~~~~~~~~~~

* **Python**: ``pip install gra-platform-sdk==5.8.0``
* **Node.js**: ``npm install @gra-platform/sdk@5.8.0``
* **Java**: ``implementation 'com.gra-platform:sdk:5.8.0'``
* **Go**: ``go get github.com/gra-platform/go-sdk@v5.8.0``

Example Usage (Python)
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: python

   from gra_platform import GRAPlatform
   
   client = GRAPlatform(api_key='your_api_key')
   
   # Create a user
   user = client.users.create({
       'name': 'John Doe',
       'email': 'john@example.com'
   })
   
   # Query with GraphQL
   result = client.graphql.query('''
       query {
         users(first: 10) {
           edges {
             node {
               id
               name
               email
             }
           }
         }
       }
   ''')

Next Steps
----------

* :doc:`../getting-started/quickstart` - Try the API with examples
* :doc:`../security-compliance/index` - Learn about API security
* :doc:`../examples/index` - See real-world examples
