As a prompt engineering expert you are helping me generate an execution prompt for an AI agent.

Goal:
The agent will use Postman MCP to update a Postman collection so it reflects pagination changes already implemented in the codebase.

Sources of truth:

Code (highest priority)
Original implementation prompt (context only)
Previous prompts used to create the Postman collection

Artifacts:
Original prompt used for implementation #file:add-pagination.prompt.md 
Reference prompt examples for style to follow #file:add-smoke-flow.prompt.md and #file:import-openapi-collection.prompt.md .

Task:
Create ONE final execution prompt in the markdown format and place it in the #file:postman-agent folder.

Requirements:

The agent must inspect the code before making changes
Clearly define what needs updating in Postman (params, examples, tests, descriptions)
Prevent assumptions (agent must rely on code)
Include constraints (no unrelated changes)

Output:
Return ONLY the final prompt in the markdown format
No explanations