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

## API Documentation

Interactive API documentation is available via Swagger UI:

```bash
# Start the server
npm run dev

# Open in your browser
http://localhost:3000/api-docs
```

The Swagger UI provides:
- Complete API reference for all endpoints
- Request/response schemas
- Interactive testing of endpoints
- Example requests and responses

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