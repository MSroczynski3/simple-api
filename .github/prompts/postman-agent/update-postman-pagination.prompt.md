---
name: update-postman-pagination
description: Update the existing GET /todos request in a Postman collection after pagination was added without creating duplicate requests.
---

# Update Postman Collection for Pagination

**Important:** Use the Postman MCP API toolset (`mcp_postman*`) for all operations. Follow the workspace configuration and guidelines specified in `.github/instructions/postman-mcp-workspace.instructions.md`.

---

# Goal

Update the existing `GET /todos` request in the **Todos API - OpenAPI Generated** collection to support pagination.

The update must:

- Add `limit` and `offset` query parameters
- Update the request description
- Add an example response with pagination
- Preserve the existing request without duplicating it

---

# Inputs / Context

Pagination support was added to the `GET /todos` endpoint.

The endpoint path **remains unchanged**, but the response format and query parameters have changed.

## Endpoint


GET /todos


## Previous Response Format


[
{
"id": "uuid",
"title": "Sample",
"completed": false
}
]


## New Paginated Response


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


Existing request:


GET /todos


Environment variable:


{{baseUrl}}


Expected request URL:


{{baseUrl}}/todos


---

# Pre-Action Check

Before making changes:

1. Confirm the collection **Todos API - OpenAPI Generated** exists.
2. Confirm the request **GET /todos** exists in the collection.
3. If the request does not exist, stop and report the issue.

---

# Actions

Perform the following actions **in order**.

## 1. Locate Existing Request

Find the request named:


GET /todos


inside the collection **Todos API - OpenAPI Generated**.

Do not create a new request.

---

## 2. Verify Request URL

Ensure the request URL is:


{{baseUrl}}/todos


Do not modify the endpoint path.

---

## 3. Add Query Parameters

Add the following query parameters:

| Parameter | Default | Description |
|-----------|--------|-------------|
| limit | 20 | Number of items returned |
| offset | 0 | Starting index of the result set |

These parameters must be visible in the **Params tab**.

---

## 4. Update Request Description

Update the request description to explain pagination.

Include:

- `limit` — number of items returned
- `offset` — starting index in the dataset
- `total` — total number of records available

---

## 5. Add Example Response

Add a saved example for the following request:


GET /todos?limit=2&offset=0


Example response structure:


{
"items": [
{
"id": "uuid",
"title": "Sample",
"completed": false
}
],
"total": 3,
"limit": 2,
"offset": 0
}


---

# Constraints

Follow these rules strictly:

- Do **NOT create a new request**
- Do **NOT rename the request**
- Do **NOT remove existing query parameters**
- Do **NOT modify unrelated endpoints**
- Do **NOT change the request path**

Only update the existing request.

---

# Validation

After completing the update, verify:

1. Exactly **one** request named `GET /todos` exists.
2. Query parameters **limit** and **offset** are present.
3. The request description explains pagination.
4. An example response exists showing the **paginated response format**.

---

# Save

Save all changes to the current Postman workspace.