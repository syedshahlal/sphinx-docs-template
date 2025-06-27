==========
Quickstart
==========

This quickstart guide will get you up and running with GRA Core Platform v5.8 Beta in under 30 minutes. You'll build a simple data processing application that demonstrates the key features of the platform.

.. note::
   **Time Required**: ~30 minutes
   
   **Prerequisites**: Node.js 18+, Docker (optional)

Step 1: Installation and Setup
===============================

Install the Platform
---------------------

.. code-block:: bash

   # Install GRA Core Platform v5.8 Beta
   npm install -g @gra/core-platform@5.8.0-beta
   
   # Verify installation
   gra-cli --version
   # Output: GRA Core Platform v5.8.0-beta

Create Your First Project
--------------------------

.. code-block:: bash

   # Create a new project
   gra-cli create project quickstart-demo
   cd quickstart-demo
   
   # Install dependencies
   npm install
   
   # Initialize the project structure
   gra-cli init --template data-processing

Your project structure should look like this:

.. code-block:: text

   quickstart-demo/
   ├── src/
   │   ├── api/
   │   ├── components/
   │   ├── services/
   │   └── utils/
   ├── config/
   │   └── gra-config.yaml
   ├── tests/
   ├── package.json
   └── README.md

Step 2: Configure the Platform
===============================

Update Configuration
--------------------

Edit ``config/gra-config.yaml``:

.. code-block:: yaml

   # Quickstart Configuration
   version: "5.8.0-beta"
   
   api:
     host: "localhost"
     port: 8080
     cors:
       enabled: true
   
   database:
     type: "sqlite"
     path: "./data/quickstart.db"
   
   # New in v5.8: Enhanced caching
   cache:
     type: "memory"
     max_size: "100MB"
   
   # New in v5.8: Real-time features
   realtime:
     enabled: true
     websocket_port: 8081

Set Environment Variables
--------------------------

.. code-block:: bash

   # Create .env file
   cat > .env << EOF
   GRA_VERSION=5.8.0-beta
   GRA_ENV=development
   GRA_API_KEY=quickstart-demo-key
   GRA_LOG_LEVEL=info
   EOF

Step 3: Build Your First Service
=================================

Create a Data Service
---------------------

Create ``src/services/userService.js``:

.. code-block:: javascript

   // User Service - Demonstrates v5.8 features
   import { GRAService, Cache, Analytics } from '@gra/core-platform';
   
   class UserService extends GRAService {
     constructor() {
       super('UserService');
       this.cache = new Cache({ ttl: 300 }); // 5 minutes
       this.analytics = new Analytics();
     }
   
     async getUsers(filters = {}) {
       const cacheKey = `users:${JSON.stringify(filters)}`;
       
       // Try cache first (New caching in v5.8)
       let users = await this.cache.get(cacheKey);
       if (users) {
         this.analytics.track('cache_hit', { service: 'UserService' });
         return users;
       }
   
       // Simulate database query
       users = await this.fetchUsersFromDB(filters);
       
       // Cache the results
       await this.cache.set(cacheKey, users);
       this.analytics.track('cache_miss', { service: 'UserService' });
       
       return users;
     }
   
     async fetchUsersFromDB(filters) {
       // Simulate API call with enhanced error handling (v5.8)
       try {
         const response = await fetch('https://jsonplaceholder.typicode.com/users');
         if (!response.ok) {
           throw new Error(`HTTP ${response.status}: ${response.statusText}`);
         }
         
         let users = await response.json();
         
         // Apply filters
         if (filters.name) {
           users = users.filter(user => 
             user.name.toLowerCase().includes(filters.name.toLowerCase())
           );
         }
         
         return users;
       } catch (error) {
         this.logger.error('Failed to fetch users', { error: error.message });
         throw error;
       }
     }
   
     async createUser(userData) {
       // Enhanced validation (v5.8)
       const validation = this.validateUserData(userData);
       if (!validation.valid) {
         throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
       }
   
       // Simulate user creation
       const newUser = {
         id: Date.now(),
         ...userData,
         createdAt: new Date().toISOString()
       };
   
       // Track analytics
       this.analytics.track('user_created', {
         userId: newUser.id,
         source: 'quickstart_demo'
       });
   
       // Invalidate cache
       await this.cache.clear('users:*');
   
       return newUser;
     }
   
     validateUserData(data) {
       const errors = [];
       
       if (!data.name || data.name.length < 2) {
         errors.push('Name must be at least 2 characters');
       }
       
       if (!data.email || !data.email.includes('@')) {
         errors.push('Valid email is required');
       }
   
       return {
         valid: errors.length === 0,
         errors
       };
     }
   }
   
   export default UserService;

