import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { State } from "./_middleware.ts";

export const handler: Handlers<any, State> = {

  async POST(req, ctx) {
    console.log("Received POST request for login.");

    // Log request headers
    console.log("Request headers:", req.headers);

    try {
      // Get form data
      const form = await req.formData();
      const email = form.get("email") as string;
      const password = form.get("password") as string;

      // Log form data (email and password)
      console.log("Form data received:");
      console.log("Email:", email);
      console.log("Password: [REDACTED]");  // Never log passwords in production

      // Call Supabase sign-in API
      console.log("Calling Supabase signInWithPassword API...");
      const { data, error } = await ctx.state.supabaseClient.auth.signInWithPassword({ email, password });

      // Log Supabase response
      if (data) {
        console.log("Supabase sign-in successful.");
        console.log("Session Data:", data.session);
      }
      if (error) {
        console.error("Supabase sign-in failed:", error.message);
        console.log("Supabase error details:", error);
      }

      // Prepare response headers for redirection
      const headers = new Headers();

      // If sign-in is successful, set the login cookie
      if (data?.session) {
        console.log("Setting session cookie.");
        setCookie(headers, {
          name: 'supaLogin',
          value: data.session.access_token,
          maxAge: data.session.expires_in,
        });
        console.log("Session cookie set successfully.");
      }

      // Determine redirection URL based on success or error
      let redirect = "/";
      if (error) {
        redirect = `/login?error=${error.message}`;
        console.log("Redirection due to error:", redirect);
      } else {
        console.log("Redirection to home page:", redirect);
      }

      // Set the location header for redirection
      headers.set("location", redirect);
      return new Response(null, {
        status: 303, // HTTP 303 is used for redirecting
        headers,
      });

    } catch (err) {
      // Catch any unexpected errors and log them
      console.error("Unexpected error during login process:", err);
      console.log("Error stack:", err.stack);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};

export default function Login(props: PageProps) {
  const err = props.url.searchParams.get("error");

  // Log rendering of the page and error message in the URL
  console.log("Rendering login page.");
  if (err) {
    console.log("Error message received in URL:", err);
  }

  return (
    <section class="bg-gray-200">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="mx-auto">
          <h2 class="text-2xl font-bold mb-5 text-center">Login</h2>
        </div>

        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            {err && (
              <div class="bg-red-400 border-l-4 p-4" role="alert">
                <p class="font-bold">Error</p>
                <p>{err}</p>
              </div>
            )}
            <form class="space-y-4 md:space-y-6" method="POST">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
                <input type="email" name="email" id="email" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>

              <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login In</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet? <a href="/signup" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
