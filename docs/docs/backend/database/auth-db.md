# Auth DB

## Overview

`usersDB.js` is a utility module that encapsulates all database operations for
managing user-related data in a SQLite database. It contains functions for
creating a new user, fetching a user by username or ID, and updating user
profile information. All database interactions are abstracted into these
functions, allowing the `usersRoutes.js` file to focus solely on HTTP handling.
Here is the table for the `users` as requested:

## Database Table Schema

The `users` table is defined as follows:

| Column Name | Data Type | Description                                   |
| ----------- | --------- | --------------------------------------------- |
| `id`        | INTEGER   | Primary key. Unique identifier for each user. |
| `username`  | TEXT      | The username of the user, used for login.     |
| `email`     | TEXT      | The email address of the user.                |
| `password`  | TEXT      | The hashed password for the user.             |

## **Functions**

### 1. **`createUser`**

#### **Description**

Creates a new user record in the database with the provided username, email, and
password

#### **Parameters**

- `username` (string): The username of the user to be created.
- `email` (string): The email address of the user to be created.
- `password` (string): The hashed password of the user to be created.
- `callback` (function): The callback function to be invoked after the operation
  completes. It receives two arguments:
  - `err`: The error message, if any, encountered during the operation.
  - `userId`: The `id` of the newly created user.

#### **Example Usage**

```js
usersDB.createUser(
  "johndoe",
  "john@example.com",
  hashedPassword,
  (err, userId) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`User created with ID: ${userId}`);
  },
);
```

### 2. **`getUserByUsername`**

#### **Description**

Retrieves a user from the database by their username.

#### **Parameters**

- `username` (string): The username of the user to retrieve.
- `callback` (function): The callback function to be invoked after the operation
  completes. It receives two arguments:
  - `err`: The error message, if any, encountered during the operation.
  - `user`: The user object containing the user's data (`id`, `username`,
    `email`, `password`), or `null` if no user was found.

#### **Example Usage**

```js
usersDB.getUserByUsername("johndoe", (err, user) => {
  if (err) {
    console.error(err);
    return;
  }
  if (!user) {
    console.log("User not found");
    return;
  }
  console.log(user); // User object will be logged
});
```

### 3. **`getUserById`**

#### **Description**

Retrieves a user from the database by their unique `id`.

#### **Parameters**

- `id` (integer): The unique ID of the user to retrieve.
- `callback` (function): The callback function to be invoked after the operation
  completes. It receives two arguments:
  - `err`: The error message, if any, encountered during the operation.
  - `user`: The user object containing the user's data (`id`, `username`,
    `email`, `password`), or `null` if no user was found.

#### **Example Usage**

```js
usersDB.getUserById(1, (err, user) => {
  if (err) {
    console.error(err);
    return;
  }
  if (!user) {
    console.log("User not found");
    return;
  }
  console.log(user); // User object will be logged
});
```

### 4. **`updateUserProfile`**

#### **Description**

Updates a user's profile information (username, email, password) in the database

#### **Parameters**

- `id` (integer): The unique ID of the user whose profile is to be updated.
- `username` (string): The new username to set.
- `email` (string): The new email to set.
- `password` (string): The new hashed password to set.
- `callback` (function): The callback function to be invoked after the operation
  completes. It receives two arguments:
  - `err`: The error message, if any, encountered during the operation.
  - `changes`: The number of rows affected by the update (0 if no rows were
    updated, which usually means the user was not found).

#### **Example Usage**

```js
usersDB.updateUserProfile(
  1,
  "newusername",
  "newemail@example.com",
  hashedPassword,
  (err, changes) => {
    if (err) {
      console.error(err);
      return;
    }
    if (changes === 0) {
      console.log("User not found");
      return;
    }
    console.log("Profile updated successfully");
  },
);
```

---

## **Error Handling**

- Each function in `usersDB.js` passes any encountered errors through to the
  callback function in the form of an `err` argument. If no error occurs, the
  callback will handle the result of the operation (e.g., newly created user ID,
  updated profile changes).

- Common errors could include:
  - Database connection issues
  - Integrity constraint violations (e.g., attempting to insert a duplicate
    username or email)
  - User not found errors when querying by ID or username

---

## **Dependencies**

- **`sqlite3`**: This module is used to interact with the SQLite database,
  providing methods for querying and modifying the database.

```bash
npm install sqlite3
```

---

## **Exported Functions**

The following functions are available for use:

- `createUser`
- `getUserByUsername`
- `getUserById`
- `updateUserProfile`

These functions allow interaction with the `users` table in the database. The
function signatures have been designed to use callback-based asynchronous
execution for handling results.

---

## **Usage Example**

Here is an example of how to use the `usersDB.js` module in your Express routes:

```js
const usersDB = require("../database/users/usersDB");

// Example usage of createUser function
usersDB.createUser(
  "johndoe",
  "john@example.com",
  hashedPassword,
  (err, userId) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`User created with ID: ${userId}`);
  },
);

// Example usage of getUserByUsername function
usersDB.getUserByUsername("johndoe", (err, user) => {
  if (err) {
    console.error(err);
    return;
  }
  if (!user) {
    console.log("User not found");
    return;
  }
  console.log(user);
});
```

---

## **Summary**

`usersDB.js` provides a set of functions that facilitate all interactions with
the user-related database tables. This abstraction helps separate the database
logic from the HTTP handling in `usersRoutes.js`, making the code more
maintainable and modular.
