import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todos API",
      version: "1.0.0",
      description: "A simple Express API for managing todos with SQLite database",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Health check endpoints",
      },
      {
        name: "Todos",
        description: "Todo management endpoints",
      },
    ],
    components: {
      schemas: {
        Todo: {
          type: "object",
          required: ["id", "title", "completed", "createdAt", "updatedAt"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique identifier for the todo",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            title: {
              type: "string",
              minLength: 1,
              maxLength: 120,
              description: "Title of the todo",
              example: "Buy groceries",
            },
            description: {
              type: "string",
              maxLength: 500,
              nullable: true,
              description: "Detailed description of the todo",
              example: "Buy milk, eggs, and bread from the store",
            },
            completed: {
              type: "boolean",
              description: "Whether the todo is completed",
              example: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the todo was created",
              example: "2026-02-11T10:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the todo was last updated",
              example: "2026-02-11T10:30:00.000Z",
            },
          },
        },
        CreateTodoInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: {
              type: "string",
              minLength: 1,
              maxLength: 120,
              description: "Title of the todo",
              example: "Buy groceries",
            },
            description: {
              type: "string",
              maxLength: 500,
              description: "Detailed description of the todo",
              example: "Buy milk, eggs, and bread from the store",
            },
            completed: {
              type: "boolean",
              description: "Whether the todo is completed",
              default: false,
              example: false,
            },
          },
        },
        UpdateTodoInput: {
          type: "object",
          required: ["title", "completed"],
          properties: {
            title: {
              type: "string",
              minLength: 1,
              maxLength: 120,
              description: "Title of the todo",
              example: "Buy groceries",
            },
            description: {
              type: "string",
              maxLength: 500,
              nullable: true,
              description: "Detailed description of the todo",
              example: "Buy milk, eggs, and bread from the store",
            },
            completed: {
              type: "boolean",
              description: "Whether the todo is completed",
              example: true,
            },
          },
        },
        PatchTodoInput: {
          type: "object",
          properties: {
            title: {
              type: "string",
              minLength: 1,
              maxLength: 120,
              description: "Title of the todo",
              example: "Buy groceries",
            },
            description: {
              type: "string",
              maxLength: 500,
              nullable: true,
              description: "Detailed description of the todo",
              example: "Buy milk, eggs, and bread from the store",
            },
            completed: {
              type: "boolean",
              description: "Whether the todo is completed",
              example: true,
            },
          },
        },
        ApiError: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["code", "message"],
              properties: {
                code: {
                  type: "string",
                  enum: ["VALIDATION_ERROR", "NOT_FOUND", "INTERNAL_ERROR"],
                  description: "Error code",
                  example: "NOT_FOUND",
                },
                message: {
                  type: "string",
                  description: "Error message",
                  example: "Todo not found",
                },
                details: {
                  type: "object",
                  description: "Additional error details (e.g., validation errors)",
                },
              },
            },
          },
        },
        HealthResponse: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              description: "Health status of the API",
              example: "ok",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);
