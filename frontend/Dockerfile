# Use Node.js official image as the base image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy package.json to /app in the container
COPY package.json /app

# Install the dependencies listed in package.json
RUN npm install

# Copy the rest of the application files to /app in the container
COPY . /app

# # Rebuild bcrypt and sqlite3 for the correct architecture
# RUN npm rebuild bcrypt --build-from-source
# RUN npm rebuild sqlite3 --build-from-source

# Command to run the frontend app
CMD ["node", "frontend.js"]
