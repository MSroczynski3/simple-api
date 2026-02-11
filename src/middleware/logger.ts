import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const requestId = res.getHeader("X-Request-Id") || "-";
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms reqId=${requestId}`
    );
  });
  next();
}
