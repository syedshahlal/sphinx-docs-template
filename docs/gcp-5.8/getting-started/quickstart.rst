Quickstart Tutorial - GRA Core Platform v5.8 Beta
==================================================

.. warning::
   This tutorial uses **BETA** features. Test thoroughly before production use.

This quickstart guide will walk you through building your first application 
with GRA Core Platform v5.8 Beta in under 30 minutes.

What You'll Build
-----------------

A complete data processing application featuring:

- **REST API** for data ingestion
- **GraphQL API** for flexible querying (New in v5.8)
- **Real-time WebSocket** connections (New in v5.8)
- **Analytics Dashboard** with live metrics
- **Automated deployment** with Docker

Prerequisites Check
-------------------

Ensure you have completed the :doc:`index` installation steps.

.. code-block:: bash

   # Verify installation
   gra-core version
   # Expected output: GRA Core Platform v5.8.0-beta
   
   # Check Docker
   docker --version
   docker-compose --version

Step 1: Project Setup (5 minutes)
----------------------------------

**Create Your Project**

.. code-block:: bash

   # Create project with beta template
   gra-core create-project quickstart-app --template=beta-full
   cd quickstart-app
   
   # Project structure
   tree .
   # quickstart-app/
   # ├── config/
   # │   ├── app.yml
   # │   ├── database.yml
   # │   └── auth.yml
   # ├── src/
   # │   ├── api/
   # │   ├── graphql/     # New in v5.8
   # │   └── websocket/   # New in v5.8
   # ├── docker-compose.yml
   # └── package.json

**Configure Environment**

.. code-block:: bash

   # Copy environment template
   cp .env.example .env
   
   # Edit configuration
   nano .env

.. code-block:: bash

   # .env file
   GRA_CORE_VERSION=5.8.0-beta
   DATABASE_URL=postgresql://user:pass@localhost:5432/quickstart
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-super-secret-key
   ENABLE_BETA_FEATURES=true
   GRAPHQL_ENABLED=true
   WEBSOCKET_ENABLED=true

Step 2: Database Setup (5 minutes)
-----------------------------------

**Start Database Services**

.. code-block:: bash

   # Start PostgreSQL and Redis
   docker-compose up -d postgres redis
   
   # Wait for services to be ready
   gra-core wait-for-services

**Initialize Database Schema**

.. code-block:: bash

   # Run migrations with v5.8 schema
   gra-core migrate --version=5.8-beta
   
   # Seed with sample data
   gra-core seed --dataset=quickstart

Step 3: API Development (10 minutes)
-------------------------------------

**Create REST API Endpoints**

