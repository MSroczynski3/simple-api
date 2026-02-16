import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(500).nullable().optional(),
  completed: z.boolean(),
});

export const patchTodoSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().max(500).nullable().optional(),
  completed: z.boolean().optional(),
});

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type PatchTodoInput = z.infer<typeof patchTodoSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
