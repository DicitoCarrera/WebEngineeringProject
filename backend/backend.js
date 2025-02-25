const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Middleware Setup
app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Session setup
app.use(
  session({
    secret: "your_secret_key", // Secret key for encrypting session
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Should be true if using HTTPS
      httpOnly: true, // Helps mitigate cross-site scripting (XSS)
      maxAge: 600000, // Session expiration time in ms (e.g., 10 minutes)
    },
  }),
);

// Log when the server starts
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Import routes
const usersRoutes = require("./routes/usersRoutes");
const lessonsRoutes = require("./routes/lessonsRoutes");

// Routes
app.use("/users", usersRoutes);
app.use("/lessons", lessonsRoutes);

// General Error Handling
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.message);
  res.status(500).send({ error: "Internal Server Error" });
});

// Test Route (Optional, for initial debugging)
app.get("/", (req, res) => {
  console.log("Request received at root endpoint.");
  res.send("Backend is running!");
});

// More advanced error handling for unhandled routes
app.use((req, res) => {
  console.log(`Unhandled route accessed: ${req.method} ${req.originalUrl}`);
  res.status(404).send({ error: "Not Found" });
});
