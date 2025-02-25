const express = require("express");
const lessonsDB = require("../database/lessons/lessonsDB");
const router = express.Router();

// Route to get all lessons
router.get("/", (req, res) => {
  console.log("Received GET request to fetch all lessons.");

  lessonsDB.getAllLessons((err, lessons) => {
    if (err) {
      console.error("Error fetching lessons:", err.message);
      return res.status(500).send({ error: "Failed to retrieve lessons." });
    }

    if (lessons.length === 0) {
      console.log("No lessons found in the database.");
      return res.status(404).send({ message: "No lessons found." });
    }

    console.log(`Found ${lessons.length} lessons. Sending response...`);
    res.status(200).json(lessons);
  });
});

// Route to get a single lesson by ID
router.get("/lessons/:id", (req, res) => {
  const lessonId = req.params.id;
  console.log(`Received GET request to fetch lesson with ID: ${lessonId}`);

  lessonsDB.getLessonById(lessonId, (err, lesson) => {
    if (err) {
      console.error(`Error fetching lesson with ID ${lessonId}:`, err.message);
      return res.status(500).send({ error: "Failed to retrieve the lesson." });
    }

    if (!lesson) {
      console.log(`Lesson with ID ${lessonId} not found.`);
      return res.status(404).send({
        message: `Lesson with ID ${lessonId} not found.`,
      });
    }

    console.log(`Lesson with ID ${lessonId} found. Sending response...`);
    res.status(200).json(lesson);
  });
});

// Route to create a new lesson
router.post("/lessons", (req, res) => {
  const { title, description, date, teacher, language, explanation, content } =
    req.body;
  console.log(
    "Received POST request to create a new lesson with the following data:",
  );
  console.log({
    title,
    description,
    date,
    teacher,
    language,
    explanation,
    content,
  });

  if (
    !title || !description || !date || !teacher || !language || !explanation ||
    !content
  ) {
    console.log("Validation failed: Missing required fields.");
    return res.status(400).send({ error: "All fields are required." });
  }

  // Insert the new lesson into the database
  lessonsDB.insertLesson(
    title,
    description,
    date,
    teacher,
    language,
    explanation,
    content,
    (err) => {
      if (err) {
        console.error("Error inserting lesson into database:", err.message);
        return res.status(500).send({ error: "Failed to insert lesson." });
      }

      console.log("Lesson created successfully. Sending response...");
      res.status(201).send({ message: "Lesson created successfully." });
    },
  );
});

// Route to update a lesson by ID
router.put("/lessons/:id", (req, res) => {
  const lessonId = req.params.id;
  const { title, description, date, teacher, language, explanation, content } =
    req.body;

  console.log(`Received PUT request to update lesson with ID: ${lessonId}`);
  console.log("Updating lesson with the following data:");
  console.log({
    title,
    description,
    date,
    teacher,
    language,
    explanation,
    content,
  });

  if (
    !title || !description || !date || !teacher || !language || !explanation ||
    !content
  ) {
    console.log("Validation failed: Missing required fields.");
    return res.status(400).send({ error: "All fields are required." });
  }

  // Update the lesson in the database
  lessonsDB.updateLessonById(
    lessonId,
    title,
    description,
    date,
    teacher,
    language,
    explanation,
    content,
    (err) => {
      if (err) {
        console.error(
          `Error updating lesson with ID ${lessonId}:`,
          err.message,
        );
        return res.status(500).send({ error: "Failed to update lesson." });
      }

      console.log(
        `Lesson with ID ${lessonId} updated successfully. Sending response...`,
      );
      res.status(200).send({ message: "Lesson updated successfully." });
    },
  );
});

// Route to delete a lesson by ID
router.delete("/lessons/:id", (req, res) => {
  const lessonId = req.params.id;
  console.log(`Received DELETE request to delete lesson with ID: ${lessonId}`);

  // Delete the lesson from the database
  lessonsDB.deleteLessonById(lessonId, (err) => {
    if (err) {
      console.error(`Error deleting lesson with ID ${lessonId}:`, err.message);
      return res.status(500).send({ error: "Failed to delete lesson." });
    }

    console.log(
      `Lesson with ID ${lessonId} deleted successfully. Sending response...`,
    );
    res.status(200).send({ message: "Lesson deleted successfully." });
  });
});

module.exports = router;
