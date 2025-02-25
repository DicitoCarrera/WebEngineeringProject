const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const lessonsRoutes = require("./routes/lessonsRoutes");

const cookieParser = require('cookie-parser');
const port = 5000;


const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
