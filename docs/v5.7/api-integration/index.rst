API Integration
===============

The GRA Core Platform provides comprehensive API integration capabilities for building modern, connected applications.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   rest-apis
   graphql
   websockets
   authentication
   rate-limiting
   api-gateway

Overview
--------

The API integration framework supports:

* **RESTful APIs**: Standard HTTP-based APIs with full CRUD operations
* **GraphQL**: Flexible query language for APIs
* **WebSockets**: Real-time bidirectional communication
* **API Gateway**: Centralized API management and routing
* **Authentication**: OAuth 2.0, JWT, and custom auth providers
* **Rate Limiting**: Protect APIs from abuse and overuse

REST API Framework
------------------

Build robust REST APIs with minimal configuration:

.. code-block:: python

   from gra_core import APIRouter, APIResponse
   
   router = APIRouter()
   
   @router.get("/customers/{customer_id}")
   async def get_customer(customer_id: str):
       customer = await customer_service.get_by_id(customer_id)
       return APIResponse(data=customer)
   
   @router.post("/customers")
   async def create_customer(customer_data: CustomerSchema):
       customer = await customer_service.create(customer_data)
       return APIResponse(data=customer, status_code=201)

Features:

* **Automatic Documentation**: OpenAPI/Swagger generation
* **Request Validation**: Automatic schema validation
* **Response Serialization**: JSON, XML, and custom formats
* **Error Handling**: Standardized error responses

GraphQL Integration
-------------------

Flexible data fetching with GraphQL:

.. code-block:: python

   from gra_core import GraphQLSchema, Query, Mutation
   
   class CustomerQuery(Query):
       async def customer(self, customer_id: str) -> Customer:
           return await customer_service.get_by_id(customer_id)
       
       async def customers(self, limit: int = 10) -> List[Customer]:
           return await customer_service.get_all(limit=limit)
   
   class CustomerMutation(Mutation):
       async def create_customer(self, input: CustomerInput) -> Customer:
           return await customer_service.create(input)
   
   schema = GraphQLSchema(query=CustomerQuery, mutation=CustomerMutation)

Benefits:

* **Efficient Data Fetching**: Request exactly what you need
* **Strong Type System**: Built-in validation and introspection
* **Real-time Subscriptions**: Live data updates
* **Developer Tools**: GraphQL Playground and introspection

WebSocket Support
-----------------

Real-time communication with WebSockets:

.. code-block:: python

   from gra_core import WebSocketManager
   
   ws_manager = WebSocketManager()
   
   @ws_manager.on_connect
   async def handle_connect(websocket, client_id):
       await websocket.accept()
       await ws_manager.add_client(client_id, websocket)
   
   @ws_manager.on_message
   async def handle_message(websocket, message):
       # Process the message
       response = await process_message(message)
       await websocket.send_json(response)
   
   @ws_manager.on_disconnect
   async def handle_disconnect(websocket, client_id):
       await ws_manager.remove_client(client_id)

Use Cases:

* **Real-time Notifications**: Push updates to clients
* **Live Data Feeds**: Stock prices, sensor data, etc.
* **Chat Applications**: Real-time messaging
* **Collaborative Tools**: Multi-user editing

API Gateway
-----------

Centralized API management and routing:

.. code-block:: yaml

   gateway:
     routes:
       - path: "/api/v1/customers/*"
         service: "customer-service"
         methods: ["GET", "POST", "PUT", "DELETE"]
         auth_required: true
         rate_limit: "1000/hour"
       
       - path: "/api/v1/orders/*"
         service: "order-service"
         methods: ["GET", "POST"]
         auth_required: true
         rate_limit: "500/hour"

Features:

* **Request Routing**: Route requests to appropriate services
* **Load Balancing**: Distribute traffic across service instances
* **SSL Termination**: Handle SSL/TLS encryption
* **Request/Response Transformation**: Modify requests and responses

Authentication & Authorization
------------------------------

Secure your APIs with multiple authentication methods:

**OAuth 2.0 / OpenID Connect:**

.. code-block:: python

   from gra_core import OAuth2Provider
   
   oauth2 = OAuth2Provider(
       client_id="your-client-id",
       client_secret="your-client-secret",
       authorization_url="https://auth.bankofamerica.com/oauth/authorize",
       token_url="https://auth.bankofamerica.com/oauth/token"
   )
   
   @router.get("/protected")
   @oauth2.require_auth
   async def protected_endpoint(current_user: User):
       return {"message": f"Hello, {current_user.name}!"}

**JWT Tokens:**

.. code-block:: python

   from gra_core import JWTAuth
   
   jwt_auth = JWTAuth(secret_key="your-secret-key")
   
   @router.post("/login")
   async def login(credentials: LoginCredentials):
       user = await authenticate_user(credentials)
       token = jwt_auth.create_token(user_id=user.id)
       return {"access_token": token}

Rate Limiting
-------------

Protect your APIs from abuse:

.. code-block:: python

   from gra_core import RateLimiter
   
   rate_limiter = RateLimiter()
   
   @router.get("/api/data")
   @rate_limiter.limit("100/minute")
   async def get_data():
       return {"data": "sensitive information"}

Rate Limiting Strategies:

* **Fixed Window**: Simple time-based limits
* **Sliding Window**: More accurate rate limiting
* **Token Bucket**: Burst traffic handling
* **Per-User Limits**: Individual user quotas

API Documentation
-----------------

Automatic API documentation generation:

* **OpenAPI/Swagger**: Interactive API documentation
* **Redoc**: Clean, responsive documentation
* **Postman Collections**: Ready-to-use API collections
* **SDK Generation**: Auto-generated client libraries

Monitoring and Analytics
------------------------

Track API usage and performance:

* **Request Metrics**: Response times, status codes, throughput
* **Error Tracking**: Failed requests and error patterns
* **Usage Analytics**: Most popular endpoints and users
* **Performance Monitoring**: Slow queries and bottlenecks

Best Practices
--------------

1. **Version Your APIs**: Use semantic versioning
2. **Implement Proper Error Handling**: Return meaningful error messages
3. **Use HTTPS**: Always encrypt API traffic
4. **Validate Input**: Sanitize and validate all input data
5. **Monitor Performance**: Set up alerts for key metrics
6. **Document Everything**: Maintain up-to-date documentation

Next Steps
----------

* Explore :doc:`../security-compliance/index`
* Learn about :doc:`../monitoring-analytics/index`
* Review :doc:`../development-tools/examples`
* Check :doc:`../api-reference/core`
