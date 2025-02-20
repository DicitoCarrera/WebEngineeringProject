const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/userDatabase');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], function(err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(201).send({ message: "User registered successfully" });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send({ error: err.message });
    }
    if (!user) {
      console.error('User not found');
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    console.log('User found:', user);
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);
    if (!passwordMatch) {
      console.error('Invalid credentials');
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    res.send({ message: 'Login successful' });
  });
});

router.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  db.get("SELECT * FROM users WHERE id = ?", [req.session.userId], (err, user) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  });
});

router.put('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  const { username, email, currentPassword, newPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).send({ error: 'Current password is required' });
  }

  console.log('Received data:', req.body); // Log received data

  db.get("SELECT * FROM users WHERE id = ?", [req.session.userId], async (err, user) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send({ error: err.message });
    }
    if (!user) {
      console.error('User not found');
      return res.status(404).send({ error: 'User not found' });
    }
    console.log('Current password:', currentPassword);
    console.log('User password:', user.password);
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      console.error('Current password is incorrect');
      return res.status(401).send({ error: 'Current password is incorrect' });
    }

    const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : user.password;
    console.log('Hashed new password:', hashedPassword); // Log hashed new password

    db.run("UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?", [username, email, hashedPassword, req.session.userId], function(err) {
      if (err) {
        console.error('Update error:', err.message);
        return res.status(500).send({ error: err.message });
      }
      console.log('Profile updated successfully');
      res.send({ message: 'Profile updated' });
    });
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.send({ message: 'Logout successful' });
  });
});

module.exports = router;