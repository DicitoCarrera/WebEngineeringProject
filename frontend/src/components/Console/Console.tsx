import { useState } from "preact/hooks";
import { ChangeEvent } from "react"; // Import ChangeEvent from react
import Editor from "@monaco-editor/react";
import axios from "axios";

const Console = () => {
  // States for storing code, output, and selected language
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python"); // Default is Python

  // Function to run the code using the Judge0 API
  const runCode = async () => {
    const apiUrl =
      "https://secure.judge0.com/submissions?base64_encoded=false&wait=true";
    const apiKey = "your_api_key_here"; // Get the API key at https://judge0.com/

    try {
      const response = await axios.post(apiUrl, {
        source_code: code,
        language_id: getLanguageId(language),
        stdin: "",
      }, {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": apiKey,
        },
      });
      setOutput(response.data.stdout || response.data.stderr || "No output");
    } catch (error) {
      console.error("Code execution error:", error);
      setOutput("Code execution error.");
    }
  };

  // Function to get the language ID for Judge0
  const getLanguageId = (lang: string) => {
    switch (lang) {
      case "python":
        return 71;
      case "java":
        return 62;
      case "c":
        return 50;
      default:
        return 71;
    }
  };

  // Handler for changing the language
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target && e.target.value) { // Null check and value validation
      setLanguage(e.target.value);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <div className="mb-4">
        <label htmlFor="language" className="block mb-2 text-sm font-medium">
          Programming Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="text-black p-2 rounded"
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
        </select>
      </div>
      <Editor
        height="300px"
        defaultLanguage={language}
        defaultValue="// Enter your code here"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
      />
      <button
        onClick={runCode}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Run
      </button>
      <div className="mt-4 p-4 bg-gray-900 rounded">
        <h2 className="text-lg font-semibold">Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Console;
