# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Serve stage
FROM node:20-alpine

WORKDIR /app

# Install serve package globally (lightweight static server)
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Create a non-root user for security (optional but good practice)
USER node

# Cloud Run expects the container to listen on $PORT, but 'serve' defaults to 3000.
# We will use the deployment command or default to 8080.
# The CMD below tells 'serve' to listen on port 8080.
ENV PORT=8080
EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
