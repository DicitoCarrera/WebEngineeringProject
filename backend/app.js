const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/usersRoutes"); // Separate routes into their own file
const lessonsRouter = require("./routes/lessonsRoutes");
const { connectDB } = require("./database/db"); // Import MongoDB connection

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Stop the server if DB connection fails
  });

// Routes

// Load user-related routes
app.use("/users", userRoutes);
// Use lessons routes
app.use("/lessons", lessonsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
