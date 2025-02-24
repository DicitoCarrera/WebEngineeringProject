const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./database/lessons/lessonsDB");
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

app.get("/lessons", (req, res) => {
  db.all("SELECT * FROM lessons", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
