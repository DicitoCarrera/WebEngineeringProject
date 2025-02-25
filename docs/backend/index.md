# Backend Service

## Overview

This document provides a technical overview of the `backend.js` entry point for
the backend service in the application. The file sets up an Express.js server
that handles routing, middleware, authentication, session management, CORS
handling, error handling, and logging for the backend application.

## Dependencies

The `backend.js` file uses the following dependencies:

- **`express`**: A web framework for Node.js, used to create the server and
  handle routing.
- **`body-parser`**: Middleware to parse incoming request bodies.
- **`express-session`**: Middleware for managing user sessions.
- **`cookie-parser`**: Middleware for parsing cookies in incoming requests.
- **`cors`**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **`usersRoutes`**: Custom routes for authentication-related operations.
- **`lessonsRoutes`**: Custom routes for lesson-related operations.

## Server Configuration

The server is configured to listen on port `5001`. The following middleware and
routes are used in the backend service:

### Express App Initialization

The server is initialized using the Express framework:

```javascript
const app = express();
```

### Middleware Configuration

**cookieParser**: Parses cookies from incoming requests.

```javascript
app.use(cookieParser());
```

**bodyParser.urlencoded**: Parses URL-encoded bodies (e.g., form submissions).

```javascript
app.use(bodyParser.urlencoded({ extended: false }));
```

**bodyParser.json**: Parses incoming requests with JSON payloads.

```javascript
app.use(bodyParser.json());
```

**cors**: Configures CORS to allow requests from `http://localhost:3000` with
specific HTTP methods and headers.

```javascript
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

**session**: Initializes session handling using express-session. It uses a
secret key for encrypting the session data and stores session data in memory.

```javascript
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));
```

### Routes

**usersRoutes**: Handles all authentication-related routes, such as login and
registration.

**lessonsRoutes**: Handles routes related to lessons, like retrieving and
managing lessons.

```javascript
app.use("/auth", usersRoutes);
app.use("/lessons", lessonsRoutes);
```

### Protected Route

A sample protected route (`/protected`) is defined. The route checks if the user
is authenticated by verifying the existence of a session user:

```javascript
app.get("/protected", (req, res) => {
  if (req.session.user) {
    res.send("Welcome to the protected area");
  } else {
    res.status(401).send("Unauthorized access");
  }
});
```

This route checks the session for an authenticated user. If the user is
authenticated (i.e., `req.session.user` exists), it sends a welcome message.
Otherwise, it sends a 401 Unauthorized error.

### Middleware Function: logRequest

A custom middleware function is defined to log each incoming request, including
the HTTP method and the IP address of the requester.

```javascript
const logRequest = (req, res, next) => {
  console.log(`Received a ${req.method} request from ${req.ip}`);
  next();
};
```

This middleware is applied to all incoming requests by using
`app.use(logRequest)`.

### Error Handling

A general error handler is defined to catch any internal server errors and send
a response to the client.

```javascript
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.message);
  res.status(500).send({ error: "Internal Server Error" });
});
```

Additionally, there is an error handler for unhandled routes:

```javascript
app.use((req, res) => {
  console.log(`Unhandled route accessed: ${req.method} ${req.originalUrl}`);
  res.status(404).send({ error: "Not Found" });
});
```

### Test Route (Optional)

A test route is provided to verify if the server is running properly:

```javascript
app.get("/", (req, res) => {
  console.log("Request received at root endpoint.");
  res.send("Backend is running!");
});
```

### Server Listening

Finally, the Express server is configured to listen on port `5001`, and logs a
message when the server starts:

```javascript
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## Conclusion

This `backend.js` file sets up an Express.js server with basic functionality,
including middleware for parsing requests, managing user sessions, logging
incoming requests, and handling errors. It also provides protected routes and
integrates authentication and lesson-related routes through custom modules
(`usersRoutes` and `lessonsRoutes`). The server supports CORS, error handling
for unhandled routes, and includes a test route for verifying the backend
service's status. This server is essential for the backend service of the
application and ensures secure, session-based interactions for users.
