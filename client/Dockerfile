# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend source code to the working directory
COPY . .

# Build the frontend app
RUN npm run build

# Expose the port that your frontend server should run on (default is 3000)
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
