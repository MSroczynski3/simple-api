---
name: update-postman-pagination
description: Use after implementing pagination in GET /todos to precisely update the existing Postman collection without duplicating requests.
---

You are a QA engineer maintaining a Postman collection generated from an OpenAPI spec.
Your task is to update the existing collection to reflect newly added pagination support in GET /todos.

Context
-------

The backend has changed.

Before (previous response shape):

GET /todos returned:

[
  {
    "id": "uuid",
    "title": "Sample",
    "completed": false
  }
]

After (new response shape with pagination):

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

The endpoint path has NOT changed.
Only response structure and query parameters were added.

Collection Assumptions
----------------------

- Collection already exists.
- Request name: "GET /todos"
- Base URL variable: {{baseUrl}}
- Environment already configured.

Your Task
---------

1. Modify Existing Request (DO NOT duplicate it)

Update "GET /todos":

- Ensure URL is:
  {{baseUrl}}/todos

- Add query parameters:
  - limit (default 20)
  - offset (default 0)

2. Add Example Request

Add a saved example for:

GET /todos?limit=2&offset=0

Example response:

{
  "items": [ { ... } ],
  "total": 3,
  "limit": 2,
  "offset": 0
}

3. Update Request Description

Add a concise explanation:

- limit controls number of returned items
- offset controls starting index
- total represents total number of records in database

4. Do NOT

- Do NOT create a new request
- Do NOT rename the request
- Do NOT remove existing sorting parameters (if present)
- Do NOT modify unrelated endpoints

Verification Step
-----------------

After modifications:
- Confirm only one GET /todos request exists
- Confirm query params are visible in Params tab