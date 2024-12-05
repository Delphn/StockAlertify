# StockAlertify

## Setup

To run this project locally, you need to create a `.env.development` file. You can do this by copying the contents of the `.env.example` file:

```bash
cp .env.example .env.development
```

## Architecture

- [System Architecture Diagram](https://excalidraw.com/#json=rbku98aqWTy0jdCNtAdcq,Qe2aDkPmktc5xiHQNLgH9Q)
- Sequence Diagram:
  
  ![Sequence Diagram](/assets//image/sequence-diagram.png)

## Services

- NestJS Producer: `http://localhost:3001`
- NestJS Consumer: `http://localhost:3002`
- Vue Admin Panel: `http://localhost:8080`

## Development Guide

### Starting the Project

```bash
# Start all services
docker compose --env-file .env.development up -d

# Rebuild all services
docker compose --env-file .env.development up -d --build

# Rebuild specific service
docker compose --env-file .env.development up -d --build <service_name>
```

### Stopping the Project

```bash
# Stop and remove all containers
docker compose --env-file .env.development down

# Stop and remove a specific container
docker compose --env-file .env.development down <container_name>

# Remove containers and volumes
docker compose --env-file .env.development down -v

# Remove unused networks
docker network prune

# Network inspection
docker network inspect kafka-network
```
