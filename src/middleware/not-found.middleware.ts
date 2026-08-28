import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export function notFoundHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
