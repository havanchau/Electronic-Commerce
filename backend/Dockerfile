# Use Node.js base image
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Copy environment variables into the Docker image
COPY .env .env

# Build the NestJS app
RUN npm run build

# Final image
FROM node:16

WORKDIR /app

# Copy the built app from the builder
COPY --from=builder /app ./

# Expose backend port
EXPOSE 3001

# Run the NestJS app
CMD ["npm", "run", "start:prod"]
