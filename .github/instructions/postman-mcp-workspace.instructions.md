---
description: Postman MCP Workspace Configuration
applyTo: '**/*postman*,**/*mcp*' # Auto-load when working with Postman or MCP
---

# Postman MCP Workspace Requirements

This project uses the **Postman MCP Server** for API collection management and testing.

## Workspace Configuration

When working with any Postman MCP server operations, you MUST use the following workspace:

### Default Workspace
- **Workspace Name**: SimpleAPI
- **Workspace ID**: `ff0dba12-6d61-43a9-ba84-0388e679bc00`
- **Type**: Team
- **Visibility**: Public

## Rules

1. **Always use the SimpleAPI workspace** for all Postman operations in this project
2. When calling any `mcp_postman-api-h_*` tools that accept a `workspace` or `workspaceId` parameter, use: `ff0dba12-6d61-43a9-ba84-0388e679bc00`
3. Do NOT use other workspaces unless explicitly instructed by the user
4. When creating collections, environments, mocks, or monitors, default to this workspace

## Common Operations

### Creating Collections
```typescript
// Always specify the workspace parameter
workspace: "ff0dba12-6d61-43a9-ba84-0388e679bc00"
```

### Listing Collections
```typescript
// Always filter by workspace
mcp_postman-api-h_getCollections({
  workspace: "ff0dba12-6d61-43a9-ba84-0388e679bc00"
})
```

### Creating Environments
```typescript
// Always specify the workspace
mcp_postman-api-h_createEnvironment({
  workspace: {
    id: "ff0dba12-6d61-43a9-ba84-0388e679bc00"
  }
})
```

## Purpose

This ensures all Postman collections, environments, and related resources for the Simple API project are:
- Centralized in one workspace
- Easy to find and manage
- Consistent across team members
- Properly organized within the SimpleAPI workspace
