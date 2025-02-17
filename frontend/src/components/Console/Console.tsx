// src/components/Console/Console.tsx
import { useState } from 'preact/hooks';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const Console = () => {
  // Состояния для хранения кода, результата и выбранного языка
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python'); // По умолчанию Python

  // Функция для запуска кода через Judge0 API
  const runCode = async () => {
    const apiUrl = 'https://secure.judge0.com/submissions?base64_encoded=false&wait=true';
    const apiKey = 'your_api_key_here'; // Получи API-ключ на https://judge0.com/

    try {
      const response = await axios.post(apiUrl, {
        source_code: code,
        language_id: getLanguageId(language),
        stdin: ''
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': apiKey
        }
      });
      setOutput(response.data.stdout || response.data.stderr || 'No output');
    } catch (error) {
      console.error('Ошибка выполнения кода:', error);
      setOutput('Ошибка выполнения кода.');
    }
  };

  // Функция для получения ID языка для Judge0
  const getLanguageId = (lang: string) => {
    switch (lang) {
      case 'python': return 71;
      case 'java': return 62;
      case 'c': return 50;
      default: return 71;
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <div className="mb-4">
        <label htmlFor="language" className="block mb-2 text-sm font-medium">
          Язык программирования:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
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
        defaultValue="// Введи код здесь"
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
      />
      <button
        onClick={runCode}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Запустить
      </button>
      <div className="mt-4 p-4 bg-gray-900 rounded">
        <h2 className="text-lg font-semibold">Результат:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Console;