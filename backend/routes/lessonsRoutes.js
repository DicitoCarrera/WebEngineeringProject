const express = require("express");
const router = express.Router();
const db = require("../database/lessons/lessonsDB"); // Ensure this path is correct

// Create a new lesson
router.post("/", (req, res) => {
  const { title, description, date, teacher, language, explanation, content } = req.body;

  const stmt = db.prepare(
    "INSERT INTO lessons (title, description, date, teacher, language, explanation, content) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  stmt.run(
    title,
    description,
    date,
    teacher,
    language,
    explanation,
    content,
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).json({ id: this.lastID, message: "Lesson created successfully" });
    }
  );
  stmt.finalize();
});

// Get all lessons
router.get("/", (req, res) => {
  db.all("SELECT * FROM lessons", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

// Get a specific lesson by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM lessons WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!row) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json(row);
  });
});

// Update a specific lesson by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, date, teacher, language, explanation, content } = req.body;

  const stmt = db.prepare(
    "UPDATE lessons SET title = ?, description = ?, date = ?, teacher = ?, language = ?, explanation = ?, content = ? WHERE id = ?"
  );

  stmt.run(title, description, date, teacher, language, explanation, content, id, function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json({ message: "Lesson updated successfully" });
  });
  stmt.finalize();
});

// Delete a specific lesson by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare("DELETE FROM lessons WHERE id = ?");

  stmt.run(id, function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json({ message: "Lesson deleted successfully" });
  });
  stmt.finalize();
});

module.exports = router;
