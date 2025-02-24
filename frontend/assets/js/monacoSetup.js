require.config({
  paths: {
    "vs": "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs",
  },
});

require(["vs/editor/editor.main"], function () {
  const editorContainer = document.getElementById("editor-container");
  const languageSelector = document.getElementById("language-selector");
  let editor;

  function createEditor(language) {
    if (editor) {
      editor.dispose();
    }
    editor = monaco.editor.create(editorContainer, {
      value: [
        "function helloWorld() {",
        '\tconsole.log("Hello, world!");',
        "}",
      ].join("\n"),
      language: language,
      theme: "vs-dark",
    });
  }

  if (editorContainer) {
    createEditor("javascript");

    languageSelector.addEventListener("change", function () {
      const selectedLanguage = languageSelector.value;
      createEditor(selectedLanguage);
    });

    document.getElementById("run-code").addEventListener("click", function () {
      const code = editor.getValue();
      try {
        eval(code);
        document.getElementById("output").innerText =
          "Code executed successfully!";
      } catch (error) {
        document.getElementById("output").innerText = "Error: " + error.message;
      }
    });
  }
});
