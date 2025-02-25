const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/users/usersDB");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log(`Attempting to register user with username: ${username}`);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Password hashed successfully for user: ${username}`);

    db.insertUser(username, email, hashedPassword, (err) => {
      if (err) {
        console.error("Error registering user:", err.message);
        return res.status(500).send({ error: err.message });
      }

      console.log(`User ${username} registered successfully.`);
      return res.status(201).send({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Error hashing password:", error.message);
    return res.status(500).send({ error: "Error hashing password" });
  }
});

// Log in a user
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(`Attempting to log in user with username: ${username}`);

  db.getUserByUsername(username, async (err, user) => {
    if (err) {
      console.error("Error finding user by username:", err.message);
      return res.status(500).send({ error: err.message });
    }

    if (!user) {
      console.log(`User with username ${username} not found.`);
      return res.status(401).send({ error: "Invalid credentials" });
    }

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(
        `Password match status for user ${username}: ${passwordMatch}`,
      );

      if (!passwordMatch) {
        console.log(`Invalid credentials for user ${username}`);
        return res.status(401).send({ error: "Invalid credentials" });
      }

      console.log(`User ${username} logged in successfully.`);
      req.session.userId = user.id;
      return res.send({ message: "Login successful", authToken: req.session.userId });
    } catch (error) {
      console.error("Error comparing password:", error.message);
      return res.status(500).send({ error: "Error comparing password" });
    }
  });
});

// Middleware to authenticate user using authToken
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Not authenticated" });
  }

  const authToken = authHeader.split(" ")[1];
  if (!authToken) {
    return res.status(401).send({ error: "Not authenticated" });
  }

  db.getUserById(authToken, (err, user) => {
    if (err || !user) {
      return res.status(401).send({ error: "Not authenticated" });
    }

    req.user = user;
    next();
  });
};

// Get the current user's profile
router.get("/profile", authenticateUser, (req, res) => {
  console.log(`Returning profile for user ID ${req.user.id}`);
  return res.send(req.user);
});

// Update the current user's profile
router.put("/profile", authenticateUser, (req, res) => {
  const { username, email, currentPassword, newPassword } = req.body;

  if (!currentPassword) {
    console.log("Current password not provided.");
    return res.status(400).send({ error: "Current password is required" });
  }

  console.log(
    `Attempting to update profile for user ID: ${req.user.id}`,
  );

  db.getUserById(req.user.id, async (err, user) => {
    if (err) {
      console.error("Error fetching user for profile update:", err.message);
      return res.status(500).send({ error: err.message });
    }

    if (!user) {
      console.log(`User with ID ${req.user.id} not found.`);
      return res.status(404).send({ error: "User not found" });
    }

    try {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      console.log(
        `Password match status for user ID ${req.user.id}: ${passwordMatch}`,
      );

      if (!passwordMatch) {
        console.log(
          `Incorrect current password for user ID ${req.user.id}`,
        );
        return res.status(401).send({ error: "Current password is incorrect" });
      }

      const hashedPassword = newPassword
        ? await bcrypt.hash(newPassword, 10)
        : user.password;

      console.log(
        `Password hashed successfully for user ID ${req.user.id}`,
      );

      db.updateUserProfile(
        req.user.id,
        username,
        email,
        hashedPassword,
        (err, result) => {
          if (err) {
            console.error("Error updating user profile:", err.message);
            return res.status(500).send({ error: err.message });
          }

          console.log(
            `User profile for ID ${req.user.id} updated successfully.`,
          );
          return res.send({ message: "Profile updated successfully" });
        },
      );
    } catch (error) {
      console.error("Error comparing password:", error.message);
      return res.status(500).send({ error: "Error comparing password" });
    }
  });
});

// Log out the current user
router.post("/logout", (req, res) => {
  console.log(
    `Attempting to log out user with session ID: ${req.session.userId}`,
  );

  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err.message);
      return res.status(500).send({ error: err.message });
    }

    console.log("User logged out successfully.");
    return res.send({ message: "Logout successful" });
  });
});

module.exports = router;
