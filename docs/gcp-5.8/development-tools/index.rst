Development Tools
=================

GRA Core Platform v5.8 includes a comprehensive suite of development tools.

.. toctree::
   :maxdepth: 2

CLI Tools
=========

GRA CLI v5.8
------------

Enhanced command-line interface with new features:

.. code-block:: bash

   # Project management
   gra-cli init <project-name> --version=5.8
   gra-cli build --env=production
   gra-cli deploy --target=kubernetes
   
   # Database operations
   gra-cli db:migrate --version=latest
   gra-cli db:seed --env=development
   gra-cli db:backup --output=backup.sql
   
   # Service management
   gra-cli service:create <service-name>
   gra-cli service:test --coverage
   gra-cli service:deploy --env=staging

SDK and Libraries
=================

Python SDK
-----------

.. code-block:: python

   from gra_core import GRAClient
   
   client = GRAClient(
       api_key="your-api-key",
       version="5.8"
   )
   
   # Create a new service
   service = client.services.create(
       name="my-service",
       config={
           "runtime": "python3.9",
           "memory": "512MB"
       }
   )

JavaScript SDK
--------------

.. code-block:: javascript

   import { GRAClient } from '@boa/gra-core-sdk';
   
   const client = new GRAClient({
       apiKey: 'your-api-key',
       version: '5.8'
   });
   
   // Deploy a function
   const deployment = await client.functions.deploy({
       name: 'my-function',
       runtime: 'nodejs18',
       code: './dist/function.js'
   });

Testing Framework
=================

Unit Testing
------------

.. code-block:: python

   import pytest
   from gra_core.testing import GRATestCase
   
   class TestMyService(GRATestCase):
       def test_service_response(self):
           response = self.client.get('/api/test')
           assert response.status_code == 200
           assert response.json()['status'] == 'success'

Integration Testing
-------------------

.. code-block:: python

   from gra_core.testing import IntegrationTest
   
   class TestAPIIntegration(IntegrationTest):
       def test_end_to_end_flow(self):
           # Test complete user workflow
           user = self.create_test_user()
           token = self.authenticate(user)
           response = self.make_authenticated_request(token)
           self.assert_success(response)

Development Environment
=======================

Docker Development
------------------

.. code-block:: dockerfile

   FROM boa/gra-core-platform:5.8-dev
   
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   
   COPY . .
   CMD ["gra-cli", "serve", "--dev"]

Local Development Server
------------------------

.. code-block:: bash

   # Start development server with hot reload
   gra-cli serve --dev --port=8080 --reload
   
   # Enable debug mode
   export GRA_DEBUG=true
   gra-cli serve --dev --debug

Code Generation
===============

Service Templates
-----------------

.. code-block:: bash

   # Generate service boilerplate
   gra-cli generate service --name=user-service --type=rest-api
   
   # Generate database models
   gra-cli generate model --name=User --fields=name:string,email:string
   
   # Generate API documentation
   gra-cli generate docs --format=openapi
