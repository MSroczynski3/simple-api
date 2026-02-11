# Todos REST API

Minimal CRUD REST API for managing todos, built with Express, TypeScript, and SQLite.

## Setup

```bash
npm install
```

## Run

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm start
```

**Tests:**

```bash
npm test
```

## Endpoints

### Health Check

```bash
curl http://localhost:3000/health
```

### List All Todos

```bash
curl http://localhost:3000/todos
```

### Get Todo by ID

```bash
curl http://localhost:3000/todos/<id>
```

### Create Todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

### Full Update (PUT)

```bash
curl -X PUT http://localhost:3000/todos/<id> \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries (updated)", "completed": true}'
```

### Partial Update (PATCH)

```bash
curl -X PATCH http://localhost:3000/todos/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete Todo

```bash
curl -X DELETE http://localhost:3000/todos/<id>
```

## Error Responses

All errors follow a consistent shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR | NOT_FOUND | INTERNAL_ERROR",
    "message": "description",
    "details": []
  }
}
```

## Project Structure

```
src/
  app.ts              - Express app setup
  server.ts           - Entry point
  db/database.ts      - SQLite connection and schema init
  types/index.ts      - TypeScript interfaces
  validation/          - Zod schemas
  repository/          - Data access layer
  middleware/          - requestId, logger, errorHandler
  routes/              - Route handlers
tests/
  todos.test.ts       - Integration tests
```
