const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");
const lessonsRoutes = require("./routes/lessonsRoutes");

const cookieParser = require("cookie-parser");
const port = 5001;

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:4000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

// Middleware function
const logRequest = (req, res, next) => {
  console.log(`Received a ${req.method} request from ${req.ip}`);
  next();
};

// Use the middleware
app.use(logRequest);

app.use("/auth", usersRoutes);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
