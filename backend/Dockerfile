# Use official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Command to run the app when the container starts
CMD ["node", "app.js"]
