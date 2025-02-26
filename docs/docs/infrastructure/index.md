# Application Infrastructure

## Overview

This documentation outlines the technical details for setting up the
infrastructure of an application using Docker Compose. The infrastructure
consists of two primary services:

- **Backend** - A Node.js-based backend service.
- **Frontend** - A Node.js-based frontend service.

Both services are containerized using Docker and orchestrated using Docker
Compose. The services communicate internally on the same Docker network and
expose ports for external access.

## Docker Compose Setup

The `docker-compose.yml` file provides the configuration to define, configure,
and run multi-container Docker applications. The file below contains
configurations for the `node-backend` and `node-frontend` services.

### Key Elements

- **`version`**: Specifies the version of the Docker Compose syntax.
- **`services`**: Defines the services (containers) in the application.
  - `node-backend`: The backend service, configured to run on port 5001.
  - `node-frontend`: The frontend service, configured to run on port 3000.
- **`container_name`**: Specifies the name of the container within Docker.
- **`build.context`**: Defines the directory containing the Dockerfile for
  building the respective container.
- **`ports`**: Exposes container ports to the host machine.
- **`environment`**: Defines environment variables for the services.
- **`restart`**: Ensures services are automatically restarted in case of
  failure.

## Backend Dockerfile

The Dockerfile for the backend service specifies the steps needed to create the
backend image. Below is the detailed configuration:

### Breakdown

- `FROM node`: Uses the official Node.js image as the base for the container.
- `WORKDIR /app`: Sets the working directory inside the container to `/app`.
- `COPY package.json /app`: Copies the `package.json` file into the container to
  install dependencies.
- `RUN npm install`: Installs the dependencies listed in `package.json`.
- `COPY . /app`: Copies the rest of the backend files into the container.
- `CMD ["node", "backend.js"]`: The entry point for running the backend
  application, using the `backend.js` file.

## Frontend Dockerfile

The Dockerfile for the frontend service specifies the steps needed to create the
frontend image. Below is the detailed configuration:

### Breakdown

- `FROM node`: Uses the official Node.js image as the base for the container.
- `WORKDIR /app`: Sets the working directory inside the container to `/app`.
- `COPY package.json /app`: Copies the `package.json` file into the container to
  install dependencies.
- `RUN npm install`: Installs the dependencies listed in `package.json`.
- `COPY . /app`: Copies the rest of the frontend files into the container.
- `CMD ["node", "frontend.js"]`: The entry point for running the frontend
  application, using the `frontend.js` file.

## Service Configuration

### Backend Service Configuration

- **Container Name**: `backend`
- **Build Context**: `./backend` (Path to the backend application directory)
- **Ports**: Exposes port `5001` from the container to port `5001` on the host.
- **Restart Policy**: Always restart the service if it fails or stops
  unexpectedly.

### Frontend Service Configuration

- **Container Name**: `frontend`
- **Build Context**: `./frontend` (Path to the frontend application directory)
- **Ports**: Exposes port `3000` from the container to port `3000` on the host.
- **Restart Policy**: Always restart the service if it fails or stops
  unexpectedly.
