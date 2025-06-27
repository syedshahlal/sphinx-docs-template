Quickstart Tutorial
==================

This tutorial will guide you through creating your first application with GRA Core Platform v5.8 in under 10 minutes.

Step 1: Create a New Project
----------------------------

.. code-block:: bash

   # Create a new project
   gra create-project hello-world --template=basic
   cd hello-world

Step 2: Configure Your Application
----------------------------------

Edit the ``app.yaml`` configuration file:

.. code-block:: yaml

   name: hello-world
   version: 5.8
   runtime: python38
   
   handlers:
   - url: /api/.*
     script: main.app
   
   - url: /.*
     static_files: static/index.html
     upload: static/.*

Step 3: Write Your First Handler
--------------------------------

Create ``main.py``:

.. code-block:: python

   from gra_core import GRAApplication, request, jsonify
   
   app = GRAApplication(__name__)
   
   @app.route('/api/hello')
   def hello():
       name = request.args.get('name', 'World')
       return jsonify({
           'message': f'Hello, {name}!',
           'version': '5.8',
           'timestamp': app.get_timestamp()
       })
   
   @app.route('/api/users', methods=['GET', 'POST'])
   def users():
       if request.method == 'POST':
           user_data = request.get_json()
           # Process user data with v5.8 security features
           encrypted_data = app.security.encrypt(user_data)
           return jsonify({'status': 'created', 'id': app.generate_id()})
       else:
           # Return users with v5.8 pagination
           return app.paginate_response(app.get_users())
   
   if __name__ == '__main__':
       app.run(debug=True)

Step 4: Test Your Application
-----------------------------

.. code-block:: bash

   # Start the development server
   gra serve --port=8080
   
   # Test the API endpoint
   curl http://localhost:8080/api/hello?name=Developer

Expected response:

.. code-block:: json

   {
     "message": "Hello, Developer!",
     "version": "5.8",
     "timestamp": "2024-12-27T10:30:00Z"
   }

Step 5: Use New v5.8 Features
-----------------------------

GraphQL API
~~~~~~~~~~~

Create ``schema.py``:

.. code-block:: python

   import graphene
   from gra_core.graphql import GRAObjectType
   
   class User(GRAObjectType):
       id = graphene.ID()
       name = graphene.String()
       email = graphene.String()
   
   class Query(graphene.ObjectType):
       users = graphene.List(User)
       user = graphene.Field(User, id=graphene.ID(required=True))
   
       def resolve_users(self, info):
           return app.get_users()
   
       def resolve_user(self, info, id):
           return app.get_user(id)
   
   schema = graphene.Schema(query=Query)
   app.add_graphql_endpoint('/graphql', schema)

Real-time Analytics
~~~~~~~~~~~~~~~~~~~

.. code-block:: python

   from gra_core.analytics import RealTimeAnalytics
   
   analytics = RealTimeAnalytics(app)
   
   @app.route('/api/metrics')
   def metrics():
       return jsonify({
           'active_users': analytics.get_active_users(),
           'requests_per_minute': analytics.get_rpm(),
           'response_time': analytics.get_avg_response_time()
       })

Step 6: Deploy Your Application
-------------------------------

Local Deployment
~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Build the application
   gra build
   
   # Deploy locally
   gra deploy --target=local

Docker Deployment
~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Create Dockerfile (auto-generated)
   gra generate dockerfile
   
   # Build Docker image
   docker build -t hello-world:5.8 .
   
   # Run container
   docker run -p 8080:8080 hello-world:5.8

Kubernetes Deployment
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Generate Kubernetes manifests
   gra generate k8s --namespace=production
   
   # Deploy to Kubernetes
   kubectl apply -f k8s/

Congratulations!
---------------

You've successfully created and deployed your first GRA Core Platform v5.8 application! 

Next steps:
* Explore the :doc:`../api-reference/index` for advanced features
* Learn about :doc:`../security-compliance/index` for production deployments
* Check out :doc:`../monitoring-analytics/index` for observability
