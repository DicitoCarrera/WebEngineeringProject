const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const { getDB } = require("../database/db"); // Import database helper function

// Create a new lesson
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const lessonsCollection = db.collection("lessons");
    const newLesson = req.body;
    const result = await lessonsCollection.insertOne(newLesson);
    res.status(201).json(result.ops[0]); // Return the newly created lesson
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all lessons
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const lessonsCollection = db.collection("lessons");
    const lessons = await lessonsCollection.find().toArray();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific lesson by ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const lessonsCollection = db.collection("lessons");
    const lessonId = req.params.id;
    const lesson = await lessonsCollection.findOne({
      _id: new ObjectId(lessonId),
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a lesson by ID
router.put("/:id", async (req, res) => {
  try {
    const db = getDB();
    const lessonsCollection = db.collection("lessons");
    const lessonId = req.params.id;
    const updatedLesson = req.body;

    const result = await lessonsCollection.updateOne(
      { _id: new ObjectId(lessonId) },
      { $set: updatedLesson },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const updated = await lessonsCollection.findOne({
      _id: new ObjectId(lessonId),
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a lesson by ID
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const lessonsCollection = db.collection("lessons");
    const lessonId = req.params.id;

    const result = await lessonsCollection.deleteOne({
      _id: new ObjectId(lessonId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
