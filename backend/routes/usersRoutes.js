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
      return res.send({ message: "Login successful" });
    } catch (error) {
      console.error("Error comparing password:", error.message);
      return res.status(500).send({ error: "Error comparing password" });
    }
  });
});

// Get the current user's profile
router.get("/profile", (req, res) => {
  if (!req.session.userId) {
    console.log("User is not authenticated.");
    return res.status(401).send({ error: "Not authenticated" });
  }

  console.log(`Fetching profile for user with ID: ${req.session.userId}`);

  db.getUserById(req.session.userId, (err, user) => {
    if (err) {
      console.error("Error fetching user profile:", err.message);
      return res.status(500).send({ error: err.message });
    }

    if (!user) {
      console.log(`User with ID ${req.session.userId} not found.`);
      return res.status(404).send({ error: "User not found" });
    }

    console.log(`Returning profile for user ID ${req.session.userId}`);
    return res.send(user);
  });
});

// Update the current user's profile
router.put("/profile", (req, res) => {
  if (!req.session.userId) {
    console.log("User is not authenticated.");
    return res.status(401).send({ error: "Not authenticated" });
  }

  const { username, email, currentPassword, newPassword } = req.body;

  if (!currentPassword) {
    console.log("Current password not provided.");
    return res.status(400).send({ error: "Current password is required" });
  }

  console.log(
    `Attempting to update profile for user ID: ${req.session.userId}`,
  );

  db.getUserById(req.session.userId, async (err, user) => {
    if (err) {
      console.error("Error fetching user for profile update:", err.message);
      return res.status(500).send({ error: err.message });
    }

    if (!user) {
      console.log(`User with ID ${req.session.userId} not found.`);
      return res.status(404).send({ error: "User not found" });
    }

    try {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      console.log(
        `Password match status for user ID ${req.session.userId}: ${passwordMatch}`,
      );

      if (!passwordMatch) {
        console.log(
          `Incorrect current password for user ID ${req.session.userId}`,
        );
        return res.status(401).send({ error: "Current password is incorrect" });
      }

      const hashedPassword = newPassword
        ? await bcrypt.hash(newPassword, 10)
        : user.password;

      console.log(
        `Password hashed successfully for user ID ${req.session.userId}`,
      );

      db.updateUserProfile(
        req.session.userId,
        username,
        email,
        hashedPassword,
        (err, result) => {
          if (err) {
            console.error("Error updating user profile:", err.message);
            return res.status(500).send({ error: err.message });
          }

          console.log(
            `User profile for ID ${req.session.userId} updated successfully.`,
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
