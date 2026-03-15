---
name: update-postman-pagination
description: Update ALL requests and example responses in a Postman collection after pagination was added to list endpoints.
---

# Update Postman Collection for Pagination

**Important:** Use the Postman MCP API toolset (`mcp_postman*`) for all operations. Follow the workspace configuration and guidelines specified in `.github/instructions/postman-mcp-workspace.instructions.md`.

---

# Goal

Update ALL affected requests and example responses in the **Todos API - OpenAPI Generated** collection to support the new paginated response format.

The update must:

- Scan the entire collection to identify all affected requests
- Add `limit` and `offset` query parameters to list endpoints
- Update request descriptions
- **Update ALL existing example responses** to use the new format
- Add new example responses showing paginated format
- Preserve existing requests without duplicating them

---

# Inputs / Context

Pagination support was added to list endpoints (e.g., `GET /todos`).

The endpoint paths **remain unchanged**, but the response format and query parameters have changed.

## Affected Endpoint Pattern


GET /todos      (list endpoint - returns paginated response)


## Previous Response Format (Array)


[
{
"id": "uuid",
"title": "Sample",
"completed": false
}
]


## New Paginated Response (Object with items array)


{
"items": [
{
"id": "uuid",
"title": "Sample",
"completed": false
}
],
"total": 3,
"limit": 20,
"offset": 0
}


---

# Workspace Assumptions

The Postman workspace already contains:

Collection:


Todos API - OpenAPI Generated


Environment variable:


{{baseUrl}}


---

# Pre-Action Check

Before making changes:

1. Confirm the collection **Todos API - OpenAPI Generated** exists.
2. Get the full collection structure to identify ALL requests and folders.
3. Identify all `GET` requests that return lists (typically endpoints without path parameters like `/todos`).
4. If no matching requests exist, stop and report the issue.

---

# Actions

Perform the following actions **in order**.

## 1. Scan Collection Structure

Retrieve the full collection and examine:
- All folders and their requests
- All requests across the collection
- All existing example responses

Identify every request that:
- Is a `GET` method
- Returns a list of resources (URL pattern like `/todos` without `:id`)

---

## 2. For Each Affected Request

### 2.1 Verify Request URL

Ensure the request URL follows the expected pattern (e.g., `{{baseUrl}}/todos`).

Do not modify the endpoint path.

### 2.2 Add Query Parameters

Add the following query parameters if not already present:

| Parameter | Default | Description |
|-----------|---------|-------------|
| limit | 20 | Number of items returned |
| offset | 0 | Starting index of the result set |

These parameters must be visible in the **Params tab**.

### 2.3 Update Request Description

Update the request description to explain pagination.

Include:

- `limit` — number of items to return (default: 20)
- `offset` — starting index in the dataset (default: 0)
- `total` — total number of records available (returned in response)

---

## 3. Update ALL Existing Example Responses

**Critical:** For each affected request, retrieve ALL existing example responses and update them to use the new paginated format.

### Before (Array format - OUTDATED):

```json
[
  { "id": "uuid", "title": "Sample", "completed": false }
]
```

### After (Paginated format - CORRECT):

```json
{
  "items": [
    { "id": "uuid", "title": "Sample", "completed": false }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

Use `mcp_postman_getCollectionResponse` to retrieve each example, then `mcp_postman_updateCollectionResponse` to update the response body.

---

## 4. Add New Paginated Example (if not exists)

Add a saved example demonstrating pagination:

Request:

```
GET /todos?limit=2&offset=0
```

Example response:

```json
{
  "items": [
    { "id": "uuid", "title": "Sample", "completed": false }
  ],
  "total": 3,
  "limit": 2,
  "offset": 0
}
```

---

# Constraints

Follow these rules strictly:

- Do **NOT create new requests** — only update existing ones
- Do **NOT rename requests**
- Do **NOT remove existing query parameters**
- Do **NOT modify unrelated endpoints** (e.g., POST, PUT, PATCH, DELETE, or GET by ID)
- Do **NOT change request paths**
- **DO update ALL existing example responses** — do not leave outdated examples

---

# Validation

After completing all updates, verify for EACH affected request:

1. No duplicate requests were created.
2. Query parameters **limit** and **offset** are present.
3. The request description explains pagination.
4. **ALL example responses** show the paginated format (object with `items`, `total`, `limit`, `offset`).
5. No example responses still use the old array format.

## Verification Steps

1. Re-fetch each affected request and confirm `queryParams` contains `limit` and `offset`.
2. Re-fetch each example response (`responses_order` array) and confirm the response body is a paginated object, not an array.
3. Report the final status of all updated resources.

---

# Summary Report

After completing all changes, provide a summary:

| Request | Status | Query Params | Examples Updated |
|---------|--------|--------------|------------------|
| GET /todos | ✓ Updated | limit, offset | X of Y |

Include:
- Total requests updated
- Total example responses updated
- Any issues encountered

---

# Save

All changes are automatically saved to the Postman workspace via the MCP API.