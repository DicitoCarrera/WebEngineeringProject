const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
// const db = require("./database/lessons/lessonsDB");
const authRoutes = require("./routes/authRoutes");
const lessonsRoutes = require("./routes/lessonsRoutes");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

app.use("/auth", authRoutes);
app.use("/lessons", lessonsRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
