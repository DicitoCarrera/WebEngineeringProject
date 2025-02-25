const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Create the users table if it doesn't exist
db.serialize(() => {
  console.log("Initializing users database...");

  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)",
    (err) => {
      if (err) {
        console.error("Error creating users table:", err.message);
      } else {
        console.log("Users table created or already exists.");
      }
    },
  );
});

// Insert a new user into the database
function insertUser(username, email, password, callback) {
  console.log(`Attempting to insert a new user: ${username}`);

  const stmt = db.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
  );

  stmt.run([username, email, password], function (err) {
    if (err) {
      console.error("Error inserting new user:", err.message);
      return callback(err);
    }

    console.log(
      `User ${username} inserted successfully. User ID: ${this.lastID}`,
    );
    callback(null);
  });

  stmt.finalize();
}

// Retrieve a user by their username
function getUserByUsername(username, callback) {
  console.log(`Attempting to retrieve user with username: ${username}`);

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.error("Error fetching user by username:", err.message);
      return callback(err);
    }

    if (!row) {
      console.log(`User with username ${username} not found.`);
      return callback(null, null); // No user found
    }

    console.log(`User found with username: ${username}. Returning user data.`);
    callback(null, row);
  });
}

// Retrieve a user by their ID
function getUserById(userId, callback) {
  console.log(`Attempting to retrieve user with ID: ${userId}`);

  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
    if (err) {
      console.error("Error fetching user by ID:", err.message);
      return callback(err);
    }

    if (!row) {
      console.log(`User with ID ${userId} not found.`);
      return callback(null, null); // No user found
    }

    console.log(`User found with ID: ${userId}. Returning user data.`);
    callback(null, row);
  });
}

// Update a user's profile information
function updateUserProfile(userId, username, email, password, callback) {
  console.log(`Attempting to update user profile with ID: ${userId}`);

  const stmt = db.prepare(
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
  );

  stmt.run([username, email, password, userId], function (err) {
    if (err) {
      console.error("Error updating user profile:", err.message);
      return callback(err);
    }

    if (this.changes === 0) {
      console.log(
        `No changes were made. User with ID ${userId} not found or no updates.`,
      );
      return callback(null, { message: "No changes made" });
    }

    console.log(`User profile with ID ${userId} updated successfully.`);
    callback(null, { message: "User profile updated successfully" });
  });

  stmt.finalize();
}

// Delete a user by their ID
function deleteUserById(userId, callback) {
  console.log(`Attempting to delete user with ID: ${userId}`);

  const stmt = db.prepare("DELETE FROM users WHERE id = ?");

  stmt.run([userId], function (err) {
    if (err) {
      console.error("Error deleting user:", err.message);
      return callback(err);
    }

    if (this.changes === 0) {
      console.log(`No user found with ID ${userId}. No deletion occurred.`);
      return callback(null, { message: "User not found" });
    }

    console.log(`User with ID ${userId} deleted successfully.`);
    callback(null, { message: "User deleted successfully" });
  });

  stmt.finalize();
}

// Export all functions for use in other modules
module.exports = {
  insertUser,
  getUserByUsername,
  getUserById,
  updateUserProfile,
  deleteUserById,
};