Create REST API Endpoints
--------------------------

Create ``src/api/users.js``:

.. code-block:: javascript

   // REST API for Users - v5.8 Enhanced Features
   import { Router, middleware } from '@gra/core-platform';
   import UserService from '../services/userService.js';
   
   const router = new Router();
   const userService = new UserService();
   
   // Middleware for request logging (Enhanced in v5.8)
   router.use(middleware.requestLogger({
     includeBody: true,
     includeHeaders: false
   }));
   
   // Rate limiting middleware (New in v5.8)
   router.use(middleware.rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   }));
   
   // GET /api/users - List users with filtering
   router.get('/', async (req, res) => {
     try {
       const filters = {
         name: req.query.name,
         limit: parseInt(req.query.limit) || 10
       };
   
       const users = await userService.getUsers(filters);
       
       res.json({
         success: true,
         data: users.slice(0, filters.limit),
         meta: {
           total: users.length,
           limit: filters.limit,
           version: '5.8.0-beta'
         }
       });
     } catch (error) {
       res.status(500).json({
         success: false,
         error: error.message,
         code: 'USER_FETCH_ERROR'
       });
     }
   });
   
   // POST /api/users - Create new user
   router.post('/', async (req, res) => {
     try {
       const newUser = await userService.createUser(req.body);
       
       res.status(201).json({
         success: true,
         data: newUser,
         message: 'User created successfully'
       });
     } catch (error) {
       res.status(400).json({
         success: false,
         error: error.message,
         code: 'USER_CREATION_ERROR'
       });
     }
   });
   
   // GET /api/users/:id - Get specific user
   router.get('/:id', async (req, res) => {
     try {
       const users = await userService.getUsers();
       const user = users.find(u => u.id === parseInt(req.params.id));
       
       if (!user) {
         return res.status(404).json({
           success: false,
           error: 'User not found',
           code: 'USER_NOT_FOUND'
         });
       }
   
       res.json({
         success: true,
         data: user
       });
     } catch (error) {
       res.status(500).json({
         success: false,
         error: error.message,
         code: 'USER_FETCH_ERROR'
       });
     }
   });
   
   export default router;

Step 4: Add GraphQL Support (New in v5.8)
==========================================

Create GraphQL Schema
----------------------

Create ``src/graphql/schema.js``:

.. code-block:: javascript

   // GraphQL Schema - New in v5.8
   import { buildSchema } from 'graphql';
   
   export const schema = buildSchema(`
     type User {
       id: ID!
       name: String!
       email: String!
       phone: String
       website: String
       company: Company
       address: Address
       createdAt: String
     }
   
     type Company {
       name: String
       catchPhrase: String
       bs: String
     }
   
     type Address {
       street: String
       suite: String
       city: String
       zipcode: String
       geo: Geo
     }
   
     type Geo {
       lat: String
       lng: String
     }
   
     type Query {
       users(limit: Int, name: String): [User]
       user(id: ID!): User
       userStats: UserStats
     }
   
     type Mutation {
       createUser(input: UserInput!): User
       updateUser(id: ID!, input: UserInput!): User
       deleteUser(id: ID!): Boolean
     }
   
     type Subscription {
       userCreated: User
       userUpdated: User
     }
   
     type UserStats {
       total: Int
       active: Int
       newToday: Int
     }
   
     input UserInput {
       name: String!
       email: String!
       phone: String
       website: String
     }
   `);

Create GraphQL Resolvers
-------------------------

Create ``src/graphql/resolvers.js``:

