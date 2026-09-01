import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import { AppError } from "../utils/appError.js";

// This function runs whenever any route throws an error.
export function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Case 1: an error we created ourselves on purpose (AppError),
  // like "user not found" or "wrong password".
  // These are safe to show to the client as-is.
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return; // stop here so we don't also send the code below
  }

  // Case 2: anything else — a real bug or unexpected crash.
  // Log it for ourselves, but don't show the details to the client.
  logger.error({ err: error }, "Unhandled Error");
  res.status(500).json({ success: false, message: "Internal server error" });
}
