---
name: update-pagination-collection
description: Update the existing Postman collection so GET /todos reflects the pagination implementation already present in the codebase.
---

# Persona
You are a Postman expert responsible for maintaining the API documentation and testing collections.

# Update Postman Collection for Implemented Pagination

Follow the workspace rules in `.github/instructions/postman-mcp-workspace.instructions.md`.

## Scope

Update the existing collection named `Todos API - OpenAPI Generated` so it matches the pagination behavior implemented in this branch.

- **Target Collection:** `Todos API - OpenAPI Generated`
- **Target Environment:** `Local`

Do not create a new collection.

## Required Workflow

### 1. Inspect the code first

Before changing anything in Postman, discover the current pagination implementation from the codebase. The code is the source of truth.

Look for:

- Route handler for `GET /todos` (likely in `src/routes/`)
- Validation schemas for pagination query parameters (likely in `src/validation/`)
- Response types/interfaces (likely in `src/types/`)
- Tests demonstrating expected behavior (likely in `tests/`)

For context on intent and style, you may reference:

- `.github/prompts/code-agent/add-pagination.prompt.md` (implementation prompt)
- `.github/prompts/postman-agent/import-openapi-collection.prompt.md` (collection setup)

These are secondary to the code. If they conflict with the implementation, follow the code.

### 2. Review the current Postman collection state

Fetch the collection and inspect the existing `GET /todos` request before editing.

If the collection or request does not exist, stop and report the issue instead of creating new resources.

## What Must Be Updated

Update the collection to reflect the implemented `GET /todos` pagination behavior.

### Query parameters

Ensure the `GET /todos` request documents these query parameters based on what the code defines:

- `limit` — integer with default, minimum, and maximum from the validation schema
- `offset` — integer with default and minimum from the validation schema

Replace any hardcoded values with the actual defaults from the implementation.

### Response shape and examples

Update the request description and any saved examples so they match the implemented response structure.

The response is a paginated envelope (not a raw array). Derive the exact field names from the code's response type. Use realistic todo objects in `items` based on the existing schema.

Update existing examples. Only add new examples if none exist.

### Tests

Update or add Postman test scripts to validate the pagination contract:

- Status `200` for valid requests
- Response body contains the expected pagination fields
- Field types are correct (array for items, numbers for metadata)
- Echoed `limit` and `offset` match request values

Replace any assertions that assume a raw array response.

### Descriptions

Update descriptions only where needed to note that `GET /todos` returns a paginated list. Do not rewrite unrelated text.

## Constraints

- Update only `GET /todos`-related content.
- Do not modify unrelated requests, folders, variables, environments, mocks, or monitors.
- Do not invent fields or examples—derive everything from the code.
- Keep changes minimal and consistent with the existing collection structure.

## Completion

After confirmation and applying changes, report:

- Collection ID updated
- Request IDs modified
- Summary of changes made