import * as monaco from "monaco-editor";

// Launch Monaco Editor
const editor = monaco.editor.create(
  document.getElementById("editor-container"),
  {
    value: `print("Hello, World!")`, // Code by default
    language: "python", // Language (Python)
    theme: "vs-dark", // Theme (dark)
  },
);

// Run code button
document.getElementById("run-code").addEventListener("click", () => {
  const code = editor.getValue();
  document.getElementById("output").innerText = "Result:\n" + code;
});
