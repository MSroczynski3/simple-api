import { v4 as uuidv4 } from "uuid";
import { getDb } from "../db/database";
import type { Todo, TodoRow } from "../types";
import type { CreateTodoInput, UpdateTodoInput, PatchTodoInput } from "../validation/todoSchemas";

function rowToTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    completed: row.completed === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function findAll(): Todo[] {
  const rows = getDb().prepare("SELECT * FROM todos ORDER BY created_at DESC").all() as TodoRow[];
  return rows.map(rowToTodo);
}

export function findById(id: string): Todo | null {
  const row = getDb().prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined;
  return row ? rowToTodo(row) : null;
}

export function create(input: CreateTodoInput): Todo {
  const id = uuidv4();
  const now = new Date().toISOString();
  const completed = input.completed ?? false;

  getDb()
    .prepare(
      "INSERT INTO todos (id, title, description, completed, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(id, input.title, input.description ?? null, completed ? 1 : 0, now, now);

  return findById(id)!;
}

export function update(id: string, input: UpdateTodoInput): Todo | null {
  const existing = findById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  getDb()
    .prepare(
      "UPDATE todos SET title = ?, description = ?, completed = ?, updated_at = ? WHERE id = ?"
    )
    .run(input.title, input.description ?? null, input.completed ? 1 : 0, now, id);

  return findById(id)!;
}

export function patch(id: string, input: PatchTodoInput): Todo | null {
  const existing = findById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const title = input.title ?? existing.title;
  const description = input.description !== undefined ? input.description : existing.description;
  const completed = input.completed !== undefined ? input.completed : existing.completed;

  getDb()
    .prepare(
      "UPDATE todos SET title = ?, description = ?, completed = ?, updated_at = ? WHERE id = ?"
    )
    .run(title, description, completed ? 1 : 0, now, id);

  return findById(id)!;
}

export function remove(id: string): boolean {
  const result = getDb().prepare("DELETE FROM todos WHERE id = ?").run(id);
  return result.changes > 0;
}
