# Stage 1: Development
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE ${NESTJS_CONSUMER_PORT}
CMD ["npm", "run", "start:dev"]

# Stage 2: Build for production
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE ${NESTJS_CONSUMER_PORT}
CMD ["node", "dist/main"]