.. code-block:: javascript

   // GraphQL Resolvers - v5.8 Real-time Features
   import UserService from '../services/userService.js';
   import { PubSub } from '@gra/core-platform';
   
   const userService = new UserService();
   const pubsub = new PubSub();
   
   export const resolvers = {
     Query: {
       users: async (parent, args) => {
         const filters = {
           name: args.name,
           limit: args.limit || 10
         };
         return await userService.getUsers(filters);
       },
   
       user: async (parent, args) => {
         const users = await userService.getUsers();
         return users.find(user => user.id === parseInt(args.id));
       },
   
       userStats: async () => {
         const users = await userService.getUsers();
         return {
           total: users.length,
           active: users.filter(u => u.email).length,
           newToday: Math.floor(Math.random() * 10) // Simulated
         };
       }
     },
   
     Mutation: {
       createUser: async (parent, args) => {
         const newUser = await userService.createUser(args.input);
         
         // Publish to subscribers (Real-time feature)
         pubsub.publish('USER_CREATED', { userCreated: newUser });
         
         return newUser;
       },
   
       updateUser: async (parent, args) => {
         // Simulate user update
         const updatedUser = {
           id: args.id,
           ...args.input,
           updatedAt: new Date().toISOString()
         };
         
         pubsub.publish('USER_UPDATED', { userUpdated: updatedUser });
         
         return updatedUser;
       },
   
       deleteUser: async (parent, args) => {
         // Simulate user deletion
         console.log(`Deleting user ${args.id}`);
         return true;
       }
     },
   
     Subscription: {
       userCreated: {
         subscribe: () => pubsub.asyncIterator(['USER_CREATED'])
       },
   
       userUpdated: {
         subscribe: () => pubsub.asyncIterator(['USER_UPDATED'])
       }
     }
   };

Step 5: Create the Main Application
===================================

Create ``src/app.js``:

.. code-block:: javascript

   // Main Application - GRA Core Platform v5.8 Beta
   import { GRAApplication, GraphQLServer } from '@gra/core-platform';
   import userRoutes from './api/users.js';
   import { schema } from './graphql/schema.js';
   import { resolvers } from './graphql/resolvers.js';
   
   class QuickstartApp extends GRAApplication {
     constructor() {
       super({
         name: 'Quickstart Demo',
         version: '5.8.0-beta',
         port: 8080
       });
     }
   
     async initialize() {
       // Setup REST API routes
       this.app.use('/api/users', userRoutes);
       
       // Setup GraphQL endpoint (New in v5.8)
       const graphqlServer = new GraphQLServer({
         schema,
         resolvers,
         playground: true, // Enable GraphQL Playground
         subscriptions: true // Enable real-time subscriptions
       });
       
       await graphqlServer.start();
       this.app.use('/graphql', graphqlServer.getHandler());
       
       // Health check endpoint
       this.app.get('/health', (req, res) => {
         res.json({
           status: 'healthy',
           version: '5.8.0-beta',
           timestamp: new Date().toISOString(),
           uptime: process.uptime()
         });
       });
       
       // Serve static files
       this.app.use('/static', this.express.static('public'));
       
       console.log('✅ Quickstart Demo initialized successfully');
     }
   
     async start() {
       await this.initialize();
       
       this.server = this.app.listen(this.port, () => {
         console.log(`🚀 GRA Core Platform v5.8 Beta running on port ${this.port}`);
         console.log(`📖 REST API: http://localhost:${this.port}/api`);
         console.log(`🎮 GraphQL Playground: http://localhost:${this.port}/graphql`);
         console.log(`❤️  Health Check: http://localhost:${this.port}/health`);
       });
     }
   
     async stop() {
       if (this.server) {
         this.server.close();
         console.log('🛑 Application stopped');
       }
     }
   }
   
   export default QuickstartApp;

Create ``index.js``:

.. code-block:: javascript

   // Entry Point
   import QuickstartApp from './src/app.js';
   
   const app = new QuickstartApp();
   
   // Graceful shutdown
   process.on('SIGTERM', async () => {
     console.log('Received SIGTERM, shutting down gracefully');
     await app.stop();
     process.exit(0);
   });
   
   process.on('SIGINT', async () => {
     console.log('Received SIGINT, shutting down gracefully');
     await app.stop();
     process.exit(0);
   });
   
   // Start the application
   app.start().catch(error => {
     console.error('Failed to start application:', error);
     process.exit(1);
   });

