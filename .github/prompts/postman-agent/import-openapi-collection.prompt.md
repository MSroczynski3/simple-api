---
name: import-openapi-collection
description: Import OpenAPI specification to create a new Postman collection with environment configuration
---

# Import OpenAPI Specification to Postman Collection

**Important:** Use the Postman MCP API toolset (`mcp_postman-api-h_*`) for all operations. Follow the workspace configuration and guidelines specified in `.github/instructions/postman-mcp-workspace.instructions.md`.

## Import OpenAPI Specification

Create a new Postman collection by importing the OpenAPI specification from:

```
http://localhost:3000/api-docs/swagger.json
```

**Collection Name:** `Todos API - OpenAPI Generated`

## Create Environment

Create a new environment with the following configuration:

**Environment Name:** `Local`

**Variables:**

- `baseUrl` = `http://localhost:3000`

## Post-Import Configuration

After importing the collection, complete the following tasks:

### 1. Update Request URLs

Ensure all requests use `{{baseUrl}}` instead of hardcoded localhost addresses.

### 2. Organize by Resource

Group requests by resource (e.g., Todos, Health).

### 3. Add Collection Description

Add collection-level description summarizing the API purpose.

## Save

Save everything to the current workspace.
