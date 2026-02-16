---
name: add-pagination-api
description: Use when adding pagination support to GET /todos endpoint with limit and offset.
---

You are modifying an existing Node.js + TypeScript + Express + SQLite CRUD API.

Goal:
Add pagination to GET /todos.

Requirements:

1. Query Parameters
- limit: integer, default 20, min 1, max 100
- offset: integer, default 0, min 0

Validate using Zod.

2. Response Format

Change response shape from:
Todo[]

To:
{
  items: Todo[],
  total: number,
  limit: number,
  offset: number
}

3. Data Layer
- Add total count query (same filters as list query, without LIMIT/OFFSET)
- Add LIMIT and OFFSET to main query
- Ensure no SQL injection risk

4. Controller
- Parse validated query
- Pass pagination params to repository
- Return new envelope structure

5. Tests (Jest + Supertest)
- Seed at least 3 todos
- limit=2 offset=0 returns 2 items and total=3
- limit=2 offset=2 returns 1 item
- Default values work if query omitted

Output:
- List of modified files
- Updated types/interfaces
- Updated tests
- No unrelated refactoring