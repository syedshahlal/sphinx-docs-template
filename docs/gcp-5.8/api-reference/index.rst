API Reference
=============

Complete API reference for GRA Core Platform v5.8.

.. toctree::
   :maxdepth: 2

REST API
========

Base URL
--------

.. code-block:: text

   https://api.gra-core.boa.com/v5.8

Authentication
--------------

All API requests require authentication via:

* Bearer token in Authorization header
* API key in X-API-Key header

Core Endpoints
==============

Authentication API
------------------

.. http:post:: /auth/login

   Authenticate user and obtain access token.

   **Request Body:**

   .. code-block:: json

      {
        "username": "user@boa.com",
        "password": "password123",
        "mfa_code": "123456"
      }

   **Response:**

   .. code-block:: json

      {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
        "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
        "expires_in": 3600,
        "token_type": "Bearer"
      }

User Management API
-------------------

.. http:get:: /users

   List all users.

   **Query Parameters:**

   * ``page`` (int) - Page number (default: 1)
   * ``limit`` (int) - Items per page (default: 20)
   * ``search`` (string) - Search term

   **Response:**

   .. code-block:: json

      {
        "users": [
          {
            "id": "user-123",
            "username": "john.doe",
            "email": "john.doe@boa.com",
            "role": "admin",
            "created_at": "2024-01-15T10:30:00Z"
          }
        ],
        "total": 1,
        "page": 1,
        "limit": 20
      }

Data Processing API
-------------------

.. http:post:: /data/process

   Submit data for processing.

   **Request Body:**

   .. code-block:: json

      {
        "data": {
          "records": [
            {"id": 1, "value": "sample data"}
          ]
        },
        "processing_type": "batch",
        "options": {
          "validate": true,
          "transform": "standard"
        }
      }

GraphQL API
===========

Endpoint
--------

.. code-block:: text

   https://api.gra-core.boa.com/v5.8/graphql

Schema
------

.. code-block:: graphql

   type User {
     id: ID!
     username: String!
     email: String!
     role: Role!
     createdAt: DateTime!
   }

   type Query {
     users(page: Int, limit: Int): [User!]!
     user(id: ID!): User
   }

   type Mutation {
     createUser(input: CreateUserInput!): User!
     updateUser(id: ID!, input: UpdateUserInput!): User!
     deleteUser(id: ID!): Boolean!
   }

Error Handling
==============

HTTP Status Codes
------------------

* ``200`` - Success
* ``201`` - Created
* ``400`` - Bad Request
* ``401`` - Unauthorized
* ``403`` - Forbidden
* ``404`` - Not Found
* ``429`` - Rate Limited
* ``500`` - Internal Server Error

Error Response Format
---------------------

.. code-block:: json

   {
     "error": {
       "code": "INVALID_REQUEST",
       "message": "The request is invalid",
       "details": {
         "field": "username",
         "reason": "Username is required"
       }
     }
   }
