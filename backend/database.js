const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE lessons (id INTEGER PRIMARY KEY, title TEXT, description TEXT, date TEXT, teacher TEXT, language TEXT, explanation TEXT, content TEXT)");

  const stmt = db.prepare("INSERT INTO lessons (title, description, date, teacher, language, explanation, content) VALUES (?, ?, ?, ?, ?, ?, ?)");
  stmt.run(
    "Variables and Their Types in Python", 
    "In this lesson, we will explore how to declare variables in Python, understand different data types, and learn how to work with them effectively to store and manipulate data.", 
    "2025-02-15", 
    "Anatolii Maslov", 
    "Python", 
    "In Python, variables store data values and are assigned using the = operator. Python automatically infers the data type, such as integers, floats, strings, and booleans. Its dynamic typing system allows you to create variables without explicitly declaring their type.",
    "In Python, variables are used to store data values. A variable is essentially a name that refers to a specific piece of data. You can assign values to variables using the assignment operator (=), and the type of data a variable holds can be inferred automatically by Python.\n\nPython has various built-in data types, including integers (whole numbers), floats (decimal numbers), strings (text), and booleans (True or False values). Each data type has specific characteristics that determine how they can be used and manipulated.\n\nOne of Python's strengths is its dynamic typing system, meaning you don't need to explicitly declare the type of a variable when you create it. Python will automatically assign the appropriate type based on the value assigned. For example:\n\n\n<pre><code>x = 10  # x is an integer\ny = 3.14  # y is a float\nname = \"Alice\"  # name is a string\nis_active = True  # is_active is a boolean</code></pre>\n\nIt’s important to note that variables in Python are case-sensitive, so myVar and myvar would be treated as different variables.\n\nUnderstanding variables and their types is fundamental in Python, as they allow you to store and manipulate data in a program effectively."
  );
  stmt.run(
    "Introduction to Arrays in Java", 
    "Working with Data Collections in Java", 
    "2025-02-16", 
    "Skadi Baumgarte", 
    "Java", 
    "This lesson covers the basics of using arrays in Java. You will learn how to declare, initialize, and populate arrays, as well as how to access elements by index. The lesson also includes loops for iterating through elements and practical examples of using arrays to solve problems.",
    "Arrays in Java are used to store multiple values in a single variable, instead of declaring separate variables for each value. An array is a collection of variables of the same type that are stored in contiguous memory locations.\n\nTo declare an array in Java, you use the following syntax:\n\n\nint[] numbers;\n\nnumbers = new int[5];\n\nYou can also initialize an array at the time of declaration:\n\nint[] numbers = {1, 2, 3, 4, 5};\n\nElements in an array are accessed using their index, starting from 0. For example:\n\nSystem.out.println(numbers[0]); // Outputs 1\n\nArrays provide efficient ways to store and manipulate collections of data, making them essential for many programming tasks."
  );
  stmt.run(
    "Functions in C: Declaration and Invocation", 
    "Structuring Code with Functions", 
    "2025-02-17", 
    "Diego Carrera", 
    "C", 
    "This lesson introduces the fundamentals of functions in C. You will learn how to declare and define functions, pass arguments, and return values. The lesson also covers best practices for organizing code using functions to enhance readability and maintainability.",
    "Functions in C allow you to structure code into reusable blocks, improving maintainability and readability. A function in C consists of a declaration, a definition, and an invocation.\n\nTo declare a function, you specify its return type, name, and parameters:\n\n\nint add(int a, int b);\n\nThe function definition provides the implementation:\n\nint add(int a, int b) {\n    return a + b;\n}\n\nTo call (invoke) a function, use its name and pass arguments:\n\nint result = add(5, 3); // result is 8\n\nFunctions allow modular programming, making code more organized and easier to debug."  
  );
  stmt.finalize();
});

module.exports = db;