---
description: API Documentation Update Requirements
applyTo: 'src/routes/*.ts' # Auto-load when modifying route files
---

# API Documentation Requirements

This project uses **Swagger/OpenAPI 3.0** for API documentation. All API changes MUST be reflected in the documentation.

## When Making API Changes

Whenever you add, modify, or remove an API endpoint, you MUST update the corresponding documentation:

### 1. Route Changes (src/routes/*.ts)
- **Adding a new endpoint**: Add a complete `@openapi` JSDoc comment block above the route handler
- **Modifying an endpoint**: Update the JSDoc to reflect changes in:
  - Path parameters
  - Query parameters
  - Request body schema
  - Response codes and schemas
  - Descriptions and examples
- **Removing an endpoint**: Remove the corresponding JSDoc comment

### 2. Schema Changes (src/config/swagger.ts)
When adding or modifying data models:
- Add/update schemas in `components.schemas`
- Include all required fields, types, validation rules, and examples
- Keep schemas in sync with TypeScript interfaces in `src/types/`
- Keep schemas in sync with Zod validation in `src/validation/`

## Documentation Structure

### JSDoc Format Example
```typescript
/**
 * @openapi
 * /endpoint:
 *   method:
 *     tags:
 *       - TagName
 *     summary: Brief description
 *     description: Detailed description
 *     parameters:
 *       - in: path|query
 *         name: paramName
 *         required: true|false
 *         schema:
 *           type: string|number|boolean
 *         description: Parameter description
 *     requestBody:
 *       required: true|false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchemaName'
 *     responses:
 *       200:
 *         description: Success description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchemaName'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
```

## Verification
After making changes:
1. Restart dev server: `npm run dev`
2. Open Swagger UI: http://localhost:3000/api-docs
3. Verify all changes are reflected correctly
4. Test endpoints using the Swagger UI interface

## Important Notes
- Documentation is generated at runtime from JSDoc comments
- No build step needed - changes appear on server restart
- Keep descriptions clear, concise, and accurate
- Include examples for complex request/response bodies
- Document all possible error responses