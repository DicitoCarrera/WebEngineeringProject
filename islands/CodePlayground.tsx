import { useState } from "preact/hooks";

export default function CodePlayground() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.result);
        setError('');
      } else {
        setError(data.error);
        setOutput('');
      }
    } catch (error) {
      setError('An error occurred while executing the code.');
      setOutput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Python Code Playground</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={code}
          onInput={(e) => setCode(e.target.value)}
          placeholder="Write Python code here"
          className="w-full p-2 border border-gray-300 rounded-md h-48"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Run Code
        </button>
      </form>
      {output && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold">Output:</h2>
          <pre>{output}</pre>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-md">
          <h2 className="text-xl font-semibold">Error:</h2>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}
