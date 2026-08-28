import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  logger.error(error, "Unhandled Error");

  res.status(500).json({ success: false, message: "Internal server error" });
}
