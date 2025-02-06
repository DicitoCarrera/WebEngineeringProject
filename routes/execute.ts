import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

// Function to execute Python code using Deno.Command
const executePythonCode = async (code: string) => {
  console.log("Starting Python code execution...");

  try {
    // Log the received Python code (sanitized for debugging)
    console.log("Python code received for execution:");
    console.log(code);

    // Create the Python process using Deno.Command
    const command = new Deno.Command("python3", {
      args: ["-c", code],
      stdout: "piped", // Capture stdout
      stderr: "piped", // Capture stderr
      stdin: "piped", // Allow stdin if needed
    });

    // Spawn the child process
    const child = command.spawn();

    // Capture the output and error streams
    const output = await child.output();
    const errorOutput = await child.stderrOutput();

    // Decode the output and error streams
    const decodedOutput = new TextDecoder().decode(output);
    const decodedError = new TextDecoder().decode(errorOutput);

    // Ensure that stdin is properly closed after execution
    child.stdin.close();

    // Log the output and errors
    if (decodedOutput) {
      console.log("Python output:", decodedOutput);
    }
    if (decodedError) {
      console.error("Python error output:", decodedError);
    }

    // Return the result or error
    if (decodedError) {
      return { error: decodedError };
    }
    return { result: decodedOutput };
  } catch (err) {
    console.error("Error during Python code execution:", err);
    throw new Error("Error executing Python code");
  }
};

serve(async (req) => {
  console.log("Received request:", req.method, req.url);

  if (req.method === "POST" && req.url === "/execute") {
    let body;
    try {
      body = await req.json();
      console.log("Received body:", body);
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new Response("Invalid JSON body", { status: 400 });
    }

    const { code } = body;

    // Ensure code is a valid string
    if (typeof code !== "string") {
      console.error("Received invalid code:", code);
      return new Response("Invalid code format", { status: 400 });
    }

    try {
      // Execute the Python code and log the result
      console.log("Executing Python code...");
      const result = await executePythonCode(code);
      console.log("Execution result:", result);

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to execute Python code:", error);
      return new Response(
        JSON.stringify({ error: "Failed to execute code" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // If the request URL is not found, log and return 404
  console.warn("Request URL not found:", req.url);
  return new Response("Not Found", { status: 404 });
}, { port: 5000 });
