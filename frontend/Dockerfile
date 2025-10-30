FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]
