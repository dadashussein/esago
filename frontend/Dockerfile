FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package*.json .
COPY pnpm-lock.yaml .

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the port
EXPOSE 5173

# Start the application
CMD [ "pnpm", "run", "preview" ]
