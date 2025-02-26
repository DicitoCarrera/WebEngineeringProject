const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 4000;

const app = express();

app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./")));

// Middleware function
const logRequest = (req, res, next) => {
  console.log(`Received a ${req.method} request from ${req.ip}`);
  next();
};

// Use the middleware
app.use(logRequest);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
