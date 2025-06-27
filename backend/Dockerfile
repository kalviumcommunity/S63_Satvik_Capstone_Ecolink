# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 5000

# Set environment variables (can be overridden at runtime)
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"] 