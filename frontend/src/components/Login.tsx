import axios from "axios";
import { useState } from "preact/hooks";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      alert(response.data.message);
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onInput={(e: any) => setUsername(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Login
        </button>

        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
