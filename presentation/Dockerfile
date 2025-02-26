# Use Node.js image with the desired version
FROM node:18-slim

# Set working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the rest of the project files into the container
COPY . .

# Start the development server
CMD ["pnpm", "run", "dev"]
