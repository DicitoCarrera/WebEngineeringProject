# Lessons DB

## Overview

The `lessonsDB.js` file encapsulates all the database operations related to the
lessons in the application. It provides functions for creating, retrieving,
updating, and deleting lessons in the database. This file abstracts away the
direct interaction with the database, allowing the routes to only focus on
handling HTTP requests and responses.

This file uses SQLite as the database engine, and all lessons are stored in an
in-memory SQLite database. It includes a `lessons` table that stores information
about the lessons, including title, description, date, teacher, language,
explanation, and content.

## Database Table Schema

The `lessons` table is defined as follows:

| Column Name   | Data Type | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| `id`          | INTEGER   | Primary key. Unique identifier for each lesson.       |
| `title`       | TEXT      | The title of the lesson.                              |
| `description` | TEXT      | A brief description of the lesson.                    |
| `date`        | TEXT      | The date when the lesson is scheduled or occurred.    |
| `teacher`     | TEXT      | The teacher or instructor associated with the lesson. |
| `language`    | TEXT      | The programming language or subject of the lesson.    |
| `explanation` | TEXT      | An explanation of the lesson's content.               |
| `content`     | TEXT      | Detailed content or material for the lesson.          |

## Functions

### 1. `createLesson`

#### Description

This function inserts a new lesson into the database. It takes the lesson
details as input and inserts them into the `lessons` table.

#### Parameters

- `title` (string): The title of the lesson.
- `description` (string): A brief description of the lesson.
- `date` (string): The date of the lesson.
- `teacher` (string): The name of the teacher or instructor.
- `language` (string): The programming language or subject of the lesson.
- `explanation` (string): A short explanation of the lesson's content.
- `content` (string): The full content or material for the lesson.
- `callback` (function): A callback function that handles the result or error.
  It receives two arguments:
  - `err` (Error): An error object if an error occurs during the database
    operation.
  - `lessonId` (number): The `id` of the newly created lesson.

#### Usage

```js
lessonsDB.createLesson(
  title,
  description,
  date,
  teacher,
  language,
  explanation,
  content,
  (err, lessonId) => {
    if (err) {
      console.log("Error creating lesson:", err);
      return;
    }
    console.log(`Lesson created with ID: ${lessonId}`);
  },
);
```

### 2. `getAllLessons`

#### Description

This function retrieves all lessons from the database.

#### Parameters

- `callback` (function): A callback function that handles the result or error.
  It receives two arguments:
  - `err` (Error): An error object if an error occurs during the database
    operation.
  - `rows` (Array): An array of lesson objects, each representing a lesson in
    the `lessons` table.

#### Usage

```js
lessonsDB.getAllLessons((err, rows) => {
  if (err) {
    console.log("Error fetching lessons:", err);
    return;
  }
  console.log("All lessons:", rows);
});
```

### 3. `getLessonById`

#### Description

This function retrieves a specific lesson by its `id`.

#### Parameters

- `id` (number): The ID of the lesson to retrieve.
- `callback` (function): A callback function that handles the result or error.
  It receives two arguments:
  - `err` (Error): An error object if an error occurs during the database
    operation.
  - `row` (Object): A lesson object representing the lesson with the specified
    `id`.

#### Usage

```js
lessonsDB.getLessonById(lessonId, (err, row) => {
  if (err) {
    console.log("Error fetching lesson:", err);
    return;
  }
  console.log("Lesson found:", row);
});
```

### 4. `updateLesson`

#### Description

This function updates a lesson in the database based on the lesson's `id`. It
takes new values for the lesson and updates the corresponding fields in the
`lessons` table.

#### Parameters

- `id` (number): The ID of the lesson to update.
- `title` (string): The new title of the lesson.
- `description` (string): The new description of the lesson.
- `date` (string): The new date for the lesson.
- `teacher` (string): The new teacher's name.
- `language` (string): The new language or subject of the lesson.
- `explanation` (string): The new explanation of the lesson.
- `content` (string): The new content for the lesson.
- `callback` (function): A callback function that handles the result or error.
  It receives two arguments:
  - `err` (Error): An error object if an error occurs during the database
    operation.
  - `changes` (number): The number of rows affected by the update. If `changes`
    is `0`, the lesson was not found.

#### Usage

```js
lessonsDB.updateLesson(
  lessonId,
  title,
  description,
  date,
  teacher,
  language,
  explanation,
  content,
  (err, changes) => {
    if (err) {
      console.log("Error updating lesson:", err);
      return;
    }
    if (changes === 0) {
      console.log("Lesson not found.");
      return;
    }
    console.log("Lesson updated successfully");
  },
);
```

### 5. `deleteLesson`

#### Description

This function deletes a lesson from the database by its `id`.

#### Parameters

- `id` (number): The ID of the lesson to delete.
- `callback` (function): A callback function that handles the result or error.
  It receives two arguments:
  - `err` (Error): An error object if an error occurs during the database
    operation.
  - `changes` (number): The number of rows affected by the deletion. If
    `changes` is `0`, the lesson was not found.

#### Usage

```js
lessonsDB.deleteLesson(lessonId, (err, changes) => {
  if (err) {
    console.log("Error deleting lesson:", err);
    return;
  }
  if (changes === 0) {
    console.log("Lesson not found.");
    return;
  }
  console.log("Lesson deleted successfully");
});
```

## Conclusion

The `lessonsDB.js` file encapsulates all database-related operations for
managing lessons in the application. By moving the database logic into a
separate module, we achieve a cleaner separation of concerns between the HTTP
routing and the database interaction. This makes the codebase more modular,
maintainable, and testable.
