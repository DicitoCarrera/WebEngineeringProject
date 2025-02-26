# Use Node.js official image as the base image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app in the container
COPY package*.json ./

# Install the dependencies listed in package.json
RUN npm install

# Copy the rest of the application files to /app in the container
COPY . .

# # Rebuild bcrypt and sqlite3 to ensure compatibility with the current environment
RUN npm rebuild bcrypt --build-from-source
RUN npm rebuild sqlite3 --build-from-source

# Command to run the backend app
CMD ["node", "backend.js"]
