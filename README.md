# StockAlertify

## Architecture

- [System Architecture Diagram](https://excalidraw.com/#json=rbku98aqWTy0jdCNtAdcq,Qe2aDkPmktc5xiHQNLgH9Q)

## Services

- NestJS Producer: `http://localhost:3001`
- NestJS Consumer: `http://localhost:3002`
- Vue Admin Panel: `http://localhost:8080`

## Development Guide

### Starting the Project

```bash
# Start all services
NODE_ENV=development docker compose up -d

# Rebuild all services
NODE_ENV=development docker compose up -d --build

# Rebuild specific service
NODE_ENV=development docker compose up -d --build <service_name>
```

### Stopping the Project

```bash
# Stop all containers
NODE_ENV=development docker compose down

# Remove containers and networks
NODE_ENV=development docker compose down -v

# Network inspection
NODE_ENV=development docker network inspect kafka-network
```
