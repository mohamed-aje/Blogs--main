# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
RUN apt-get update && apt-get install -y build-essential


# Remove existing node_modules
RUN rm -rf /app/node_modules

# Reinstall dependencies
RUN npm install

# Install backend dependencies
RUN npm install

# Copy the backend source code to the working directory
COPY . .

# Expose the port that your backend server listens on (default is 5000)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]