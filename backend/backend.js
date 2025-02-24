const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const lessonsRoutes = require("./routes/lessonsRoutes");

const cookieParser = require('cookie-parser');
const port = 5000;


const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

// Protected route
app.get('/protected', (req, res) => {
  // Check if user is authenticated
  if (req.session.user) {
    res.send('Welcome to the protected area');
  } else {
    res.status(401).send('Unauthorized access');
  }
});


// Middleware function
const logRequest = (req, res, next) => {
  console.log(`Received a ${req.method} request from ${req.ip}`);
  next();
};

// Use the middleware
app.use(logRequest);

app.use("/auth", authRoutes);
app.use("/lessons", lessonsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
