# Mini E-commerce API

A scalable Node.js API built with Clean Architecture and Domain-Driven Design (DDD) principles.

## Architecture

This project follows **Bounded Context** architecture for microservices-ready development:

```
src/
├── features/                    # Bounded Contexts (Features)
│   ├── auth/                    # Authentication feature
│   │   ├── domain/              # Domain layer (entities, repositories)
│   │   ├── application/         # Application layer (usecases, services)
│   │   ├── infrastructure/      # Infrastructure layer (repositories)
│   │   └── interfaces/          # Interface layer (controllers, routes)
│   ├── user/                    # User management feature
│   └── product/                 # Product management feature
└── shared/                      # Shared utilities
    ├── config/                  # Configuration (JWT, Swagger)
    ├── database/                # Database connections
    └── middlewares/             # Common middlewares
```

## Features

- **Auth**: User registration, login, JWT token refresh
- **User**: User management (CRUD operations)
- **Product**: Product management (CRUD operations)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (copy `.env` and configure)

4. Run migrations:
   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm run dev  # Development with nodemon
   npm start    # Production
   ```

### Docker

```bash
docker-compose up -d  # Build and run with PostgreSQL
```

## API Documentation

Access Swagger UI at: `http://localhost:1211/api-docs`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Users (Protected)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Protected)
- `PUT /api/products/:id` - Update product (Protected)
- `DELETE /api/products/:id` - Delete product (Protected)

## Technologies

- **Node.js** with Express
- **PostgreSQL** with Knex.js
- **JWT** for authentication
- **Swagger** for API documentation
- **PM2** for process management
- **Docker** for containerization

## Development

Each feature is self-contained and can be developed/deployed independently. This architecture supports scaling to microservices in the future.