Step 6: Test Your Application
=============================

Start the Application
---------------------

.. code-block:: bash

   # Start the development server
   npm run dev
   
   # Or start with the CLI
   gra-cli start

You should see output like:

.. code-block:: text

   ✅ Quickstart Demo initialized successfully
   🚀 GRA Core Platform v5.8 Beta running on port 8080
   📖 REST API: http://localhost:8080/api
   🎮 GraphQL Playground: http://localhost:8080/graphql
   ❤️  Health Check: http://localhost:8080/health

Test REST API
-------------

.. code-block:: bash

   # Test health endpoint
   curl http://localhost:8080/health
   
   # Get all users
   curl http://localhost:8080/api/users
   
   # Get users with filter
   curl "http://localhost:8080/api/users?name=John&limit=5"
   
   # Create a new user
   curl -X POST http://localhost:8080/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com"}'

Test GraphQL API
----------------

Open http://localhost:8080/graphql in your browser to access GraphQL Playground.

Try these queries:

.. code-block:: graphql

   # Query users
   query GetUsers {
     users(limit: 5) {
       id
       name
       email
       company {
         name
       }
     }
   }
   
   # Get user statistics
   query GetStats {
     userStats {
       total
       active
       newToday
     }
   }
   
   # Create a user (mutation)
   mutation CreateUser {
     createUser(input: {
       name: "Jane Smith"
       email: "jane@example.com"
     }) {
       id
       name
       email
       createdAt
     }
   }

Test Real-time Subscriptions
-----------------------------

.. code-block:: graphql

   # Subscribe to user creation events
   subscription {
     userCreated {
       id
       name
       email
       createdAt
     }
   }

Step 7: Explore v5.8 Beta Features
===================================

Analytics Dashboard
-------------------

.. code-block:: bash

   # View analytics data
   gra-cli analytics view --service UserService
   
   # Export analytics
   gra-cli analytics export --format json --output analytics.json

Performance Monitoring
----------------------

.. code-block:: bash

   # Check performance metrics
   gra-cli metrics --service all
   
   # Monitor real-time performance
   gra-cli monitor --realtime

Security Features
-----------------

.. code-block:: bash

   # Generate API key
   gra-cli security api-key create --name "quickstart-demo"
   
   # Enable request encryption
   gra-cli security encryption enable --algorithm AES-256

Next Steps
==========

Congratulations! You've successfully built and tested your first GRA Core Platform v5.8 Beta application. Here's what you can do next:

1. **Explore Advanced Features**:
   - :doc:`../api-reference/index` - Complete API documentation
   - :doc:`../data-processing/index` - Advanced data processing
   - :doc:`../security-compliance/index` - Security best practices

2. **Add More Functionality**:
   - Database integration with PostgreSQL/MongoDB
   - Authentication and authorization
   - File upload and processing
   - Background job processing

3. **Deploy Your Application**:
   - :doc:`../deployment-automation/index` - Deployment guides
   - Docker containerization
   - Kubernetes deployment
   - CI/CD pipeline setup

4. **Join the Community**:
   - Share your feedback on the beta features
   - Report bugs and suggest improvements
   - Connect with other developers

Troubleshooting
===============

**Port Already in Use**
   Change the port in ``config/gra-config.yaml`` or set ``PORT`` environment variable

**GraphQL Playground Not Loading**
   Ensure GraphQL server is properly initialized and check browser console for errors

**Database Connection Issues**
   For this quickstart, we use in-memory data. For persistent storage, configure a proper database

**Performance Issues**
   Enable caching and check the monitoring dashboard for bottlenecks

Need Help?
==========

- **Documentation**: :doc:`../index`
- **GitHub Issues**: https://github.com/bankofamerica/gra-core-platform/issues
- **Community Forum**: https://community.gra-platform.com
- **Email**: gra-platform-beta@bankofamerica.com
