import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ApiError } from "../types";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    const body: ApiError = {
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request body",
        details: err.errors,
      },
    };
    res.status(400).json(body);
    return;
  }

  console.error("Unhandled error:", err);
  const body: ApiError = {
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
    },
  };
  res.status(500).json(body);
}
