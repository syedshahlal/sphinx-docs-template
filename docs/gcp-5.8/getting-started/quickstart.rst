Quickstart Tutorial - GRA Core Platform v5.8
=============================================

This quickstart guide will walk you through the essential features of GRA Core Platform v5.8 Beta in under 30 minutes.

.. note::
   This tutorial uses v5.8 Beta features. Some functionality may change before the stable release.

Step 1: Environment Setup
-------------------------

First, let's set up a development environment:

.. code-block:: bash

   # Create a project directory
   mkdir gra-core-quickstart
   cd gra-core-quickstart

   # Initialize the project
   npx @gra-core/cli@5.8-beta init quickstart-app
   cd quickstart-app

Step 2: Basic API Usage
----------------------

Let's start with a simple REST API call:

.. code-block:: javascript

   // examples/basic-api.js
   const { GRACoreClient } = require('@gra-core/sdk');

   const client = new GRACoreClient({
     baseURL: 'http://localhost:8080',
     version: '5.8',
     apiKey: 'your-api-key'
   });

   async function basicExample() {
     try {
       // Get platform information
       const info = await client.platform.getInfo();
       console.log('Platform Info:', info);

       // Create a new resource
       const resource = await client.resources.create({
         name: 'My First Resource',
         type: 'example',
         data: { message: 'Hello GRA Core v5.8!' }
       });
       console.log('Created Resource:', resource);

     } catch (error) {
       console.error('Error:', error.message);
     }
   }

   basicExample();

Step 3: GraphQL API (New in v5.8)
---------------------------------

Explore the new GraphQL API:

.. code-block:: javascript

   // examples/graphql-example.js
   const { GraphQLClient } = require('@gra-core/sdk');

   const graphqlClient = new GraphQLClient({
     endpoint: 'http://localhost:8080/graphql',
     headers: {
       'Authorization': 'Bearer your-jwt-token'
     }
   });

   async function graphqlExample() {
     const query = `
       query GetPlatformData {
         platform {
           version
           status
           features {
             name
             enabled
           }
         }
         resources(limit: 10) {
           id
           name
           type
           createdAt
         }
       }
     `;

     try {
       const data = await graphqlClient.request(query);
       console.log('GraphQL Response:', JSON.stringify(data, null, 2));
     } catch (error) {
       console.error('GraphQL Error:', error);
     }
   }

   graphqlExample();

Step 4: Real-time Features
-------------------------

Test the new WebSocket support:

.. code-block:: javascript

   // examples/realtime-example.js
   const { RealtimeClient } = require('@gra-core/sdk');

   const realtimeClient = new RealtimeClient({
     url: 'ws://localhost:8080/ws',
     apiKey: 'your-api-key'
   });

   // Connect to real-time updates
   realtimeClient.connect();

   // Subscribe to resource changes
   realtimeClient.subscribe('resources', (event) => {
     console.log('Resource Event:', event);
   });

   // Subscribe to system metrics
   realtimeClient.subscribe('metrics', (metrics) => {
     console.log('System Metrics:', {
       cpu: metrics.cpu_usage,
       memory: metrics.memory_usage,
       requests_per_second: metrics.rps
     });
   });

   // Handle connection events
   realtimeClient.on('connected', () => {
     console.log('Connected to real-time updates');
   });

   realtimeClient.on('error', (error) => {
     console.error('WebSocket Error:', error);
   });

Step 5: Security Features
------------------------

Implement the enhanced security features:

.. code-block:: javascript

   // examples/security-example.js
   const { SecurityClient } = require('@gra-core/sdk');

   const securityClient = new SecurityClient({
     baseURL: 'http://localhost:8080',
     clientId: 'your-client-id',
     clientSecret: 'your-client-secret'
   });

   async function securityExample() {
     try {
       // Authenticate with MFA
       const authResult = await securityClient.authenticate({
         username: 'your-username',
         password: 'your-password',
         mfaCode: '123456' // From your authenticator app
       });

       console.log('Authentication successful:', authResult);

       // Use encrypted data storage
       const encryptedData = await securityClient.encrypt({
         data: 'Sensitive information',
         algorithm: 'AES-256'
       });

       console.log('Encrypted data:', encryptedData);

       // Decrypt data
       const decryptedData = await securityClient.decrypt({
         encryptedData: encryptedData.data,
         key: encryptedData.key
       });

       console.log('Decrypted data:', decryptedData);

     } catch (error) {
       console.error('Security Error:', error);
     }
   }

   securityExample();

Step 6: Performance Monitoring
-----------------------------

Monitor your application performance:

.. code-block:: javascript

   // examples/monitoring-example.js
   const { MonitoringClient } = require('@gra-core/sdk');

   const monitoring = new MonitoringClient({
     baseURL: 'http://localhost:8080',
     apiKey: 'your-api-key'
   });

   async function monitoringExample() {
     try {
       // Get system metrics
       const metrics = await monitoring.getMetrics({
         timeRange: '1h',
         metrics: ['cpu', 'memory', 'requests', 'errors']
       });

       console.log('System Metrics:', metrics);

       // Create custom metric
       await monitoring.recordMetric({
         name: 'custom.api.calls',
         value: 1,
         tags: {
           endpoint: '/api/resources',
           method: 'POST'
         }
       });

       // Set up alerts
       await monitoring.createAlert({
         name: 'High CPU Usage',
         condition: 'cpu_usage > 80',
         notification: {
           type: 'webhook',
           url: 'https://your-webhook-url.com/alerts'
         }
       });

     } catch (error) {
       console.error('Monitoring Error:', error);
     }
   }

   monitoringExample();

Step 7: Kubernetes Deployment
-----------------------------

Deploy your application to Kubernetes:

.. code-block:: yaml

   # k8s/deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: quickstart-app
     namespace: gra-core
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: quickstart-app
     template:
       metadata:
         labels:
           app: quickstart-app
       spec:
         containers:
         - name: app
           image: your-registry/quickstart-app:latest
           ports:
           - containerPort: 3000
           env:
           - name: GRA_CORE_URL
             value: "http://gra-core-service:8080"
           - name: GRA_CORE_API_KEY
             valueFrom:
               secretKeyRef:
                 name: gra-core-secrets
                 key: api-key

Deploy with:

.. code-block:: bash

   kubectl apply -f k8s/deployment.yaml

Testing Your Setup
------------------

Run the complete test suite:

.. code-block:: bash

   # Run all examples
   npm run test:quickstart

   # Expected output:
   # ✓ Basic API calls working
   # ✓ GraphQL API responding
   # ✓ WebSocket connection established
   # ✓ Security features enabled
   # ✓ Monitoring active
   # ✓ Kubernetes deployment successful

Next Steps
----------

Congratulations! You've successfully completed the v5.8 quickstart. Here's what to explore next:

1. **Advanced Features**: :doc:`../user-guide/index`
2. **API Reference**: :doc:`../api-reference/index`
3. **Production Deployment**: :doc:`../deployment-automation/index`
4. **Security Best Practices**: :doc:`../security-compliance/index`

Beta Feedback
------------

Found an issue or have suggestions? We'd love to hear from you:

* **GitHub Issues**: Report bugs and request features
* **Community Forum**: Ask questions and share experiences
* **Beta Survey**: Help us improve before the stable release

.. code-block:: bash

   # Quick feedback command
   npx @gra-core/cli@5.8-beta feedback

This will open a form to submit your experience with v5.8 Beta.
