# Frontend Service

## Overview

`frontend.js` is a Node.js server-side application using the **Express**
framework. It serves the home page (`index.pug`) and serves static files such as
CSS, JavaScript, and images. This server listens on port 3000 and uses the Pug
template engine to render views.

## Dependencies

- **`express`:** A minimal web application framework for Node.js used to handle
  routing, middleware, and request/response handling.
- **`path`:** A core Node.js module used to handle and transform file paths.
- **`body-parser`:** A middleware used to parse incoming request bodies in JSON
  format.
- **`pug`:** A templating engine for rendering dynamic HTML pages on the server.

## Code Breakdown

### 1. Importing Modules

```javascript
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;
```

- `express`: Imports the Express framework to handle HTTP requests and
  server-side routing.
- `path`: Provides utilities for working with file and directory paths.
- `body-parser`: Used to parse incoming JSON data in HTTP requests.
- `port`: Sets the port number on which the application will listen (3000).

### 2. Initialize Express Application

```javascript
const app = express();
```

- Creates an instance of an Express application to handle routing and
  middleware.

### 3. Middleware Configuration

```javascript
app.use(bodyParser.json());
```

- Configures Express to use `body-parser` to parse JSON bodies in incoming HTTP
  requests.

### 4. Set View Engine and Views Directory

```javascript
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
```

- Sets **Pug** as the view engine to render `.pug` files.
- Configures the views directory where Pug templates are stored. The `__dirname`
  points to the current directory where `frontend.js` is located, and it joins
  the path to the `views` folder.

### 5. Serve Static Files

```javascript
app.use(express.static(path.join(__dirname, "./")));
```

- Uses `express.static` middleware to serve static files (CSS, JavaScript,
  images) from the root directory.

### 6. Custom Middleware

```javascript
const logRequest = (req, res, next) => {
  console.log(`Received a ${req.method} request from ${req.ip}`);
  next();
};
app.use(logRequest);
```

- Defines a middleware function `logRequest` that logs the type of HTTP request
  (GET, POST, etc.) and the IP address of the requester.
- The `next()` function passes control to the next middleware function or route
  handler.

### 7. Route Configuration

```javascript
app.get("/", (req, res) => {
  res.render("index");
});
```

- Configures a route for the root URL (`/`).
- When the root URL is requested, the server will render the `index.pug`
  template.

### 8. Start the Server

```javascript
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

- Starts the Express server on the specified port (`3000`).
- Logs a message to the console indicating that the server is running and
  accessible via `http://localhost:3000`.

## How It Works

1. **Routing:** When a user visits `http://localhost:3000`, the server responds
   with the `index.pug` template, which is rendered into HTML.
2. **Serving Static Files:** The server serves static files such as CSS, images,
   and JavaScript from the root directory, making them accessible in the
   browser.
3. **Logging Requests:** Each incoming HTTP request is logged, including the
   type of request and the IP address of the requester.
4. **Rendering Views:** Pug templates are used to dynamically render the HTML
   pages on the server side, allowing for dynamic content generation.

## Usage

1. Install the required dependencies by running the following command:

```bash
npm install express path body-parser pug
```

2. Start the server by running:

```bash
node frontend.js
```

3. Visit `http://localhost:3000` in your browser to view the home page.

## Conclusion

`frontend.js` sets up a simple Node.js server using Express, which renders a
dynamic home page using Pug and serves static files. It logs incoming requests,
making it easier to debug and monitor server activity.
