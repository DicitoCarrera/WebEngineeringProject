const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./userDatabase');
const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], function(err) {
    if (err) {
      return res.status(500).send("Error registering user");
    }
    res.status(201).send("User registered successfully");
  });
});

// Логин пользователя
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) {
      return res.status(500).send("Error logging in");
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }
    res.status(200).send("Login successful");
  });
});

module.exports = router;