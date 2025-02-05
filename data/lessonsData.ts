// data/lessonsData.ts

export const lessons = {
  variables: {
    title: "Variables and Data Types",
    description:
      "Learn how variables and data types are fundamental in every language.",
    explanation:
      "Variables store data that can be used and manipulated in a program. Data types specify the kind of data a variable holds, such as integers, strings, or floating-point numbers.",
    codeExamples: [
      {
        title: "Hello World Example",
        languages: [
          {
            name: "Java",
            code: `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
            icon: "https://cdn-icons-png.flaticon.com/512/226/226777.png", // Java icon
          },
          {
            name: "Python",
            code: `print("Hello, World!")`,
            icon: "https://cdn-icons-png.flaticon.com/512/5600/5600917.png", // Python icon
          },
          {
            name: "JavaScript",
            code: `console.log("Hello, World!");`,
            icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // JavaScript icon
          },
        ],
      },
    ],
  },
  "control-flow": {
    title: "Control Flow",
    description:
      "Understand how control structures like loops and conditionals work across languages.",
    explanation:
      "Control flow structures such as loops, conditionals, and switches are essential for directing the execution flow of a program.",
    codeExamples: [
      {
        title: "If-Else Example",
        languages: [
          {
            name: "C",
            code: `#include <stdio.h>

int main() {
  int x = 10;
  if (x > 5) {
    printf("x is greater than 5");
  } else {
    printf("x is less than or equal to 5");
  }
  return 0;
}`,
            icon: "https://cdn-icons-png.flaticon.com/512/919/919831.png", // C icon
          },
          {
            name: "Python",
            code: `x = 10
if x > 5:
    print("x is greater than 5")
else:
    print("x is less than or equal to 5")`,
            icon: "https://cdn-icons-png.flaticon.com/512/5600/5600917.png", // Python icon
          },
          {
            name: "JavaScript",
            code: `let x = 10;
if (x > 5) {
  console.log("x is greater than 5");
} else {
  console.log("x is less than or equal to 5");
}`,
            icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // JavaScript icon
          },
        ],
      },
    ],
  },
  functions: {
    title: "Functions",
    description:
      "Learn about the building blocks of reusable code—functions and methods.",
    explanation:
      "Functions allow you to group code into reusable blocks that can be called multiple times, with or without parameters and return values.",
    codeExamples: [
      {
        title: "Function Example",
        languages: [
          {
            name: "C",
            code: `#include <stdio.h>

void greet() {
  printf("Hello, World!");
}

int main() {
  greet();
  return 0;
}`,
            icon: "https://cdn-icons-png.flaticon.com/512/919/919831.png", // C icon
          },
          {
            name: "Python",
            code: `def greet():
    print("Hello, World!")

greet()`,
            icon: "https://cdn-icons-png.flaticon.com/512/5600/5600917.png", // Python icon
          },
          {
            name: "JavaScript",
            code: `function greet() {
  console.log("Hello, World!");
}

greet();`,
            icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // JavaScript icon
          },
        ],
      },
    ],
  },
  arrays: {
    title: "Arrays",
    description: "Learn how arrays are used to store collections of data.",
    explanation:
      "An array is a collection of variables that are accessed with an index. In many languages, arrays can hold multiple values of the same type.",
    codeExamples: [
      {
        title: "Array Example",
        languages: [
          {
            name: "JavaScript",
            code: `let numbers = [1, 2, 3, 4];
console.log(numbers);`,
            icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // JavaScript icon
          },
          {
            name: "Python",
            code: `numbers = [1, 2, 3, 4]
print(numbers)`,
            icon: "https://cdn-icons-png.flaticon.com/512/5600/5600917.png", // Python icon
          },
        ],
      },
    ],
  },
};
