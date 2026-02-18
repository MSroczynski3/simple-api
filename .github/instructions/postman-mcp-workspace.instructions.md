---
description: Postman MCP Workspace Configuration
applyTo: '**/*postman*,**/*mcp*' # Auto-load when working with Postman or MCP
---

# Postman MCP Workspace Requirements

This project uses the **Postman MCP Server** for API collection management and testing.

## Agent Usage (Required)

### Use the Postman MCP Server (no curl/CLI)

When interacting with Postman resources, **use the Postman MCP server tools you have access to** (the `mcp_postman_*` tool set).

- Do NOT use `curl`, the Postman CLI, direct HTTP calls, or other non-MCP approaches to manage Postman workspaces/collections/environments.
- If a prompt is ambiguous, ask for the required IDs rather than “searching around” with extra API calls.

### Review + confirm changes

For any operation that creates, updates, moves, or deletes Postman resources (collections, environments, mocks, monitors, tags, etc.):

- First, summarize the intended change and the target resource IDs.
- If updating/replacing, retrieve the current resource where reasonable and describe what will change.
- Wait for explicit user confirmation before executing destructive/irreversible actions.

## Workspace Configuration

When working with any Postman MCP server operations, you MUST use the following workspace:

### Default Workspace
- **Workspace Name**: SimpleAPI
- **Workspace ID**: `ff0dba12-6d61-43a9-ba84-0388e679bc00`
- **Type**: Team
- **Visibility**: Public

## Rules

1. **Always use the SimpleAPI workspace** for all Postman operations in this project.
2. Always pass the workspace ID explicitly to any tool that accepts `workspace` or `workspaceId`: `ff0dba12-6d61-43a9-ba84-0388e679bc00`.
3. Do NOT use other workspaces unless explicitly instructed by the user.
4. When creating collections, environments, mocks, or monitors, default to this workspace.
5. When you already have a resource ID (collection/environment/mock/monitor/spec), pass it directly instead of listing/searching resources.

## Common Operations

### Prompt header (copy/paste)

Use this at the start of prompts involving Postman changes:

"When interacting with Postman resources, use the Postman MCP server tools (`mcp_postman_*`). Use workspace ID `ff0dba12-6d61-43a9-ba84-0388e679bc00` (SimpleAPI) for all operations. Before creating/updating/deleting anything, summarize the change and wait for my confirmation."

### Creating Collections
```typescript
// Always specify the workspace parameter
workspace: "ff0dba12-6d61-43a9-ba84-0388e679bc00"
```

### Listing Collections
```typescript
// Always filter by workspace
mcp_postman_getCollections({
  workspace: "ff0dba12-6d61-43a9-ba84-0388e679bc00"
})
```

### Creating Environments
```typescript
// Always specify the workspace
mcp_postman_createEnvironment({
  workspace: "ff0dba12-6d61-43a9-ba84-0388e679bc00"
})
```

## Purpose

This ensures all Postman collections, environments, and related resources for the Simple API project are:
- Centralized in one workspace
- Easy to find and manage
- Consistent across team members
- Properly organized within the SimpleAPI workspace
