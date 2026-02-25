---
name: add-smoke-flow
description: Add a smoke flow folder with test scripts to an existing Postman collection
---

# Add Smoke Flow to Postman Collection

**Important:** Use the Postman MCP API toolset (`mcp_postman*`) for all operations. Follow the workspace configuration and guidelines specified in `.github/instructions/postman-mcp-workspace.instructions.md`.

## Prerequisites

- Existing Postman collection: `Todos API - OpenAPI Generated`
- Environment `Local` configured with `baseUrl` variables

## Create Smoke Flow Folder

Add a folder named **"Smoke Flow"** to the collection and include the following requests:

1. Health check
2. Create Todo
3. Get Todo by ID
4. Update Todo
5. Delete Todo

## Add a collection variable

Add a collection variable named `todoId` to store the ID of the created Todo item for use across requests in the smoke flow.

<!-- ## Add Test Scripts

### 1. Status Code Tests

In the **Smoke Flow** folder, add basic status code tests in the Script sections of all requests.

### 2. Create Todo Request

In the **Create Todo** request Script section:

- In the request add a script that stores `response.id` into collection variable `todoId`

### 3. Get Todo by ID Request

In the **Get Todo by ID** request Script section:

- In the request add a script that verifies `response.id` equals collection variable `todoId` -->

## Save

Save all changes to the current workspace.
