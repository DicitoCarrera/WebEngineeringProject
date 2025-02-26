# Lessons Routes

This document provides an overview of the lessons routes in the application.
These routes handle CRUD operations (Create, Read, Update, and Delete) for
managing lessons in the database. The routes are defined using Express.js and
interact with a SQLite database.

## Routes Overview

The routes in this section are part of the **lessonsRoutes** and are responsible
for managing lessons in the system. The following operations are supported:

- **POST /lessons**: Create a new lesson.
- **GET /lessons**: Retrieve all lessons.
- **GET /lessons/:id**: Retrieve a specific lesson by ID.
- **PUT /lessons/:id**: Update a specific lesson by ID.
- **DELETE /lessons/:id**: Delete a specific lesson by ID.

## Route Details

### 1. **POST /lessons**

Creates a new lesson by accepting `title`, `description`, `date`, `teacher`,
`language`, `explanation`, and `content`. This route inserts the provided lesson
data into the database.

#### Request

- **Method**: `POST`
- **Body**:
  - `title`: The title of the lesson (string).
  - `description`: A brief description of the lesson (string).
  - `date`: The date of the lesson (string, e.g., "YYYY-MM-DD").
  - `teacher`: The name of the teacher conducting the lesson (string).
  - `language`: The language in which the lesson is taught (string).
  - `explanation`: Explanation or summary of the lesson (string).
  - `content`: The content of the lesson (string).

#### Logic

1. The provided lesson data is inserted into the `lessons` table in the
   database.

#### Response

- **Status**: `201 Created` if successful.
- **Body**:
  - `id`: The ID of the newly created lesson.
  - `message`: Success message indicating the lesson was created.

#### Example

```json
{
  "id": 1,
  "message": "Lesson created successfully"
}
```

#### Error Responses

- **500 Internal Server Error**: If an error occurs while interacting with the
  database.

---

### 2. **GET /lessons**

Retrieves all lessons from the database. This route returns a list of lessons.

#### Request

- **Method**: `GET`

#### Logic

1. The route retrieves all records from the `lessons` table.

#### Response

- **Status**: `200 OK` if successful.
- **Body**: A list of all lessons.

#### Example

```json
[
  {
    "id": 1,
    "title": "Lesson 1",
    "description": "Introduction to Node.js",
    "date": "2025-02-25",
    "teacher": "John Doe",
    "language": "English",
    "explanation": "This lesson covers basic Node.js concepts.",
    "content": "Content of the lesson"
  },
  {
    "id": 2,
    "title": "Lesson 2",
    "description": "Advanced Node.js",
    "date": "2025-03-01",
    "teacher": "Jane Smith",
    "language": "English",
    "explanation": "This lesson dives deep into advanced Node.js topics.",
    "content": "Content of the lesson"
  }
]
```

#### Error Responses

- **500 Internal Server Error**: If an error occurs while retrieving lessons
  from the database.

---

### 3. **GET /lessons/:id**

Retrieves a specific lesson by its ID. This route returns the lesson data for a
given ID.

#### Request

- **Method**: `GET`
- **Parameters**:
  - `id`: The ID of the lesson to retrieve (integer).

#### Logic

1. The route looks for the lesson in the `lessons` table by its `id`.

#### Response

- **Status**: `200 OK` if successful.
- **Body**: The lesson data.

#### Example

```json
{
  "id": 1,
  "title": "Lesson 1",
  "description": "Introduction to Node.js",
  "date": "2025-02-25",
  "teacher": "John Doe",
  "language": "English",
  "explanation": "This lesson covers basic Node.js concepts.",
  "content": "Content of the lesson"
}
```

#### Error Responses

- **404 Not Found**: If the lesson with the specified ID does not exist.
- **500 Internal Server Error**: If an error occurs while retrieving the lesson
  from the database.

---

### 4. **PUT /lessons/:id**

Updates an existing lesson by its ID. This route allows you to modify the
`title`, `description`, `date`, `teacher`, `language`, `explanation`, and
`content` of a lesson.

#### Request

- **Method**: `PUT`
- **Parameters**:
  - `id`: The ID of the lesson to update (integer).
- **Body**:
  - `title`: The new title of the lesson (string).
  - `description`: The new description of the lesson (string).
  - `date`: The new date of the lesson (string, e.g., "YYYY-MM-DD").
  - `teacher`: The new teacher's name (string).
  - `language`: The new language of the lesson (string).
  - `explanation`: The new explanation of the lesson (string).
  - `content`: The new content of the lesson (string).

#### Logic

1. The route looks for the lesson in the `lessons` table by its `id`.
2. If the lesson is found, it updates the lesson with the provided details.

#### Response

- **Status**: `200 OK` if successful.
- **Body**:
  - `message`: Success message indicating the lesson was updated.

#### Example

```json
{
  "message": "Lesson updated successfully"
}
```

#### Error Responses

- **404 Not Found**: If the lesson with the specified ID does not exist.
- **500 Internal Server Error**: If an error occurs while updating the lesson in
  the database.

---

### 5. **DELETE /lessons/:id**

Deletes a specific lesson by its ID. This route removes the lesson from the
database.

#### Request

- **Method**: `DELETE`
- **Parameters**:
  - `id`: The ID of the lesson to delete (integer).

#### Logic

1. The route looks for the lesson in the `lessons` table by its `id`.
2. If the lesson is found, it is deleted from the table.

#### Response

- **Status**: `200 OK` if successful.
- **Body**:
  - `message`: Success message indicating the lesson was deleted.

#### Example

```json
{
  "message": "Lesson deleted successfully"
}
```

#### Error Responses

- **404 Not Found**: If the lesson with the specified ID does not exist.
- **500 Internal Server Error**: If an error occurs while deleting the lesson
  from the database.

---

## Conclusion

These routes provide essential CRUD operations for managing lessons in the
application. They enable users to create, retrieve, update, and delete lesson
data in a simple and efficient manner. The interactions with the database are
handled using prepared statements to prevent SQL injection and ensure data
integrity.
