# Use Node.js 18 as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Expose app port (change this if your app runs on another port)
EXPOSE 3001

# Run the app
CMD ["npm","run","dev"]
