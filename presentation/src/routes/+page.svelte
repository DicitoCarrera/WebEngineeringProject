<script lang="ts">
	import { Presentation, Slide, Transition } from '@animotion/core'

</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<p class="text-8xl font-bold drop-shadow-sm">👨‍💻 Learning Programming</p>
		</Transition>

		<Transition  class="mt-16">
			<p class="text-6xl font-bold drop-shadow-sm">Digeo Carrera</p>
		</Transition>

			<Transition class="mt-16">
			<p class="text-6xl font-bold drop-shadow-sm">Anatolii</p>
		</Transition>

			<!-- <Transition class="mt-16">
			<p class="text-6xl font-bold drop-shadow-sm">Scadii</p>
		</Transition> -->
	</Slide>

  <Slide class="h-full place-content-center place-items-center">
		<img class="rounded-lg drop-shadow-sm" src="presentation/static/architecture-webapp.png" />
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<p class="text-8xl font-bold drop-shadow-sm">Demo!</p>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<p class="text-8xl font-bold drop-shadow-sm">Docs!</p>
	</Slide>
<!--
  <Slide class="h-full place-content-center place-items-center">
    <p class="text-8xl font-bold drop-shadow-sm">Welcome to Our App!</p>
    <p class="text-4xl mt-4 drop-shadow-sm">An interactive web application with 3 main layers: Frontend, Backend, and Infrastructure</p>
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Frontend Architecture</p>
    <p class="text-4xl mt-4 drop-shadow-sm">Built with Express and enhanced with Animotion for rich animations and interactions.</p>
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <Transition>
      <p class="text-5xl font-bold drop-shadow-sm">What is Animotion?</p>
      <p class="text-3xl mt-4 drop-shadow-sm">Animotion is used to create smooth, interactive animations in the frontend for better user experience.</p>
    </Transition>
    <Transition do={() => document.querySelector('.text-3xl').classList.replace('text-3xl', 'text-4xl')} class="mt-4">
      <img class="rounded-lg drop-shadow-sm" src="/animotion-demo.gif" />
    </Transition>
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Backend Architecture</p>
    <p class="text-4xl mt-4 drop-shadow-sm">Powered by Express.js, managing user sessions and API endpoints for lessons and authentication.</p>
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <Transition>
      <p class="text-5xl font-bold drop-shadow-sm">API Routes</p>
      <p class="text-3xl mt-4 drop-shadow-sm">We have RESTful API routes for <strong>/auth</strong> and <strong>/lessons</strong>.</p>
    </Transition>
    <Transition do={() => document.querySelector('.text-3xl').classList.replace('text-3xl', 'text-4xl')} class="mt-4">
      <img class="rounded-lg drop-shadow-sm" src="/api-routes-demo.gif" />
    </Transition>
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Infrastructure with Docker</p>
    <p class="text-4xl mt-4 drop-shadow-sm">Docker Compose is used to manage both frontend and backend containers, ensuring high availability.</p>
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <Transition>
      <p class="text-5xl font-bold drop-shadow-sm">App Architecture Diagram</p>
    </Transition>
    <Transition class="mt-4">
      <img class="rounded-lg drop-shadow-sm" src="/architecture-diagram.png" />
    </Transition>
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Conclusion</p>
    <p class="text-4xl mt-4 drop-shadow-sm">Our app provides a seamless, interactive experience with modern frontend animations, robust backend architecture, and containerized infrastructure.</p>
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Backend: Express Routes Setup</p>
    <Code
      bind:this={backendCode}
      lang="javascript"
      theme="poimandres"
      code={`
        const express = require("express");
        const session = require("express-session");
        const usersRoutes = require("./routes/usersRoutes");
        const lessonsRoutes = require("./routes/lessonsRoutes");

        const app = express();

        app.use("/auth", usersRoutes);
        app.use("/lessons", lessonsRoutes);

        app.listen(5001, () => {
          console.log('Backend running on port 5001');
        });
      `}
      options={{ duration: 1000, stagger: 0.3 }}
    />
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Backend: Middleware Setup</p>
    <Code
      bind:this={backendCode}
      lang="javascript"
      theme="poimandres"
      code={`
        const logRequest = (req, res, next) => {
          console.log(\`Received a \${req.method} request from \${req.ip}\`);
          next();
        };

        app.use(logRequest);
      `}
      options={{ duration: 1000, stagger: 0.3 }}
    />
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Frontend: View Engine & Middleware</p>
    <Code
      bind:this={frontendCode}
      lang="javascript"
      theme="poimandres"
      code={`
        const express = require("express");
        const path = require("path");

        const app = express();
        app.set("view engine", "pug");
        app.set("views", path.join(__dirname, "./views"));

        app.use(express.static(path.join(__dirname, "./")));
      `}
      options={{ duration: 1000, stagger: 0.3 }}
    />
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Frontend: Logging Requests</p>
    <Code
      bind:this={frontendCode}
      lang="javascript"
      theme="poimandres"
      code={`
        const logRequest = (req, res, next) => {
          console.log(\`Received a \${req.method} request from \${req.ip}\`);
          next();
        };

        app.use(logRequest);
      `}
      options={{ duration: 1000, stagger: 0.3 }}
    />
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Infrastructure: Docker Compose</p>
    <Code
      bind:this={dockerCode}
      lang="yaml"
      theme="poimandres"
      code={`
        version: "3.8"

        services:
          # Backend Service
          node-backend:
            container_name: backend
            build:
              context: ./backend
            ports:
              - "5001:5001"
            environment:
              JWT_SECRET: your_jwt_secret
            restart: always

          # Frontend Service
          node-frontend:
            container_name: frontend
            build:
              context: ./frontend
            ports:
              - "4000:4000"
            restart: always
      `}
      options={{ duration: 1000, stagger: 0.3 }}
    />
  </Slide>

  <Slide class="h-full place-content-center place-items-center">
    <p class="text-6xl font-bold drop-shadow-sm">Conclusion</p>
    <p class="text-4xl mt-4 drop-shadow-sm">Our app integrates smooth animations, modular architecture, and a scalable infrastructure using Docker and Express.</p>
  </Slide> -->
</Presentation>