.. code-block:: javascript

   // src/api/users.js
   const { Router, validate } = require('@gra-core/api');
   const { User } = require('../models');
   
   const router = new Router();
   
   // Enhanced validation in v5.8
   const userSchema = {
     name: { type: 'string', required: true, minLength: 2 },
     email: { type: 'email', required: true },
     age: { type: 'number', min: 18, max: 120 }
   };
   
   router.post('/users', validate(userSchema), async (req, res) => {
     try {
       const user = await User.create(req.body);
       res.status(201).json(user);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   
   router.get('/users', async (req, res) => {
     const users = await User.findAll({
       limit: req.query.limit || 10,
       offset: req.query.offset || 0
     });
     res.json(users);
   });
   
   module.exports = router;

**Create GraphQL Schema (New in v5.8)**

.. code-block:: javascript

   // src/graphql/schema.js
   const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
   const { User } = require('../models');
   
   const UserType = new GraphQLObjectType({
     name: 'User',
     fields: {
       id: { type: GraphQLInt },
       name: { type: GraphQLString },
       email: { type: GraphQLString },
       age: { type: GraphQLInt },
       createdAt: { type: GraphQLString }
     }
   });
   
   const QueryType = new GraphQLObjectType({
     name: 'Query',
     fields: {
       users: {
         type: new GraphQLList(UserType),
         args: {
           limit: { type: GraphQLInt, defaultValue: 10 },
           search: { type: GraphQLString }
         },
         resolve: async (_, { limit, search }) => {
           const where = search ? { name: { $ilike: `%${search}%` } } : {};
           return await User.findAll({ where, limit });
         }
       },
       user: {
         type: UserType,
         args: { id: { type: GraphQLInt } },
         resolve: async (_, { id }) => await User.findByPk(id)
       }
     }
   });
   
   module.exports = new GraphQLSchema({
     query: QueryType
   });

**Add WebSocket Support (New in v5.8)**

.. code-block:: javascript

   // src/websocket/events.js
   const { WebSocketServer } = require('@gra-core/websocket');
   const { User } = require('../models');
   
   const wsServer = new WebSocketServer({
     port: 8081,
     authentication: true // Requires JWT token
   });
   
   // Real-time user updates
   wsServer.on('user:subscribe', async (socket, data) => {
     socket.join(`user:${data.userId}`);
     socket.emit('user:subscribed', { userId: data.userId });
   });
   
   // Broadcast user changes
   User.afterCreate((user) => {
     wsServer.to('users').emit('user:created', user);
   });
   
   User.afterUpdate((user) => {
     wsServer.to(`user:${user.id}`).emit('user:updated', user);
   });
   
   module.exports = wsServer;

Step 4: Frontend Integration (5 minutes)
-----------------------------------------

**Create Simple Dashboard**

.. code-block:: html

   <!-- public/index.html -->
   <!DOCTYPE html>
   <html>
   <head>
       <title>GRA Core v5.8 Beta - Quickstart</title>
       <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
       <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
   </head>
   <body>
       <h1>GRA Core Platform v5.8 Beta Demo</h1>
       
       <div id="stats">
           <h3>Real-time Stats</h3>
           <p>Total Users: <span id="userCount">Loading...</span></p>
           <p>WebSocket Status: <span id="wsStatus">Connecting...</span></p>
       </div>
       
       <div id="users">
           <h3>Users (GraphQL)</h3>
           <ul id="userList"></ul>
       </div>
       
       <script>
           // WebSocket connection
           const socket = io('ws://localhost:8081', {
               auth: { token: localStorage.getItem('jwt') }
           });
           
           socket.on('connect', () => {
               document.getElementById('wsStatus').textContent = 'Connected';
               socket.emit('user:subscribe', { userId: 'all' });
           });
           
           socket.on('user:created', (user) => {
               addUserToList(user);
               updateUserCount();
           });
           
           // GraphQL query
           async function loadUsers() {
               const query = `
                   query GetUsers($limit: Int) {
                       users(limit: $limit) {
                           id
                           name
                           email
                           createdAt
                       }
                   }
               `;
               
               const response = await axios.post('/graphql', {
                   query,
                   variables: { limit: 10 }
               });
               
               const users = response.data.data.users;
               users.forEach(addUserToList);
               updateUserCount();
           }
           
           function addUserToList(user) {
               const li = document.createElement('li');
               li.textContent = `${user.name} (${user.email})`;
               document.getElementById('userList').appendChild(li);
           }
           
           function updateUserCount() {
               const count = document.getElementById('userList').children.length;
               document.getElementById('userCount').textContent = count;
           }
           
           // Load initial data
           loadUsers();
       </script>
   </body>
   </html>

Step 5: Launch Your Application (5 minutes)
--------------------------------------------

**Start All Services**

.. code-block:: bash

   # Start the complete application stack
   docker-compose up -d
   
   # Check service status
   gra-core status
   
   # Expected output:
   # ✅ Database: Running (PostgreSQL 13.8)
   # ✅ Cache: Running (Redis 6.2)
   # ✅ API Server: Running (Port 8080)
   # ✅ GraphQL Server: Running (Port 8080/graphql)
   # ✅ WebSocket Server: Running (Port 8081)
   # ✅ Dashboard: Running (Port 3000)

**Test Your APIs**

.. code-block:: bash

   # Test REST API
   curl -X POST http://localhost:8080/api/users \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
   
   # Test GraphQL API
   curl -X POST http://localhost:8080/graphql \
     -H "Content-Type: application/json" \
     -d '{"query": "{ users { id name email } }"}'

**Access Your Application**

- **Main Dashboard**: http://localhost:3000
- **API Documentation**: http://localhost:8080/docs
- **GraphQL Playground**: http://localhost:8080/graphql
- **Metrics Dashboard**: http://localhost:8080/metrics

Testing Beta Features
----------------------

**1. Real-time Analytics**

.. code-block:: bash

   # Generate test data
   gra-core generate-data --type=users --count=100
   
   # Watch real-time metrics
   curl http://localhost:8080/metrics/stream

**2. Advanced Caching**

.. code-block:: bash

   # Test cache performance
   gra-core benchmark --endpoint=/api/users --requests=1000
   
   # Expected: ~60% faster response times vs v5.7

**3. Enhanced Security**

.. code-block:: bash

   # Test MFA authentication
   curl -X POST http://localhost:8080/auth/mfa/setup \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"

Troubleshooting
---------------

**Common Issues:**

1. **Port Conflicts**
   
   .. code-block:: bash
   
      # Check port usage
      netstat -tulpn | grep :8080
      
      # Use different ports
      export GRA_CORE_PORT=8090
      docker-compose up -d

2. **Database Connection**
   
   .. code-block:: bash
   
      # Check database logs
      docker-compose logs postgres
      
      # Reset database
      gra-core db:reset --force

3. **Beta Feature Issues**
   
   .. code-block:: bash
   
      # Disable beta features if needed
      export ENABLE_BETA_FEATURES=false
      gra-core restart

Next Steps
----------

Congratulations! You've successfully built your first GRA Core v5.8 Beta application.

**Explore More:**

- :doc:`../api-reference/graphql-api` - Advanced GraphQL features
- :doc:`../monitoring-analytics/index` - Set up comprehensive monitoring
- :doc:`../deployment-automation/index` - Deploy to production
- :doc:`../security-compliance/index` - Implement enterprise security

**Get Involved:**

- **Feedback**: Share your experience at beta-feedback@gra-core.com
- **Community**: Join discussions on `Discord <https://discord.gg/gra-core>`_
- **Contribute**: Submit issues and PRs on `GitHub <https://github.com/gra-core/platform>`_

.. note::
   **Performance Note**: This quickstart creates a development environment. 
   For production deployments, refer to our 
   :doc:`../deployment-automation/index` guide for optimization recommendations.
