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

router.get("/todos", (_req: Request, res: Response) => {
  res.json(repo.findAll());
});

router.get("/todos/:id", (req: Request<{ id: string }>, res: Response) => {
  const todo = repo.findById(req.params.id);
  if (!todo) return notFound(res);
  res.json(todo);
});

router.post("/todos", (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = createTodoSchema.parse(req.body);
    const todo = repo.create(input);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

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

router.delete("/todos/:id", (req: Request<{ id: string }>, res: Response) => {
  repo.remove(req.params.id);
  res.status(204).send();
});

export default router;
