# Use Node.js base image
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Build the Next.js app
RUN npm run build

# Final image
FROM node:16

WORKDIR /app

# Copy the built app from the builder
COPY --from=builder /app ./

# Expose frontend port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
