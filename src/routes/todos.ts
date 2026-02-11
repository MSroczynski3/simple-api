import { Router, Request, Response, NextFunction } from "express";
import * as repo from "../repository/todoRepository";
import { createTodoSchema, updateTodoSchema, patchTodoSchema } from "../validation/todoSchemas";
import type { ApiError } from "../types";

const router = Router();

function notFound(res: Response): void {
  const body: ApiError = {
    error: { code: "NOT_FOUND", message: "Todo not found" },
  };
  res.status(404).json(body);
}

/**
 * @openapi
 * /todos:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get all todos
 *     description: Retrieves a list of all todos
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/todos", (_req: Request, res: Response) => {
  res.json(repo.findAll());
});

/**
 * @openapi
 * /todos/{id}:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get a todo by ID
 *     description: Retrieves a specific todo by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.get("/todos/:id", (req: Request<{ id: string }>, res: Response) => {
  const todo = repo.findById(req.params.id);
  if (!todo) return notFound(res);
  res.json(todo);
});

/**
 * @openapi
 * /todos:
 *   post:
 *     tags:
 *       - Todos
 *     summary: Create a new todo
 *     description: Creates a new todo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoInput'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/todos", (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = createTodoSchema.parse(req.body);
    const todo = repo.create(input);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /todos/{id}:
 *   put:
 *     tags:
 *       - Todos
 *     summary: Update a todo
 *     description: Replaces all fields of an existing todo (full update)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoInput'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.put("/todos/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const input = updateTodoSchema.parse(req.body);
    const todo = repo.update(req.params.id, input);
    if (!todo) return notFound(res);
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /todos/{id}:
 *   patch:
 *     tags:
 *       - Todos
 *     summary: Partially update a todo
 *     description: Updates specific fields of an existing todo (partial update)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchTodoInput'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.patch("/todos/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const input = patchTodoSchema.parse(req.body);
    const todo = repo.patch(req.params.id, input);
    if (!todo) return notFound(res);
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /todos/{id}:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: Delete a todo
 *     description: Permanently deletes a todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The todo ID
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete("/todos/:id", (req: Request<{ id: string }>, res: Response) => {
  repo.remove(req.params.id);
  res.status(204).send();
});

export default router;
