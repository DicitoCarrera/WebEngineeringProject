# Authentication and Profile Routes

This document provides an overview of the authentication and profile management
routes in the application. These routes handle user registration, login, profile
retrieval and updating, and user logout. The routes are defined using Express.js
and interact with a SQLite database.

## Routes Overview

The routes in this section are part of the **usersRoutes** and are responsible
for user management. The following operations are supported:

- **POST /register**: Registers a new user.
- **POST /login**: Logs in a user.
- **GET /profile**: Retrieves the authenticated user's profile.
- **PUT /profile**: Updates the authenticated user's profile.
- **POST /logout**: Logs out the user.

## Route Details

### 1. **POST /register**

Registers a new user by accepting a `username`, `email`, and `password`. The
password is hashed before being stored in the database.

#### Request

- **Method**: `POST`

- **Body**:
  - `username`: The username of the user (string).
  - `email`: The email address of the user (string).
  - `password`: The password chosen by the user (string).

#### Logic

1. The password is hashed using bcrypt before storing it in the database.
2. The user details are inserted into the `users` table.

#### Response

- **Status**: `201 Created` if successful.
- **Body**:
  - `message`: Success message indicating user registration was successful.

#### Example

```json
{
  "message": "User registered successfully"
}
```

#### Error Responses

- **500 Internal Server Error**: If an error occurs while interacting with the
  database.

---

### 2. **POST /login**

Logs in a user by accepting a `username` and `password`. The password is
compared to the stored hashed password in the database.

#### Request

- **Method**: `POST`
- **Body**:
  - `username`: The username of the user (string).
  - `password`: The password provided by the user (string).

#### Logic

1. The system looks up the user by `username` in the database.
2. The password is compared using bcrypt to ensure it matches the stored hash.
3. If successful, the user's session is created.

#### Response

- **Status**: `200 OK` if successful.
- **Body**:
  - `message`: Success message indicating login was successful.

#### Example

```json
{
  "message": "Login successful"
}
```

#### Error Responses

- **401 Unauthorized**: If the credentials are invalid.
- **500 Internal Server Error**: If a database error occurs.

---

### 3. **GET /profile**

Retrieves the authenticated user's profile information. This route requires the
user to be logged in (i.e., a valid session exists).

#### Request

- **Method**: `GET`
- **Headers**:
  - `Authorization`: Required. The user must be logged in with a valid session.

#### Logic

1. The route checks if the user is authenticated by verifying the existence of a
   `userId` in the session.
2. If the user is authenticated, their profile information is retrieved from the
   `users` table in the database.

#### Response

- **Status**: `200 OK` if successful.
- **Body**: The profile details of the authenticated user.

#### Example

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "johndoe@example.com"
}
```

#### Error Responses

- **401 Unauthorized**: If the user is not authenticated.
- **404 Not Found**: If the user does not exist in the database.
- **500 Internal Server Error**: If an error occurs while retrieving the user
  from the database.

---

### 4. **PUT /profile**

Updates the authenticated user's profile. This route allows users to update
their `username`, `email`, and password. The current password is required for
changing the password.

#### Request

- **Method**: `PUT`
- **Body**:
  - `username`: The new username for the user (string).
  - `email`: The new email address for the user (string).
  - `currentPassword`: The current password for authentication (string).
  - `newPassword`: The new password for the user (optional, string).

#### Logic

1. The route verifies that the user is authenticated by checking the `userId` in
   the session.
2. The current password is verified against the stored password.
3. If the password is correct, the profile (username, email, and password) is
   updated.

#### Response

- **Status**: `200 OK` if successful.
- **Body**:
  - `message`: Success message indicating the profile was updated.

#### Example

```json
{
  "message": "Profile updated"
}
```

#### Error Responses

- **401 Unauthorized**: If the user is not authenticated.
- **400 Bad Request**: If the current password is not provided.
- **404 Not Found**: If the user is not found in the database.
- **401 Unauthorized**: If the current password is incorrect.
- **500 Internal Server Error**: If an error occurs while updating the profile
  in the database.

---

### 5. **POST /logout**

Logs out the authenticated user by destroying the session.

#### Request

- **Method**: `POST`

#### Logic

1. The session is destroyed, effectively logging the user out.

#### Response

- **Status**: `200 OK` if successful.
- **Body**:
  - `message`: Success message indicating the user has been logged out.

#### Example

```json
{
  "message": "Logout successful"
}
```

#### Error Responses

- **500 Internal Server Error**: If an error occurs while destroying the
  session.

---

## Conclusion

These routes handle core authentication functionality, including user
registration, login, profile management, and logout. They ensure secure and
efficient handling of user data using bcrypt for password hashing and secure
session management.
