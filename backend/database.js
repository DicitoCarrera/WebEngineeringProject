const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE lessons (id INTEGER PRIMARY KEY, title TEXT, description TEXT, date TEXT, teacher TEXT, language TEXT, explanation TEXT)");

  const stmt = db.prepare("INSERT INTO lessons (title, description, date, teacher, language, explanation) VALUES (?, ?, ?, ?, ?, ?)");
  stmt.run("Variables and Their Types in Python", "In this lesson, we will explore how to declare variables in Python, understand different data types, and learn how to work with them effectively to store and manipulate data.", "2025-02-15", "Anatolii Maslov", "Python", "In Python, variables store data values and are assigned using the = operator. Python automatically infers the data type, such as integers, floats, strings, and booleans. Its dynamic typing system allows you to create variables without explicitly declaring their type.");
  stmt.run("Introduction to Arrays in Java", "Working with Data Collections in Java", "2025-02-16", "Skadi Baumgarte", "Java", "This lesson covers the basics of using arrays in Java. You will learn how to declare, initialize, and populate arrays, as well as how to access elements by index. The lesson also includes loops for iterating through elements and practical examples of using arrays to solve problems.");
  stmt.run("Functions in C: Declaration and Invocation", "Structuring Code with Functions", "2025-02-17", "Diego Carrera", "C", "This lesson introduces the fundamentals of functions in C. You will learn how to declare and define functions, pass arguments, and return values. The lesson also covers best practices for organizing code using functions to enhance readability and maintainability.");
  stmt.finalize();
});

module.exports = db;