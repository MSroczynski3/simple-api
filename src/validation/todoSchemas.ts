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

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type PatchTodoInput = z.infer<typeof patchTodoSchema>;
