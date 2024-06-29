# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY ./src ./src
COPY ./tsconfig.json ./

# Compile TypeScript
RUN yarn build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/app.js"]
