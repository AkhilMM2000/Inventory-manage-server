# Use Node 20 base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose backend port (change if you use another)
EXPOSE 5000

# Start the compiled JavaScript (from dist/)
CMD ["node", "dist/index.js"]
